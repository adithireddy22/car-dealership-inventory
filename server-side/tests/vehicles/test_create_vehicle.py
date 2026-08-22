from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_create_vehicle():
    response = client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["make"] == "Toyota"
    assert data["model"] == "Camry"
    assert data["category"] == "Sedan"
    assert float(data["price"]) == 25000
    assert data["quantity"] == 5
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data