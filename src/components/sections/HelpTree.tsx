import { Boxes, Truck, BarChart3, Network, Check, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GlareCard } from "@/components/ui/GlareCard";
import { TreeBranches } from "@/components/sections/TreeBranches";
import { featureTabs } from "@/lib/content";

/*
  How we help you grow — a branching "tree": a central hub node with golden
  branches that grow down (animated on scroll-in) to three transparent glass
  leaf cards. Golden light glows on each side. The branches live in a fixed-
  height "canopy" so they connect hub → cards without margin-collapse gaps.
*/

const ICONS: Record<string, LucideIcon> = {
  boxes: Boxes,
  truck: Truck,
  chart: BarChart3,
};

function HubNode() {
  return (
    <div className="relative w-fit">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.55), transparent 70%)",
          filter: "blur(22px)",
        }}
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-[#16161a]/70 backdrop-blur-xl">
        <Network size={24} className="text-brand-gold" />
      </div>
    </div>
  );
}

export function HelpTree() {
  return (
    <section className="relative overflow-hidden border-t border-hairline py-20 sm:py-28">
      {/* Golden light glows on each side */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-48 h-[560px] w-[560px] -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.16), transparent 68%)",
          filter: "blur(30px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-48 h-[560px] w-[560px] -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.14), transparent 68%)",
          filter: "blur(30px)",
        }}
      />

      <Container className="relative z-10">
        {/* Heading */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              How We Help You Grow
            </p>
            <h2 className="mt-4 font-sans text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
              Smarter wholesale, from first order to full scale
            </h2>
          </div>
        </Reveal>

        <div className="mt-12">
          {/* Mobile hub */}
          <div className="mb-10 flex justify-center lg:hidden">
            <HubNode />
          </div>

          {/* Desktop canopy: hub + animated branches (fixed height → no gap) */}
          <div className="relative hidden h-[240px] w-full lg:block">
            <TreeBranches />
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
              <HubNode />
            </div>
          </div>

          {/* Leaf cards */}
          <div className="grid gap-6 sm:grid-cols-3">
            {featureTabs.map((tab, i) => {
              const Icon = tab.icon ? ICONS[tab.icon] : Boxes;
              return (
                <Reveal key={tab.id} delay={i * 90}>
                  <GlareCard className="h-full bg-[#141418]/55 p-7 backdrop-blur-xl">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-brand-gold/15 ring-1 ring-brand-gold/30">
                      <Icon size={22} className="text-brand-gold" />
                    </span>
                    <h3 className="mt-5 text-center font-sans text-[1.25rem] font-semibold leading-tight text-ink">
                      {tab.label}
                    </h3>
                    <p className="mt-3 text-center font-sans text-[0.9375rem] leading-relaxed text-mist">
                      {tab.description}
                    </p>
                    <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                      {tab.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <Check size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                          <span className="font-sans text-[0.875rem] text-mist">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </GlareCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
