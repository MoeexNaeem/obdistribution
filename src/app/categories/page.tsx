import type { Metadata } from "next";
import {
  HeartPulse,
  Sprout,
  Wrench,
  Car,
  FlaskConical,
  ShoppingBasket,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatStrip } from "@/components/ui/StatStrip";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { MillerColumns, type MillerItem } from "@/components/reactbits/MillerColumns";
import { categories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Distribution Categories",
  description:
    "Explore OB Distributions' wholesale categories — Beauty, Home & Kitchen, Tools & Outdoor, Grocery, Automotive, and Industrial. High-velocity inventory that keeps shelves full.",
};

const icons: Record<string, LucideIcon> = {
  "health-household": HeartPulse,
  "patio-lawn-garden": Sprout,
  "tools-home-improvement": Wrench,
  automotive: Car,
  "industrial-scientific": FlaskConical,
};

export default function CategoriesPage() {
  const items: MillerItem[] = categories.map((c) => {
    const Icon = icons[c.slug] ?? ShoppingBasket;
    return {
      slug: c.slug,
      name: c.name,
      blurb: c.blurb,
      lines: [...c.highlights],
      href: `/categories/${c.slug}`,
      icon: <Icon size={18} />,
    };
  });

  return (
    <>
      <PageHero
        eyebrow="Distribution Categories"
        title="Everything your shelves need"
        subtitle="Five wholesale categories, one dependable partner. Browse the ranges we distribute and get access to high-velocity inventory that keeps customers coming back."
      />

      {/* Catalog browser — Miller columns */}
      <Section>
        <Reveal>
          <MillerColumns items={items} />
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-4 font-mono text-[0.75rem] text-mist/50">
            Hover a category to browse its product lines · use ↑ ↓ to navigate
          </p>
        </Reveal>
      </Section>

      {/* Why source across categories */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal from="left">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              One partner, every aisle
            </p>
            <h2 className="mt-4 max-w-md font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
              Consolidate your sourcing
            </h2>
            <p className="mt-5 max-w-md font-sans text-[1rem] leading-relaxed text-mist sm:text-[1.0625rem]">
              Ordering across categories from a single distributor means fewer invoices,
              consolidated shipping, and one team that knows your business — so restocking
              is simple and your margins stay protected.
            </p>
          </Reveal>

          <Reveal from="right" delay={120} className="self-center">
            <StatStrip
              items={[
                { value: "5", label: "Categories" },
                { value: "50+", label: "Brands" },
                { value: "2000+", label: "Products" },
                { value: "One", label: "Invoice" },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <CtaBanner
        title="Get the full product list"
        subtitle="Tell us which categories you stock and we'll set you up with wholesale pricing and availability."
        ctaLabel="Join the wholesale program"
        ctaHref="/wholesale-program"
      />
    </>
  );
}
