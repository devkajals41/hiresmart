import os
from app.utils.ats.ats_engine import analyze_resume
from app.repositories.user_repository import update_resume_details
import aiofiles
from app.utils.pdf_parser import extract_text_from_pdf
from fastapi import UploadFile, HTTPException, status
from app.utils.resume_engine import parse_resume
from app.repositories.user_repository import (
    get_user_by_id,
)
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

    async with aiofiles.open(filepath, "wb") as out_file:
        content = await file.read()
        await out_file.write(content)

    resume_text = extract_text_from_pdf(filepath)

    parsed_resume = parse_resume(resume_text)

    ats_report = analyze_resume(parsed_resume)

    await update_resume_details(
        user_id=user_id,
        filename=file.filename,
        filepath=filepath,
        resume_text=resume_text,
        parsed_resume=parsed_resume,
        ats_report=ats_report,
    )

    return {
        "message": "Resume uploaded successfully.",
        "filename": file.filename,
    }
async def get_resume_report(
    user_id: str,
):
    """
    Return ATS report and parsed resume.
    """

    user = await get_user_by_id(user_id)

    return {
        "resume_uploaded": user.get("resume_uploaded", False),
        "resume_filename": user.get("resume_filename"),
        "parsed_resume": user.get("parsed_resume", {}),
        "ats_report": user.get("ats_report", {}),
    }
