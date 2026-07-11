from pydantic import BaseModel


class InterviewGenerateRequest(BaseModel):
    """Request body for generating interview questions.
    user_id is NOT accepted here — it's extracted securely from the JWT token.
    """
    role: str = "Software Engineer"
    difficulty: str = "Intermediate"
    question_count: int = 10
    topic: str = "General"  # topic selected by the user on the frontend


class InterviewSubmitRequest(BaseModel):
    """Request body for evaluating submitted interview answers.
    user_id is NOT accepted here — it's extracted securely from the JWT token.
    """
    questions: list
    answers: list[str]
    topic: str = "General"
    role: str = "Software Engineer"