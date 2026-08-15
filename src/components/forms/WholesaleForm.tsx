"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  businessTypes,
  storefrontOptions,
  volumeOptions,
  paymentMethods,
} from "@/lib/wholesale";
import { SmoothSelect } from "@/components/forms/SmoothSelect";

type FieldErrors = Partial<Record<string, string[]>>;
type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-[10px] border border-white/12 bg-canvas px-4 py-3 font-sans text-[0.9375rem] text-ink " +
  "placeholder:text-mist/45 transition-colors hover:border-white/25 " +
  "focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/25";
const labelBase = "mb-2 block font-sans text-[0.8125rem] font-medium text-mist";

function Field({
  id,
  label,
  required,
  errors,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  errors?: string[];
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
        <p className="mt-1.5 font-sans text-[0.8125rem] text-brand-gold">{errors[0]}</p>
      ) : null}
    </div>
  );
}

export function WholesaleForm() {
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
      companyName: String(fd.get("companyName") || ""),
      contactName: String(fd.get("contactName") || ""),
      website: String(fd.get("website") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      address: String(fd.get("address") || ""),
      taxId: String(fd.get("taxId") || ""),
      businessType: String(fd.get("businessType") || ""),
      storefront: String(fd.get("storefront") || ""),
      monthlyVolume: String(fd.get("monthlyVolume") || ""),
      paymentMethod: String(fd.get("paymentMethod") || ""),
      hearAbout: String(fd.get("hearAbout") || ""),
      message: String(fd.get("message") || ""),
      consent: fd.get("consent") === "on",
      botField: String(fd.get("botField") || ""),
    };

    try {
      const res = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Application received.");
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
        className="rounded-[16px] border border-brand-gold/40 bg-white/[0.03] p-10 text-center backdrop-blur-md"
      >
        <p className="font-sans text-[1.5rem] font-semibold text-ink">Application received</p>
        <p className="mx-auto mt-3 max-w-md font-sans text-mist">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="botField">Leave this field empty</label>
        <input id="botField" name="botField" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="companyName" label="Company Name" required errors={errors.companyName}>
          <input id="companyName" name="companyName" type="text" required autoComplete="organization" className={inputBase} placeholder="Your business name" />
        </Field>
        <Field id="contactName" label="Contact Person Name" required errors={errors.contactName}>
          <input id="contactName" name="contactName" type="text" required autoComplete="name" className={inputBase} placeholder="Full name" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Business Email" required errors={errors.email}>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputBase} placeholder="name@business.com" />
        </Field>
        <Field id="phone" label="Phone Number" required errors={errors.phone}>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputBase} placeholder="(555) 123-4567" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="website" label="Business Website" errors={errors.website}>
          <input id="website" name="website" type="text" autoComplete="url" className={inputBase} placeholder="https://…" />
        </Field>
        <Field id="taxId" label="Sales Tax ID / Resale Certificate Number" required errors={errors.taxId}>
          <input id="taxId" name="taxId" type="text" className={inputBase} placeholder="Resale certificate #" />
        </Field>
      </div>

      <Field id="address" label="Business Address" required errors={errors.address}>
        <input id="address" name="address" type="text" required autoComplete="street-address" className={inputBase} placeholder="Street, city, state, ZIP" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="businessType" label="Type of Business" required errors={errors.businessType}>
          <SmoothSelect id="businessType" name="businessType" options={businessTypes} placeholder="Select business type" invalid={!!errors.businessType} />
        </Field>
        <Field id="storefront" label="Do you have a physical storefront?" required errors={errors.storefront}>
          <SmoothSelect id="storefront" name="storefront" options={storefrontOptions} placeholder="Select an option" invalid={!!errors.storefront} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="monthlyVolume" label="Estimated Monthly Purchase Volume" required errors={errors.monthlyVolume}>
          <SmoothSelect id="monthlyVolume" name="monthlyVolume" options={volumeOptions} placeholder="Select volume" invalid={!!errors.monthlyVolume} />
        </Field>
        <Field id="paymentMethod" label="Preferred Payment Method" required errors={errors.paymentMethod}>
          <SmoothSelect id="paymentMethod" name="paymentMethod" options={paymentMethods} placeholder="Select payment method" invalid={!!errors.paymentMethod} />
        </Field>
      </div>

      <Field id="hearAbout" label="How did you hear about us?" errors={errors.hearAbout}>
        <input id="hearAbout" name="hearAbout" type="text" className={inputBase} placeholder="Search, referral, social…" />
      </Field>

      <Field id="message" label="Additional Information or Message" required errors={errors.message}>
        <textarea id="message" name="message" required rows={4} className={cn(inputBase, "resize-y")} placeholder="Tell us about your business and what you're looking to source…" />
      </Field>

      {/* Consent */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand-gold"
          />
          <span className="font-sans text-[0.875rem] leading-relaxed text-mist">
            I confirm that all information provided is accurate and I am authorized to open a
            wholesale account on behalf of this business.
            <span className="text-brand-gold"> *</span>
          </span>
        </label>
        {errors.consent?.length ? (
          <p className="mt-1.5 font-sans text-[0.8125rem] text-brand-gold">{errors.consent[0]}</p>
        ) : null}
      </div>

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
        {status === "submitting" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
