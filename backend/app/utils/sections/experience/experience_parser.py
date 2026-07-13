from .helpers import (
    parse_company,
    parse_description,
    parse_duration,
    parse_role,
)

from .normalizer import normalize_role


def split_experience_blocks(lines: list[str]) -> list[list[str]]:
    """
    Split experience into individual entries.
    """

    if not lines:
        return []

    blocks = []

    current = []

    for line in lines:

        if line.strip() == "":

            if current:
                blocks.append(current)
                current = []

            continue

        current.append(line)

    if current:
        blocks.append(current)

    return blocks


def parse_experience(lines: list[str]) -> list:
    """
    Parse Experience section.
    """

    experiences = []

    blocks = split_experience_blocks(lines)

    for block in blocks:

        experiences.append(
            {
                "company": parse_company(block),
                "role": normalize_role(parse_role(block)),
                "duration": parse_duration(block),
                "description": parse_description(block),
            }
        )

    return experiences
