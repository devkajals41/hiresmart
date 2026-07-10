import re


def parse_contact(text: str) -> dict:
    """
    Extract email and phone number.
    """

    contact = {
        "email": "",
        "phone": "",
    }

    email = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text,
    )

    if email:
        contact["email"] = email.group()

    phone = re.search(
        r"(\+91[- ]?)?[6-9]\d{9}",
        text,
    )

    if phone:
        contact["phone"] = phone.group()

    return contact
