from app.utils.nlp.nlp_engine import process_text


def lemmatize_text(text: str) -> list[str]:
    """
    Return lemmatized tokens.
    """

    doc = process_text(text)

    lemmas = []

    for token in doc:

        if token.is_stop:
            continue

        if token.is_punct:
            continue

        lemmas.append(token.lemma_)

    return lemmas