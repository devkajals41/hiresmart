import re


NAME_LABELS = [
    "name",
    "candidate name",
    "full name",
]


def parse_name(text: str) -> str:
    """
    Extract candidate name.

    Strategy:
    1. Look for labels (Name:, Candidate Name:)
    2. Otherwise use first valid line.
    """

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    # -------------------------
    # Strategy 1
    # -------------------------

    for line in lines:

        lower = line.lower()

        for label in NAME_LABELS:

            if lower.startswith(label):

                parts = line.split(":", 1)

                if len(parts) == 2:
                    return parts[1].strip()

    # -------------------------
    # Strategy 2
    # -------------------------

    for line in lines[:10]:

        if "@" in line:
            continue

        if re.search(r"\d{5,}", line):
            continue

        if len(line.split()) > 5:
            continue

        if line.isupper():
            return line.title()

        return line

    return ""