from app.utils.jwt_handler import (
    create_access_token,
    verify_access_token,
)

payload = {
    "sub": "kajal@gmail.com",
    "user_id": "123456789",
}

token = create_access_token(payload)

print("JWT Token:\n")
print(token)

print("\nDecoded Payload:\n")
print(verify_access_token(token))