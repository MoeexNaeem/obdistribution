import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/site";

/*
  Email delivery via SMTP (nodemailer) — used to notify the OB inbox
  (ori@obdistributions.com) when a contact message or wholesale application
  comes in. Configured entirely through environment variables so no secrets
  live in the repo:

    SMTP_HOST   default smtp.gmail.com   (Google Workspace)
    SMTP_PORT   default 465
    SMTP_USER   the mailbox login (e.g. ori@obdistributions.com)
    SMTP_PASS   an app password / SMTP password
    SMTP_FROM   optional "From" (defaults to SMTP_USER)
    MAIL_TO     optional recipient (defaults to site.email)

  If SMTP_USER/SMTP_PASS are absent the mailer is a no-op: forms still work and
  persist to MongoDB, they just don't send a notification email. This keeps dev
  and preview environments running without credentials.
*/

const HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const PORT = Number(process.env.SMTP_PORT || 465);
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;
const FROM = process.env.SMTP_FROM || USER;
const TO = process.env.MAIL_TO || site.email;

export function isMailConfigured(): boolean {
  return Boolean(USER && PASS);
}

let cached: Transporter | null = null;

function getTransporter(): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user: USER, pass: PASS },
  });
  return cached;
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
    await getTransporter().sendMail({
      from: `"OB Distributions" <${FROM}>`,
      to: TO,
      subject: input.subject,
      text: input.text,
      html: input.html,
      replyTo: input.replyTo,
    });
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
