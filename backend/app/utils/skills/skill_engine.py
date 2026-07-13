from app.utils.skills.exact_matcher import exact_match
from app.utils.skills.fuzzy_matcher import fuzzy_match
from app.utils.skills.skill_normalizer import normalize_skill
from app.utils.skills.skill_classifier import classify_skills

from app.utils.skills.skill_patterns import (
    SKILL_SPLIT_PATTERN,
    MULTI_WORD_SKILLS,
)

from app.utils.skills.skill_tokenizer import tokenize


def extract_candidates(text: str):
    """
    Extract both multi-word and single-word skill candidates.
    """

    candidates = []

    lower_text = text.lower()

    # Multi-word Skills
    for skill in MULTI_WORD_SKILLS:
        if skill.lower() in lower_text:
            candidates.append(skill)

    # Regex Candidates
    regex_candidates = [
        word.strip() for word in SKILL_SPLIT_PATTERN.split(text) if word.strip()
    ]

    candidates.extend(regex_candidates)

    # NLP Candidates
    candidates.extend(tokenize(text))

    return list(set(candidates))


def parse_skills(
    skills_section,
    resume_text,
):
    """
    Main Skill Intelligence Engine.
    """

    text = "\n".join(skills_section)

    if not text.strip():
        text = resume_text

    candidates = extract_candidates(text)

    matched_skills = []

    for candidate in candidates:

        candidate = normalize_skill(candidate)

        # Exact Match
        skill = exact_match(candidate)

        # Fuzzy Match
        if skill is None:
            skill = fuzzy_match(candidate)

        if skill:
            matched_skills.append(skill)

    return classify_skills(matched_skills)
