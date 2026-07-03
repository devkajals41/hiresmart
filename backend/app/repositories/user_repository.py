from bson import ObjectId

from app.database import mongodb


async def get_user_by_email(email: str):
    """
    Find a user by email.
    """
    return await mongodb.database.users.find_one(
        {"email": email}
    )


async def create_user(user_document: dict):
    """
    Insert a new user.
    """
    return await mongodb.database.users.insert_one(
        user_document
    )


async def get_user_by_id(user_id: str):
    """
    Find user by MongoDB ObjectId.
    """
    return await mongodb.database.users.find_one(
        {"_id": ObjectId(user_id)}
    )     