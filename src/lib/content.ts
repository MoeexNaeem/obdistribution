import {
  Boxes,
  TrendingUp,
  Truck,
  Handshake,
  BarChart3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { FeatureTab } from "@/components/reactbits/FeaturesTabs";

/** Home services grid (PRD §5.1) — gold monoline icons, Times titles. */
export const services: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Boxes,
    title: "Product Sourcing",
    body: "Access top brands and high-demand products across five categories, curated for resale margins.",
  },
  {
    icon: Truck,
    title: "Fast Fulfillment",
    body: "A reliable supply chain keeps your shelves stocked and your orders moving on schedule.",
  },
  {
    icon: TrendingUp,
    title: "Bulk Discounts",
    body: "Volume-based pricing that scales with your business — buy more, protect your margin.",
  },
  {
    icon: Handshake,
    title: "Brand Onboarding",
    body: "Seamless onboarding for retailers and brands alike, with hands-on partner support.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    body: "Data-driven guidance on what to stock so you carry the products that actually sell.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Supply",
    body: "Dependable inventory and clear communication — wholesale without the guesswork.",
  },
];

/** Stats banner. */
export const stats: { value: string; label: string }[] = [
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "Trusted Brands" },
  { value: "2000+", label: "Product Range" },
  { value: "200+", label: "Retail Partners" },
];

/** "How We Help You Grow" — feeds the auto-cycling FeaturesTabs. */
export const featureTabs: FeatureTab[] = [
  {
    id: "order",
    label: "Easy Wholesale Ordering",
    title: "Bulk ordering, without the friction",
    description:
      "Request a product list, place bulk orders, and reorder your best sellers through one trusted partner.",
    points: [
      "Personalized wholesale pricing on request",
      "Simple bulk and repeat ordering",
      "Dedicated support for orders and deals",
    ],
    icon: "boxes",
  },
  {
    id: "supply",
    label: "Reliable Supply Chain",
    title: "Inventory you can count on",
    description:
      "Dependable stock and fast fulfillment keep your shelves full and your customers happy.",
    points: [
      "Consistent availability on core SKUs",
      "Fast, on-time order fulfillment",
      "Clear communication end to end",
    ],
    icon: "truck",
  },
  {
    id: "insights",
    label: "Data-Driven Insights",
    title: "Stock what sells",
    description:
      "Market insights and product recommendations help you choose inventory that drives sales.",
    points: [
      "Category and trend guidance",
      "Recommendations tailored to your market",
      "Support choosing the right assortment",
    ],
    icon: "chart",
  },
];

/** Testimonials — retailers across the five distribution categories. */
export const testimonials: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "Their patio and garden range sells through every season. Reordering is effortless and the stock is always there when we need it.",
    name: "Daniel Ortega",
    role: "Owner, GreenAcre Patio & Garden",
  },
  {
    quote:
      "OB Distributions keeps our aisles full — power tools, fasteners, everything. Orders are always on time and the margins hold up.",
    name: "Sarah Whitfield",
    role: "Manager, BuildRight Home Improvement",
  },
  {
    quote:
      "Consistent supply on health and household essentials across all our stores. The team flags trends early so we stock what actually sells.",
    name: "Marcus Bell",
    role: "Buyer, DailyCare Household Market",
  },
  {
    quote:
      "Competitive pricing on parts and car care, plus support that actually helps us choose the right assortment for our customers.",
    name: "Christopher Deoudes",
    role: "Owner, ProAuto Parts & Accessories",
  },
  {
    quote:
      "Reliable bulk supply of industrial and safety gear with clear communication end to end. Wholesale without the guesswork.",
    name: "Priya Anand",
    role: "Procurement, MetroLine Industrial Supply",
  },
  {
    quote:
      "Fast fulfillment and transparent pricing let us scale our lawn and outdoor listings without the usual sourcing headaches.",
    name: "Nadia Reyes",
    role: "Owner, Everbloom Lawn & Outdoor",
  },
];

/** FAQ (Why OB page). */
export const faqs: { q: string; a: string }[] = [
  {
    q: "How do I become a retailer with OB Distributions?",
    a: "Reach out through our contact form or give us a call. Our team will guide you through onboarding and share our wholesale product list.",
  },
  {
    q: "Do you offer exclusive pricing for bulk buyers?",
    a: "Yes. We offer volume-based bulk discounts, and pricing scales with your order size. Request a quote and we'll tailor pricing to your business.",
  },
  {
    q: "What type of retailers do you work with?",
    a: "We serve a wide range of retailers — small shops, online sellers, large stores, and distributors across all of our product categories.",
  },
  {
    q: "How quickly do you ship orders?",
    a: "Our reliable supply chain is built for fast fulfillment. Timelines depend on order size and destination, and we communicate clearly at every step.",
  },
  {
    q: "Can I get recommendations on what products to stock?",
    a: "Absolutely. Our data-driven market insights help you choose high-demand products that fit your market and drive sales.",
  },
  {
    q: "How do I place a bulk order?",
    a: "Contact our team to request the product list and discuss quantities. We'll set you up with personalized wholesale pricing and place your order.",
  },
];

/** Company values (About page). */
export const values: { title: string; body: string }[] = [
  {
    title: "Reliability First",
    body: "Dependable inventory, competitive pricing, and clear communication. We do what we say — every order, every time.",
  },
  {
    title: "Partnership, Not Transactions",
    body: "We invest in long-term relationships. Your growth is the metric that matters, so we support you well beyond the sale.",
  },
  {
    title: "Quality & Selection",
    body: "We curate top brands and high-demand products so you can stock the right inventory at the right prices.",
  },
];

/** Focus areas (About page) — the pillars we hold ourselves to. */
export const focusAreas: { label: string; blurb: string }[] = [
  {
    label: "Reliable Supply Chain",
    blurb: "Dependable stock and consistent availability on core SKUs, every order.",
  },
  {
    label: "Competitive Pricing",
    blurb: "Volume-based wholesale rates that protect your margin as you grow.",
  },
  {
    label: "Fulfillment Speed",
    blurb: "Orders that move on schedule so your shelves are never left waiting.",
  },
  {
    label: "Partner Support",
    blurb: "A dedicated team guiding assortment, reorders, and long-term growth.",
  },
];

/** Differentiators (Why OB page). */
export const differentiators: { title: string; body: string }[] = [
  {
    title: "One Partner, Every Category",
    body: "We connect you with top brands and in-demand products across every category.",
  },
  {
    title: "Pricing That Scales",
    body: "Volume-based bulk discounts protect your margin as you grow. The more you order, the better your economics.",
  },
  {
    title: "Supply You Can Trust",
    body: "A reliable supply chain and fast fulfillment mean fewer stockouts and shelves that stay full.",
  },
  {
    title: "Insight-Led Buying",
    body: "Data-driven market insights help you stock the products that actually move in your market.",
  },
];
