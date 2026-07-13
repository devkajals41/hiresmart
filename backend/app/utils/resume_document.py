from app.utils.sections.section_detector import detect_sections


class ResumeDocument:

    def __init__(self, text: str):

        self.sections = detect_sections(text)

    def get(self, section: str):

        return self.sections.get(section, [])

    @property
    def personal_information(self):
        return self.get("personal_information")

    @property
    def education(self):
        return self.get("education")

    @property
    def experience(self):
        return self.get("experience")

    @property
    def projects(self):
        return self.get("projects")

    @property
    def skills(self):
        return self.get("skills")

    @property
    def certifications(self):
        return self.get("certifications")

    @property
    def achievements(self):
        return self.get("achievements")

    @property
    def positions(self):
        return self.get("positions")

    @property
    def languages(self):
        return self.get("languages")

    @property
    def interests(self):
        return self.get("interests")
