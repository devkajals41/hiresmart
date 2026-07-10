import spacy

# Load spaCy model only once
nlp = spacy.load("en_core_web_sm")


def create_doc(text: str):
    """
    Convert raw text into a spaCy Doc object.
    """

    return nlp(text)