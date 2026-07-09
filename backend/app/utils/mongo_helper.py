from bson import ObjectId


def serialize_mongo_document(document: dict):
    """
    Convert MongoDB ObjectId into string.
    """

    if document is None:
        return None

    document = document.copy()

    if "_id" in document and isinstance(document["_id"], ObjectId):
        document["_id"] = str(document["_id"])

    return document
