"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/*
  ContactForm — posts to /api/contact. Includes a hidden honeypot ("website"),
  inline field errors returned from the server, and accessible status output.
*/

type FieldErrors = Partial<Record<string, string[]>>;
type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-[10px] border border-white/12 bg-canvas px-4 py-3 font-sans text-[0.9375rem] text-ink " +
  "placeholder:text-mist/45 transition-colors focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/25";

const labelBase = "mb-2 block font-sans text-[0.8125rem] font-medium text-mist";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      company: String(fd.get("company") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thanks — we'll be in touch shortly.");
        form.reset();
        return;
      }
      if (res.status === 400 && data.errors) setErrors(data.errors);
      setStatus("error");
      setMessage(
        data.message ||
          (res.status === 400
            ? "Please check the highlighted fields."
            : "Something went wrong. Please try again."),
      );
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[16px] border border-brand-gold/40 bg-white/[0.03] p-8 text-center backdrop-blur-md"
      >
        <p className="font-sans text-[1.375rem] font-semibold text-ink">Message received</p>
        <p className="mt-3 font-sans text-mist">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — visually hidden, off the tab order, ignored by users */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" errors={errors.name} required>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputBase} placeholder="Jane Retailer" />
        </Field>
        <Field id="email" label="Email" errors={errors.email} required>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputBase} placeholder="jane@store.com" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone (optional)" errors={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputBase} placeholder="(555) 123-4567" />
        </Field>
        <Field id="company" label="Company (optional)" errors={errors.company}>
          <input id="company" name="company" type="text" autoComplete="organization" className={inputBase} placeholder="Your store or business" />
        </Field>
      </div>

      <Field id="message" label="How can we help?" errors={errors.message} required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(inputBase, "resize-y")}
          placeholder="Tell us about your business and what you're looking to source…"
        />
      </Field>

      {status === "error" && message ? (
        <p role="alert" className="font-sans text-[0.875rem] text-brand-gold">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-white px-7 py-3",
          "font-sans text-[0.9375rem] font-semibold text-canvas transition-opacity hover:opacity-90 disabled:opacity-60",
        )}
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  errors,
  required,
  children,
}: {
  id: string;
  label: string;
  errors?: string[];
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelBase}>
        {label}
        {required ? <span className="text-brand-gold"> *</span> : null}
      </label>
      {children}
      {errors?.length ? (
        <p className="mt-1.5 text-fn text-brand-gold">{errors[0]}</p>
      ) : null}
    </div>
  );
}
