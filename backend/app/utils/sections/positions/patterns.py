import re

YEAR_PATTERN = re.compile(
    r"\d{4}\s*[–-]\s*(?:Present|\d{4})",
    re.IGNORECASE,
)