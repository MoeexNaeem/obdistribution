import type { Metadata } from "next";
import { ShieldCheck, BadgePercent, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { NodeSpine, type SpineItem } from "@/components/reactbits/NodeSpine";
import { WholesaleForm } from "@/components/forms/WholesaleForm";

export const metadata: Metadata = {
  title: "Wholesale Program",
  description:
    "Join the OB Distributions Wholesale Program for exclusive access to premium products, competitive bulk pricing, and reliable supply. Submit your wholesale application.",
};

const perks = [
  {
    icon: ShieldCheck,
    title: "Trusted brands",
    body: "Carefully selected products from dependable brands your customers already want.",
  },
  {
    icon: BadgePercent,
    title: "Competitive pricing",
    body: "Volume-based wholesale rates that protect your margin as you grow.",
  },
  {
    icon: Truck,
    title: "Reliable supply",
    body: "A steady supply chain that keeps your shelves stocked year-round.",
  },
];

export default function WholesaleProgramPage() {
  const perkItems: SpineItem[] = perks.map((p) => {
    const Icon = p.icon;
    return { title: p.title, body: p.body, icon: <Icon size={16} /> };
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
          style={{
            background:
              "radial-gradient(50% 100% at 50% 0%, rgba(251,191,36,0.14), transparent 70%)",
          }}
        />
        <Container className="relative py-20 text-center sm:py-24">
          <Reveal className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-paper px-4 py-1.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-brand-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
              Wholesale Program
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mx-auto mt-6 max-w-2xl font-sans text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              Join our wholesale program
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-5 max-w-xl font-sans text-[1rem] leading-relaxed text-mist sm:text-[1.0625rem]">
              Unlock exclusive access to premium products, competitive bulk pricing, and
              reliable support that helps your business grow.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Intro + perks */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal from="left">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Why join
            </p>
            <h2 className="mt-4 max-w-xl font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
              Built to make your business more profitable
            </h2>
            <div className="mt-6 space-y-4 font-sans text-[1.0625rem] leading-relaxed text-mist">
              <p>
                At OB Distributions, our Wholesale Program is built to make your job easier
                and your business more profitable. You gain access to carefully selected
                products from trusted brands, competitive wholesale pricing, and a reliable
                supply chain that keeps your shelves stocked year-round.
              </p>
              <p>
                Our team works closely with retailers like you — understanding your needs,
                recommending top-selling products, and helping you stay ahead of market
                trends. From a small store expanding its selection to a large retailer
                needing consistent restocks, we provide the tools and support to keep your
                customers coming back.
              </p>
              <p>
                Joining is simple — submit your application below, request our product list,
                and start ordering at wholesale rates.
              </p>
            </div>
          </Reveal>

          <Reveal from="right" delay={120} className="self-center">
            <NodeSpine items={perkItems} />
          </Reveal>
        </div>
      </Section>

      {/* Application form */}
      <Section id="apply">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Application
            </p>
            <h2 className="mt-4 font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
              Submit your wholesale application
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-sans text-[0.9375rem] leading-relaxed text-mist sm:text-[1rem]">
              Tell us about your business and we&apos;ll set you up with wholesale pricing
              and the full product list.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-[20px] border border-white/12 bg-white/[0.03] p-6 backdrop-blur-md sm:p-10">
            <WholesaleForm />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
