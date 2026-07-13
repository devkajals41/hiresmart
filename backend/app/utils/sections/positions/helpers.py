from .constants import POSITION_KEYWORDS
from .patterns import YEAR_PATTERN


def parse_role(lines):

    for line in lines:

        lower = line.lower()

        for role in POSITION_KEYWORDS:

            if role in lower:
                return line

    return ""


def parse_organization(lines):

    if len(lines) > 1:
        return lines[-1]

    return ""


def parse_duration(lines):

    text = " ".join(lines)

    match = YEAR_PATTERN.search(text)

    return match.group() if match else ""
