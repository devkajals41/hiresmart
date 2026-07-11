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

def analyze_resume(
    parsed_resume: dict,
    job_description: str = None,
):
    """
    Complete ATS Analysis Engine.
    """

    scores = calculate_ats_score(parsed_resume)

    feedback = generate_feedback(
        parsed_resume,
        scores,
    )

    suggestions = generate_suggestions(
        parsed_resume,
    )

    grade = get_resume_grade(
        scores["overall_score"],
    )

    missing_sections = get_missing_sections(
        parsed_resume,
    )
     
    job_match = None

    if job_description:

     parsed_jd = parse_job_description(
        job_description,
    )

     job_match = calculate_job_match(
        parsed_resume,
        parsed_jd,
    )
    

    return {

        "overall_score": scores["overall_score"],

        "section_scores": scores["section_scores"],

        "grade": grade["grade"],

        "resume_level": grade["level"],

        "score_color": grade["color"],

        "strengths": feedback["strengths"],

        "weaknesses": feedback["weaknesses"],

        "suggestions": suggestions,

        "missing_sections": missing_sections,
        
        "job_match": job_match,

    }