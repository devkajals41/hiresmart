from fastapi import APIRouter, Depends

from app.dependencies.auth_dependency import get_current_user
from app.utils.mongo_helper import serialize_mongo_document

router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"],
)


@router.get("/me")
async def get_profile(
    current_user=Depends(get_current_user),
):
    """
    Return the logged-in user's profile.
    """

    user = serialize_mongo_document(current_user)

    # Never return password hash
    user.pop("password", None)

    return {
        "message": "Profile fetched successfully.",
        "user": user,
    }
