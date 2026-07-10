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

    Returns:
        {
            "education": [...],
            "projects": [...],
            ...
        }
    """

    sections = {
        key: []
        for key in SECTION_HEADERS
    }

    current_section = "personal_information"

    for raw_line in text.splitlines():

        line = raw_line.strip()

        if not line:
            continue

        normalized = normalize_heading(line)

        matched_section = None

        for section_name, headings in SECTION_HEADERS.items():

            if normalized in headings:

                matched_section = section_name
                break

        if matched_section:

            current_section = matched_section
            continue

        sections[current_section].append(line)

    return sections