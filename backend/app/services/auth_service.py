from datetime import datetime, timedelta, timezone
import hashlib
import secrets

from app.models.user_model import create_user_document
from app.repositories.user_repository import (
    get_user_by_email,
    get_user_by_password_reset_token_hash,
    create_user,
    update_user_by_email,
    clear_password_reset_token,
)
from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
    GoogleLogin,
    UserResponse,
    TokenResponse,
    AuthResponse,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordResponse,
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
    PasswordResetRequestException,
    PasswordResetTokenException,
)
from app.config.config import settings
from app.utils.email_service import (
    is_email_delivery_configured,
    send_password_reset_email,
)

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


def _hash_reset_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def _to_utc_datetime(value):
    if value is None:
        return None

    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)

    return value.astimezone(timezone.utc)


async def request_password_reset(payload: ForgotPasswordRequest) -> ForgotPasswordResponse:
    user = await get_user_by_email(payload.email)

    if not user:
        raise PasswordResetRequestException(
            "If an account exists for that email, password reset instructions will be sent."
        )

    if user.get("auth_provider") == "google" and not user.get("password"):
        raise PasswordResetRequestException(
            "This account uses Google sign-in. It does not have a local password to reset."
        )

    token = secrets.token_urlsafe(32)
    token_hash = _hash_reset_token(token)
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES
    )

    await update_user_by_email(
        payload.email,
        {
            "password_reset_token_hash": token_hash,
            "password_reset_expires_at": expires_at,
        },
    )

    reset_link = f"{settings.FRONTEND_URL.rstrip('/')}/reset-password/{token}"
    try:
        send_password_reset_email(payload.email, reset_link)
    except Exception:
        await clear_password_reset_token(payload.email)
        raise PasswordResetRequestException(
            "Unable to send the reset email right now. Please try again."
        )

    if is_email_delivery_configured():
        return ForgotPasswordResponse(
            message="Password reset instructions have been sent to your email."
        )

    return ForgotPasswordResponse(
        message="Password reset instructions are ready.",
        reset_link=reset_link,
    )


async def reset_password(payload: ResetPasswordRequest) -> ResetPasswordResponse:
    token_hash = _hash_reset_token(payload.token)
    user = await get_user_by_password_reset_token_hash(token_hash)

    if not user:
        raise PasswordResetTokenException()

    expires_at = _to_utc_datetime(user.get("password_reset_expires_at"))
    if not expires_at or expires_at < datetime.now(timezone.utc):
        raise PasswordResetTokenException("This password reset link has expired.")

    hashed_password = hash_password(payload.password)

    await update_user_by_email(
        user["email"],
        {
            "password": hashed_password,
            "auth_provider": user.get("auth_provider") or "local",
        },
    )
    await clear_password_reset_token(user["email"])

    return ResetPasswordResponse(message="Password updated successfully.")
