import Link from "next/link";
import { ArrowRight, Target, Layers, Gem, Eye, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GlareCard } from "@/components/ui/GlareCard";
import { AntigravityBackdrop } from "@/components/sections/AntigravityBackdrop";

/*
  About Us — a spotlight feature grid: two glare cards on each side flanking a
  dark centre "philosophy" card, modeled on the attached reference. On hover a
  soft glare follows the cursor across each card.
*/

const sideCards = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To help retailers and businesses grow by providing access to trusted brands, high-demand products, and dependable wholesale supply.",
  },
  {
    icon: Layers,
    title: "Operational Strength",
    body: "We simplify wholesale operations through organized sourcing, smooth order handling, dependable coordination, and reliable delivery support.",
  },
  {
    icon: Gem,
    title: "Core Values",
    body: "We believe in reliability, transparency, consistent supply, and strong customer support so our partners can grow with confidence.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To become a trusted wholesale partner for businesses seeking quality products, steady supply, and long-term growth.",
  },
];

function SideCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Target;
  title: string;
  body: string;
}) {
  return (
    <GlareCard className="bg-[#141416] p-6 sm:p-7">
      <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-brand-gold/15 ring-1 ring-brand-gold/30">
        <Icon size={20} className="text-brand-gold" />
      </span>
      <h3 className="mt-5 font-sans text-[1.25rem] font-semibold leading-tight text-ink">
        {title}
      </h3>
      <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-mist">{body}</p>
    </GlareCard>
  );
}

export function AboutSpotlight() {
  return (
    <section className="relative overflow-hidden border-t border-hairline py-16 sm:py-24">
      {/* Antigravity particle field — ambient, gold, behind the content */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <AntigravityBackdrop />
      </div>
      {/* Scrim keeps the copy and cards crisp over the field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-canvas/45" />

      <Container className="relative z-10">
        {/* Heading */}
        <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
            About Us
          </p>
          <h2 className="mt-4 font-sans text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            Your Trusted Wholesale{" "}
            <span className="text-brand-gold">Distribution Partner</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-mist">
            Reliable supply, transparent partnership, and dependable support — so
            retailers and businesses can grow with confidence.
          </p>
        </div>
      </Reveal>

      {/* Spotlight grid — each card animates in from a different direction */}
      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_1.3fr_1fr]">
        {/* Left column */}
        <div className="grid gap-6">
          <Reveal from="left">
            <SideCard {...sideCards[0]} />
          </Reveal>
          <Reveal from="down" delay={80}>
            <SideCard {...sideCards[1]} />
          </Reveal>
        </div>

        {/* Centre — philosophy spotlight */}
        <Reveal from="up" delay={100} className="order-first lg:order-none">
          <GlareCard
            glare="rgba(255,255,255,0.10)"
            className="h-full border-white/10"
          >
            <div
              className="flex h-full flex-col items-center justify-center p-8 text-center sm:p-10"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 118%, rgba(251,191,36,0.20), transparent 58%), #0d0d0f",
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-brand-gold">
                <Sparkles size={13} />
                Our Philosophy
              </span>
              <h3 className="mt-6 max-w-md font-sans text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.25rem]">
                Simple, reliable, sustainable growth.
              </h3>
              <p className="mt-5 max-w-md font-sans text-[1rem] leading-relaxed text-white/70 sm:text-[1.0625rem]">
                We work closely with retailers and businesses to provide trusted
                products, dependable supply, and responsive support — helping our
                partners stay stocked, serve customers better, and grow with
                confidence.
              </p>
              <Link
                href="/about"
                className="group/cta mt-8 inline-flex items-center gap-2 rounded-full bg-ink py-2.5 pl-6 pr-2 font-sans text-[0.9375rem] font-medium text-canvas transition-opacity hover:opacity-90"
              >
                About OB Distributions
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-canvas text-ink">
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/cta:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>
          </GlareCard>
        </Reveal>

        {/* Right column */}
        <div className="grid gap-6">
          <Reveal from="right">
            <SideCard {...sideCards[2]} />
          </Reveal>
          <Reveal from="up" delay={80}>
            <SideCard {...sideCards[3]} />
          </Reveal>
        </div>
        </div>
      </Container>
    </section>
  );
}
