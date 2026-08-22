from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_create_vehicle_with_zero_price():
    response = client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 0,
            "quantity": 5,
        },
    )

    assert response.status_code == 422


def test_create_vehicle_with_negative_price():
    response = client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": -1000,
            "quantity": 5,
        },
    )

    assert response.status_code == 422


def test_create_vehicle_with_negative_quantity():
    response = client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": -1,
        },
    )

    assert response.status_code == 422


def test_create_vehicle_with_missing_make():
    response = client.post(
        "/api/vehicles",
        json={
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    assert response.status_code == 422