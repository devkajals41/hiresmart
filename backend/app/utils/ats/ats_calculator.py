from app.utils.ats.section_scores import (
    score_contact,
    score_education,
    score_experience,
    score_projects,
    score_skills,
    score_certifications,
    score_achievements,
    score_positions,
)


def calculate_ats_score(parsed_resume: dict) -> dict:
    """
    Calculate section-wise ATS scores and overall ATS score.
    """

    section_scores = {
        "contact": score_contact(parsed_resume),
        "education": score_education(parsed_resume),
        "experience": score_experience(parsed_resume),
        "projects": score_projects(parsed_resume),
        "skills": score_skills(parsed_resume),
        "certifications": score_certifications(parsed_resume),
        "achievements": score_achievements(parsed_resume),
        "positions": score_positions(parsed_resume),
    }

    overall_score = sum(section_scores.values())

    return {
        "overall_score": overall_score,
        "section_scores": section_scores,
    }
