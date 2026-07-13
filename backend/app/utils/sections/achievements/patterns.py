import re

YEAR_PATTERN = re.compile(r"\b(19|20)\d{2}\b")

NUMBER_PATTERN = re.compile(
    r"\b\d+(?:\+)?(?:st|nd|rd|th|%)?\b",
    re.IGNORECASE,
)
