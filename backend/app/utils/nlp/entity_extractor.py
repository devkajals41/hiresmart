from app.utils.nlp.nlp_engine import process_text


def extract_entities(text: str) -> dict:
    """
    Extract named entities using spaCy.
    """

    doc = process_text(text)

    entities = {
        "PERSON": [],
        "ORG": [],
        "DATE": [],
        "GPE": [],
    }

    for entity in doc.ents:

        if entity.label_ in entities:

            entities[entity.label_].append(entity.text)

    return entities