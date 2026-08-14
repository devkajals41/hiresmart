from email.mime.text import MIMEText
import smtplib

from app.config.config import settings


def is_email_delivery_configured() -> bool:
    return bool(
        settings.SMTP_HOST
        and settings.SMTP_PORT
        and settings.SMTP_USERNAME
        and settings.SMTP_PASSWORD
        and settings.SMTP_FROM_EMAIL
    )


def send_password_reset_email(recipient_email: str, reset_link: str) -> None:
    if not is_email_delivery_configured():
        return

    subject = "Reset your HireSmart password"
    body = (
        "We received a request to reset your HireSmart password.\n\n"
        f"Reset your password here: {reset_link}\n\n"
        "If you did not request this, you can ignore this email."
    )

    message = MIMEText(body)
    message["Subject"] = subject
    message["From"] = settings.SMTP_FROM_EMAIL
    message["To"] = recipient_email

    if settings.SMTP_USE_TLS:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_FROM_EMAIL, [recipient_email], message.as_string())
        return

    with smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_FROM_EMAIL, [recipient_email], message.as_string())