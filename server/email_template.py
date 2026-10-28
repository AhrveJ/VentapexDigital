from __future__ import annotations  # allows `str | None` on Python 3.9 hosts

from html import escape
from urllib.parse import quote

# Site colours (tailwind.config.js)
INK = "#10283A"
INK_SOFT = "#3C5568"
BRASS = "#B7791F"
BRASS_LIGHT = "#F2C14E"
MIST = "#E6EEF2"
PAGE_BG = "#EEF2F5"
FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
SERIF = "Georgia, 'Times New Roman', serif"


def _row(label: str, value_html: str, last: bool = False) -> str:
    border = "" if last else f"border-bottom:1px solid {MIST};"
    return f"""
      <tr>
        <td style="padding:12px 0;{border}width:120px;vertical-align:top;font:600 13px/20px {FONT};color:{INK_SOFT};">{label}</td>
        <td style="padding:12px 0;{border}vertical-align:top;font:15px/20px {FONT};color:{INK};">{value_html}</td>
      </tr>"""


def build_html(fields: dict, site_name: str, logo_src: str | None = None) -> str:
    """`logo_src` is usually "cid:logo" (the image attached to the email); None leaves the logo out."""
    name = escape(fields["Name"])
    email = escape(fields["Email"])
    service = escape(fields["Service"] or "Not sure yet")
    phone = fields["Phone"]
    company = escape(fields["Company"]) if fields["Company"] else '<span style="color:#9AA9B5;">Not provided</span>'
    message = escape(fields["Message"]).replace("\n", "<br>")
    site = escape(site_name)
    # The logo's navy background matches the header, so it blends in without a frame
    logo_cell = (
        f"""
                  <td style="vertical-align:middle;padding-right:18px;">
                    <img src="{escape(logo_src, quote=True)}" width="80" height="80" alt="{site}" style="display:block;border:0;border-radius:10px;">
                  </td>"""
        if logo_src
        else ""
    )

    phone_html = (
        f'<a href="tel:{escape(phone, quote=True)}" style="color:{INK};text-decoration:none;">{escape(phone)}</a>'
        if phone
        else '<span style="color:#9AA9B5;">Not provided</span>'
    )
    reply_href = escape(
        f"mailto:{fields['Email']}?subject={quote('Re: Your inquiry about ' + (fields['Service'] or 'our services'))}",
        quote=True,
    )
    first_name = escape(fields["Name"].split()[0]) if fields["Name"].split() else name

    rows = "".join(
        [
            _row("Name", name),
            _row("Email", f'<a href="mailto:{escape(fields["Email"], quote=True)}" style="color:{BRASS};text-decoration:none;">{email}</a>'),
            _row("Phone", phone_html),
            _row("Company", company),
            _row("Service", f'<span style="display:inline-block;padding:3px 10px;border-radius:999px;background:{MIST};font:600 13px/20px {FONT};color:{INK};">{service}</span>', last=True),
        ]
    )

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>New inquiry: {service}</title>
</head>
<body style="margin:0;padding:0;background:{PAGE_BG};">
  <!-- Preview text shown next to the subject in the inbox -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">{name} asked about {service}.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:{PAGE_BG};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:{INK};padding:24px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>{logo_cell}
                  <td style="vertical-align:middle;">
                    <p style="margin:0 0 6px;font:600 12px/16px {FONT};letter-spacing:2px;text-transform:uppercase;color:{BRASS_LIGHT};">New inquiry</p>
                    <h1 style="margin:0;font:600 26px/32px {SERIF};color:#ffffff;">{service}</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">{rows}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:16px 32px 8px;">
              <p style="margin:0 0 10px;font:600 13px/20px {FONT};color:{INK_SOFT};">Message</p>
              <div style="background:#F8FAFB;border-left:4px solid {BRASS};border-radius:8px;padding:16px 18px;font:15px/24px {FONT};color:{INK};">{message}</div>
            </td>
          </tr>

          <!-- Reply button -->
          <tr>
            <td style="padding:24px 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:8px;background:{INK};">
                    <a href="{reply_href}" style="display:inline-block;padding:13px 24px;font:600 15px/20px {FONT};color:#ffffff;text-decoration:none;">Reply to {first_name}</a>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0;font:13px/20px {FONT};color:{INK_SOFT};">Or just hit Reply. Your answer goes straight to {email}.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:{MIST};padding:16px 32px;font:12px/18px {FONT};color:{INK_SOFT};">
              Sent from the contact form on the {site} website.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""
