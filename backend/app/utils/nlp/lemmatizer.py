from app.utils.nlp.nlp_engine import create_doc


def lemmatize(text: str) -> list[str]:
    """
    Convert words to their base forms.
    """

    doc = create_doc(text)

    lemmas = []

    for token in doc:

        if token.is_stop:
            continue

        if token.is_space:
            continue

        if token.is_punct:
            continue

        lemmas.append(token.lemma_)

    return lemmas
