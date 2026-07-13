from app.utils.skills.skill_database import SKILL_DATABASE


def exact_match(candidate: str):
    """
    Return exact skill match if found.
    """

    candidate = candidate.strip().lower()

    for skills in SKILL_DATABASE.values():

        for skill in skills:

            if candidate == skill.lower():

                return skill

    return None
