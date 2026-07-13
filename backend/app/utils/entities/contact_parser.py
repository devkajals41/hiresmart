import re

CONTACT_LABELS = {
    "email": [
        "email",
        "email id",
        "mail",
    ],
    "phone": [
        "phone",
        "mobile",
        "contact",
        "contact number",
    ],
}


EMAIL_PATTERN = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")

PHONE_PATTERN = re.compile(r"(?:\+?\d{1,3}[- ]?)?(?:\(?\d{3,5}\)?[- ]?)?\d{10}")


def parse_contact(text: str) -> dict:
    """
    Extract emails and phone numbers.
    """

    emails = []

    phones = []

    # ------------------------
    # Regex Extraction
    # ------------------------

    for email in EMAIL_PATTERN.findall(text):

        email = email.strip()

        if email not in emails:
            emails.append(email)

    for phone in PHONE_PATTERN.findall(text):

        phone = re.sub(r"\s+", "", phone)

        if phone not in phones:
            phones.append(phone)

    # ------------------------
    # Label Extraction
    # ------------------------

    lines = text.splitlines()

    for line in lines:

        lower = line.lower()

        for keyword in CONTACT_LABELS["email"]:

            if lower.startswith(keyword):

                match = EMAIL_PATTERN.search(line)

                if match:

                    email = match.group()

                    if email not in emails:
                        emails.append(email)

        for keyword in CONTACT_LABELS["phone"]:

            if lower.startswith(keyword):

                match = PHONE_PATTERN.search(line)

                if match:

                    phone = match.group()

                    if phone not in phones:
                        phones.append(phone)

    return {
        "email": emails[0] if emails else "",
        "phone": phones[0] if phones else "",
        "emails": emails,
        "phones": phones,
    }
