import re


def clean_line(text: str) -> str:
    """
    Normalize whitespace.
    """

    text = text.strip()

    text = re.sub(
        r"\s+",
        " ",
        text,
    )

    return text


def remove_empty(lines: list[str]) -> list[str]:

    return [clean_line(line) for line in lines if clean_line(line)]
