import re


DEGREE_KEYWORDS = [
    "b.tech",
    "btech",
    "b.e",
    "be",
    "bachelor",
    "m.tech",
    "mtech",
    "m.e",
    "me",
    "master",
    "phd",
    "mba",
    "b.sc",
    "bsc",
    "m.sc",
    "msc",
]

COLLEGE_KEYWORDS = [
    "college",
    "university",
    "institute",
    "iit",
    "nit",
    "iiit",
]

BRANCH_KEYWORDS = [
    "computer science",
    "electronics",
    "electrical",
    "communication",
    "information technology",
    "mechanical",
    "civil",
    "ece",
    "cse",
    "it",
]

CGPA_PATTERN = re.compile(
    r"\b(\d\.\d{1,2}|\d{1,2}\.\d{1,2})\b"
)

YEAR_PATTERN = re.compile(
    r"(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}"
)


def parse_education(lines: list[str]) -> list:
    """
    Parse Education section.

    Returns:

    [
        {
            "degree":"",
            "branch":"",
            "college":"",
            "cgpa":"",
            "duration":""
        }
    ]
    """

    if not lines:
        return []

    education = {
        "degree": "",
        "branch": "",
        "college": "",
        "cgpa": "",
        "duration": "",
    }

    for line in lines:

        lower = line.lower()

        # Degree
        if not education["degree"]:

            for degree in DEGREE_KEYWORDS:

                if degree in lower:

                    education["degree"] = line

                    break

        # College
        if not education["college"]:

            for keyword in COLLEGE_KEYWORDS:

                if keyword in lower:

                    education["college"] = line

                    break

        # Branch
        if not education["branch"]:

            for branch in BRANCH_KEYWORDS:

                if branch in lower:

                    education["branch"] = line

                    break

        # CGPA
        if not education["cgpa"]:

            match = CGPA_PATTERN.search(line)

            if match:

                education["cgpa"] = match.group()

        # Duration
        if not education["duration"]:

            match = YEAR_PATTERN.search(line)

            if match:

                education["duration"] = match.group()

    return [education]