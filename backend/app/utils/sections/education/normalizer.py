DEGREE_MAPPING = {
    "b.tech": "Bachelor of Technology",
    "btech": "Bachelor of Technology",
    "bachelor of technology": "Bachelor of Technology",

    "b.e": "Bachelor of Engineering",
    "be": "Bachelor of Engineering",
    "bachelor of engineering": "Bachelor of Engineering",

    "m.tech": "Master of Technology",
    "mtech": "Master of Technology",

    "mba": "Master of Business Administration",

    "b.sc": "Bachelor of Science",
    "bsc": "Bachelor of Science",

    "m.sc": "Master of Science",
    "msc": "Master of Science",

    "bca": "Bachelor of Computer Applications",
    "mca": "Master of Computer Applications",

    "phd": "Doctor of Philosophy",
}


BRANCH_MAPPING = {
    "cse": "Computer Science and Engineering",
    "computer science": "Computer Science and Engineering",

    "ece": "Electronics and Communication Engineering",
    "electronics & communication": "Electronics and Communication Engineering",
    "electronics and communication": "Electronics and Communication Engineering",

    "electrical": "Electrical Engineering",

    "mechanical": "Mechanical Engineering",

    "civil": "Civil Engineering",

    "information technology": "Information Technology",
    "it": "Information Technology",
}


def normalize_degree(degree: str) -> str:
    """
    Normalize degree names.
    """

    if not degree:
        return ""

    degree_lower = degree.lower()

    for key, value in DEGREE_MAPPING.items():

        if key in degree_lower:
            return value

    return degree


def normalize_branch(branch: str) -> str:
    """
    Normalize branch names.
    """

    if not branch:
        return ""

    branch_lower = branch.lower()

    for key, value in BRANCH_MAPPING.items():

        if key in branch_lower:
            return value

    return branch