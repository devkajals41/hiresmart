import spacy

# Load the NLP model once
nlp = spacy.load("en_core_web_sm")


def process_text(text: str):
    """
    Process resume text using spaCy.
    Returns a spaCy Doc object.
    """

    return nlp(text)