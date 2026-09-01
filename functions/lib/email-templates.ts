// Plain-inline-CSS HTML templates for transactional email — email clients
// strip <style> blocks and most CSS features (Outlook especially), so every
// rule here is inline and layout runs on tables, not flex/grid. Solid
// colors and table borders only — no gradients, no translucency, nothing
// that depends on backdrop-filter or box-shadow rendering (most clients
// drop those silently, so they're not worth the risk).

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
const TEXT = "#0b1b2b";
const TEXT_MUTED = "#5b6b7c";
const BORDER = "#d7dde3";
const BG = "#f7f9fb";

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
  <body style="margin:0;padding:0;background:${BG};font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${BORDER};">

            <!-- Header: solid navy, single monogram badge, no gradient/image dependency -->
            <tr>
              <td style="background:${NAVY};padding:20px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:${TEAL};width:32px;height:32px;text-align:center;vertical-align:middle;font-size:15px;font-weight:700;color:${NAVY};line-height:32px;">
                      W
                    </td>
                    <td style="padding-left:12px;color:#ffffff;font-size:16px;font-weight:700;letter-spacing:0.02em;">
                      WinSphere Technologies
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px;border-top:1px solid ${BORDER};background:${BG};">
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

function fieldRow(label: string, value: string, isLast = false): string {
  const border = isLast ? "" : `border-bottom:1px solid ${BORDER};`;
  return `<tr>
    <td style="padding:10px 0;${border}color:${TEXT_MUTED};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;width:120px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;${border}color:${TEXT};font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

/** A single circular icon badge — solid fill, one plain character, no
 *  webfont/SVG dependency so it renders identically everywhere. */
function iconBadge(glyph: string): string {
  return `<td style="background:${TEAL};width:36px;height:36px;min-width:36px;text-align:center;vertical-align:middle;font-size:16px;font-weight:700;color:${NAVY};line-height:36px;">${glyph}</td>`;
}

/** Sent to the WinSphere inbox when a visitor submits the contact form. */
export function notificationEmailHtml(data: ContactSubmission): string {
  return wrapper(`
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        ${iconBadge("&#9993;")}
        <td style="padding-left:14px;vertical-align:middle;">
          <span style="display:block;color:${TEXT};font-size:19px;font-weight:700;">New enquiry from the website</span>
        </td>
      </tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:24px;border-top:1px solid ${BORDER};">
      ${fieldRow("Name", data.name)}
      ${fieldRow("Email", data.email)}
      ${fieldRow("Company", data.company)}
      ${fieldRow("Phone", data.phone || "Not provided")}
      ${fieldRow("Service", data.service, true)}
    </table>

    <p style="margin:0 0 8px;color:${TEXT_MUTED};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">Message</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:${BG};border-left:4px solid ${TEAL};">
      <tr>
        <td style="padding:16px;color:${TEXT};font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</td>
      </tr>
    </table>
  `);
}

/** Sent back to the visitor confirming their message was received. */
export function confirmationEmailHtml(data: ContactSubmission): string {
  const firstName = escapeHtml(data.name.split(" ")[0] || data.name);
  return wrapper(`
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        ${iconBadge("&#10003;")}
        <td style="padding-left:14px;vertical-align:middle;">
          <span style="display:block;color:${TEXT};font-size:19px;font-weight:700;">Thanks for reaching out, ${firstName}.</span>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 20px;color:${TEXT_MUTED};font-size:14px;line-height:1.6;">
      We've received your enquiry about <strong style="color:${TEXT};">${escapeHtml(data.service)}</strong> and our team will get back to you within one business day.
    </p>

    <p style="margin:0 0 8px;color:${TEXT_MUTED};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">Your message</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background:${BG};border-left:4px solid ${TEAL};margin-bottom:24px;">
      <tr>
        <td style="padding:16px;color:${TEXT};font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</td>
      </tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:${TEAL};padding:13px 28px;">
          <a href="mailto:winspheretechnologies@gmail.com" style="color:${NAVY};text-decoration:none;font-weight:700;font-size:14px;">
            Reply to this enquiry
          </a>
        </td>
      </tr>
    </table>
  `);
}
