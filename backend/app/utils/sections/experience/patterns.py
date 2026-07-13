import re

DATE_PATTERN = re.compile(
    r"((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?\.?\s?\d{4})\s*[-–]\s*(Present|Current|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?\.?\s?\d{4})",
    re.IGNORECASE,
)

YEAR_PATTERN = re.compile(r"\d{4}")
