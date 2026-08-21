from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine

app = FastAPI(
    title="Car Dealership Inventory API",
    description="Backend API for managing dealership vehicle inventory",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"message": "Car Dealership Inventory API is running"}


@app.get("/db-test")
def database_test():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {"message": "PostgreSQL connection successful"}

    except Exception as e:
        return {
            "message": "PostgreSQL connection failed",
            "error": str(e),
        }