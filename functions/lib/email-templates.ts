// Plain-inline-CSS HTML templates for transactional email — email clients
// strip <style> blocks and most CSS features, so every rule here is inline.

export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

const NAVY = "#031a33";
const TEAL = "#19c7a3";
const TEXT_MUTED = "#64748b";
const BORDER = "#e2e8f0";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrapper(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f7f9fb;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BORDER};">
            <tr>
              <td style="background:${NAVY};padding:24px 32px;">
                <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.02em;">WinSphere Technologies</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid ${BORDER};">
                <span style="color:${TEXT_MUTED};font-size:12px;">
                  WinSphere Technologies &middot; Begumpet, Hyderabad, Telangana
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;color:${TEXT_MUTED};font-size:13px;width:110px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;color:${NAVY};font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

/** Sent to the WinSphere inbox when a visitor submits the contact form. */
export function notificationEmailHtml(data: ContactSubmission): string {
  return wrapper(`
    <h1 style="margin:0 0 16px;color:${NAVY};font-size:20px;">New enquiry from the website</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:20px;">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Company", data.company)}
      ${row("Phone", data.phone || "—")}
      ${row("Service", data.service)}
    </table>
    <p style="margin:0 0 8px;color:${TEXT_MUTED};font-size:13px;">Message</p>
    <p style="margin:0;padding:16px;background:#f7f9fb;border-radius:8px;color:${NAVY};font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `);
}

/** Sent back to the visitor confirming their message was received. */
export function confirmationEmailHtml(data: ContactSubmission): string {
  return wrapper(`
    <h1 style="margin:0 0 12px;color:${NAVY};font-size:20px;">Thanks for reaching out, ${escapeHtml(data.name.split(" ")[0] || data.name)}.</h1>
    <p style="margin:0 0 20px;color:${TEXT_MUTED};font-size:14px;line-height:1.6;">
      We've received your enquiry about <strong style="color:${NAVY};">${escapeHtml(data.service)}</strong> and our team will get back to you within one business day.
    </p>
    <p style="margin:0 0 8px;color:${TEXT_MUTED};font-size:13px;">Your message</p>
    <p style="margin:0 0 20px;padding:16px;background:#f7f9fb;border-radius:8px;color:${NAVY};font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    <a href="mailto:winspheretechnologies@gmail.com" style="display:inline-block;background:${TEAL};color:${NAVY};text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:999px;">
      Reply to this enquiry
    </a>
  `);
}
