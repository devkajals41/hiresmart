from app.utils.nlp.nlp_engine import create_doc


def remove_stopwords(text: str) -> list[str]:
    """
    Remove stopwords from text.
    """

    doc = create_doc(text)

    words = []

    for token in doc:

        if token.is_stop:
            continue

        if token.is_punct:
            continue

        if token.is_space:
            continue

        words.append(token.text)

    return words