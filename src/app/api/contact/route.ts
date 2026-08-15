import type { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation";
import { getDb, isDbConfigured } from "@/lib/mongodb";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { badRequest, ok, serverError, tooMany, unavailable } from "@/lib/apiResponse";

// mongodb driver requires the Node.js runtime (not Edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  // 4) Persist.
  if (!isDbConfigured()) {
    // Dev convenience: no DB configured -> log and simulate success locally so
    // the UI flow can be exercised. In production this is a hard 503.
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
