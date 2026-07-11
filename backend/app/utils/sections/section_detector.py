import re

SECTION_HEADERS = {
    "personal_information": [
        "personal information",
        "contact",
        "contact information",
        "profile",
        "about me",
    ],
    "education": [
        "education",
        "academic background",
        "academic qualifications",
        "qualifications",
    ],
    "experience": [
        "experience",
        "work experience",
        "professional experience",
        "employment",
        "employment history",
        "internship",
        "internships",
    ],
    "projects": [
        "projects",
        "project",
        "academic projects",
        "personal projects",
        "major projects",
        "selected projects",
        "key projects",
    ],
    "skills": [
        "skills",
        "technical skills",
        "technical skills and interests",
        "technical expertise",
        "core competencies",
        "technology stack",
        "technologies",
    ],
    "certifications": [
        "certifications",
        "certificates",
        "licenses",
        "professional certifications",
    ],
    "achievements": [
        "achievements",
        "awards",
        "honors",
    ],
    "positions": [
        "positions of responsibility",
        "leadership",
        "leadership experience",
        "responsibility",
    ],
    "languages": [
        "languages",
        "language proficiency",
    ],
    "interests": [
        "interests",
        "areas of interest",
        "hobbies",
    ],
}


def normalize_heading(text: str) -> str:
    """
    Normalize section headings for comparison.
    """

    text = text.lower().strip()

    text = re.sub(r"[:\-|]", "", text)

    text = re.sub(r"\s+", " ", text)

    return text


def detect_sections(text: str) -> dict:
    """
    Detect and split a resume into logical sections.
    Supports combined headings such as:
    - Achievements & Certifications
    - Skills and Technologies
    - Education / Experience
    """

    sections = {
        key: []
        for key in SECTION_HEADERS
    }

    current_sections = ["personal_information"]

    for raw_line in text.splitlines():

        line = raw_line.strip()

        if not line:
            continue

        normalized = normalize_heading(line)

        found_sections = []

        # ----------------------------
        # Exact Heading Match
        # ----------------------------

        for section, headings in SECTION_HEADERS.items():

            if normalized in headings:

                found_sections = [section]
                break

        # ----------------------------
        # Combined Heading Match
        # ----------------------------

        if not found_sections:

            for section, headings in SECTION_HEADERS.items():

                for heading in headings:

                    if heading in normalized:

                        found_sections.append(section)
                        break

        # ----------------------------
        # Heading Found
        # ----------------------------

        if found_sections:

            current_sections = found_sections
            continue

        # ----------------------------
        # Add line to current section(s)
        # ----------------------------

        for section in current_sections:

            sections[section].append(line)

    return sections