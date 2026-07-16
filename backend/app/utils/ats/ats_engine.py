import json
from app.ai.groq_client import generate_response

from app.utils.ats.ats_calculator import (
    calculate_ats_score,
)

from app.utils.ats.feedback_generator import (
    generate_feedback,
)

from app.utils.ats.suggestion_engine import (
    generate_suggestions,
)

from app.utils.ats.resume_grade import (
    get_resume_grade,
)

from app.utils.ats.missing_sections import (
    get_missing_sections,
)

from app.utils.ats.jd_parser import (
    parse_job_description,
)

from app.utils.ats.job_matcher import (
    calculate_job_match,
)

ATS_ANALYSIS_PROMPT = """
You are an expert ATS (Applicant Tracking System) grader. Analyze the following parsed resume details and provide detailed, personalized feedback:
1. Strengths: 3 distinct strengths about the candidate's portfolio.
2. Weaknesses: 2-3 specific constructive weaknesses or areas lacking detail.
3. Suggestions: 3 actionable optimization tips to improve the resume match score.

Parsed Resume Details:
{parsed_resume}

Output JSON Format:
{{
    "strengths": [
        "Strong development experience with React and Node.js",
        "Clear quantifiable impacts in past roles",
        "Good portfolio of technical projects"
    ],
    "weaknesses": [
        "Lacks certifications in Cloud (AWS/Azure)",
        "Missing detailed database technology keywords"
    ],
    "suggestions": [
        "Include links to live demos of your projects",
        "Add certifications from AWS or GCP to validate Cloud experience",
        "Incorporate metric-driven statements (e.g. reduced load time by 20%)"
    ]
}}

Rules:
- Return ONLY valid JSON. No markdown formatting, no code fences.
- Provide highly realistic, custom feedback based on the candidate's actual skills, experience, and projects. Don't return generic placeholder suggestions if possible.
"""


def analyze_resume(
    parsed_resume: dict,
    job_description: str = None,
):
    """
    Complete ATS Analysis Engine.
    """

    scores = calculate_ats_score(parsed_resume)

    # Re-calculate overall score dynamically using weighted values
    overall_score = scores["overall_score"]

    # Fallbacks
    strengths = []
    weaknesses = []
    suggestions = []

    try:
        prompt = ATS_ANALYSIS_PROMPT.format(
            parsed_resume=json.dumps(parsed_resume, indent=2)
        )
        response = generate_response(prompt, temperature=0.2)
        response = response.replace("```json", "").replace("```", "").strip()
        data = json.loads(response)

        strengths = data.get("strengths", [])
        weaknesses = data.get("weaknesses", [])
        suggestions = data.get("suggestions", [])
    except Exception:
        # Fallback to local heuristic rules
        feedback = generate_feedback(parsed_resume, scores)
        strengths = feedback["strengths"]
        weaknesses = feedback["weaknesses"]
        suggestions = generate_suggestions(parsed_resume)

    grade = get_resume_grade(overall_score)

    missing_sections = get_missing_sections(parsed_resume)

    job_match = None

    if job_description:
        parsed_jd = parse_job_description(job_description)
        job_match = calculate_job_match(parsed_resume, parsed_jd)

    return {
        "overall_score": overall_score,
        "section_scores": scores["section_scores"],
        "grade": grade["grade"],
        "resume_level": grade["level"],
        "score_color": grade["color"],
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions,
        "missing_sections": missing_sections,
        "job_match": job_match,
    }
