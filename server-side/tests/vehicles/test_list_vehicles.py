from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_list_vehicles():
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

    response = client.get("/api/vehicles")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) >= 1

    vehicle = data[0]

    assert vehicle["make"] == "Toyota"
    assert vehicle["model"] == "Camry"
    assert vehicle["category"] == "Sedan"
    assert float(vehicle["price"]) == 25000
    assert vehicle["quantity"] == 5