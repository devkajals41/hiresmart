from app.utils.text_cleaner import clean_text

from app.utils.entities.name_parser import parse_name
from app.utils.entities.contact_parser import parse_contact
from app.utils.entities.social_parser import parse_social


def parse_resume(resume_text: str) -> dict:
    """
    Main Resume Intelligence Engine.

    This function coordinates all parsers and returns
    structured resume information.
    """

    cleaned_text = clean_text(resume_text)

    contact = parse_contact(cleaned_text)

    social = parse_social(cleaned_text)

    parsed_resume = {
        "name": parse_name(cleaned_text),
        "email": contact["email"],
        "phone": contact["phone"],
        "github": social["github"],
        "linkedin": social["linkedin"],
    }

    return parsed_resume
