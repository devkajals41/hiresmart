import re

EDUCATION_KEYWORDS = [
    "b.tech",
    "btech",
    "bachelor",
    "m.tech",
    "mtech",
    "master",
    "phd",
    "diploma",
    "higher secondary",
    "secondary",
    "12th",
    "10th",
    "ssc",
    "hsc",
    "college",
    "university",
    "institute",
]


def parse_education(education_text: str) -> list:
    """
    Extract education entries from the Education section.
    """

    education = []

    if not education_text:
        return education

    lines = [
        line.strip()
        for line in education_text.split("\n")
        if line.strip()
    ]

    for line in lines:

        lower = line.lower()

        if any(keyword in lower for keyword in EDUCATION_KEYWORDS):

            entry = {
                "degree": line,
                "year": "",
                "cgpa": "",
            }

            year = re.search(r"(19|20)\d{2}", line)

            if year:
                entry["year"] = year.group()

            cgpa = re.search(r"\d+\.\d+", line)

            if cgpa:
                entry["cgpa"] = cgpa.group()

            education.append(entry)

    return education