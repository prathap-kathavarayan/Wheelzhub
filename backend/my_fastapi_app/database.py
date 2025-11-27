import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

SQLALCHEMY_DATABASE_URL = os.environ.get(
<<<<<<< HEAD
    "DATABASE_URL", "postgresql://postgres:Micheal1529@localhost:5432/wheelzhub1"
=======
    "DATABASE_URL", "postgresql://postgres:ajithkumar9344@localhost:5432/wheelzhub1"
>>>>>>> ec88e1c52eb179532518a4cd475f4473088a12ee
)

engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, expire_on_commit=False)

Base = declarative_base()