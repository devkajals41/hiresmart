INTERVIEW_PROMPT = """
You are an experienced Software Engineering interviewer.

Generate a mock interview based on the candidate's resume.

Resume:

{resume}

Target Role:
{role}

Difficulty:
{difficulty}

Generate exactly {count} interview questions.

Question Distribution:

- 2 HR
- 2 Resume
- 2 Project
- 2 Technical
- 2 DSA

Return ONLY valid JSON.

Output Format:

{{
    "questions": [
        {{
            "type": "HR",
            "question": "Tell me about yourself."
        }},
        {{
            "type": "Technical",
            "question": "Explain JWT authentication."
        }}
    ]
}}

Do not return markdown.
Do not use ```json.
Return only JSON.
"""


FEEDBACK_PROMPT = """
You are an experienced software engineering interviewer.

Candidate Resume:

{resume}

Interview Questions:

{questions}

Candidate Answers:

{answers}

Evaluate the candidate.

Return ONLY valid JSON.

Output Format:

{{
    "overall_score": 90,
    "communication": 88,
    "technical": 91,
    "confidence": 80,
    "strengths": [
        "Strong DSA knowledge"
    ],
    "weaknesses": [
        "Needs better communication"
    ],
    "suggestions": [
        "Practice explaining projects in more detail"
    ]
}}

Do not return markdown.
Do not use ```json.
Return only JSON.
"""