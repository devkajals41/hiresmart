from datetime import datetime, timezone


def create_user_document(
    name: str,
    email: str,
    hashed_password: str | None,
    auth_provider: str = "local",
    google_sub: str | None = None,
    google_picture: str | None = None,
) -> dict:

    now = datetime.now(timezone.utc)

    return {
        "name": name,
        "email": email,
        "password": hashed_password,
        "auth_provider": auth_provider,
        "google_sub": google_sub,
        "google_picture": google_picture,
        "resume_uploaded": False,
        "resume_filename": None,
        "resume_path": None,
        "uploaded_at": None,
        "ats_score": None,
        "created_at": now,
        "updated_at": now,
    }
