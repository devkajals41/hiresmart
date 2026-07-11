from app.utils.ats.keyword_matcher import (
    flatten_skills,
)


def find_missing_skills(
    resume_skills,
    jd_skills,
):

    resume = flatten_skills(
        resume_skills
    )

    jd = flatten_skills(
        jd_skills
    )

    return sorted(

        list(

            jd - resume

        )

    )