def generate_suggestions(parsed_resume: dict):

    suggestions = []

    if not parsed_resume.get("github"):
        suggestions.append("Add your GitHub profile.")

    if not parsed_resume.get("linkedin"):
        suggestions.append("Add your LinkedIn profile.")

    if len(parsed_resume.get("projects", [])) < 3:
        suggestions.append("Include at least three strong technical projects.")

    if len(parsed_resume.get("certifications", [])) < 2:
        suggestions.append("Add industry-recognized certifications.")

    if len(parsed_resume.get("experience", [])) == 0:
        suggestions.append("Gain internship or freelance experience.")

    total_skills = sum(
        len(v)
        for v in parsed_resume.get(
            "skills",
            {},
        ).values()
    )

    if total_skills < 15:
        suggestions.append("Expand your technical skillset.")

    return suggestions
