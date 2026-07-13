import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from app.utils.jwt_handler import (
    create_access_token,
    verify_access_token,
)

payload = {
    "sub": "user@example.com",
    "user_id": "123456789",
}

token = create_access_token(payload)

print("JWT Token:\n")
print(token)

print("\nDecoded Payload:\n")
print(verify_access_token(token))
