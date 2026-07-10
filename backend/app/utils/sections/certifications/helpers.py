from .constants import ISSUER_KEYWORDS
from .patterns import YEAR_PATTERN, URL_PATTERN


def parse_name(lines: list[str]) -> str:
    """
    Extract certification name.
    """

    if not lines:
        return ""

    line = lines[0].lstrip("•- ").strip()

    if "–" in line:
        return line.split("–")[0].strip()

    if "-" in line:
        return line.split("-")[0].strip()

    return line


def parse_issuer(lines: list[str]) -> str:
    """
    Extract certification issuer.
    """

    text = " ".join(lines).lower()

    for issuer in ISSUER_KEYWORDS:

        if issuer in text:
            return issuer.title()

    return ""


def parse_year(lines: list[str]) -> str:
    """
    Extract certification year.
    """

    text = " ".join(lines)

    match = YEAR_PATTERN.search(text)

    return match.group() if match else ""


def parse_credential_url(lines: list[str]) -> str:
    """
    Extract credential URL.
    """

    text = " ".join(lines)

    match = URL_PATTERN.search(text)

    return match.group() if match else ""