import { Resend } from "resend";
import { site } from "@/lib/site";

/*
  Email delivery via Resend (HTTP API) — notifies the OB inbox
  (info@obdistributions.com) when a contact message or wholesale application
  comes in. Uses Resend's API rather than SMTP, which is reliable on serverless
  hosts (Vercel) where outbound SMTP is blocked. Configured via env:

    RESEND_API_KEY   the Resend API key (re_...). Required to actually send.
    MAIL_FROM        the "From" — MUST be on a Resend-verified domain.
                     e.g. "OB Distributions <info@obdistributions.com>"
    MAIL_TO          recipient of the notifications (defaults to site.email)

  If RESEND_API_KEY is absent the mailer is a no-op: forms still work and persist
  to MongoDB, they just don't send a notification email — so dev/preview run
  without credentials.
*/

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.MAIL_FROM || `OB Distributions <info@obdistributions.com>`;
const TO = process.env.MAIL_TO || site.email;

export function isMailConfigured(): boolean {
  return Boolean(API_KEY);
}

let client: Resend | null = null;
function getClient(): Resend {
  if (!client) client = new Resend(API_KEY);
  return client;
}

export interface MailInput {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/**
 * Best-effort send. Never throws — returns a small result the caller can log.
 * A failed email must not fail the form submission.
 */
export async function sendMail(
  input: MailInput,
): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  if (!isMailConfigured()) return { sent: false, skipped: true };
  try {
    const { error } = await getClient().emails.send({
      from: FROM,
      to: TO,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    });
    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (err) {
    const error = err instanceof Error ? err.message : "unknown error";
    return { sent: false, error };
  }
}

/** Small helpers to render tidy notification emails. */
export function rows(pairs: [string, string | null | undefined][]): {
  html: string;
  text: string;
} {
  const clean = pairs.filter(([, v]) => v != null && String(v).trim() !== "");
  const html = `
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;color:#111">
      ${clean
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>
               <td style="padding:6px 0;color:#111">${escapeHtml(String(v)).replace(/\n/g, "<br>")}</td>
             </tr>`,
        )
        .join("")}
    </table>`;
  const text = clean.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html, text };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
