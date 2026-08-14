from fastapi import APIRouter, status

from app.schemas.user_schema import (
    UserRegister,
    AuthResponse,
    UserLogin,
    GoogleLogin,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordResponse,
)

from app.services.auth_service import (
    register_user,
    login_user,
    google_login_user,
    request_password_reset,
    reset_password,
)

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(user: UserRegister):
    """
    Register a new user.
    """

    return await register_user(user)


@router.post(
    "/login",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
)
async def login(user: UserLogin):
    """
    Login an existing user.
    """

    return await login_user(user)


@router.post(
    "/google",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
)
async def google_login(payload: GoogleLogin):
    """
    Login or register a user with Google.
    """

    return await google_login_user(payload)


@router.post(
    "/forgot-password",
    response_model=ForgotPasswordResponse,
    status_code=status.HTTP_200_OK,
)
async def forgot_password(payload: ForgotPasswordRequest):
    """
    Request a password reset email.
    """

    return await request_password_reset(payload)


@router.post(
    "/reset-password",
    response_model=ResetPasswordResponse,
    status_code=status.HTTP_200_OK,
)
async def confirm_reset_password(payload: ResetPasswordRequest):
    """
    Reset a user's password using a valid token.
    """

    return await reset_password(payload)
