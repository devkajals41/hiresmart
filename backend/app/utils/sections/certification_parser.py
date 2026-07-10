import re


def parse_certifications(lines: list[str]) -> list:
    """
    Parse the Certifications section.

    Returns:
    [
        {
            "title": "...",
            "issuer": "..."
        }
    ]
    """

    if not lines:
        return []

    certifications = []

    current = None

    for line in lines:

        line = line.strip()

        if not line:
            continue

        # New certification
        if current is None:

            current = {
                "title": line,
                "issuer": "",
            }

            continue

        # Issuer
        if current["issuer"] == "":

            current["issuer"] = line

            certifications.append(current)

            current = None

    return certifications