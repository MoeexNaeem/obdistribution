import type { NextRequest } from "next/server";
import { leadSchema } from "@/lib/validation";
import { getDb, isDbConfigured } from "@/lib/mongodb";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { badRequest, ok, serverError, tooMany, unavailable } from "@/lib/apiResponse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** "Request product list" / retailer onboarding lead capture. */
export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const limit = rateLimit(`leads:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) return tooMany(limit.resetAt);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest({ _root: ["Invalid JSON body"] });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest(parsed.error.flatten().fieldErrors);
  }

  const data = parsed.data;
  if (data.website) return ok("Thanks — your request is in. We'll send the product list shortly.");

  if (!isDbConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[leads] MONGODB_URI not set — lead not persisted:", {
        name: data.name,
        email: data.email,
      });
      return ok("Thanks — your request is in. (dev: not persisted)");
    }
    return unavailable();
  }

  try {
    const db = await getDb();
    await db.collection("leads").insertOne({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      businessType: data.businessType || null,
      categories: data.categories || [],
      meta: {
        ip,
        userAgent: req.headers.get("user-agent") || null,
        referer: req.headers.get("referer") || null,
      },
      createdAt: new Date(),
    });
    return ok("Thanks — your request is in. We'll send the product list shortly.");
  } catch (err) {
    console.error("[leads] insert failed:", err);
    return serverError();
  }
}
