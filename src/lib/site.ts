/**
 * Single source of truth for OB Distributions business data.
 * Real details sourced from the existing obdistributions.com site.
 */

export const site = {
  name: "OB Distributions",
  legalName: "OB Distributions",
  tagline: "Partner With Purpose",
  subTagline: "Reliable Supply. Lasting Partnerships.",
  description:
    "OB Distributions is your trusted wholesale distribution partner. We help retailers and businesses source dependable products, competitive pricing, and reliable support for long-term growth.",
  phone: "+1 (561) 749-7820",
  phoneHref: "tel:+15617497820",
  email: "ori@obdistributions.com",
  address: {
    line1: "1118 25th Street Unit 9",
    city: "West Palm Beach",
    state: "FL",
    zip: "33407",
    full: "1118 25th Street Unit 9, West Palm Beach, FL 33407",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Why OB Distributions", href: "/why-ob-distributions" },
  { label: "Wholesale Program", href: "/wholesale-program" },
  { label: "Contact", href: "/contact" },
] as const;

/** Product categories the platform serves (PRD §1). */
export const categories = [
  {
    slug: "beauty",
    name: "Beauty",
    blurb: "Cosmetics, skincare, and personal-care lines with fast-moving SKUs.",
  },
  {
    slug: "home-kitchen",
    name: "Home & Kitchen",
    blurb: "Everyday essentials and durable goods that keep shelves turning.",
  },
  {
    slug: "tools-outdoor",
    name: "Tools & Outdoor",
    blurb:
      "Our wholesale tool range includes quality hardware and equipment that lets retailers serve professionals and DIY customers with ease.",
  },
  {
    slug: "grocery",
    name: "Grocery",
    blurb: "Shelf-stable pantry staples and high-velocity consumables.",
  },
  {
    slug: "automotive",
    name: "Automotive",
    blurb:
      "Our automotive wholesale line includes car care, parts, and accessories to help retailers serve customers and grow their profits.",
  },
  {
    slug: "industrial",
    name: "Industrial",
    blurb:
      "We deliver reliable industrial supplies and equipment in bulk, helping retailers serve workshops, businesses, and contractors easily.",
  },
] as const;

export type Category = (typeof categories)[number];
