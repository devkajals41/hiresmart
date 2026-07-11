from app.ai.interview_engine import (
    generate_interview,
    evaluate_interview,
)

from app.repositories.user_repository import (
    get_user_by_id,
)


async def generate_interview_service(
    user_id: str,
    role: str,
    difficulty: str,
    question_count: int,
):
    """
    Generate interview for a user.
    """

    user = await get_user_by_id(user_id)

    if not user:

        raise Exception("User not found")

    parsed_resume = user.get(
        "parsed_resume",
        {},
    )

    return generate_interview(
        parsed_resume,
        role,
        difficulty,
        question_count,
    )


async def evaluate_interview_service(
    user_id: str,
    questions: list,
    answers: list,
):
    """
    Evaluate interview answers.
    """

    user = await get_user_by_id(user_id)

    if not user:

        raise Exception("User not found")

    parsed_resume = user.get(
        "parsed_resume",
        {},
    )

    return evaluate_interview(
        parsed_resume,
        questions,
        answers,
    )