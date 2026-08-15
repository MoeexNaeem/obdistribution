import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteBackground } from "@/components/layout/SiteBackground";

// Firecrawl uses Suisse (a humanist grotesque); Geist is the closest freely
// available match and pairs natively with Geist Mono. Primary face for
// headings, body, and UI.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

// Geist Mono — code, technical labels, eyebrows, and developer-facing micro-copy.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://obdistributions.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OB Distributions — Trusted B2B Wholesale Distributor",
    template: "%s — OB Distributions",
  },
  description:
    "OB Distributions connects retailers with top brands and high-demand products for resale. Easy wholesale ordering, volume-based bulk discounts, a reliable supply chain, and data-driven market insights.",
  keywords: [
    "wholesale distributor",
    "B2B wholesale",
    "bulk ordering",
    "retail sourcing",
    "brand onboarding",
    "West Palm Beach wholesale",
  ],
  authors: [{ name: "OB Distributions" }],
  openGraph: {
    type: "website",
    title: "OB Distributions — Trusted B2B Wholesale Distributor",
    description:
      "Top Brands. Top Products. All In One Place. Reliable supply and lasting partnerships for retailers.",
    url: SITE_URL,
    siteName: "OB Distributions",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OB Distributions — Trusted B2B Wholesale Distributor",
    description:
      "Top Brands. Top Products. All In One Place. Reliable supply and lasting partnerships for retailers.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full ${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink font-serif">
        <SiteBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
