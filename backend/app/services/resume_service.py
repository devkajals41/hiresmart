import os
from app.repositories.user_repository import update_resume_details
import aiofiles

from fastapi import UploadFile, HTTPException, status

UPLOAD_FOLDER = "uploads"

ALLOWED_EXTENSIONS = [
    ".pdf",
    ".doc",
    ".docx",
]


async def upload_resume(
    user_id: str,
    file: UploadFile,
):
    """
    Upload and save user's resume.
    """

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF, DOC and DOCX files are allowed.",
        )

    filename = f"{user_id}{extension}"

    filepath = os.path.join(
        UPLOAD_FOLDER,
        filename,
    )

    async with aiofiles.open(
        filepath,
        "wb",
    ) as out_file:

        content = await file.read()

        await out_file.write(content)

    await update_resume_details(
        user_id=user_id,
        filename=filename,
        filepath=filepath,
    )

    return {
        "message": "Resume uploaded successfully.",
        "filename": file.filename,
    }
