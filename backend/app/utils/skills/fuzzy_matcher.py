from rapidfuzz import process, fuzz

from app.utils.skills.skill_database import SKILL_DATABASE

# ---------------------------------------------
# Flatten all skills into one list
# ---------------------------------------------

ALL_SKILLS = []

for category in SKILL_DATABASE.values():
    ALL_SKILLS.extend(category)


def fuzzy_match(candidate: str, threshold: int = 90):
    """
    Return the closest matching skill using RapidFuzz.
    """

    candidate = candidate.strip()

    if not candidate:
        return None

    result = process.extractOne(
        candidate,
        ALL_SKILLS,
        scorer=fuzz.token_sort_ratio,
    )

    if result is None:
        return None

    matched_skill, score, _ = result

    if score >= threshold:
        return matched_skill

    return None