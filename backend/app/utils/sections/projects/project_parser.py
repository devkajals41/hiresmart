from .helpers import (
    parse_title,
    parse_description,
    parse_github,
    parse_live_demo,
    parse_duration,
    parse_technologies,
    parse_achievements,
)

from .normalizer import normalize_title


def split_project_blocks(lines: list[str]) -> list[list[str]]:
    """
    Split projects into individual blocks.
    A new block starts when a project title line is encountered.
    """

    if not lines:
        return []

    blocks = []
    current = []

    for line in lines:

        line = line.strip()

        if not line:
            continue

        # New project starts at a bullet/title line
        if (
            (line.startswith("•") and "–" in line)
            or (line.startswith("•") and "-" in line)
        ):

            if current:
                blocks.append(current)

            current = [line]

        else:

            current.append(line)

    if current:
        blocks.append(current)

    return blocks


def parse_projects(lines: list[str]) -> list:
    """
    Parse Projects section.
    """

    projects = []

    blocks = split_project_blocks(lines)

    for block in blocks:

        projects.append(
            {
                "title": normalize_title(
                    parse_title(block)
                ),
                "description": parse_description(block),
                "technologies": parse_technologies(block),
                "github": parse_github(block),
                "live_demo": parse_live_demo(block),
                "duration": parse_duration(block),
                "achievements": parse_achievements(block),
            }
        )

    return projects