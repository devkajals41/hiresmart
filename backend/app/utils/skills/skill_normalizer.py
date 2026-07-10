from rapidfuzz import fuzz

from app.utils.skills.skill_database import SKILL_DATABASE


SIMILARITY_THRESHOLD = 90


def normalize_skill(skill: str) -> str:
    """
    Normalize a detected skill to the closest skill
    in our database using fuzzy matching.
    """

    skill = skill.strip()

    best_match = skill

    highest_score = 0

    for category in SKILL_DATABASE.values():

        for db_skill in category:

            score = fuzz.ratio(
                skill.lower(),
                db_skill.lower(),
            )

            if score > highest_score:

                highest_score = score

                best_match = db_skill

    if highest_score >= SIMILARITY_THRESHOLD:

        return best_match

    return skill