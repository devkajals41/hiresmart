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

    # Use the parsed resume stored during resume upload for RAG retrieval
    parsed_resume = user.get("parsed_resume", {})

    # Initialize RAG SimpleRetriever
    from app.rag.retriever import SimpleRetriever

    retriever = SimpleRetriever(parsed_resume)

    # Retrieve top 3 chunks matching the role and topic
    retrieved_chunks = retriever.retrieve(f"{role} {topic}", top_k=3)
    rag_context = "\n\n".join(retrieved_chunks)

    return generate_interview(
        parsed_resume=parsed_resume,
        role=role,
        difficulty=difficulty,
        question_count=question_count,
        topic=topic,
        rag_context=rag_context,
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

    feedback = evaluate_interview(
        parsed_resume=parsed_resume,
        questions=questions,
        answers=answers,
        topic=topic,
        role=role,
    )

    from app.repositories.user_repository import (
        increment_user_counters,
        add_user_activity,
    )

    await increment_user_counters(user_id, mock_interviews=1, feedback_reports=1)
    await add_user_activity(
        user_id=user_id,
        activity_type="interview_complete",
        title="Mock interview completed",
        detail=f"{role} ({topic})",
    )

    return feedback
