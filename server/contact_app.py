"""
Contact form API, Python standard library only (nothing to pip install).

Checks the reCAPTCHA v2 checkbox with Google, limits submissions per IP, then emails
the inquiry over SMTP. Settings come from .env (see .env.example).

- Local:    started automatically by `npm run dev` (or run `python server/contact_app.py`).
- Bluehost: runs as a Python app through passenger_wsgi.py (see README).
"""

import hashlib
import json
import os
import re
import smtplib
import ssl
import time
import urllib.parse
import urllib.request
from email.message import EmailMessage
from email.utils import formataddr
from pathlib import Path

from email_template import build_html

HERE = Path(__file__).resolve().parent
MAX_BODY = 20_000
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def load_env() -> dict:
    """Read KEY=value lines from .env: the project root's when run locally, else the one beside this file (Bluehost)."""
    path = Path(os.environ.get("CONTACT_ENV_FILE") or HERE / ".env")
    if not path.is_file():
        return {}
    env = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        env[key.strip()] = value.strip().strip("\"'")
    return env


def rate_limited(ip: str, limit: int) -> bool:
    """True if this IP already sent `limit` submissions in the last hour; otherwise records this one."""
    folder = HERE / "ratelimit"
    folder.mkdir(exist_ok=True)
    file = folder / (hashlib.sha256(ip.encode()).hexdigest() + ".json")
    now = time.time()
    try:
        hits = [t for t in json.loads(file.read_text()) if t > now - 3600]
    except (OSError, ValueError):
        hits = []
    if len(hits) >= limit:
        return True
    file.write_text(json.dumps(hits + [now]))
    return False


def captcha_ok(secret: str, token: str, ip: str) -> bool:
    data = urllib.parse.urlencode({"secret": secret, "response": token, "remoteip": ip}).encode()
    try:
        with urllib.request.urlopen("https://www.google.com/recaptcha/api/siteverify", data, timeout=10) as res:
            return bool(json.load(res).get("success"))
    except Exception:
        return False


def send_email(env: dict, fields: dict) -> None:
    msg = EmailMessage()
    msg["From"] = env["SMTP_USER"]
    msg["To"] = env["MAIL_TO"]
    msg["Reply-To"] = formataddr((fields["Name"], fields["Email"]))
    msg["Subject"] = f"Service inquiry: {fields['Service'] or 'Not sure yet'}"
    # Plain text first as the fallback, then the designed HTML version most email apps will show
    details = "\n".join(f"{k}: {fields[k] or '-'}" for k in ("Name", "Email", "Phone", "Company", "Service"))
    msg.set_content(f"{details}\n\n{fields['Message']}")
    logo = HERE / "email-logo.jpg"
    site_name = env.get("SITE_NAME") or "AZN Accounting LLC"
    msg.add_alternative(build_html(fields, site_name, "cid:logo" if logo.is_file() else None), subtype="html")
    if logo.is_file():
        # Attached inside the email, so it shows without the site being live and isn't blocked as a remote image
        msg.get_payload()[1].add_related(logo.read_bytes(), "image", "jpeg", cid="<logo>", filename="logo.jpg")

    port = int(env.get("SMTP_PORT") or 465)
    context = ssl.create_default_context()
    if port == 465:
        smtp = smtplib.SMTP_SSL(env["SMTP_HOST"], port, context=context, timeout=20)
    else:
        smtp = smtplib.SMTP(env["SMTP_HOST"], port, timeout=20)
        smtp.starttls(context=context)
    with smtp:
        smtp.login(env["SMTP_USER"], env["SMTP_PASS"])
        smtp.send_message(msg)


def application(environ, start_response):
    """WSGI entry point (Passenger on Bluehost, wsgiref locally)."""
    env = load_env()  # read per request, so .env edits apply without a restart
    headers = [("Content-Type", "application/json"), ("X-Content-Type-Options", "nosniff"), ("Vary", "Origin")]

    def respond(status: str, body: dict):
        start_response(status, headers)
        return [json.dumps(body).encode()]

    # CORS: the site itself is always allowed; other sites only if listed in ALLOWED_ORIGINS
    origin = environ.get("HTTP_ORIGIN", "")
    if origin:
        allowed = [o.strip() for o in env.get("ALLOWED_ORIGINS", "").split(",") if o.strip()]
        same_site = urllib.parse.urlsplit(origin).netloc == environ.get("HTTP_HOST")
        if not same_site and origin not in allowed:
            return respond("403 Forbidden", {"ok": False, "error": "origin_not_allowed"})
        headers += [
            ("Access-Control-Allow-Origin", origin),
            ("Access-Control-Allow-Methods", "POST, OPTIONS"),
            ("Access-Control-Allow-Headers", "Content-Type, Accept"),
            ("Access-Control-Max-Age", "86400"),
        ]

    method = environ.get("REQUEST_METHOD")
    if method == "OPTIONS":  # browser preflight
        start_response("204 No Content", headers)
        return [b""]
    if method != "POST":
        return respond("405 Method Not Allowed", {"ok": False, "error": "method_not_allowed"})

    missing = [k for k in ("RECAPTCHA_SECRET", "SMTP_HOST", "SMTP_USER", "SMTP_PASS", "MAIL_TO") if not env.get(k)]
    if missing:
        print(f"[contact] .env is missing: {', '.join(missing)}", flush=True)
        return respond("500 Internal Server Error", {"ok": False, "error": "not_configured"})

    try:
        length = min(int(environ.get("CONTENT_LENGTH") or 0), MAX_BODY)
        data = json.loads(environ["wsgi.input"].read(length) or b"{}")
        if not isinstance(data, dict):
            raise ValueError
    except (ValueError, TypeError):
        return respond("400 Bad Request", {"ok": False, "error": "bad_request"})

    ip = environ.get("REMOTE_ADDR", "unknown")
    if rate_limited(ip, int(env.get("MAX_PER_HOUR") or 5)):
        headers.append(("Retry-After", "3600"))
        return respond("429 Too Many Requests", {"ok": False, "error": "rate_limited"})

    if not captcha_ok(env["RECAPTCHA_SECRET"], str(data.get("captcha") or ""), ip):
        return respond("400 Bad Request", {"ok": False, "error": "captcha_failed"})

    def clean(key: str, max_len: int, one_line: bool = True) -> str:
        value = str(data.get(key) or "")[:max_len].strip()
        # Single-line values only, so nothing can be smuggled into the email headers
        return re.sub(r"[\r\n]+", " ", value) if one_line else value

    fields = {
        "Name": clean("Name", 100),
        "Email": clean("Email", 254),
        "Phone": clean("Phone", 40),
        "Company": clean("Company", 120),
        "Service": clean("Service", 120),
        "Message": clean("Message", 5000, one_line=False),
    }
    if not fields["Name"] or not fields["Message"] or not EMAIL_RE.match(fields["Email"]):
        return respond("422 Unprocessable Entity", {"ok": False, "error": "invalid_fields"})

    try:
        send_email(env, fields)
    except Exception as err:
        print(f"[contact] SMTP send failed: {err!r}", flush=True)
        return respond("500 Internal Server Error", {"ok": False, "error": "send_failed"})

    print(f"[contact] inquiry from {fields['Email']} sent to {env['MAIL_TO']}", flush=True)
    return respond("200 OK", {"ok": True})


if __name__ == "__main__":
    from wsgiref.simple_server import WSGIRequestHandler, make_server

    # Running locally: use the project's .env, one folder up
    os.environ.setdefault("CONTACT_ENV_FILE", str(HERE.parent / ".env"))
    port = int(os.environ.get("DEV_API_PORT") or load_env().get("DEV_API_PORT") or 5001)

    class QuietHandler(WSGIRequestHandler):
        def log_message(self, *args):  # keep the dev terminal readable
            pass

    print(f"[contact] API listening on http://127.0.0.1:{port}", flush=True)
    make_server("127.0.0.1", port, application, handler_class=QuietHandler).serve_forever()
