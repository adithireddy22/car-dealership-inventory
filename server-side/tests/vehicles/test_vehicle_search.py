def test_filter_vehicles_by_make(client):
    client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    client.post(
        "/api/vehicles",
        json={
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 22000,
            "quantity": 3,
        },
    )

    response = client.get("/api/vehicles?make=Toyota")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["make"] == "Toyota"

def test_filter_vehicles_by_model(client):
    client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Corolla",
            "category": "Sedan",
            "price": 22000,
            "quantity": 3,
        },
    )

    response = client.get("/api/vehicles?model=Camry")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["model"] == "Camry"

def test_filter_vehicles_by_category(client):
    client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "RAV4",
            "category": "SUV",
            "price": 30000,
            "quantity": 4,
        },
    )

    response = client.get("/api/vehicles?category=SUV")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["category"] == "SUV"

def test_filter_vehicles_by_min_price(client):
    client.post(
        "/api/vehicles",
        json={
            "make": "Toyota",
            "model": "Camry",
            "category": "Sedan",
            "price": 25000,
            "quantity": 5,
        },
    )

    client.post(
        "/api/vehicles",
        json={
            "make": "Honda",
            "model": "Civic",
            "category": "Sedan",
            "price": 15000,
            "quantity": 3,
        },
    )

    response = client.get("/api/vehicles?min_price=20000")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["price"] == 25000