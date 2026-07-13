from app.utils.nlp.nlp_engine import create_doc


def tokenize(text: str) -> list[str]:
    """
    Tokenize resume text.
    """

    doc = create_doc(text)

    return [token.text for token in doc if not token.is_space]
