def generate_feedback(parsed_resume: dict, scores: dict):
    """
    Generate strengths and weaknesses based on ATS scores.
    """

    strengths = []

    weaknesses = []

    section_scores = scores["section_scores"]

    # Contact
    if section_scores["contact"] == 10:
        strengths.append(
            "Complete contact information."
        )
    else:
        weaknesses.append(
            "Complete your contact details."
        )

    # Education
    if section_scores["education"] >= 12:
        strengths.append(
            "Well-structured education section."
        )
    else:
        weaknesses.append(
            "Improve education details."
        )

    # Experience
    if section_scores["experience"] >= 15:
        strengths.append(
            "Strong experience section."
        )
    else:
        weaknesses.append(
            "Add internships or work experience."
        )

    # Projects
    if section_scores["projects"] >= 15:
        strengths.append(
            "Excellent project portfolio."
        )
    else:
        weaknesses.append(
            "Improve project descriptions."
        )

    # Skills
    if section_scores["skills"] >= 15:
        strengths.append(
            "Good technical skillset."
        )
    else:
        weaknesses.append(
            "Add more relevant technical skills."
        )

    # Certifications
    if section_scores["certifications"] == 0:
        weaknesses.append(
            "Consider adding certifications."
        )

    # Achievements
    if section_scores["achievements"] == 0:
        weaknesses.append(
            "Highlight achievements."
        )

    # Positions
    if section_scores["positions"] == 0:
        weaknesses.append(
            "Include leadership or responsibility roles."
        )

    return {

        "strengths": strengths,

        "weaknesses": weaknesses,

    }