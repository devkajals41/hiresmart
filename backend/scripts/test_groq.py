import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from app.ai.groq_client import generate_response

response = generate_response("Say hello in one sentence.")
print(response)
