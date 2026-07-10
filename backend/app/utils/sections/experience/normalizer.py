ROLE_MAPPING = {
    "software engineer": "Software Engineer",
    "software developer": "Software Developer",
    "frontend developer": "Frontend Developer",
    "backend developer": "Backend Developer",
    "full stack developer": "Full Stack Developer",
    "intern": "Intern",
    "research intern": "Research Intern",
    "machine learning engineer": "Machine Learning Engineer",
    "ai engineer": "AI Engineer",
    "data analyst": "Data Analyst",
    "data scientist": "Data Scientist",
}


def normalize_role(role: str) -> str:
    """
    Normalize role names.
    """

    if not role:
        return ""

    role_lower = role.lower()

    for key, value in ROLE_MAPPING.items():

        if key in role_lower:
            return value

    return role