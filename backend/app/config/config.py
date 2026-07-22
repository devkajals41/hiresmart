from pathlib import Path
from dotenv import load_dotenv
import os

# Backend root directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load .env file
load_dotenv(BASE_DIR / ".env")


class Settings:
    MONGODB_URI = os.getenv("MONGODB_URI", "")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "hiresmart")

    JWT_SECRET = os.getenv("JWT_SECRET", "")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")

    GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME", "")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY", "")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET", "")

    # CORS Allowed Origins
    # For local development: defaults to "http://localhost:5173"
    # For production deployment: set the ALLOWED_ORIGINS env var in .env or the hosting environment to your frontend domain (e.g. "https://your-domain.com")
    _configured_origins = [
        o.strip()
        for o in os.getenv("ALLOWED_ORIGINS", "").split(",")
        if o.strip()
    ]
    _local_origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:3000",
    ]
    ALLOWED_ORIGINS = list(dict.fromkeys(_configured_origins + _local_origins))


settings = Settings()
