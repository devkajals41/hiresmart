import re

YEAR_PATTERN = re.compile(r"\b(19|20)\d{2}\b")

URL_PATTERN = re.compile(
    r"(https?://[^\s]+)",
    re.IGNORECASE,
)
