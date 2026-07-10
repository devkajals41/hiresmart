from .helpers import (
    parse_name,
    parse_issuer,
    parse_year,
    parse_credential_url,
)


def split_certification_blocks(lines: list[str]) -> list[list[str]]:
    """
    Split certifications into separate entries.
    """

    blocks = []

    for line in lines:

        line = line.strip()

        if not line:
            continue

        blocks.append([line])

    return blocks


def parse_certifications(lines: list[str]) -> list:
    """
    Parse Certifications section.
    """

    certifications = []

    blocks = split_certification_blocks(lines)

    for block in blocks:

        certifications.append(
            {
                "name": parse_name(block),
                "issuer": parse_issuer(block),
                "year": parse_year(block),
                "credential_url": parse_credential_url(block),
            }
        )

    return certifications