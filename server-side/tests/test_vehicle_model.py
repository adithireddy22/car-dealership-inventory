from app.models.vehicle import Vehicle


def test_create_vehicle():
    vehicle = Vehicle(
        make="Toyota",
        model="Camry",
        category="Sedan",
        price=25000,
        quantity=5,
    )

    assert vehicle.make == "Toyota"
    assert vehicle.model == "Camry"
    assert vehicle.category == "Sedan"
    assert vehicle.price == 25000
    assert vehicle.quantity == 5