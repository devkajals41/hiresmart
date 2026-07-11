def flatten_skills(skill_dict):

    skills = []

    for category in skill_dict.values():

        skills.extend(category)

    return set(skills)