import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HeartPulse,
  Sprout,
  Wrench,
  Car,
  FlaskConical,
  ShoppingBasket,
  Check,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { categories, site } from "@/lib/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://obdistributions.com";

const icons: Record<string, LucideIcon> = {
  "health-household": HeartPulse,
  "patio-lawn-garden": Sprout,
  "tools-home-improvement": Wrench,
  automotive: Car,
  "industrial-scientific": FlaskConical,
};

function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

// Programmatic SEO: one statically-generated, server-rendered page per category.
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };

  const title = `${category.name} Wholesale`;
  const description = `${category.blurb} Wholesale ${category.name.toLowerCase()} distribution from OB Distributions — ${category.highlights.join(", ")}.`;
  const url = `${SITE_URL}/categories/${category.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: { title: `${title} — ${site.name}`, description, url, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const Icon = icons[category.slug] ?? ShoppingBasket;
  const others = categories.filter((c) => c.slug !== category.slug);

  // Structured data: breadcrumb trail + the category as a collection.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Categories", item: `${SITE_URL}/categories` },
          {
            "@type": "ListItem",
            position: 3,
            name: category.name,
            item: `${SITE_URL}/categories/${category.slug}`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${category.name} Wholesale`,
        description: category.blurb,
        url: `${SITE_URL}/categories/${category.slug}`,
        isPartOf: { "@type": "WebSite", name: site.name, url: SITE_URL },
        about: category.highlights,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[340px]"
          style={{
            background:
              "radial-gradient(50% 100% at 50% 0%, rgba(251,191,36,0.13), transparent 70%)",
          }}
        />
        <Container className="relative py-16 sm:py-20">
          {/* Breadcrumb */}
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-mono text-[0.72rem] text-mist/60">
              <Link href="/" className="transition-colors hover:text-ink">
                Home
              </Link>
              <span className="text-mist/30">/</span>
              <Link href="/categories" className="transition-colors hover:text-ink">
                Categories
              </Link>
              <span className="text-mist/30">/</span>
              <span className="text-brand-gold">{category.slug}</span>
            </nav>
          </Reveal>

          <Reveal delay={80} className="mt-8 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/30">
              <Icon size={26} />
            </span>
            <h1 className="font-sans text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              {category.name}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl font-sans text-[1rem] leading-relaxed text-mist sm:text-[1.125rem]">
              {category.blurb}
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/wholesale-program"
              className="group inline-flex items-center gap-2 rounded-full bg-ink py-2 pl-6 pr-2 font-sans text-[0.9375rem] font-medium text-canvas transition-opacity hover:opacity-90"
            >
              Request wholesale pricing
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-canvas text-ink">
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-paper px-6 py-2.5 font-sans text-[0.9375rem] text-mist transition-colors hover:border-white/30 hover:text-ink"
            >
              Get the product list
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Product lines */}
      <Section>
        <Reveal>
          <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
            What we distribute
          </p>
          <h2 className="mt-4 font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
            {category.name} product lines
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.highlights.map((line, i) => (
            <Reveal key={line} delay={(i % 3) * 80}>
              <div className="flex h-full items-center gap-3.5 rounded-[14px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-brand-gold/15 ring-1 ring-brand-gold/30">
                  <Check size={16} className="text-brand-gold" />
                </span>
                <span className="font-sans text-[1rem] font-medium text-ink">{line}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Other categories */}
      <Section>
        <Reveal>
          <h2 className="font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
            Explore other categories
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {others.map((c, i) => {
            const OtherIcon = icons[c.slug] ?? ShoppingBasket;
            return (
              <Reveal key={c.slug} delay={(i % 2) * 80}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="group flex items-center gap-4 rounded-[14px] border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/30">
                    <OtherIcon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-sans text-[1rem] font-semibold text-ink">{c.name}</span>
                    <span className="mt-0.5 block truncate font-sans text-[0.875rem] text-mist">
                      {c.blurb}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-brand-gold opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBanner
        title={`Stock ${category.name} at wholesale`}
        subtitle="Submit your application and we'll set you up with wholesale pricing and the full product list."
        ctaLabel="Join the wholesale program"
        ctaHref="/wholesale-program"
      />
    </>
  );
}
