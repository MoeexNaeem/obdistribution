import type { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation";
import { getDb, isDbConfigured } from "@/lib/mongodb";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { badRequest, ok, serverError, tooMany, unavailable } from "@/lib/apiResponse";
import { sendMail, rows } from "@/lib/mailer";
import type { ContactInput } from "@/lib/validation";

// mongodb driver requires the Node.js runtime (not Edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Best-effort inbox notification — never blocks or fails the submission. */
async function notify(data: ContactInput) {
  const { html, text } = rows([
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company],
    ["Message", data.message],
  ]);
  const res = await sendMail({
    subject: `New contact message — ${data.name}`,
    html: `<h2 style="font-family:system-ui,sans-serif;font-size:16px">New contact message</h2>${html}`,
    text: `New contact message\n\n${text}`,
    replyTo: data.email,
  });
  if (res.error) console.error("[contact] email failed:", res.error);
  return res;
}

export async function POST(req: NextRequest) {
  // 1) Rate limit per IP — 5 submissions / minute.
  const ip = clientIp(req.headers);
  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) return tooMany(limit.resetAt);

  // 2) Parse + validate.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest({ _root: ["Invalid JSON body"] });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest(parsed.error.flatten().fieldErrors);
  }

  // 3) Honeypot — silently accept but do not store (don't tip off bots).
  const data = parsed.data;
  if (data.website) return ok("Thanks — we'll be in touch shortly.");

  // 4) Notify the OB inbox (best effort — never blocks the submission).
  const mail = await notify(data);

  // 5) Persist.
  if (!isDbConfigured()) {
    // No DB configured. If email went out, that's still a real delivery, so
    // treat it as success; otherwise dev logs / prod 503.
    if (mail.sent) return ok("Thanks — we'll be in touch shortly.");
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] MONGODB_URI not set — submission not persisted:", {
        name: data.name,
        email: data.email,
      });
      return ok("Thanks — we'll be in touch shortly. (dev: not persisted)");
    }
    return unavailable();
  }

  try {
    const db = await getDb();
    await db.collection("contact_submissions").insertOne({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      message: data.message,
      meta: {
        ip,
        userAgent: req.headers.get("user-agent") || null,
        referer: req.headers.get("referer") || null,
      },
      createdAt: new Date(),
    });
    return ok("Thanks — we'll be in touch shortly.");
  } catch (err) {
    console.error("[contact] insert failed:", err);
    return serverError();
  }
}
