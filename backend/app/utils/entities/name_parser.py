def parse_name(text: str) -> str:
    """
    Extract candidate name.
    Assumes the first non-empty line is the name.
    """

    lines = [line.strip() for line in text.split("\n") if line.strip()]

    if lines:
        return lines[0]

    return ""
