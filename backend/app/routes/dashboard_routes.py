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
            "ats_score": current_user.get("ats_score"),
        },
        "stats": {
            "mock_interviews": current_user.get("mock_interviews_count", 0),
            "feedback_reports": current_user.get("feedback_reports_count", 0),
        },
        "activities": current_user.get("activities", []),
    }
