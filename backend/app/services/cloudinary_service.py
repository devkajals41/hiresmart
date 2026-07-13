import cloudinary
import cloudinary.uploader
from app.config.config import settings

# Configure Cloudinary
cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


def upload_resume(file_path: str):
    """
    Upload a resume PDF to Cloudinary.
    Returns:
        {
            "url": "...",
            "public_id": "..."
        }
    """

    response = cloudinary.uploader.upload(
        file_path,
        resource_type="raw",
        access_mode="public",
        folder="hiresmart/resumes",
    )

    return {
        "url": response["secure_url"],
        "public_id": response["public_id"],
    }


def delete_resume(public_id: str):
    """
    Delete an existing resume from Cloudinary.
    """

    cloudinary.uploader.destroy(
        public_id,
        resource_type="raw",
    )
