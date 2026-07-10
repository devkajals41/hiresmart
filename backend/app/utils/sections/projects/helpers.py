from .patterns import (
    GITHUB_PATTERN,
    LIVE_DEMO_PATTERN,
    DATE_PATTERN,
)

from app.utils.skills.skill_engine import parse_skills


def parse_title(lines: list[str]) -> str:
    """
    First meaningful line is considered the project title.
    """

    if not lines:
        return ""

    return lines[0]


def parse_description(lines: list[str]) -> str:
    """
    Collect bullet points as description.
    """

    description = []

    for line in lines[1:]:

        if line.startswith("•") or line.startswith("-") or line.startswith("–"):
            description.append(line)

    return "\n".join(description)


def parse_github(lines: list[str]) -> str:

    text = "\n".join(lines)

    match = GITHUB_PATTERN.search(text)

    return match.group() if match else ""


def parse_live_demo(lines: list[str]) -> str:

    text = "\n".join(lines)

    match = LIVE_DEMO_PATTERN.search(text)

    if match:

        url = match.group()

        if "github" not in url.lower():

            return url

    return ""


def parse_duration(lines: list[str]) -> str:

    text = "\n".join(lines)

    match = DATE_PATTERN.search(text)

    return match.group() if match else ""


def parse_technologies(lines: list[str]) -> dict:

    return parse_skills(
        "",
        "\n".join(lines),
    )


def parse_achievements(lines: list[str]) -> list:

    achievements = []

    for line in lines:

        if line.startswith("•") or line.startswith("-") or line.startswith("–"):

            achievements.append(line)

    return achievements