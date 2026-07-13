import re

URL_PATTERN = re.compile(
    r"https?://\S+",
    re.IGNORECASE,
)


EMAIL_PATTERN = re.compile(
    r"\S+@\S+",
    re.IGNORECASE,
)


DATE_PATTERN = re.compile(
    r"(19|20)\d{2}",
)
