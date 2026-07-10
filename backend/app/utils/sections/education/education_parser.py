from .helpers import (
    parse_board,
    parse_cgpa,
    parse_degree,
    parse_duration,
    parse_institution,
    parse_percentage,
)


def split_education_blocks(lines: list[str]) -> list[list[str]]:
    """
    Split the education section into separate education entries.

    A new block starts whenever an institution is encountered.
    """

    if not lines:
        return []

    blocks = []

    current_block = []

    institution_keywords = [
        "college",
        "university",
        "institute",
        "school",
        "academy",
        "iit",
        "nit",
        "iiit",
    ]

    for line in lines:

        lower = line.lower()

        if any(keyword in lower for keyword in institution_keywords):

            if current_block:
                blocks.append(current_block)

            current_block = [line]

        else:
            current_block.append(line)

    if current_block:
        blocks.append(current_block)

    return blocks


def parse_education(lines: list[str]) -> list:
    """
    Parse the Education section.
    """

    education = []

    blocks = split_education_blocks(lines)

    for block in blocks:

        education.append(
            {
                "institution": parse_institution(block),
                "degree": parse_degree(block),
                "board": parse_board(block),
                "cgpa": parse_cgpa(block),
                "percentage": parse_percentage(block),
                "duration": parse_duration(block),
            }
        )

    return education