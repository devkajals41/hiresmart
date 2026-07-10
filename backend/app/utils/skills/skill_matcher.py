from rapidfuzz import fuzz

from app.utils.skills.skill_database import SKILL_DATABASE
from app.utils.skills.skill_normalizer import normalize_skill


def extract_candidate_skills(lines: list[str]) -> list[str]:
    """
    Extract candidate skills from a list of resume lines.
    """

    import re

    candidates = []

    for line in lines:

        words = re.split(r"[\n,|•:/()]+", line)

        for word in words:

            word = word.strip()

            if len(word) < 2:
                continue

            candidates.append(word)

    return candidates


def parse_skills(
    skill_lines: list[str],
    resume_text: str,
) -> dict:
    """
    Hybrid Skill Extraction Engine.

    Sources:
    1. Skills section
    2. Entire resume
    """

    section_candidates = extract_candidate_skills(skill_lines)

    resume_candidates = extract_candidate_skills(
        resume_text.split("\n")
    )

    all_candidates = []

    for skill in section_candidates + resume_candidates:

        normalized = normalize_skill(skill)

        if normalized not in all_candidates:
            all_candidates.append(normalized)

    extracted = {}

    for category, db_skills in SKILL_DATABASE.items():

        matched = []

        for candidate in all_candidates:

            for db_skill in db_skills:

                score = fuzz.ratio(
                    candidate.lower(),
                    db_skill.lower(),
                )

                if score >= 90:

                    matched.append(db_skill)

        if matched:

            extracted[category] = sorted(
                set(matched)
            )

    return extracted