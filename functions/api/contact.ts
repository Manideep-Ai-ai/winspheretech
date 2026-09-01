// Cloudflare Pages Function — the site is a static export (no Next.js
// server), so this is a standalone serverless endpoint living outside the
// Next.js app, deployed automatically by Cloudflare alongside it.
// Route: POST /api/contact

import { confirmationEmailHtml, notificationEmailHtml, type ContactSubmission } from "../lib/email-templates";

interface Env {
  RESEND_API_KEY: string;
  // Optional: set once winspheretech.com is verified as a sending domain
  // in Resend. Until then this falls back to Resend's shared test sender,
  // which only delivers to the Resend account's own verified email.
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

const DEFAULT_FROM = "WinSphere Technologies <onboarding@resend.dev>";
const DEFAULT_TO = "winspheretechnologies@gmail.com";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseSubmission(body: unknown): ContactSubmission | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  if (!isNonEmptyString(b.name)) return null;
  if (!isNonEmptyString(b.email) || !isValidEmail(b.email)) return null;
  if (!isNonEmptyString(b.company)) return null;
  if (!isNonEmptyString(b.service)) return null;
  if (!isNonEmptyString(b.message)) return null;

  return {
    name: b.name.trim().slice(0, 200),
    email: b.email.trim().slice(0, 320),
    company: b.company.trim().slice(0, 200),
    phone: isNonEmptyString(b.phone) ? b.phone.trim().slice(0, 50) : "",
    service: b.service.trim().slice(0, 200),
    message: b.message.trim().slice(0, 5000),
  };
}

async function sendEmail(
  apiKey: string,
  payload: { from: string; to: string; subject: string; html: string; replyTo?: string }
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      reply_to: payload.replyTo,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend API error (${res.status}): ${detail}`);
  }
}

export async function onRequestPost(context: RequestContext): Promise<Response> {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return Response.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const submission = parseSubmission(body);
  if (!submission) {
    return Response.json({ error: "Please fill in all required fields with valid values." }, { status: 400 });
  }

  const from = env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const to = env.CONTACT_TO_EMAIL || DEFAULT_TO;

  try {
    await sendEmail(env.RESEND_API_KEY, {
      from,
      to,
      subject: `New enquiry from ${submission.name} (${submission.company})`,
      html: notificationEmailHtml(submission),
      replyTo: submission.email,
    });

    // Best-effort: the visitor's confirmation email should never fail the
    // whole request — the enquiry has already reached WinSphere by here.
    try {
      await sendEmail(env.RESEND_API_KEY, {
        from,
        to: submission.email,
        subject: "We've received your enquiry — WinSphere Technologies",
        html: confirmationEmailHtml(submission),
      });
    } catch (confirmationError) {
      console.error("Confirmation email failed:", confirmationError);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return Response.json({ error: "Something went wrong sending your message. Please try again." }, { status: 502 });
  }
}
