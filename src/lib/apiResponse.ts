import { NextResponse } from "next/server";

export function json(data: unknown, status = 200, headers?: HeadersInit) {
  return NextResponse.json(data, { status, headers });
}

export function ok(message: string, extra?: Record<string, unknown>) {
  return json({ ok: true, message, ...extra }, 200);
}

export function badRequest(errors: unknown) {
  return json({ ok: false, error: "validation_error", errors }, 400);
}

export function tooMany(resetAt: number) {
  const retryAfter = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return json(
    { ok: false, error: "rate_limited", message: "Too many requests. Please try again shortly." },
    429,
    { "Retry-After": String(retryAfter) },
  );
}

export function serverError(message = "Something went wrong. Please try again.") {
  return json({ ok: false, error: "server_error", message }, 500);
}

export function unavailable(message = "Submissions are temporarily unavailable.") {
  return json({ ok: false, error: "unavailable", message }, 503);
}
