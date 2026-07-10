from .constants import (
    ROLE_KEYWORDS,
    COMPANY_KEYWORDS,
)

from .patterns import DATE_PATTERN


def parse_role(lines: list[str]) -> str:
    """
    Extract job role.
    """

    for line in lines:

        lower = line.lower()

        if any(
            role in lower
            for role in ROLE_KEYWORDS
        ):
            return line

    return ""


def parse_company(lines: list[str]) -> str:
    """
    Extract company name.
    """

    for line in lines:

        lower = line.lower()

        if any(
            keyword in lower
            for keyword in COMPANY_KEYWORDS
        ):
            return line

    return ""


def parse_duration(lines: list[str]) -> str:
    """
    Extract employment duration.
    """

    for line in lines:

        match = DATE_PATTERN.search(line)

        if match:
            return match.group()

    return ""


def parse_description(lines: list[str]) -> str:
    """
    Extract work description.
    """

    description = []

    for line in lines:

        if line.startswith("•") or line.startswith("-"):

            description.append(line)

    return "\n".join(description)