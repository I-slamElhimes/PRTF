import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact form endpoint.
 *
 * Runs only on the server. SMTP_USER / SMTP_PASSWORD are read from
 * `process.env` here and never leave this file — they are deliberately not
 * NEXT_PUBLIC_, so they are not bundled for the browser under any condition.
 */

// Nodemailer needs Node APIs (net/tls); the Edge runtime cannot run it.
export const runtime = "nodejs";
// Never cache a mutation.
export const dynamic = "force-dynamic";

const MAX = { name: 100, email: 200, subject: 150, message: 5000 } as const;
const MIN = { name: 2, subject: 2, message: 10 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ── Simple abuse protection ────────────────────────────────────────────────
 * An in-memory sliding window. On serverless this is per-instance rather than
 * global, so it is a speed bump for casual spam, not a hard guarantee — the
 * honeypot below catches most bots, and real rate limiting would need a shared
 * store (Upstash/Redis). Stated plainly rather than oversold.
 * ────────────────────────────────────────────────────────────────────────── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Strip CR/LF so a crafted field cannot inject extra mail headers. */
function sanitiseHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface Payload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot: a field hidden from humans. Bots fill it in. */
  company?: unknown;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — answer 200 so a bot cannot tell it was filtered.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors: Record<string, string> = {};
  if (name.length < MIN.name) errors.name = "Please enter your name.";
  else if (name.length > MAX.name) errors.name = "That name is too long.";

  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > MAX.email) errors.email = "That email address is too long.";

  if (subject.length < MIN.subject) errors.subject = "Please add a subject.";
  else if (subject.length > MAX.subject) errors.subject = "That subject is too long.";

  if (message.length < MIN.message) errors.message = "Please add a little more detail.";
  else if (message.length > MAX.message) errors.message = "That message is too long.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please check the form.", errors }, { status: 400 });
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many messages sent. Please try again a little later." },
      { status: 429 },
    );
  }

  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  // Not configured: say so honestly instead of pretending the mail was sent.
  if (!user || !password) {
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured yet.", code: "not_configured" },
      { status: 503 },
    );
  }

  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const to = process.env.CONTACT_TO ?? user;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: password },
    });

    const safeSubject = sanitiseHeader(subject);
    const safeName = sanitiseHeader(name);

    await transporter.sendMail({
      // The envelope sender must be the authenticated mailbox, or providers
      // reject it. The visitor's address goes in replyTo, so hitting Reply
      // in the mail client answers them directly.
      from: `"Portfolio — ${safeName}" <${user}>`,
      to,
      replyTo: `"${safeName}" <${sanitiseHeader(email)}>`,
      subject: `[Portfolio] ${safeSubject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.6;color:#1b0f33">
          <h2 style="margin:0 0 16px;font-weight:500">New message from your portfolio</h2>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin:0 0 16px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <div style="padding:16px;border-left:3px solid #a855f7;background:#f6f3fc;white-space:pre-wrap">${escapeHtml(
            message,
          )}</div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log server-side for debugging; never return provider detail to the
    // client, since it can disclose the host and account.
    console.error("[contact] SMTP send failed:", error);
    return NextResponse.json(
      { ok: false, error: "The message could not be sent. Please email me directly." },
      { status: 502 },
    );
  }
}
