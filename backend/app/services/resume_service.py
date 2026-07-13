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
from app.services.cloudinary_service import (
    upload_resume as upload_resume_to_cloudinary,
    delete_resume,
)

from app.repositories.user_repository import add_user_activity

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

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

    user = await get_user_by_id(user_id)

    old_score = user.get("ats_score") if user else None

    cloudinary_file = upload_resume_to_cloudinary(filepath)

    resume_url = cloudinary_file["url"]

    resume_public_id = cloudinary_file["public_id"]

    resume_text = extract_text_from_pdf(filepath)

    parsed_resume = parse_resume(resume_text)

    ats_report = analyze_resume(parsed_resume)

    await update_resume_details(
        user_id=user_id,
        filename=file.filename,
        resume_url=resume_url,
        resume_public_id=resume_public_id,
        resume_text=resume_text,
        parsed_resume=parsed_resume,
        ats_report=ats_report,
    )

    if user:
        old_public_id = user.get("resume_public_id")

        if old_public_id:
            delete_resume(old_public_id)

    await add_user_activity(
        user_id=user_id,
        activity_type="resume_upload",
        title="Resume uploaded",
        detail=file.filename,
    )

    new_score = ats_report.get("overall_score", 0)
    if old_score is not None and new_score > old_score:
        await add_user_activity(
            user_id=user_id,
            activity_type="ats_improved",
            title="ATS score improved",
            detail=f"Previous score: {old_score} → New score: {new_score}",
        )
    if os.path.exists(filepath):
        os.remove(filepath)

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
