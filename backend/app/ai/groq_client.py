"""Groq client used by the application's LLM-powered features."""

import logging
from groq import Groq
from app.config.config import settings

logger = logging.getLogger(__name__)

client = None

if hasattr(settings, "GROQ_API_KEY") and settings.GROQ_API_KEY:
    client = Groq(api_key=settings.GROQ_API_KEY)

# Priority list of models to try. If one fails (e.g. decommissioned or 404), fallback to the next.
DEFAULT_MODELS = [
    "qwen/qwen3.8-27b",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "mixtral-8x7b-32768",
]


def generate_response(
    prompt: str,
    temperature: float = 0.7,
):
    """
    Generate a response using Groq LLMs with automatic fallback if a model is decommissioned or unavailable.
    """

    if client is None:
        raise RuntimeError("GROQ_API_KEY is not configured.")

    last_exception = None

    for model in DEFAULT_MODELS:
        try:
            response = client.chat.completions.create(
                model=model,
                temperature=temperature,
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.warning(f"Groq API call with model '{model}' failed: {e}. Trying fallback model...")
            last_exception = e

    logger.error(f"All Groq models failed. Last error: {last_exception}")
    raise last_exception
