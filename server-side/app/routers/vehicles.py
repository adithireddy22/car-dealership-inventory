from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleUpdate

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


@router.put("/{vehicle_id}")
def update_vehicle(
    vehicle_id: int,
    vehicle_data: VehicleUpdate,
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

    if vehicle_data.make is not None:
        vehicle.make = vehicle_data.make

    if vehicle_data.model is not None:
        vehicle.model = vehicle_data.model

    if vehicle_data.category is not None:
        vehicle.category = vehicle_data.category

    if vehicle_data.price is not None:
        vehicle.price = vehicle_data.price

    if vehicle_data.quantity is not None:
        vehicle.quantity = vehicle_data.quantity

    db.commit()
    db.refresh(vehicle)

    return vehicle

@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle(
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

    db.delete(vehicle)
    db.commit()