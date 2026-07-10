SECTION_HEADERS = {
    "education": [
        "education",
        "academic background",
        "qualification",
        "qualifications",
    ],
    "experience": [
        "experience",
        "work experience",
        "professional experience",
        "employment",
        "internships",
    ],
    "projects": [
        "projects",
        "project",
        "academic projects",
        "personal projects",
    ],
    "skills": [
        "skills",
        "technical skills",
        "technical expertise",
        "core skills",
    ],
    "certifications": [
        "certifications",
        "certificates",
        "licenses",
    ],
}

def detect_sections(text: str) -> dict:
    """
    Split resume into logical sections.

    Returns:
        {
            "education": "...",
            "experience": "...",
            ...
        }
    """

    sections = {
        "education": "",
        "experience": "",
        "projects": "",
        "skills": "",
        "certifications": "",
    }

    lines = [
        line.strip()
        for line in text.split("\n")
        if line.strip()
    ]

    current_section = None

    for line in lines:

        lower = line.lower()

        found = False

        for section_name, keywords in SECTION_HEADERS.items():

            if lower in keywords:

                current_section = section_name

                found = True

                break

        if found:
            continue

        if current_section:

            sections[current_section] += line + "\n"

    return sections