import spacy

nlp = spacy.load("en_core_web_sm")


def tokenize(text: str) -> list[str]:
    """
    Generate normalized candidate tokens.
    """

    doc = nlp(text)

    candidates = []

    for token in doc:

        if token.is_space:
            continue

        if token.is_punct:
            continue

        if token.is_stop:
            continue

        candidates.append(
            token.lemma_.lower()
        )

    return candidates