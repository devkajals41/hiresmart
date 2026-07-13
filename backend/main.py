from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routes.auth_routes import router as auth_router
from app.routes.profile_routes import router as profile_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.resume_routes import router as resume_router
from fastapi.staticfiles import StaticFiles
from app.routes.interview_routes import (
    router as interview_router,
)
from app.config.config import settings

from app.database.mongodb import (
    connect_to_mongo,
    close_mongo_connection,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(
    title="HireSmart API",
    description="AI-powered Interview Preparation Platform",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    # Read allowed origins from settings (derived from ALLOWED_ORIGINS environment variable)
    # Default is ["http://localhost:5173"] for running locally on your PC.
    # To run locally, you don't need to change anything.
    # For deployment, add ALLOWED_ORIGINS=http://localhost:5173,https://<your-deployed-frontend-domain> to the .env file or your host's environment settings.
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(dashboard_router)
app.include_router(resume_router)
app.include_router(interview_router)


@app.get("/")
async def root():
    return {"message": "Welcome to HireSmart API"}
