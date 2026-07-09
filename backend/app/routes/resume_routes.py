from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
)

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