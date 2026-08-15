import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlareCard } from "@/components/ui/GlareCard";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { differentiators } from "@/lib/content";

export const metadata: Metadata = {
  title: "Why OB Distributions",
  description:
    "What sets OB Distributions apart: one partner for every category, pricing that scales, a reliable supply chain, and insight-led buying. Plus answers to common wholesale questions.",
};

const from = ["left", "right", "left", "right"] as const;

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why OB Distributions"
        title="What sets us apart"
        subtitle="Retailers choose OB Distributions because wholesale should be simple, dependable, and built to grow with your business."
      />

      {/* Differentiators — glass cards */}
      <Section>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              The Difference
            </p>
            <h2 className="mt-4 font-sans text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
              Four reasons partners stay
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} from={from[i] ?? "up"} delay={(i % 2) * 90}>
              <GlareCard className="h-full bg-[#141416] p-7 sm:p-8">
                <span className="font-sans text-[0.8125rem] font-medium tracking-[0.1em] text-brand-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-sans text-[1.375rem] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[1.625rem]">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-[1rem] leading-relaxed text-mist">
                  {item.body}
                </p>
              </GlareCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal from="left">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Common Questions
            </p>
            <h2 className="mt-4 max-w-xs font-sans text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
              Most popular questions
            </h2>
            <p className="mt-5 max-w-sm font-sans text-[1.0625rem] leading-relaxed text-mist">
              The questions retailers ask us most about our wholesale services, pricing,
              and process.
            </p>
          </Reveal>
          <Reveal from="right" delay={120}>
            <FaqAccordion />
          </Reveal>
        </div>
      </Section>

      <CtaBanner
        title="Get access to our product list"
        subtitle="Apply to the wholesale program to discuss bulk orders and get personalized pricing."
        ctaLabel="Join the wholesale program"
        ctaHref="/wholesale-program"
      />
    </>
  );
}
