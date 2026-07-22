from fastapi import APIRouter, status

from app.schemas.user_schema import (
    UserRegister,
    AuthResponse,
    UserLogin,
    GoogleLogin,
)

from app.services.auth_service import (
    register_user,
    login_user,
    google_login_user,
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
