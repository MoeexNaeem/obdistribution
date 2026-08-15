import type { NextRequest } from "next/server";
import { wholesaleSchema } from "@/lib/validation";
import { getDb, isDbConfigured } from "@/lib/mongodb";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { badRequest, ok, serverError, tooMany, unavailable } from "@/lib/apiResponse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUCCESS = "Application received — our team will review it and be in touch shortly.";

/** Wholesale Program applications → MongoDB `wholesale_applications`. */
export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const limit = rateLimit(`wholesale:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) return tooMany(limit.resetAt);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest({ _root: ["Invalid JSON body"] });
  }

  const parsed = wholesaleSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest(parsed.error.flatten().fieldErrors);
  }

  const data = parsed.data;
  if (data.botField) return ok(SUCCESS);

  if (!isDbConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[wholesale] MONGODB_URI not set — application not persisted:", {
        company: data.companyName,
        email: data.email,
      });
      return ok(`${SUCCESS} (dev: not persisted)`);
    }
    return unavailable();
  }

  try {
    const db = await getDb();
    await db.collection("wholesale_applications").insertOne({
      companyName: data.companyName,
      contactName: data.contactName,
      website: data.website || null,
      email: data.email,
      phone: data.phone,
      address: data.address,
      taxId: data.taxId,
      businessType: data.businessType,
      storefront: data.storefront,
      monthlyVolume: data.monthlyVolume,
      paymentMethod: data.paymentMethod,
      hearAbout: data.hearAbout || null,
      message: data.message,
      consent: data.consent,
      meta: {
        ip,
        userAgent: req.headers.get("user-agent") || null,
        referer: req.headers.get("referer") || null,
      },
      createdAt: new Date(),
    });
    return ok(SUCCESS);
  } catch (err) {
    console.error("[wholesale] insert failed:", err);
    return serverError();
  }
}
