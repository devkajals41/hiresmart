from app.utils.text_cleaner import clean_text
from app.utils.resume_document import ResumeDocument

# ----------------------------
# Entity Parsers
# ----------------------------

from app.utils.entities.name_parser import parse_name
from app.utils.entities.contact_parser import parse_contact
from app.utils.entities.social_parser import parse_social

# ----------------------------
# Section Parsers
# ----------------------------

from app.utils.sections.education.education_parser import (
    parse_education,
)

from app.utils.sections.experience.experience_parser import (
    parse_experience,
)

from app.utils.sections.projects.project_parser import (
    parse_projects,
)

from app.utils.sections.certifications.certification_parser import (
    parse_certifications,
)

# ----------------------------
# Skill Engine
# ----------------------------

from app.utils.skills.skill_matcher import parse_skills


def parse_resume(resume_text: str) -> dict:
    """
    Main Resume Intelligence Engine.

    Pipeline:
    PDF
        ↓
    Clean Text
        ↓
    Detect Sections
        ↓
    Parse Entities
        ↓
    Parse Resume Sections
        ↓
    Return Structured Resume
    """

    # ----------------------------
    # Clean Resume Text
    # ----------------------------

    cleaned_text = clean_text(resume_text)

    # ----------------------------
    # Build Resume Document
    # ----------------------------

    document = ResumeDocument(cleaned_text)

    # ----------------------------
    # Personal Information
    # ----------------------------

    name = parse_name(cleaned_text)

    contact = parse_contact(cleaned_text)

    social = parse_social(cleaned_text)

    # ----------------------------
    # Resume Sections
    # ----------------------------

    education = parse_education(
        document.education
    )

    experience = parse_experience(
        document.experience
    )

    projects = parse_projects(
        document.projects
    )

    certifications = parse_certifications(
        document.certifications
    )

    skills = parse_skills(
        document.skills,
        cleaned_text,
    )

    # ----------------------------
    # Final Structured Resume
    # ----------------------------

    parsed_resume = {

        # Personal Information

        "name": name,

        "email": contact["email"],

        "emails": contact["emails"],

        "phone": contact["phone"],

        "phones": contact["phones"],

        "github": social["github"],

        "linkedin": social["linkedin"],

        "portfolio": social["portfolio"],

        "leetcode": social["leetcode"],

        "hackerrank": social["hackerrank"],

        "codeforces": social["codeforces"],

        "codechef": social["codechef"],

        "geeksforgeeks": social["geeksforgeeks"],

        # Resume Sections

        "education": education,

        "experience": experience,

        "projects": projects,

        "skills": skills,

        "certifications": certifications,

    }

    return parsed_resume