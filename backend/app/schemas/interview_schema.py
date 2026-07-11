from pydantic import BaseModel


class InterviewGenerateRequest(BaseModel):

    user_id: str

    role: str = "Software Engineer"

    difficulty: str = "Intermediate"

    question_count: int = 10


class InterviewSubmitRequest(BaseModel):

    user_id: str

    questions: list

    answers: list[str]