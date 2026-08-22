from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_update_vehicle():
    create_response = client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    assert create_response.status_code == 201

    vehicle_id = create_response.json()["id"]

    response = client.put(
        f"/api/vehicles/{vehicle_id}",
        json={
            "make": "Toyota",
            "model": "Corolla",
            "category": "Sedan",
            "price": 23000,
            "quantity": 8,
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == vehicle_id
    assert data["make"] == "Toyota"
    assert data["model"] == "Corolla"
    assert data["category"] == "Sedan"
    assert float(data["price"]) == 23000
    assert data["quantity"] == 8

def test_update_vehicle_not_found():
    response = client.put(
        "/api/vehicles/999999",
        json={
            "make": "Toyota",
            "model": "Corolla",
            "category": "Sedan",
            "price": 23000,
            "quantity": 8,
        },
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Vehicle not found"