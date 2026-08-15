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
  { label: "Categories", href: "/categories" },
  { label: "Why OB Distributions", href: "/why-ob-distributions" },
  { label: "Wholesale Program", href: "/wholesale-program" },
  { label: "Contact", href: "/contact" },
] as const;

/** Product categories the platform serves. */
export const categories = [
  {
    slug: "health-household",
    name: "Health & Household",
    blurb:
      "Everyday health, wellness, and household essentials with fast, repeat-purchase demand that keeps customers coming back.",
    highlights: [
      "Vitamins & supplements",
      "Personal care",
      "Cleaning supplies",
      "Paper & disposables",
      "Baby & family care",
    ],
  },
  {
    slug: "patio-lawn-garden",
    name: "Patio, Lawn & Garden",
    blurb:
      "Outdoor living, gardening, and seasonal ranges that move with every season and drive strong basket sizes.",
    highlights: [
      "Garden tools",
      "Outdoor furniture",
      "Grills & outdoor cooking",
      "Planters & pots",
      "Lawn care",
    ],
  },
  {
    slug: "tools-home-improvement",
    name: "Tools & Home Improvement",
    blurb:
      "Hardware, power tools, and improvement supplies that let retailers serve professionals and DIY customers with ease.",
    highlights: [
      "Power tools",
      "Hand tools",
      "Hardware & fasteners",
      "Electrical",
      "Plumbing",
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    blurb:
      "Car care, parts, and accessories that keep drivers, workshops, and retailers reliably stocked and profitable.",
    highlights: [
      "Car care",
      "Parts & accessories",
      "Fluids & oils",
      "Shop tools & equipment",
      "Interior & exterior",
    ],
  },
  {
    slug: "industrial-scientific",
    name: "Industrial & Scientific",
    blurb:
      "Bulk industrial, safety, and lab supplies for businesses, workshops, and facilities that need dependable volume.",
    highlights: [
      "Industrial supplies",
      "Safety & PPE",
      "Lab & scientific",
      "Material handling",
      "Fasteners & fittings",
    ],
  },
] as const;

export type Category = (typeof categories)[number];
