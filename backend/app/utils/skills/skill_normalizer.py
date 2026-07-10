import re

from app.utils.skills.skill_database import SKILL_DATABASE

# ---------------------------------------------------
# Manual aliases
# ---------------------------------------------------

MANUAL_ALIASES = {

    "reactjs": "React",
    "react.js": "React",

    "nodejs": "Node.js",
    "node js": "Node.js",
    "node": "Node.js",

    "express": "Express.js",
    "expressjs": "Express.js",

    "js": "JavaScript",

    "ts": "TypeScript",

    "tailwind": "Tailwind CSS",

    "mui": "Material UI",

    "gcp": "Google Cloud Platform",

    "aws": "Amazon Web Services",

    "ml": "Machine Learning",

    "dl": "Deep Learning",

    "nlp": "Natural Language Processing",

    "cv": "Computer Vision",

    "rag": "Retrieval Augmented Generation",

    "llm": "Large Language Models",

    "oop": "Object Oriented Programming",

    "dbms": "Database Management System",

    "os": "Operating Systems",

    "cn": "Computer Networks",

}


# ---------------------------------------------------
# Auto-generated aliases
# ---------------------------------------------------

AUTO_ALIASES = {}

for category in SKILL_DATABASE.values():

    for skill in category:

        lower = skill.lower()

        AUTO_ALIASES[lower] = skill

        AUTO_ALIASES[lower.replace(".", "")] = skill

        AUTO_ALIASES[lower.replace("-", " ")] = skill

        AUTO_ALIASES[lower.replace("/", " ")] = skill

        AUTO_ALIASES[re.sub(r"\s+", " ", lower)] = skill


ALIASES = {

    **AUTO_ALIASES,

    **MANUAL_ALIASES,

}


def normalize_skill(skill: str) -> str:
    """
    Normalize a skill to its canonical form.
    """

    skill = skill.strip().lower()

    return ALIASES.get(skill, skill.title())