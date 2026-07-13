from groq import Groq

from app.config.config import settings

client = None

if hasattr(settings, "GROQ_API_KEY") and settings.GROQ_API_KEY:
    client = Groq(api_key=settings.GROQ_API_KEY)


def generate_response(
    prompt: str,
    temperature: float = 0.7,
):
    """
    Generate a response using Groq.
    """

    if client is None:
        raise RuntimeError("GROQ_API_KEY is not configured.")

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=temperature,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response.choices[0].message.content
