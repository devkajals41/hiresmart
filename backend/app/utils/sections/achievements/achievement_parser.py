from .helpers import (
    parse_title,
    parse_description,
    parse_year,
    parse_score,
)


def parse_achievements(lines: list[str]) -> list:

    achievements = []

    for line in lines:

        line = line.strip()

        if not line:
            continue

        block = [line]

        achievements.append(
            {
                "title": parse_title(block),
                "description": parse_description(block),
                "year": parse_year(block),
                "score": parse_score(block),
            }
        )

    return achievements
