import re

from app.utils.skills.skill_database import SKILL_DATABASE

# --------------------------------------------
# Split Pattern
# --------------------------------------------

SKILL_SPLIT_PATTERN = re.compile(
    r"[\n,;|•:/()]+"
)

# --------------------------------------------
# Word Pattern
# --------------------------------------------

WORD_PATTERN = re.compile(
    r"[A-Za-z0-9.+#-]+"
)

# --------------------------------------------
# Auto Multi-word Skills
# --------------------------------------------

MULTI_WORD_SKILLS = sorted(

    [

        skill

        for category in SKILL_DATABASE.values()

        for skill in category

        if " " in skill

    ],

    key=len,

    reverse=True,

)