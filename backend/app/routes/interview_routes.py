from fastapi import APIRouter

from app.schemas.interview_schema import (
    InterviewGenerateRequest,
    InterviewSubmitRequest,
)

from app.services.interview_service import (
    generate_interview_service,
    evaluate_interview_service,
)

router = APIRouter(
    prefix="/api/interview",
    tags=["Interview"],
)


@router.post("/generate")
async def generate_interview_route(
    request: InterviewGenerateRequest,
):

    return await generate_interview_service(
        request.user_id,
        request.role,
        request.difficulty,
        request.question_count,
    )


@router.post("/evaluate")
async def evaluate_interview_route(
    request: InterviewSubmitRequest,
):

    return await evaluate_interview_service(
        request.user_id,
        request.questions,
        request.answers,
    )