from .helpers import (
    parse_name,
    parse_issuer,
    parse_year,
    parse_credential_url,
)

from .splitter import (
    split_certification_blocks,
)


def parse_certifications(lines: list[str]) -> list:
    """
    Parse the Certifications section.
    """

    certifications = []

    blocks = split_certification_blocks(lines)

    for block in blocks:

        certification = {
            "name": parse_name(block),
            "issuer": parse_issuer(block),
            "year": parse_year(block),
            "credential_url": parse_credential_url(block),
        }

        # Skip empty entries
        if certification["name"]:

            certifications.append(certification)

    return certifications
