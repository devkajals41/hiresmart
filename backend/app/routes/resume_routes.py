from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    HTTPException,
    status,
)

from app.dependencies.auth_dependency import (
    get_current_user,
)

from app.services.resume_service import (
    upload_resume,
    get_resume_report,
)

router = APIRouter(
    prefix="/api/resume",
    tags=["Resume"],
)


@router.post("/upload")
async def upload_user_resume(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    """
    Upload user's resume.
    """

    return await upload_resume(
        user_id=str(current_user["_id"]),
        file=file,
    )


@router.get("/view")
async def view_user_resume(
    current_user=Depends(get_current_user),
):
    """
    Return the Cloudinary URL of the uploaded resume.
    """

    resume_url = current_user.get("resume_url")

    if not resume_url:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found.",
        )

    return {"resume_url": resume_url}


@router.get("/report")
async def get_resume_report_route(
    current_user=Depends(get_current_user),
):
    """
    Get ATS report for the logged-in user.
    """

    return await get_resume_report(str(current_user["_id"]))
