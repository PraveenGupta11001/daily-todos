import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables (optional for Render, required for local development)
load_dotenv()

# Get DATABASE_URL from environment, with a fallback for local development
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://todo_user:todo@localhost:5432/todo_app")
# print(f"Using DATABASE_URL: {DATABASE_URL}")  # Debug log to verify the URL

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Create database tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()