import json
from app.ai.groq_client import generate_response

PARSE_RESUME_PROMPT = """
You are a highly accurate Resume Parser. Extract all relevant details from the following resume text and format it into a single valid JSON object.

Resume Text:
{resume_text}

Output JSON Format:
{{
    "name": "Candidate Full Name",
    "email": "primary_email@address.com",
    "emails": ["list", "of", "all", "found", "emails"],
    "phone": "primary_phone",
    "phones": ["list", "of", "all", "found", "phones"],
    "github": "github_profile_url",
    "linkedin": "linkedin_profile_url",
    "portfolio": "portfolio_url",
    "leetcode": "leetcode_profile_url",
    "hackerrank": "hackerrank_profile_url",
    "codeforces": "codeforces_profile_url",
    "codechef": "codechef_profile_url",
    "geeksforgeeks": "geeksforgeeks_profile_url",
    "education": [
        {{
            "institution": "University/College Name",
            "degree": "Degree (e.g. B.Tech in CSE)",
            "board": "Board Name if applicable or null",
            "cgpa": "CGPA if applicable or null",
            "percentage": "Percentage if applicable or null",
            "duration": "Duration (e.g., 2018 - 2022)"
        }}
    ],
    "experience": [
        {{
            "company": "Company Name",
            "role": "Role (e.g., Software Engineer)",
            "duration": "Duration (e.g., June 2022 - Present)",
            "description": "Short summary of work done"
        }}
    ],
    "projects": [
        {{
            "title": "Project Title",
            "description": "Short project details",
            "technologies": ["list", "of", "tech", "used"],
            "github": "project_github_url_if_any",
            "live_demo": "live_demo_url_if_any",
            "duration": "Duration",
            "achievements": "Key project metric/achievement if any"
        }}
    ],
    "skills": {{
        "Languages": ["Python", "JavaScript"],
        "Frameworks": ["React", "Express"],
        "Databases": ["MongoDB"],
        "Tools": ["Git", "Docker"]
    }},
    "certifications": [
        {{
            "name": "Certification Title",
            "issuer": "Issuing Authority",
            "year": "Year of completion",
            "credential_url": "Credential URL if any"
        }}
    ],
    "achievements": [
        {{
            "title": "Achievement Title",
            "description": "Detail of achievement",
            "year": "Year",
            "score": "Score or ranking if any"
        }}
    ],
    "positions": [
        {{
            "role": "Leadership/Volunteering Role",
            "organization": "Organization Name",
            "duration": "Duration"
        }}
    ]
}}

Rules:
- Return ONLY valid JSON. No markdown formatting, no code fences.
- Extract as much information as possible from the text.
- If a field is not found in the text, return empty string for strings, empty array [] for lists, and empty object {{}} for dicts.
"""


def parse_resume(resume_text: str) -> dict:
    """
    Main Resume Intelligence Engine powered by LLM.
    """
    try:
        prompt = PARSE_RESUME_PROMPT.format(resume_text=resume_text)
        response = generate_response(prompt, temperature=0.1)
        response = response.replace("```json", "").replace("```", "").strip()
        return json.loads(response)
    except Exception:
        # Fallback to empty structured resume
        return {
            "name": "",
            "email": "",
            "emails": [],
            "phone": "",
            "phones": [],
            "github": "",
            "linkedin": "",
            "portfolio": "",
            "leetcode": "",
            "hackerrank": "",
            "codeforces": "",
            "codechef": "",
            "geeksforgeeks": "",
            "education": [],
            "experience": [],
            "projects": [],
            "skills": {},
            "certifications": [],
            "achievements": [],
            "positions": [],
        }
