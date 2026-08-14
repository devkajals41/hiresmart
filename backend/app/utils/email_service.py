import json
import urllib.request
import urllib.error

from app.config.config import settings


def is_email_delivery_configured() -> bool:
    return bool(settings.RESEND_API_KEY)


def send_password_reset_email(recipient_email: str, reset_link: str) -> None:
    if not is_email_delivery_configured():
        return

    from_email = settings.RESEND_FROM_EMAIL or "HireSmart <onboarding@resend.dev>"

    payload = json.dumps({
        "from": from_email,
        "to": [recipient_email],
        "subject": "Reset your HireSmart password",
        "text": (
            "We received a request to reset your HireSmart password.\n\n"
            f"Reset your password here: {reset_link}\n\n"
            "This link will expire in 30 minutes.\n\n"
            "If you did not request this, you can ignore this email."
        ),
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={
            "Authorization": f"Bearer {settings.RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            response.read()
    except urllib.error.HTTPError as e:
        try:
            error_body = e.read().decode("utf-8")
            raise Exception(f"{e.code} - {error_body}")
        except Exception:
            raise e