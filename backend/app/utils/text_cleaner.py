import re


def clean_text(text: str) -> str:
    """
    Clean raw text extracted from a resume.
    """

    # Normalize line endings
    text = text.replace("\r", "\n")

    # Remove extra blank lines
    text = re.sub(r"\n{2,}", "\n", text)

    # Remove multiple spaces/tabs
    text = re.sub(r"[ \t]+", " ", text)

    # Trim whitespace
    return text.strip()
