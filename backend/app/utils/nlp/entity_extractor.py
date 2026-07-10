from app.utils.nlp.nlp_engine import create_doc


def extract_entities(text: str) -> dict:
    """
    Extract named entities from resume text.
    """

    doc = create_doc(text)

    entities = {}

    for entity in doc.ents:

        label = entity.label_

        entities.setdefault(label, [])

        if entity.text not in entities[label]:

            entities[label].append(entity.text)

    return entities