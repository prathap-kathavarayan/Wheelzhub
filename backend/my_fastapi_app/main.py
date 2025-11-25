# main.py (replace your existing file with this)
import os
import ssl
import smtplib
import logging
import traceback
from email.message import EmailMessage
from dotenv import load_dotenv
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks, Request, status, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, EmailStr
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from .model import User, Vehicle, Booking

load_dotenv()


# Create database tables (keeps your current approach)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS setup (restrict in production)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger("uvicorn.error")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_admin_token() -> str:
    # ENV la irundha ADMIN_TOKEN use pannum, illati default "devtoken"
    return os.environ.get("ADMIN_TOKEN", "devtoken")


def admin_required(x_admin_token: Optional[str] = Header(None)):
    expected = get_admin_token()
    if not x_admin_token or x_admin_token != expected:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin token missing or invalid"
        )



class UserCreate(BaseModel):
    name: str
    email: EmailStr
    number: str
    password_hash: str


class BookingCreate(BaseModel):
    """
    Accept multiple incoming field names and normalize later:
      - accept 'from' OR 'from_location'
      - accept 'to' OR 'to_location'
    Keep both alternatives optional here; enforce required fields in handler for clearer errors.
    """
    carType: Optional[str] = None

    # Accept both 'from' (alias) and 'from_location' keys
    from_location: Optional[str] = None
    from_: Optional[str] = Field(None, alias="from")

    # Accept both 'to' and 'to_location'
    to: Optional[str] = None
    to_location: Optional[str] = None

    pickup: Optional[str] = None
    dropoff: Optional[str] = None

    name: str
    email: EmailStr
    phone: str

    class Config:
        allow_population_by_field_name = True
        extra = "allow"

class VehicleCreate(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[str] = None
    vehicle_type: str  # bike | car | van | bus


class VehicleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[str] = None
    vehicle_type: Optional[str] = None


class VehicleOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    price: Optional[str] = None
    vehicle_type: str

    class Config:
        orm_mode = True



# helpful handler that returns both the original request body and validation details
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Return the body that failed and the validation errors (useful during debugging)
    body = None
    try:
        body = await request.json()
    except Exception:
        body = None
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors(), "body": body},
    )


def send_booking_email_smtp(booking: BookingCreate):
    """Send a single email using environment SMTP settings. Raises exception on failure."""
    smtp_host = (
        os.environ.get("SMTP_HOST")
        or os.environ.get("EMAIL_HOST")
        or "smtp.gmail.com"
    )
    smtp_port = int(
        os.environ.get("SMTP_PORT")
        or os.environ.get("EMAIL_PORT")
        or 465
    )
    smtp_user = os.environ.get("SMTP_USER") or os.environ.get("EMAIL_USER")
    smtp_pass = os.environ.get("SMTP_PASS") or os.environ.get("EMAIL_PASSWORD")

    from_addr = os.environ.get("EMAIL_FROM") or smtp_user
    admin_addr = os.environ.get("ADMIN_EMAIL") or from_addr

    msg = EmailMessage()
    msg["Subject"] = "Your Wheelzhub Booking Confirmation"
    msg["From"] = from_addr
    msg["To"] = booking.email
    msg["Cc"] = admin_addr

    body = f"""
Hello {booking.name},

Thanks for booking with Wheelzhub! Here are the details:

Vehicle type: {booking.carType or 'N/A'}
Pickup location: {booking.from_location or booking.from_ or 'N/A'}
Dropoff: {booking.to or booking.to_location or booking.dropoff or 'N/A'}
Pickup date: {booking.pickup or 'N/A'}
Contact phone: {booking.phone}

We will connect shortly with driver details.
Regards,
Wheelzhub Team
"""
    msg.set_content(body)

    ctx = ssl.create_default_context()

    if smtp_port == 465:
        with smtplib.SMTP_SSL(smtp_host, smtp_port, context=ctx, timeout=20) as server:
            if smtp_user and smtp_pass:
                server.login(smtp_user, smtp_pass)
            server.send_message(msg)
    else:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
            server.starttls(context=ctx)
            if smtp_user and smtp_pass:
                server.login(smtp_user, smtp_pass)
            server.send_message(msg)



def bg_send_email_and_update(booking_id: int):
    """Background worker: fetch booking by id, try sending email with retries, and update DB status."""
    db = SessionLocal()
    try:
        b = db.query(Booking).get(booking_id)
        if not b:
            logger.error("Booking %s not found when trying to send email", booking_id)
            return

        # ensure status is pending
        b.email_status = "pending"
        db.commit()

        max_retries = 3
        attempt = 0
        last_exc = None
        while attempt < max_retries:
            try:
                # Build a BookingCreate-like object from DB record
                payload = BookingCreate(
                    carType=b.car_type,
                    from_location=b.from_location,
                    to=b.to,
                    pickup=b.pickup,
                    dropoff=b.dropoff,
                    name=b.name,
                    email=b.email,
                    phone=b.phone,
                )
                send_booking_email_smtp(payload)

                b.email_status = "sent"
                b.email_error = None
                db.commit()
                logger.info("Email successfully sent for booking %s", booking_id)
                return
            except Exception as exc:
                attempt += 1
                last_exc = exc
                logger.warning("Email attempt %d for booking %s failed: %s", attempt, booking_id, exc)
        # all retries failed
        b.email_status = "failed"
        b.email_error = str(last_exc)
        db.commit()
        logger.error("All email attempts failed for booking %s: %s", booking_id, last_exc)

    finally:
        db.close()


@app.post("/signup")
def signup_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter((User.email == user.email) | (User.number == user.number)).first()

    if existing_user:
        return {"error": "User with this email or number already exists."}
    new_user = User(
        name=user.name,
        email=user.email,
        number=user.number,
        password_hash=user.password_hash,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully", "user_id": new_user.id}


@app.get("/login")
def login_user(email: str, password_hash: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email, User.password_hash == password_hash).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"message": "Login successful"}


@app.get("/")
def read_root():
    return {"message": "🚀 FastAPI + PostgreSQL running successfully!"}


@app.post("/bookings")
def create_booking(booking: BookingCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Save booking to DB, return quickly, and send confirmation email in background.

    This handler normalizes incoming aliases and validates required fields explicitly
    so the client gets clear 422/400 responses instead of internal 500.
    """
    try:
        # Normalize alias fields (accept 'from' or 'from_location'; accept 'to' or 'to_location')
        from_loc = booking.from_location or getattr(booking, "from_", None)
        if not from_loc:
            # final fallback: check to see if 'from' or 'from_location' were included as raw extras
            extra_from = getattr(booking, "from", None)
            if extra_from:
                from_loc = extra_from

        to_val = booking.to or booking.to_location or getattr(booking, "to", None)

        # Validate required fields explicitly for clearer error messages
        errors = []
        if not from_loc:
            errors.append({"loc": ["body", "from_location"], "msg": "field required", "type": "value_error.missing"})
        if not booking.name:
            errors.append({"loc": ["body", "name"], "msg": "field required", "type": "value_error.missing"})
        if not booking.email:
            errors.append({"loc": ["body", "email"], "msg": "field required", "type": "value_error.missing"})
        if not booking.phone:
            errors.append({"loc": ["body", "phone"], "msg": "field required", "type": "value_error.missing"})
        if errors:
            # return structured validation error like FastAPI normally does
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=errors)

        # Persist booking so we have an ID to return
        new_booking = Booking(
            car_type=booking.carType,
            from_location=from_loc,
            to=to_val,
            pickup=booking.pickup,
            dropoff=booking.dropoff,
            name=booking.name,
            email=booking.email,
            phone=booking.phone,
            email_status="pending",
            email_error=None,
        )
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)

        # enqueue background email send (non-blocking)
        background_tasks.add_task(bg_send_email_and_update, new_booking.id)

        return {
            "booking_id": new_booking.id,
            "status": "created",
            "email_status": new_booking.email_status,
            "message": "Booking received. Confirmation email will be attempted in the background."
        }

    except HTTPException:
        # re-raise HTTP exceptions (validation)
        raise
    except Exception as exc:
        # unexpected error -> log traceback and send a concise error to client for debugging
        tb = traceback.format_exc()
        logger.error("create_booking failed: %s\n%s", exc, tb)
        # include last 12 lines of traceback in detail for quick debugging (remove in prod)
        short_trace = "\n".join(tb.splitlines()[-12:])
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": str(exc), "trace": short_trace}
        )
    
# ----------------- VEHICLE ADMIN + PUBLIC APIS ----------------- #

@app.post("/admin/vehicles", response_model=VehicleOut)
def create_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db),
    _=Depends(admin_required),
):
    if vehicle.vehicle_type not in {"bike", "car", "van", "bus"}:
        raise HTTPException(
            status_code=400,
            detail="vehicle_type must be one of: bike, car, van, bus",
        )

    db_vehicle = Vehicle(
        name=vehicle.name,
        description=vehicle.description,
        image_url=vehicle.image_url,
        price=vehicle.price,
        vehicle_type=vehicle.vehicle_type,
    )
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle


@app.get("/vehicles", response_model=List[VehicleOut])
def list_vehicles(
    vehicle_type: Optional[str] = None,
    db: Session = Depends(get_db),
):
    q = db.query(Vehicle)
    if vehicle_type:
        q = q.filter(Vehicle.vehicle_type == vehicle_type)
    return q.order_by(Vehicle.id.desc()).all()


@app.get("/vehicles/{vehicle_id}", response_model=VehicleOut)
def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    v = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not v:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return v


@app.put("/admin/vehicles/{vehicle_id}", response_model=VehicleOut)
def update_vehicle(
    vehicle_id: int,
    payload: VehicleUpdate,
    db: Session = Depends(get_db),
    _=Depends(admin_required),
):
    v = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not v:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    for field, value in payload.__dict__.items():
        if value is not None:
            setattr(v, field, value)

    db.add(v)
    db.commit()
    db.refresh(v)
    return v


@app.delete("/admin/vehicles/{vehicle_id}")
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    _=Depends(admin_required),
):
    v = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not v:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    db.delete(v)
    db.commit()
    return {"message": "Vehicle deleted"}

