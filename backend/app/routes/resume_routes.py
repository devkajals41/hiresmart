from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    HTTPException,
    status,
)
from fastapi.responses import FileResponse
import os

from app.dependencies.auth_dependency import (
    get_current_user,
)

from app.services.resume_service import (
    upload_resume,
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
    Serve the logged-in user's uploaded resume.
    """
    resume_path = current_user.get("resume_path")
    if not resume_path or not os.path.exists(resume_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume file not found.",
        )

    # Determine media type based on extension
    ext = os.path.splitext(resume_path)[1].lower()
    media_type = "application/octet-stream"
    if ext == ".pdf":
        media_type = "application/pdf"
    elif ext == ".docx":
        media_type = (
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    elif ext == ".doc":
        media_type = "application/msword"

    return FileResponse(
        path=resume_path,
        media_type=media_type,
        filename=current_user.get("resume_filename", f"resume{ext}"),
    )
