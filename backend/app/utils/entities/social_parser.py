import re


def parse_social(text: str) -> dict:
    """
    Extract GitHub and LinkedIn URLs.
    """

    social = {
        "github": "",
        "linkedin": "",
    }

    github = re.search(
        r"(https?://)?(www\.)?github\.com/[A-Za-z0-9_.-]+",
        text,
        re.IGNORECASE,
    )

    if github:
        social["github"] = github.group()

    linkedin = re.search(
        r"(https?://)?(www\.)?linkedin\.com/in/[A-Za-z0-9_.-]+",
        text,
        re.IGNORECASE,
    )

    if linkedin:
        social["linkedin"] = linkedin.group()

    return social
