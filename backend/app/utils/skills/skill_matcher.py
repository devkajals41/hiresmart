from app.utils.skills.skill_database import SKILL_DATABASE
from app.utils.skills.skill_normalizer import normalize_skill


def parse_skills(skill_text: str) -> dict:
    """
    Parse and normalize skills from the Skills section.
    """

    extracted = {}

    words = skill_text.replace(",", "\n").split("\n")

    candidates = [
        normalize_skill(word.strip())
        for word in words
        if word.strip()
    ]

    for category, skills in SKILL_DATABASE.items():

        matched = []

        for candidate in candidates:

            for db_skill in skills:

                if candidate.lower() == db_skill.lower():

                    matched.append(db_skill)

        if matched:

            extracted[category] = sorted(set(matched))

    return extracted