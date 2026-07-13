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
    resume_url: str,
    resume_public_id: str,
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
                "resume_url": resume_url,
                "resume_public_id": resume_public_id,
                "resume_text": resume_text,
                "parsed_resume": parsed_resume,
                "ats_report": ats_report,
                "ats_score": ats_report.get("overall_score", 0),
                "uploaded_at": datetime.utcnow(),
            }
        },
    )


async def add_user_activity(user_id: str, activity_type: str, title: str, detail: str):
    """
    Append an activity log item to the user's activities list.
    """
    activity = {
        "type": activity_type,
        "title": title,
        "detail": detail,
        "timestamp": datetime.utcnow().isoformat(),
    }
    return await mongodb.database.users.update_one(
        {"_id": ObjectId(user_id)},
        {
            "$push": {
                "activities": {
                    "$each": [activity],
                    "$position": 0,  # Keep latest on top
                    "$slice": 20,  # Cap to last 20 activities
                }
            }
        },
    )


async def increment_user_counters(
    user_id: str, mock_interviews: int = 0, feedback_reports: int = 0
):
    """
    Increment interview/feedback stats for user.
    """
    update_dict = {}
    if mock_interviews > 0:
        update_dict["mock_interviews_count"] = mock_interviews
    if feedback_reports > 0:
        update_dict["feedback_reports_count"] = feedback_reports

    if not update_dict:
        return None

    return await mongodb.database.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$inc": update_dict},
    )
