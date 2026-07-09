from datetime import datetime, timezone


def create_user_document(
    name: str,
    email: str,
    hashed_password: str,
) -> dict:

    now = datetime.now(timezone.utc)

    return {

        "name": name,

        "email": email,

        "password": hashed_password,

        "resume_uploaded": False,
        
        "resume_filename": None,

        "resume_path": None,

        "uploaded_at": None,

        "ats_score": None,

        "created_at": now,

        "updated_at": now,
    }