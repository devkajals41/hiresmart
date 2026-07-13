def get_missing_sections(parsed_resume: dict):

    missing = []

    if not parsed_resume.get("education"):
        missing.append("Education")

    if not parsed_resume.get("experience"):
        missing.append("Experience")

    if not parsed_resume.get("projects"):
        missing.append("Projects")

    if not parsed_resume.get("skills"):
        missing.append("Skills")

    if not parsed_resume.get("certifications"):
        missing.append("Certifications")

    if not parsed_resume.get("achievements"):
        missing.append("Achievements")

    if not parsed_resume.get("positions"):
        missing.append("Positions of Responsibility")

    return missing
