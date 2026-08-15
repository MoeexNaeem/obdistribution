import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HeroWave } from "@/components/sections/HeroWave";
import { GrowthInMotion } from "@/components/sections/GrowthInMotion";
import { AboutSpotlight } from "@/components/sections/AboutSpotlight";
import { HelpTree } from "@/components/sections/HelpTree";
import { TestimonialsMarquee } from "@/components/sections/TestimonialsMarquee";
import { CategoriesMenu } from "@/components/sections/CategoriesMenu";
import { PartnerBanner } from "@/components/sections/PartnerBanner";
import { BlurHighlight } from "@/components/reactbits/BlurHighlight";

export default function HomePage() {
  return (
    <>
      {/* ── Hero (handhold.io-style: centered + flowing wave) ─ */}
      <section className="relative overflow-hidden border-b border-hairline">
        <Container className="relative z-10 pt-20 pb-28 text-center sm:pt-28 sm:pb-36">
          <Reveal className="mx-auto flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-paper px-4 py-1.5 font-sans text-[0.8125rem] text-mist">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              Trusted wholesale distributor
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mx-auto mt-7 max-w-3xl text-balance font-serif text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[3.5rem]">
              A wholesale partner
              <br className="hidden sm:block" /> for every retailer
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-mist sm:text-[1.1875rem]">
              Top brands and high-demand products, bulk ordering, and reliable
              fulfillment — all from one trusted partner, built to scale.
            </p>
          </Reveal>
          <Reveal
            delay={260}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/wholesale-program"
              className="group inline-flex items-center gap-2 rounded-full bg-ink py-2 pl-6 pr-2 font-sans text-[0.9375rem] font-medium text-canvas transition-opacity hover:opacity-90"
            >
              Wholesale Program
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-canvas text-ink">
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="/why-ob-distributions"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-paper px-6 py-2.5 font-sans text-[0.9375rem] text-mist transition-colors hover:border-white/30 hover:text-ink"
            >
              Why OB Distributions
            </Link>
          </Reveal>
        </Container>

        {/* Flowing golden wave — raised so it sits behind the CTAs */}
        <HeroWave className="absolute inset-x-0 bottom-0 z-0 h-[78%] w-full" />
      </section>

      {/* ── Growth in Motion: sticky index + scrolling feature stack ─ */}
      <GrowthInMotion />

      {/* ── About Us: spotlight glare grid ─────────────────── */}
      <AboutSpotlight />

      {/* ── How we help you grow: branching tree ───────────── */}
      <HelpTree />

      {/* ── Distribution categories: FlowingMenu ──────────── */}
      <CategoriesMenu />

      {/* ── Statement: BlurHighlight ──────────────────────── */}
      <Section>
        <div className="max-w-4xl">
          <BlurHighlight
            text="We connect you with top brands and in-demand products across every category. We make it easy for retailers to buy wholesale, stay competitive, and grow profitably — all from one trusted platform."
            highlight={["top brands", "wholesale", "grow", "profitably", "trusted"]}
          />
        </div>
      </Section>

      {/* ── Testimonials: two-row auto-scrolling marquee ─────── */}
      <TestimonialsMarquee />

      {/* ── Partner With Purpose: molten + magic-rings card ─── */}
      <PartnerBanner />
    </>
  );
}
