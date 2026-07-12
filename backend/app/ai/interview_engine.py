import json

from app.ai.gemini_client import generate_response
from app.ai.prompts import INTERVIEW_PROMPT, FEEDBACK_PROMPT


def generate_interview(
    parsed_resume: dict,
    role: str,
    difficulty: str,
    question_count: int,
    topic: str = "General",
    rag_context: str = "",
):
    """
    Build the generation prompt and call the Groq LLM.
    Returns a dict with a 'questions' list — each item has 'type' and 'question'.
    Falls back to an empty list on parse error.
    """
    prompt = INTERVIEW_PROMPT.format(
        rag_context=rag_context,
        role=role,
        topic=topic,
        difficulty=difficulty,
        count=question_count,
    )

    response = generate_response(prompt)

    # Strip any accidental markdown fences from the model output
    response = response.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(response)
    except Exception:
        # Return a safe empty structure so the frontend falls back to demo questions
        return {"questions": []}


def evaluate_interview(
    parsed_resume: dict,
    questions: list,
    answers: list,
    topic: str = "General",
    role: str = "Software Engineer",
):
    """
    Build the evaluation prompt and call the Groq LLM.
    Returns structured feedback matching the shape expected by Feedback.jsx:
      overall_score, general_feedback, technical, communication, confidence,
      strengths, weaknesses, suggestions, breakdown list.
    Falls back to a zeroed-out structure on parse error.
    """
    prompt = FEEDBACK_PROMPT.format(
        resume=json.dumps(parsed_resume, indent=2),
        topic=topic,
        role=role,
        questions=json.dumps(questions, indent=2),
        answers=json.dumps(answers, indent=2),
    )

    response = generate_response(prompt)

    # Strip any accidental markdown fences from the model output
    response = response.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(response)
    except Exception:
        # Return a safe fallback so the frontend can still display something
        return {
            "overall_score": 0,
            "general_feedback": "Could not parse AI feedback. Please try again.",
            "technical": 0,
            "communication": 0,
            "confidence": 0,
            "strengths": [],
            "weaknesses": [],
            "suggestions": [],
            "breakdown": [],
        }