from app.utils.ats.score_weights import SECTION_WEIGHTS


# ----------------------------------------
# Contact
# ----------------------------------------

def score_contact(parsed_resume):

    score = 0

    if parsed_resume.get("name"):
        score += 2

    if parsed_resume.get("email"):
        score += 2

    if parsed_resume.get("phone"):
        score += 2

    if parsed_resume.get("github"):
        score += 2

    if parsed_resume.get("linkedin"):
        score += 2

    return min(score, SECTION_WEIGHTS["contact"])


# ----------------------------------------
# Education
# ----------------------------------------

def score_education(parsed_resume):

    education = parsed_resume.get(
        "education", []
    )

    if not education:
        return 0

    score = 0

    for edu in education:

        if edu.get("institution"):
            score += 5

        if edu.get("degree"):
            score += 4

        if edu.get("cgpa") or edu.get("percentage"):
            score += 3

        if edu.get("duration"):
            score += 3

    return min(
        score,
        SECTION_WEIGHTS["education"],
    )


# ----------------------------------------
# Experience
# ----------------------------------------

def score_experience(parsed_resume):

    experience = parsed_resume.get(
        "experience",
        [],
    )

    if not experience:
        return 0

    score = 0

    for exp in experience:

        if exp.get("role"):
            score += 5

        if exp.get("company"):
            score += 5

        if exp.get("duration"):
            score += 5

        if exp.get("description"):
            score += 5

    return min(
        score,
        SECTION_WEIGHTS["experience"],
    )


# ----------------------------------------
# Projects
# ----------------------------------------

def score_projects(parsed_resume):

    projects = parsed_resume.get(
        "projects",
        [],
    )

    if not projects:
        return 0

    score = 0

    for project in projects:

        if project.get("title"):
            score += 5

        if project.get("description"):
            score += 5

        if project.get("technologies"):
            score += 5

        if (
            project.get("github")
            or project.get("demo")
        ):
            score += 5

    return min(
        score,
        SECTION_WEIGHTS["projects"],
    )


# ----------------------------------------
# Skills
# ----------------------------------------

def score_skills(parsed_resume):

    skills = parsed_resume.get(
        "skills",
        {},
    )

    if not skills:
        return 0

    total = sum(
        len(values)
        for values in skills.values()
    )

    if total >= 25:
        return 20

    if total >= 20:
        return 18

    if total >= 15:
        return 15

    if total >= 10:
        return 12

    if total >= 5:
        return 8

    return 5


# ----------------------------------------
# Certifications
# ----------------------------------------

def score_certifications(parsed_resume):

    certifications = parsed_resume.get(
        "certifications",
        [],
    )

    if len(certifications) >= 3:
        return 5

    if len(certifications) == 2:
        return 4

    if len(certifications) == 1:
        return 2

    return 0


# ----------------------------------------
# Achievements
# ----------------------------------------

def score_achievements(parsed_resume):

    achievements = parsed_resume.get(
        "achievements",
        [],
    )

    if len(achievements) >= 3:
        return 5

    if len(achievements) == 2:
        return 4

    if len(achievements) == 1:
        return 2

    return 0


# ----------------------------------------
# Positions
# ----------------------------------------

def score_positions(parsed_resume):

    positions = parsed_resume.get(
        "positions",
        [],
    )

    if len(positions) >= 3:
        return 5

    if len(positions) == 2:
        return 4

    if len(positions) == 1:
        return 2

    return 0