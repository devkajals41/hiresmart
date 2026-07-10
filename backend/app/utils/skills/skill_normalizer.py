NORMALIZATION_MAP = {

    "node js": "Node.js",

    "nodejs": "Node.js",

    "expressjs": "Express",

    "reactjs": "React",

    "mongodb atlas": "MongoDB",

    "js": "JavaScript",

    "ts": "TypeScript",

    "cpp": "C++",

    "py": "Python",
}


def normalize_skill(skill: str) -> str:

    key = skill.lower().strip()

    return NORMALIZATION_MAP.get(
        key,
        skill,
    )