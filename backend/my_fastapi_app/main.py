from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal
from .model import User
from pydantic import BaseModel


# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS setup
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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserCreate(BaseModel):
    name: str
    email: str
    number: str
    password_hash: str

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
    return {"message": "Login successful",}

@app.get("/")
def read_root():
    return {"message": "🚀 FastAPI + PostgreSQL running successfully!"}