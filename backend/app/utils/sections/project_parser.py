import re

from app.utils.skills.skill_matcher import parse_skills


PROJECT_HEADINGS = [
    "projects",
    "academic projects",
    "personal projects",
    "major projects",
    "key projects",
]


def is_project_title(line: str) -> bool:
    """
    Heuristically determine whether a line is
    likely to be a project title.
    """

    line = line.strip()

    if not line:
        return False

    lower = line.lower()

    if lower in PROJECT_HEADINGS:
        return False

    # Bullet points are descriptions
    if line.startswith(("•", "-", "*")):
        return False

    # Long sentences are usually descriptions
    if len(line.split()) > 8:
        return False

    return True


def parse_projects(lines: list[str]) -> list:
    """
    Parse project information.

    Returns:

    [
        {
            "title": "...",
            "description": "...",
            "technologies": {}
        }
    ]
    """

    if not lines:
        return []

    projects = []

    current_project = None

    for line in lines:

        line = line.strip()

        if not line:
            continue

        if is_project_title(line):

            if current_project:

                current_project["description"] = current_project[
                    "description"
                ].strip()

                current_project["technologies"] = parse_skills(
                    [],
                    current_project["description"],
                )

                projects.append(current_project)

            current_project = {
                "title": line,
                "description": "",
                "technologies": {},
            }

        else:

            if current_project:

                current_project["description"] += line + " "

    if current_project:

        current_project["description"] = current_project[
            "description"
        ].strip()

        current_project["technologies"] = parse_skills(
            [],
            current_project["description"],
        )

        projects.append(current_project)

    return projects