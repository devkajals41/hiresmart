from bson import ObjectId

from app.database import mongodb
from datetime import datetime


async def get_user_by_email(email: str):
    """
    Find a user by email.
    """
    return await mongodb.database.users.find_one({"email": email})


async def create_user(user_document: dict):
    """
    Insert a new user.
    """
    return await mongodb.database.users.insert_one(user_document)


async def get_user_by_id(user_id: str):
    """
    Find user by MongoDB ObjectId.
    """
    return await mongodb.database.users.find_one({"_id": ObjectId(user_id)})


async def update_resume_details(
    user_id: str,
    filename: str,
    filepath: str,
    resume_text: str,
    parsed_resume: dict,
    ats_report: dict,
):
    """
    Save uploaded resume information.
    """

    return await mongodb.database.users.update_one(
        {"_id": ObjectId(user_id)},
        {
            "$set": {
                "resume_uploaded": True,
                "resume_filename": filename,
                "resume_path": filepath,
                "resume_text": resume_text,
                "parsed_resume": parsed_resume,
                "ats_report": ats_report,
                "uploaded_at": datetime.utcnow(),
            }
        },
    )
