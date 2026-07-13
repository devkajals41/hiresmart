from app.utils.common.text_utils import remove_empty

IGNORE_LINES = {
    "certification",
    "certificate",
    "certificates",
}


def is_metadata(line: str) -> bool:
    """
    Lines that belong to the current certification.
    """

    lower = line.lower()

    if lower in IGNORE_LINES:
        return True

    if "instructor" in lower:
        return True

    if "total hours" in lower:
        return True

    if "credential" in lower:
        return True

    if "issued" in lower:
        return True

    if "completed" in lower:
        return True

    if "http" in lower:
        return True

    return False


def is_title(line: str) -> bool:
    """
    Decide whether this looks like a certification title.
    """

    if is_metadata(line):
        return False

    # Very short lines are usually not titles
    if len(line.strip()) < 8:
        return False

    return True


def split_certification_blocks(lines: list[str]) -> list[list[str]]:
    """
    Split certification section into logical certification blocks.
    """

    lines = remove_empty(lines)

    blocks = []

    current = []

    for line in lines:

        if is_title(line):

            # Start a new block if one already exists
            if current:

                blocks.append(current)

            current = [line]

        else:

            if current:

                current.append(line)

    if current:

        blocks.append(current)

    return blocks
