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
    body: "Access top brands and high-demand products across six categories, curated for resale margins.",
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

/** Stats banner (PRD §5.1): 7+, 30+, 200+, 99%. */
export const stats: { value: string; label: string }[] = [
  { value: "7+", label: "Years Experience" },
  { value: "30+", label: "Trusted Brands" },
  { value: "200+", label: "Product Range" },
  { value: "99%", label: "On-Time Fulfillment" },
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

/** Testimonials (adapted from the wholesale category). */
export const testimonials: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "Reliable supply and clear communication — exactly what we needed. Working with OB Distributions has made our inventory process stress-free.",
    name: "Abdul Karim",
    role: "Home & Kitchen Retailer",
  },
  {
    quote:
      "OB Distributions completely simplified our wholesale buying. Orders are always on time, and their selection helps us keep customers happy.",
    name: "Sarah T. Johnson",
    role: "Retail Store Owner",
  },
  {
    quote:
      "The pricing is competitive and the support team is excellent. They helped us choose the right products and boosted our sales quickly.",
    name: "Christopher Deoudes",
    role: "Grocery Shop Manager",
  },
  {
    quote:
      "Their beauty range moves fast and the margins are healthy. Reordering is effortless and the stock is always there when we need it.",
    name: "Nadia Reyes",
    role: "Beauty Boutique Owner",
  },
  {
    quote:
      "Consistent supply across every one of our locations. The team flags trends early, so we stock what actually sells.",
    name: "Marcus Bell",
    role: "Convenience Store Chain",
  },
  {
    quote:
      "Fast fulfillment and transparent pricing let us scale our listings without the usual sourcing headaches.",
    name: "Priya Anand",
    role: "Online Marketplace Seller",
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

/** Focus-area metrics (About page) — hairline tracks with a gold fill. */
export const focusAreas: { label: string; value: number }[] = [
  { label: "Reliable Supply Chain", value: 96 },
  { label: "Competitive Pricing", value: 92 },
  { label: "Fulfillment Speed", value: 88 },
  { label: "Partner Support", value: 98 },
];

/** Differentiators (Why OB page). */
export const differentiators: { title: string; body: string }[] = [
  {
    title: "One Partner, Every Category",
    body: "Beauty, Home & Kitchen, Tools & Outdoor, Grocery, Automotive, and Industrial — sourced from a single trusted distributor.",
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
