from app.utils.ats.keyword_matcher import (
    flatten_skills,
)

from app.utils.ats.missing_skills import (
    find_missing_skills,
)


def calculate_job_match(
    parsed_resume,
    parsed_jd,
):

    resume_skills = flatten_skills(

        parsed_resume["skills"]

    )

    jd_skills = flatten_skills(

        parsed_jd["skills"]

    )

    if len(jd_skills) == 0:

        score = 0

    else:

        matched = len(

            resume_skills.intersection(
                jd_skills
            )

        )

        score = round(

            matched
            /
            len(jd_skills)

            * 100

        )

    return {

        "job_match_score": score,

        "missing_skills":

        find_missing_skills(

            parsed_resume["skills"],

            parsed_jd["skills"],

        ),

    }