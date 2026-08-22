from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.vehicle import Vehicle

router = APIRouter(
    prefix="/api/vehicles",
    tags=["Vehicles"],
)


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
def create_vehicle(
    vehicle_data: dict,
    db: Session = Depends(get_db),
):
    vehicle = Vehicle(
        make=vehicle_data["make"],
        model=vehicle_data["model"],
        category=vehicle_data["category"],
        price=vehicle_data["price"],
        quantity=vehicle_data["quantity"],
    )

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    return vehicle


@router.get("")
def list_vehicles(
    db: Session = Depends(get_db),
):
    vehicles = db.scalars(
        select(Vehicle)
    ).all()

    return vehicles


@router.get("/{vehicle_id}")
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
):
    vehicle = db.scalar(
        select(Vehicle).where(Vehicle.id == vehicle_id)
    )

    if vehicle is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehicle not found",
        )

    return vehicle