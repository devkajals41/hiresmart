from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.routes.auth_routes import router as auth_router
from app.routes.profile_routes import router as profile_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.resume_routes import router as resume_router

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
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(dashboard_router)
app.include_router(resume_router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to HireSmart API"
    }