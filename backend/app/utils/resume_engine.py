from app.utils.text_cleaner import clean_text
from app.utils.resume_document import ResumeDocument
from app.utils.entities.name_parser import parse_name
from app.utils.entities.contact_parser import parse_contact
from app.utils.entities.social_parser import parse_social
from app.utils.sections.certification_parser import (
    parse_certifications,
)
from app.utils.sections.education_parser import parse_education
from app.utils.sections.project_parser import parse_projects
from app.utils.sections.experience_parser import parse_experience

from app.utils.skills.skill_matcher import parse_skills



def parse_resume(resume_text: str) -> dict:
    """
    Main Resume Intelligence Engine.
    """
    
    cleaned_text = clean_text(resume_text)
    
    print("\n========== CLEANED TEXT ==========\n")
    print(cleaned_text)
    print("\n==================================\n")

    document = ResumeDocument(
    cleaned_text
)
    print("\n========== DETECTED SECTIONS ==========\n")

    for section, lines in document.sections.items():
      print(f"\n[{section.upper()}]")
    print("-" * 40)

    for line in lines:
        print(line)
   
    contact = parse_contact(cleaned_text)

    social = parse_social(cleaned_text)

    education = parse_education(
       document.education
    )
    experience = parse_experience(
    document.experience
    )
    certifications = parse_certifications(
    document.certifications
    )
    projects = parse_projects(
    document.projects
    )
    skills = parse_skills(
    document.skills,
    cleaned_text,
    )

   

    parsed_resume = {

        "name": parse_name(cleaned_text),

        "email": contact["email"],

        "phone": contact["phone"],

        "github": social["github"],

        "linkedin": social["linkedin"],

        "education": education,
        
        "projects": projects,
        
        "experience": experience,
        
        "certifications": certifications,

        "skills": skills,

    }

    return parsed_resume