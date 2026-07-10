from app.models.user_model import create_user_document
from app.repositories.user_repository import (
    get_user_by_email,
    create_user,
)
from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
    UserResponse,
    TokenResponse,
    AuthResponse,
)
from app.utils.jwt_handler import create_access_token
from app.utils.password_handler import (
    hash_password,
    verify_password,
)
from app.exceptions.custom_exceptions import (
    InvalidCredentialsException,
    EmailAlreadyExistsException,
)


async def register_user(user: UserRegister) -> AuthResponse:
    """
    Register a new user.
    """

    # Check if email already exists
    existing_user = await get_user_by_email(user.email)

    if existing_user:
        raise EmailAlreadyExistsException()

    # Hash password
    hashed_password = hash_password(user.password)

    # Create MongoDB document
    user_document = create_user_document(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
    )

    # Save user
    result = await create_user(user_document)

    # Generate JWT
    token = create_access_token(
        {
            "sub": user.email,
            "user_id": str(result.inserted_id),
        }
    )

    return AuthResponse(
        message="User registered successfully.",
        user=UserResponse(
            id=str(result.inserted_id),
            name=user.name,
            email=user.email,
            resume_uploaded=False,
            ats_score=None,
            created_at=user_document["created_at"],
        ),
        token=TokenResponse(
            access_token=token,
        ),
    )


async def login_user(user: UserLogin) -> AuthResponse:
    """
    Authenticate an existing user.
    """

    # Find user by email
    existing_user = await get_user_by_email(user.email)

    if not existing_user:
        raise InvalidCredentialsException()

    # Verify password
    if not verify_password(
        user.password,
        existing_user["password"],
    ):
        raise InvalidCredentialsException()

    # Generate JWT
    token = create_access_token(
        {
            "sub": existing_user["email"],
            "user_id": str(existing_user["_id"]),
        }
    )

    return AuthResponse(
        message="Login successful.",
        user=UserResponse(
            id=str(existing_user["_id"]),
            name=existing_user["name"],
            email=existing_user["email"],
            resume_uploaded=existing_user["resume_uploaded"],
            ats_score=existing_user["ats_score"],
            created_at=existing_user["created_at"],
        ),
        token=TokenResponse(
            access_token=token,
        ),
    )
