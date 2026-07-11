from app.ai.interview_engine import (
    generate_interview,
    evaluate_interview,
)
from app.repositories.user_repository import get_user_by_id


async def generate_interview_service(
    user_id: str,
    role: str,
    difficulty: str,
    question_count: int,
    topic: str = "General",
):
    """
    Fetch the user's parsed resume from DB, then call the AI engine
    to generate personalised interview questions for the given role/topic.
    """
    user = await get_user_by_id(user_id)

    if not user:
        raise Exception("User not found")

    # Use the parsed resume stored during resume upload for personalised questions
    parsed_resume = user.get("parsed_resume", {})

    return generate_interview(
        parsed_resume=parsed_resume,
        role=role,
        difficulty=difficulty,
        question_count=question_count,
        topic=topic,
    )


async def evaluate_interview_service(
    user_id: str,
    questions: list,
    answers: list,
    topic: str = "General",
    role: str = "Software Engineer",
):
    """
    Fetch the user's parsed resume from DB, then call the AI engine
    to evaluate the submitted answers and return structured feedback.
    """
    user = await get_user_by_id(user_id)

    if not user:
        raise Exception("User not found")

    parsed_resume = user.get("parsed_resume", {})

    return evaluate_interview(
        parsed_resume=parsed_resume,
        questions=questions,
        answers=answers,
        topic=topic,
        role=role,
    )