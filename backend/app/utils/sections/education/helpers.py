from .constants import (
    DEGREE_KEYWORDS,
    BOARD_KEYWORDS,
    INSTITUTION_KEYWORDS,
)

from .patterns import (
    CGPA_PATTERN,
    PERCENTAGE_PATTERN,
    YEAR_PATTERN,
)


def parse_institution(lines: list[str]) -> str:
    """
    Extract institution name.
    """

    for line in lines:

        lower = line.lower()

        if any(keyword in lower for keyword in INSTITUTION_KEYWORDS):
            return line

    return ""


def parse_degree(lines: list[str]) -> str:
    """
    Extract degree.
    """

    for line in lines:

        lower = line.lower()

        if any(keyword in lower for keyword in DEGREE_KEYWORDS):
            return line

    return ""


def parse_board(lines: list[str]) -> str:
    """
    Extract board.
    """

    for line in lines:

        lower = line.lower()

        for board in BOARD_KEYWORDS:

            if board in lower:
                return board.upper()

    return ""


def parse_cgpa(lines: list[str]) -> str:
    """
    Extract CGPA.
    """

    for line in lines:

        match = CGPA_PATTERN.search(line)

        if match:
            return match.group(1)

    return ""


def parse_percentage(lines: list[str]) -> str:
    """
    Extract Percentage.
    """

    for line in lines:

        match = PERCENTAGE_PATTERN.search(line)

        if match:
            return match.group(1)

    return ""


def parse_duration(lines: list[str]) -> str:
    """
    Extract duration.
    """

    for line in lines:

        match = YEAR_PATTERN.search(line)

        if match:
            return match.group()

    return ""
