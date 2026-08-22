from app.models.user import User


def test_create_user():
    user = User(
        username="adithi",
        email="adithi@example.com",
        password_hash="hashed_password",
        role="user",
    )

    assert user.username == "adithi"
    assert user.email == "adithi@example.com"
    assert user.password_hash == "hashed_password"
    assert user.role == "user"


def test_user_default_role():
    assert User.__table__.c.role.default.arg == "user"