from app.utils.skills.skill_engine import parse_skills


def parse_job_description(job_description: str):
    """
    Extract skills from a Job Description.
    """

    skills = parse_skills(
        [],
        job_description,
    )

    return {

        "skills": skills,

        "text": job_description,

    }