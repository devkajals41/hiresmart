from .helpers import (
    parse_role,
    parse_organization,
    parse_duration,
)


def parse_positions(lines):

    positions = []

    current = []

    for line in lines:

        line = line.strip()

        if not line:
            continue

        if line.startswith("•"):

            if current:
                positions.append(current)

            current = [line]

        else:

            current.append(line)

    if current:
        positions.append(current)

    result = []

    for block in positions:

        result.append(
            {
                "role": parse_role(block),
                "organization": parse_organization(block),
                "duration": parse_duration(block),
            }
        )

    return result