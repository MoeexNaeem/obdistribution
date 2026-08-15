import { z } from "zod";
import {
  businessTypeValues,
  storefrontValues,
  volumeValues,
  paymentValues,
} from "@/lib/wholesale";

/*
  Server-side validation schemas (zod). These run on the API routes so that no
  untrusted input reaches MongoDB unvalidated. Strings are trimmed and length-
  capped to prevent oversized-payload abuse.
*/

const name = z.string().trim().min(2, "Please enter your name").max(120);
const email = z.string().trim().toLowerCase().email("Enter a valid email").max(200);
const phone = z.string().trim().max(40).optional().or(z.literal(""));
const company = z.string().trim().max(160).optional().or(z.literal(""));

/*
  Honeypot: a decoy field real users never see. We accept ANY value at the
  schema level (length-capped) so a filled honeypot still parses — the route
  then silently accepts and drops the submission without tipping off the bot.
*/
const honeypot = z.string().max(200).optional();

export const contactSchema = z.object({
  name,
  email,
  phone,
  company,
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(4000),
  // bot trap — real users never see or fill this
  website: honeypot,
});

export const leadSchema = z.object({
  name,
  email,
  phone,
  company,
  businessType: z
    .enum([
      "small-shop",
      "online-seller",
      "large-store",
      "distributor",
      "other",
    ])
    .optional(),
  categories: z.array(z.string().max(60)).max(12).optional(),
  website: honeypot,
});

export const wholesaleSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required").max(160),
  contactName: name,
  website: z.string().trim().max(200).optional().or(z.literal("")),
  email,
  phone: z.string().trim().min(5, "Phone number is required").max(40),
  address: z.string().trim().min(5, "Business address is required").max(300),
  taxId: z.string().trim().min(2, "Sales tax ID / resale certificate is required").max(120),
  businessType: z.enum(businessTypeValues as [string, ...string[]], {
    message: "Select a business type",
  }),
  storefront: z.enum(storefrontValues as [string, ...string[]], {
    message: "Select an option",
  }),
  monthlyVolume: z.enum(volumeValues as [string, ...string[]], {
    message: "Select an estimated volume",
  }),
  paymentMethod: z.enum(paymentValues as [string, ...string[]], {
    message: "Select a payment method",
  }),
  hearAbout: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(4000),
  consent: z.literal(true, { message: "Please confirm to continue" }),
  // bot trap
  botField: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type WholesaleInput = z.infer<typeof wholesaleSchema>;
