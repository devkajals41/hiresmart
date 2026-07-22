from app.models.user_model import create_user_document
from app.repositories.user_repository import (
    get_user_by_email,
    create_user,
    update_user_by_email,
)
from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
    GoogleLogin,
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
    GoogleAuthenticationException,
)
from app.config.config import settings

from google.auth.exceptions import GoogleAuthError
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token


def _build_auth_response(user_document: dict, message: str) -> AuthResponse:
    token = create_access_token(
        {
            "sub": user_document["email"],
            "user_id": str(user_document["_id"]),
        }
    )

    return AuthResponse(
        message=message,
        user=UserResponse(
            id=str(user_document["_id"]),
            name=user_document["name"],
            email=user_document["email"],
            resume_uploaded=user_document.get("resume_uploaded", False),
            ats_score=user_document.get("ats_score"),
            created_at=user_document["created_at"],
        ),
        token=TokenResponse(access_token=token),
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
        auth_provider="local",
    )

    # Save user
    result = await create_user(user_document)
    user_document["_id"] = result.inserted_id

    return _build_auth_response(user_document, "User registered successfully.")


async def login_user(user: UserLogin) -> AuthResponse:
    """
    Authenticate an existing user.
    """

    # Find user by email
    existing_user = await get_user_by_email(user.email)

    if not existing_user:
        raise InvalidCredentialsException()

    stored_password = existing_user.get("password")

    if not stored_password:
        raise InvalidCredentialsException()

    # Verify password
    if not verify_password(
        user.password,
        stored_password,
    ):
        raise InvalidCredentialsException()

    return _build_auth_response(existing_user, "Login successful.")


async def google_login_user(payload: GoogleLogin) -> AuthResponse:
    """
    Authenticate or create a user using a Google credential.
    """

    if not settings.GOOGLE_CLIENT_ID:
        raise GoogleAuthenticationException(
            "Google sign-in is not configured on the server."
        )

    try:
        id_info = google_id_token.verify_oauth2_token(
            payload.credential,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID,
        )
    except (ValueError, GoogleAuthError):
        raise GoogleAuthenticationException("Google credential is invalid.")

    email = id_info.get("email")
    email_verified = id_info.get("email_verified")
    name = id_info.get("name") or email or "Google User"
    google_sub = id_info.get("sub")
    google_picture = id_info.get("picture")

    if not email or not email_verified:
        raise GoogleAuthenticationException(
            "Google account email could not be verified."
        )

    existing_user = await get_user_by_email(email)

    if existing_user:
        update_data = {}

        if not existing_user.get("google_sub"):
            update_data["google_sub"] = google_sub

        if google_picture and not existing_user.get("google_picture"):
            update_data["google_picture"] = google_picture

        if not existing_user.get("auth_provider"):
            update_data["auth_provider"] = "google"

        if update_data:
            await update_user_by_email(email, update_data)

        refreshed_user = await get_user_by_email(email)
        return _build_auth_response(refreshed_user, "Google login successful.")

    user_document = create_user_document(
        name=name,
        email=email,
        hashed_password=None,
        auth_provider="google",
        google_sub=google_sub,
        google_picture=google_picture,
    )

    result = await create_user(user_document)
    user_document["_id"] = result.inserted_id

    return _build_auth_response(user_document, "Google signup successful.")
