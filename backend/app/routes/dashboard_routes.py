from fastapi import APIRouter, Depends

from app.dependencies.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)


@router.get("/")
async def get_dashboard(
    current_user=Depends(get_current_user),
):
    """
    Dashboard data for the logged in user.
    """

    return {
        "message": "Dashboard loaded successfully.",
        "user": {
            "name": current_user["name"],
            "email": current_user["email"],
        },
        "resume": {
            "uploaded": current_user["resume_uploaded"],
            "ats_score": current_user["ats_score"],
        },
        "stats": {
            "mock_interviews": 0,
            "feedback_reports": 0,
        },
    }
