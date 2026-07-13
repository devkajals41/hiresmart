from app.utils.skills.skill_database import SKILL_DATABASE


def classify_skills(skills: list[str]) -> dict:
    """
    Group extracted skills by category.
    """

    categorized = {}

    for category in SKILL_DATABASE:

        categorized[category] = []

    for skill in skills:

        for category, db_skills in SKILL_DATABASE.items():

            if skill in db_skills:

                categorized[category].append(skill)

                break

    return {
        category: sorted(set(values))
        for category, values in categorized.items()
        if values
    }
