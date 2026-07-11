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

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")


settings = Settings()
