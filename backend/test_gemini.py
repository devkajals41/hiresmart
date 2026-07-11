from app.ai.gemini_client import generate_response

response = generate_response(
    "Say hello in one sentence."
)

print(response)