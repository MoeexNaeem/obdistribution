import type { Metadata } from "next";
import { ShieldCheck, HeartHandshake, Gem, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { NodeSpine, type SpineItem } from "@/components/reactbits/NodeSpine";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FocusBars } from "@/components/sections/FocusBars";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "OB Distributions is a trusted B2B wholesale distributor helping retailers source dependable products, competitive pricing, and reliable support for long-term growth.",
};

const valueIcons: LucideIcon[] = [ShieldCheck, HeartHandshake, Gem];

export default function AboutPage() {
  const spineItems: SpineItem[] = values.map((v, i) => {
    const Icon = valueIcons[i] ?? ShieldCheck;
    return { title: v.title, body: v.body, icon: <Icon size={16} /> };
  });

  return (
    <>
      <PageHero
        eyebrow="About OB Distributions"
        title="Your trusted wholesale partner"
        subtitle="We help retailers and businesses source dependable products, competitive pricing, and reliable support built for long-term growth."
      />

      {/* Values — a node/branch ledger of principles */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal from="left">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Our Values
            </p>
            <h2 className="mt-4 max-w-sm font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
              What guides the way we work
            </h2>
            <p className="mt-5 max-w-sm font-sans text-[1rem] leading-relaxed text-mist sm:text-[1.0625rem]">
              Three principles run through every order, every partnership, and every
              decision we make as a distributor.
            </p>
          </Reveal>
          <Reveal from="right" delay={120}>
            <NodeSpine items={spineItems} />
          </Reveal>
        </div>
      </Section>

      {/* Focus areas — animated hairline bars */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal from="left">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Where We Focus
            </p>
            <h2 className="mt-4 max-w-md font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
              Built around what retailers need most
            </h2>
            <p className="mt-5 max-w-md font-sans text-[1rem] leading-relaxed text-mist sm:text-[1.0625rem]">
              Every part of our operation is measured against one question: does it help
              our partners stock the right products and grow? These are the areas we hold
              ourselves to.
            </p>
          </Reveal>
          <Reveal from="right" delay={120} className="lg:pt-2">
            <FocusBars />
          </Reveal>
        </div>
      </Section>

      <CtaBanner
        title="Let's build a lasting partnership"
        subtitle="Reliable supply, competitive pricing, and support that scales with you."
        ctaLabel="Join the wholesale program"
        ctaHref="/wholesale-program"
      />
    </>
  );
}
