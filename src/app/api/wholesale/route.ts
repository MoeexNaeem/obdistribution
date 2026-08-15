import type { NextRequest } from "next/server";
import { wholesaleSchema } from "@/lib/validation";
import { getDb, isDbConfigured } from "@/lib/mongodb";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { badRequest, ok, serverError, tooMany, unavailable } from "@/lib/apiResponse";
import { sendMail, rows } from "@/lib/mailer";
import type { WholesaleInput } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUCCESS = "Application received — our team will review it and be in touch shortly.";

/** Best-effort inbox notification — never blocks or fails the submission. */
async function notify(data: WholesaleInput) {
  const { html, text } = rows([
    ["Company", data.companyName],
    ["Contact", data.contactName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Website", data.website],
    ["Address", data.address],
    ["Sales Tax / Resale ID", data.taxId],
    ["Business type", data.businessType],
    ["Storefront", data.storefront],
    ["Monthly volume", data.monthlyVolume],
    ["Payment method", data.paymentMethod],
    ["Heard about us", data.hearAbout],
    ["Message", data.message],
  ]);
  const res = await sendMail({
    subject: `New wholesale application — ${data.companyName}`,
    html: `<h2 style="font-family:system-ui,sans-serif;font-size:16px">New wholesale application</h2>${html}`,
    text: `New wholesale application\n\n${text}`,
    replyTo: data.email,
  });
  if (res.error) console.error("[wholesale] email failed:", res.error);
  return res;
}

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

  // Notify the OB inbox (best effort — never blocks the submission).
  const mail = await notify(data);

  if (!isDbConfigured()) {
    if (mail.sent) return ok(SUCCESS);
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
