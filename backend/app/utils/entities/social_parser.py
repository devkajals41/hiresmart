import re


SOCIAL_PATTERNS = {
    "github": re.compile(
        r"(?:https?://)?(?:www\.)?github\.com/[A-Za-z0-9_.-]+",
        re.IGNORECASE,
    ),
    "linkedin": re.compile(
        r"(?:https?://)?(?:www\.)?linkedin\.com/in/[A-Za-z0-9_.-]+",
        re.IGNORECASE,
    ),
    "portfolio": re.compile(
        r"(?:https?://)?(?:www\.)?(?!github|linkedin|leetcode|hackerrank|codeforces|codechef|geeksforgeeks)[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:/[^\s]*)?",
        re.IGNORECASE,
    ),
    "leetcode": re.compile(
        r"(?:https?://)?(?:www\.)?leetcode\.com/u?/([A-Za-z0-9_-]+)",
        re.IGNORECASE,
    ),
    "hackerrank": re.compile(
        r"(?:https?://)?(?:www\.)?hackerrank\.com/([A-Za-z0-9_-]+)",
        re.IGNORECASE,
    ),
    "codeforces": re.compile(
        r"(?:https?://)?(?:www\.)?codeforces\.com/profile/([A-Za-z0-9_-]+)",
        re.IGNORECASE,
    ),
    "codechef": re.compile(
        r"(?:https?://)?(?:www\.)?codechef\.com/users/([A-Za-z0-9_-]+)",
        re.IGNORECASE,
    ),
    "geeksforgeeks": re.compile(
        r"(?:https?://)?(?:www\.)?geeksforgeeks\.org/user/([A-Za-z0-9_-]+)",
        re.IGNORECASE,
    ),
}


def parse_social(text: str) -> dict:
    """
    Extract developer profile links from a resume.
    """

    social = {
        "github": "",
        "linkedin": "",
        "portfolio": "",
        "leetcode": "",
        "hackerrank": "",
        "codeforces": "",
        "codechef": "",
        "geeksforgeeks": "",
    }

    for platform, pattern in SOCIAL_PATTERNS.items():

        match = pattern.search(text)

        if match:
            social[platform] = match.group()

    return social