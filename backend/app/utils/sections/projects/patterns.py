import re

GITHUB_PATTERN = re.compile(
    r"(https?://)?(www\.)?github\.com/[A-Za-z0-9_.-]+/?[A-Za-z0-9_.-]*",
    re.IGNORECASE,
)

LIVE_DEMO_PATTERN = re.compile(
    r"(https?://)?(www\.)?(?!github|linkedin)[A-Za-z0-9.-]+\.[A-Za-z]{2,}(/[^\s]*)?",
    re.IGNORECASE,
)

DATE_PATTERN = re.compile(
    r"((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?\.?\s?\d{4})\s*[-–]\s*(Present|Current|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?\.?\s?\d{4})",
    re.IGNORECASE,
)
