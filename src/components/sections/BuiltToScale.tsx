import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import Strands from "@/components/reactbits/Strands";
import { stats } from "@/lib/content";

/*
  Built to scale — the distribution model rendered as a hierarchy "tree" inside a
  Firecrawl-style code window (Geist Mono, hairline guides), over an ambient
  Strands animation tinted to the warm gold palette.
*/

type Line = {
  connector: string;
  name: string;
  kind: "root" | "branch" | "leaf";
  note?: string;
};

const tree: Line[] = [
  { connector: "", name: "OB Distributions/", kind: "root" },
  { connector: "├─ ", name: "sourcing/", kind: "branch" },
  { connector: "│  ├─ ", name: "top-brands", kind: "leaf", note: "high-demand SKUs" },
  { connector: "│  └─ ", name: "six-categories", kind: "leaf", note: "beauty → industrial" },
  { connector: "├─ ", name: "fulfillment/", kind: "branch" },
  { connector: "│  ├─ ", name: "bulk-ordering", kind: "leaf", note: "seamless reorders" },
  { connector: "│  └─ ", name: "fast-shipping", kind: "leaf", note: "reliable supply" },
  { connector: "└─ ", name: "growth/", kind: "branch" },
  { connector: "   ├─ ", name: "bulk-discounts", kind: "leaf", note: "volume pricing" },
  { connector: "   └─ ", name: "market-insights", kind: "leaf", note: "data-driven" },
];

export function BuiltToScale() {
  return (
    <section className="relative overflow-hidden border-y border-hairline">
      {/* Ambient strands, tinted warm to match the golden palette */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Strands
          colors={["#f97316", "#fbbf24", "#fde68a"]}
          count={3}
          speed={0.4}
          amplitude={1.1}
          waviness={1}
          thickness={0.7}
          glow={2.6}
          taper={3}
          spread={1}
          intensity={0.6}
          saturation={1.6}
          opacity={1}
          scale={1.7}
        />
      </div>
      {/* Scrim keeps copy legible over the animation */}
      <div className="pointer-events-none absolute inset-0 bg-canvas/55" />

      <Container className="relative py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Copy + stats */}
          <div>
            <Reveal>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-brand-gold">
                Built to scale
              </p>
              <h2 className="mt-4 max-w-xl font-sans text-[2rem] font-semibold leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.75rem]">
                One partner, every branch of your business
              </h2>
              <p className="mt-5 max-w-md font-sans text-[1.0625rem] leading-relaxed text-mist">
                Sourcing, fulfillment, and growth grow from a single trunk — so as
                you add categories and volume, the structure holds.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-sans text-[2rem] font-semibold leading-none text-ink sm:text-[2.5rem]">
                    {s.value}
                  </p>
                  <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mist">
                    {s.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* The tree, in a code window */}
          <Reveal delay={160}>
            <div className="overflow-hidden rounded-[12px] border border-hairline bg-paper shadow-[0_24px_60px_-30px_rgba(0,0,0,0.85)]">
              {/* Window chrome */}
              <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-hairline" />
                  <span className="h-2.5 w-2.5 rounded-full border border-hairline" />
                  <span className="h-2.5 w-2.5 rounded-full border border-hairline" />
                </span>
                <span className="font-mono text-[0.75rem] text-mist">distribution.tree</span>
              </div>
              {/* Tree body */}
              <div className="px-5 py-6 sm:px-7">
                <pre className="overflow-x-auto font-mono text-[0.8125rem] leading-[1.9] sm:text-[0.875rem]">
                  {tree.map((line) => (
                    <div key={line.name} className="whitespace-pre">
                      <span className="text-white/25">{line.connector}</span>
                      <span
                        className={
                          line.kind === "leaf"
                            ? "text-mist"
                            : line.kind === "branch"
                              ? "text-brand-gold"
                              : "font-medium text-ink"
                        }
                      >
                        {line.name}
                      </span>
                      {line.note ? (
                        <span className="text-white/30">{"  # " + line.note}</span>
                      ) : null}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
