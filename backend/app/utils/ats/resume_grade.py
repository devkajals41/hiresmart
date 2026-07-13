def get_resume_grade(score: int):
    """
    Convert ATS score into grade, level and color.
    """

    if score >= 90:
        return {
            "grade": "A+",
            "level": "Excellent",
            "color": "#22c55e",
        }

    if score >= 80:
        return {
            "grade": "A",
            "level": "Very Good",
            "color": "#4ade80",
        }

    if score >= 70:
        return {
            "grade": "B",
            "level": "Good",
            "color": "#84cc16",
        }

    if score >= 60:
        return {
            "grade": "C",
            "level": "Average",
            "color": "#eab308",
        }

    if score >= 50:
        return {
            "grade": "D",
            "level": "Needs Improvement",
            "color": "#f97316",
        }

    return {
        "grade": "F",
        "level": "Poor",
        "color": "#ef4444",
    }
