import json

from app.ai.gemini_client import generate_response
from app.ai.prompts import (
    INTERVIEW_PROMPT,
    FEEDBACK_PROMPT,
)


def generate_interview(
    parsed_resume: dict,
    role: str,
    difficulty: str,
    question_count: int,
):
    """
    Generate interview questions using Gemini.
    """

    prompt = INTERVIEW_PROMPT.format(
        resume=json.dumps(
            parsed_resume,
            indent=2,
        ),
        role=role,
        difficulty=difficulty,
        count=question_count,
    )

    response = generate_response(prompt)

    response = response.replace("```json", "")
    response = response.replace("```", "")
    response = response.strip()

    try:
        return json.loads(response)

    except Exception:

        return {
            "questions": []
        }


def evaluate_interview(
    parsed_resume: dict,
    questions: list,
    answers: list,
):
    """
    Evaluate interview answers.
    """

    prompt = FEEDBACK_PROMPT.format(
        resume=json.dumps(
            parsed_resume,
            indent=2,
        ),
        questions=json.dumps(
            questions,
            indent=2,
        ),
        answers=json.dumps(
            answers,
            indent=2,
        ),
    )

    response = generate_response(prompt)

    response = response.replace("```json", "")
    response = response.replace("```", "")
    response = response.strip()

    try:
        return json.loads(response)

    except Exception:

        return {
            "overall_score": 0,
            "communication": 0,
            "technical": 0,
            "confidence": 0,
            "strengths": [],
            "weaknesses": [],
            "suggestions": [],
        }