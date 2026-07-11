from .constants import ISSUER_KEYWORDS
from .patterns import YEAR_PATTERN, URL_PATTERN


IGNORE_LINES = {

    "certification",

    "certificate",

    "certificates",

}


def parse_name(lines: list[str]) -> str:
    """
    First meaningful line is the certification title.
    """

    for line in lines:

        line = line.strip()

        if not line:
            continue

        lower = line.lower()

        if lower in IGNORE_LINES:
            continue

        if "instructor" in lower:
            continue

        if "total hours" in lower:
            continue

        if URL_PATTERN.search(line):
            continue

        return line

    return ""


def parse_issuer(lines: list[str]) -> str:
    """
    Extract certification issuer.
    """

    for line in lines:

        lower = line.lower()

        if "udemy" in lower:
            return "Udemy"

        if "coursera" in lower:
            return "Coursera"

        if "nptel" in lower:
            return "NPTEL"

        if "google" in lower:
            return "Google"

        if "microsoft" in lower:
            return "Microsoft"

        if "aws" in lower:
            return "AWS"

        if "oracle" in lower:
            return "Oracle"

        if "ibm" in lower:
            return "IBM"

    return ""


def parse_year(lines: list[str]) -> str:

    text = " ".join(lines)

    match = YEAR_PATTERN.search(text)

    return match.group() if match else ""


def parse_credential_url(lines: list[str]) -> str:

    text = " ".join(lines)

    match = URL_PATTERN.search(text)

    return match.group() if match else ""