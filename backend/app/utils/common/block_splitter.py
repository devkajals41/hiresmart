from typing import Callable


def split_blocks(
    lines: list[str],
    is_new_block: Callable[[str], bool],
) -> list[list[str]]:
    """
    Generic block splitter.

    Parameters
    ----------
    lines:
        Lines belonging to one resume section.

    is_new_block:
        Function that returns True if a line starts
        a new logical block.

    Returns
    -------
    List of blocks.
    """

    blocks = []

    current = []

    for raw_line in lines:

        line = raw_line.strip()

        if not line:
            continue

        if is_new_block(line):

            if current:

                blocks.append(current)

            current = [line]

        else:

            current.append(line)

    if current:

        blocks.append(current)

    return blocks
