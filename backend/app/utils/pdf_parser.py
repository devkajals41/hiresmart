import fitz


def extract_text_from_pdf(filepath: str) -> str:
    """
    Extract all text from a PDF file.

    Args:
        filepath: Absolute or relative path to the PDF.

    Returns:
        A single string containing all text from the PDF.
    """

    document = fitz.open(filepath)

    extracted_text = ""

    for page in document:
        extracted_text += page.get_text()

    document.close()

    return extracted_text.strip()
