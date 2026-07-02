from fastapi import FastAPI

app = FastAPI(
    title="HireSmart API",
    description="AI-powered Interview Preparation Platform",
    version="1.0.0",
)


@app.get("/")
async def root():
    return {
        "message": "Welcome to HireSmart API"
    }