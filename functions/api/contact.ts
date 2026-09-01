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

// One submission per IP per minute. This endpoint emails whatever address
// the caller supplies (the visitor confirmation), which makes it a spam
// relay if left unthrottled — anyone could script requests to blast
// arbitrary inboxes with WinSphere-branded email. The Cache API gives a
// real per-edge-node limit with zero extra Cloudflare resources to
// provision; it's not a global counter (a distributed attacker spread
// across many PoPs can still exceed 1/min in aggregate), so if abuse shows
// up in practice, move this to a Cloudflare native Rate Limiting Rule (WAF,
// no code change) or a KV/Durable Object-backed counter for a hard global
// limit.
const RATE_LIMIT_WINDOW_SECONDS = 60;

// `caches.default` is a Cloudflare Workers runtime extension (the edge
// cache tied to this request's PoP) — not part of the standard CacheStorage
// type lib.dom.d.ts ships, so it needs a narrow cast rather than `any`.
const cloudflareCaches = caches as unknown as { default: Cache };

async function isRateLimited(request: Request): Promise<boolean> {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const cacheKey = new Request(`https://rate-limit.internal/contact/${encodeURIComponent(ip)}`);
  const cache = cloudflareCaches.default;

  const existing = await cache.match(cacheKey);
  if (existing) return true;

  await cache.put(
    cacheKey,
    new Response("1", { headers: { "Cache-Control": `max-age=${RATE_LIMIT_WINDOW_SECONDS}` } })
  );
  return false;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// The WHATWG HTML5 spec's email-input pattern — well-vetted, no
// catastrophic-backtracking risk, and matches what browsers themselves
// accept for type="email", so it agrees with the client-side validation
// instead of silently disagreeing with it.
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function isValidEmail(value: string): boolean {
  return value.length <= 320 && EMAIL_PATTERN.test(value);
}

function parseSubmission(body: unknown): ContactSubmission | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  if (!isNonEmptyString(b.name)) return null;
  if (!isNonEmptyString(b.email) || !isValidEmail(b.email.trim())) return null;
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

  if (await isRateLimited(request)) {
    return Response.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
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
