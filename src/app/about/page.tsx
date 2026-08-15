import type { Metadata } from "next";
import { ShieldCheck, HeartHandshake, Gem, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlareCard } from "@/components/ui/GlareCard";
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
const from = ["left", "up", "right"] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About OB Distributions"
        title="Your trusted wholesale partner"
        subtitle="We help retailers and businesses source dependable products, competitive pricing, and reliable support built for long-term growth."
      />

      {/* Values — glass cards, each from a different direction */}
      <Section>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Our Values
            </p>
            <h2 className="mt-4 font-sans text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
              What guides the way we work
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, i) => {
            const Icon = valueIcons[i] ?? ShieldCheck;
            return (
              <Reveal key={value.title} from={from[i] ?? "up"} delay={i * 80}>
                <GlareCard className="h-full bg-[#141416] p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-brand-gold/15 ring-1 ring-brand-gold/30">
                    <Icon size={20} className="text-brand-gold" />
                  </span>
                  <h3 className="mt-5 font-sans text-[1.25rem] font-semibold leading-tight text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-mist">
                    {value.body}
                  </p>
                </GlareCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Focus areas — animated hairline bars */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal from="left">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Where We Focus
            </p>
            <h2 className="mt-4 max-w-md font-sans text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
              Built around what retailers need most
            </h2>
            <p className="mt-5 max-w-md font-sans text-[1.0625rem] leading-relaxed text-mist">
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
