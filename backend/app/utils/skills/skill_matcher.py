from app.utils.skills.skill_database import SKILL_DATABASE
from app.utils.skills.skill_normalizer import normalize_skill


def parse_skills(skill_text: str) -> dict:
    """
    Extract categorized skills from the Skills section.
    """

    extracted = {}

    lower_text = skill_text.lower()

    for category, skills in SKILL_DATABASE.items():

        found = []

        for skill in skills:

            if skill.lower() in lower_text:

                found.append(
                    normalize_skill(skill)
                )

        if found:

            extracted[category] = sorted(set(found))

    return extracted