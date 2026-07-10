import re

CGPA_PATTERN = re.compile(
    r"cgpa[: ]*(\d+\.\d+)",
    re.IGNORECASE,
)

PERCENTAGE_PATTERN = re.compile(
    r"percentage[: ]*(\d+(?:\.\d+)?)",
    re.IGNORECASE,
)

YEAR_PATTERN = re.compile(
    r"\d{4}\s*[–-]\s*\d{4}"
)