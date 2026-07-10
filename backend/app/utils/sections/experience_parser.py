import re

EXPERIENCE_KEYWORDS = [
    "Experience",
    "Work Experience",
    "Professional Experience",
    "Employment",
    "Internship",
    "Internships",
]

def parse_experience(lines: list[str]) -> list:
    """
    Parse the Experience section.

    Returns:
    [
        {
            "company": "...",
            "role": "...",
            "duration": "...",
            "description": "..."
        }
    ]
    """

    if not lines:
        return []

    experiences = []

    current = None

    date_pattern = re.compile(
        r"(Present|Current|\d{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)",
        re.IGNORECASE,
    )

    for line in lines:

        line = line.strip()

        if not line:
            continue

        if current is None:

            current = {
                "company": "",
                "role": line,
                "duration": "",
                "description": "",
            }

            continue

        if date_pattern.search(line):

            current["duration"] = line

            continue

        if current["company"] == "":

            current["company"] = line

            continue

        current["description"] += line + " "

    if current:

        current["description"] = current["description"].strip()

        experiences.append(current)

    return experiences