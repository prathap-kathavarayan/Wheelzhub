from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    number = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    price = Column(String, nullable=True)
    vehicle_type = Column(String, nullable=False, index=True)  # bike|car|van|bus
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    # booking details
    car_type = Column(String, nullable=True)
    from_location = Column(String, nullable=False)
    to = Column(String, nullable=True)
    pickup = Column(String, nullable=True)
    dropoff = Column(String, nullable=True)

    # customer info
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=False)

    # email status for observability
    email_status = Column(String, default="pending", nullable=True)
    email_error = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
