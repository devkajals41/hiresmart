from .patterns import YEAR_PATTERN, NUMBER_PATTERN


def parse_title(lines: list[str]) -> str:

    if not lines:
        return ""

    line = lines[0].lstrip("•- ").strip()

    if ":" in line:
        return line.split(":")[0].strip()

    return line


def parse_description(lines: list[str]) -> str:

    return " ".join(lines)


def parse_year(lines: list[str]) -> str:

    text = " ".join(lines)

    match = YEAR_PATTERN.search(text)

    return match.group() if match else ""


def parse_score(lines: list[str]) -> str:

    text = " ".join(lines)

    match = NUMBER_PATTERN.search(text)

    return match.group() if match else ""
