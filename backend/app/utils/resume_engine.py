from app.utils.text_cleaner import clean_text
from app.utils.sections.section_detector import detect_sections
from app.utils.entities.name_parser import parse_name
from app.utils.entities.contact_parser import parse_contact
from app.utils.sections.education_parser import parse_education
from app.utils.entities.social_parser import parse_social
from app.utils.skills.skill_matcher import parse_skills


def parse_resume(resume_text: str) -> dict:
    """
    Main Resume Intelligence Engine.

    This function coordinates all parsers and returns
    structured resume information.
    """

    cleaned_text = clean_text(resume_text)
    
    sections = detect_sections(cleaned_text)
    
    
    skills = parse_skills(
    sections["skills"]
    )
    education = parse_education(
    sections["education"]
    )

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
