from fastapi import APIRouter, Depends

from app.schemas.interview_schema import (
    InterviewGenerateRequest,
    InterviewSubmitRequest,
)
from app.services.interview_service import (
    generate_interview_service,
    evaluate_interview_service,
)
from app.dependencies.auth_dependency import get_current_user

router = APIRouter(
    prefix="/api/interview",
    tags=["Interview"],
)


@router.post("/generate")
async def generate_interview_route(
    request: InterviewGenerateRequest,
    current_user=Depends(get_current_user),  # secured — requires valid JWT
):
    """
    Generate mock interview questions for the authenticated user.
    User ID is taken from the token, not the request body.
    """
    return await generate_interview_service(
        user_id=str(current_user["_id"]),
        role=request.role,
        difficulty=request.difficulty,
        question_count=request.question_count,
        topic=request.topic,
    )


@router.post("/evaluate")
async def evaluate_interview_route(
    request: InterviewSubmitRequest,
    current_user=Depends(get_current_user),  # secured — requires valid JWT
):
    """
    Evaluate submitted interview answers for the authenticated user.
    Returns structured AI feedback including score, metrics, and per-question breakdown.
    """
    return await evaluate_interview_service(
        user_id=str(current_user["_id"]),
        questions=request.questions,
        answers=request.answers,
        topic=request.topic,
        role=request.role,
    )
