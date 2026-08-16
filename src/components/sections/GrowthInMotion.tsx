"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ShoppingCart,
  BadgePercent,
  Truck,
  LifeBuoy,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import Strands from "@/components/reactbits/Strands";
import { cn } from "@/lib/utils";

/*
  Services — "Everything You Need to Grow Your Retail Business" rendered as a
  sticky left index (heading + numbers + counting stats) beside a stack of
  feature cards that pin and pile on top of one another as you scroll, over an
  ambient Strands animation. Toggle/LaunchDarkly-style, in the dark/gold theme.
*/

interface Feature {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  panel: { label: string; value: string; corner: "tr" | "br" };
}

const features: Feature[] = [
  {
    n: "01",
    icon: BadgeCheck,
    title: "Trusted Brands",
    body: "We give retailers access to dependable brands and high-demand products that support consistent sales.",
    href: "/why-ob-distributions",
    panel: { label: "Brands", value: "50+", corner: "tr" },
  },
  {
    n: "02",
    icon: ShoppingCart,
    title: "Easy Ordering",
    body: "Our ordering process is designed to be simple, fast, and hassle-free for growing businesses.",
    href: "/contact",
    panel: { label: "Reorder", value: "1-click", corner: "br" },
  },
  {
    n: "03",
    icon: BadgePercent,
    title: "Bulk Pricing",
    body: "Get competitive wholesale pricing and stronger margins with volume-based purchasing.",
    href: "/contact",
    panel: { label: "Volume discount", value: "Up to 30%", corner: "tr" },
  },
  {
    n: "04",
    icon: Truck,
    title: "Reliable Supply",
    body: "Maintain steady inventory with dependable product availability and delivery support.",
    href: "/why-ob-distributions",
    panel: { label: "Core SKUs", value: "2000+", corner: "br" },
  },
  {
    n: "05",
    icon: LifeBuoy,
    title: "Retailer Support",
    body: "Our team is here to help with product guidance, orders, and ongoing supply needs.",
    href: "/contact",
    panel: { label: "Response", value: "< 24h", corner: "tr" },
  },
  {
    n: "06",
    icon: BarChart3,
    title: "Product Insights",
    body: "Use practical market knowledge to choose products that match customer demand.",
    href: "/about",
    panel: { label: "Best-sellers", value: "Top 10", corner: "br" },
  },
];

const metrics = [
  { value: 8, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Trusted Brands" },
  { value: 2000, suffix: "+", label: "Products Available" },
  { value: 200, suffix: "+", label: "Retail Partners" },
];

// Glassy card surface — translucent navbar tone + backdrop blur, so stacked
// cards frost the ones beneath and the strands behind them.
const CARD_BG = "bg-[#1c1c20]/70 backdrop-blur-xl";
// Sticky offset from the top of the viewport (clears the floating nav) + the
// per-card step that makes each stacked card peek below the one above it.
const STICK_TOP = 88;
const STEP = 14;

export function GrowthInMotion() {
  const [active, setActive] = useState(0);
  const [sub, setSub] = useState(0); // 0→1 progress of the incoming card, for the rail fill
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const vh = window.innerHeight;
      // A card becomes "active" once its top rises past this line — i.e. when it
      // has visually taken over the upper portion of the viewport, not only once
      // it reaches its final pinned offset. This keeps the index in sync with the
      // card the eye is actually reading.
      const line = vh * 0.42;
      let current = 0;
      for (let i = 0; i < refs.current.length; i++) {
        const el = refs.current[i];
        if (el && el.getBoundingClientRect().top <= line) current = i;
      }

      // Continuous progress of the next incoming card (line → 0..1) so the rail
      // fill glides between nodes instead of snapping.
      let s = 0;
      const next = refs.current[current + 1];
      if (next) {
        const nt = next.getBoundingClientRect().top;
        s = Math.min(Math.max((vh - nt) / (vh - line), 0), 1);
      }

      setActive((prev) => (prev === current ? prev : current));
      setSub((prev) => (Math.abs(prev - s) < 0.004 ? prev : s));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const id = requestAnimationFrame(compute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      cancelAnimationFrame(id);
    };
  }, []);

  const jump = (i: number) =>
    refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="relative border-t border-hairline">
      {/* Ambient strands — a viewport-height band that follows scroll behind the
          section; left-fade scrim keeps the copy legible. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 h-screen w-full">
          <div className="absolute inset-0 opacity-[0.55]">
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
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,10,10,0.92), rgba(10,10,10,0.42) 44%, rgba(10,10,10,0) 64%)",
            }}
          />
        </div>
      </div>

      <Container className="relative z-10 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.4fr] lg:gap-16">
          {/* Left: sticky heading + numbers + stats */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
                Services
              </p>
              <h2 className="mt-4 font-sans text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
                Everything You Need to Grow Your Retail Business
              </h2>
            </Reveal>

            {/* Progress rail — the six services threaded on a spine that fills
                gold to the card currently in view. No numbers; the fill is the
                sync indicator. */}
            <nav aria-label="Services" className="mt-8">
              {features.map((f, i) => {
                const on = active === i;
                const isFirst = i === 0;
                const isLast = i === features.length - 1;
                return (
                  <button
                    key={f.n}
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={on}
                    className="group grid w-full grid-cols-[18px_1fr] items-stretch gap-4 text-left"
                  >
                    <span className="relative flex justify-center">
                      {/* segment entering this node */}
                      {!isFirst && (
                        <span
                          className={cn(
                            "absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 transition-colors duration-200",
                            i <= active ? "bg-brand-gold" : "bg-hairline",
                          )}
                        />
                      )}
                      {/* segment leaving this node — fills continuously on the active row */}
                      {!isLast && (
                        <span className="absolute bottom-0 left-1/2 top-1/2 w-px -translate-x-1/2 bg-hairline">
                          <span
                            className="block w-px bg-brand-gold transition-[height] duration-150 ease-out"
                            style={{ height: i < active ? "100%" : on ? `${sub * 100}%` : "0%" }}
                          />
                        </span>
                      )}
                      {/* node */}
                      <span
                        className={cn(
                          "relative z-10 my-auto rounded-full ring-4 ring-canvas transition-all duration-200",
                          on
                            ? "h-3 w-3 bg-brand-gold shadow-[0_0_0_4px_rgba(251,191,36,0.16)]"
                            : i < active
                              ? "h-2.5 w-2.5 bg-brand-gold"
                              : "h-2.5 w-2.5 bg-[#3a3a42] group-hover:bg-mist/60",
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "py-3.5 font-sans text-[0.9375rem] transition-colors",
                        on
                          ? "font-medium text-ink"
                          : i < active
                            ? "text-mist"
                            : "text-mist/70 group-hover:text-ink",
                      )}
                    >
                      {f.title}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Counting stats — hairline-gridded to match the index panel */}
            <Reveal delay={120}>
              <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-hairline bg-hairline">
                {metrics.map((m) => (
                  <div key={m.label} className="bg-[#0c0c0e] px-4 py-4">
                    <dt className="font-sans text-[1.5rem] font-semibold leading-none tabular-nums text-ink">
                      <Counter value={m.value} suffix={m.suffix} />
                    </dt>
                    <dd className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-mist/60">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: pinned stacking cards */}
          <div className="relative">
            {/* Soft gold glow behind the stack */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-6 z-0 h-[360px]"
              style={{
                background:
                  "radial-gradient(55% 60% at 60% 15%, rgba(251,191,36,0.16), transparent 72%)",
                filter: "blur(24px)",
              }}
            />
            {features.map((f, i) => {
              const Icon = f.icon;
              const depth = active - i;
              const scale = depth > 0 ? Math.max(1 - depth * 0.03, 0.9) : 1;
              return (
                <article
                  key={f.n}
                  data-index={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  style={{
                    top: `${STICK_TOP + i * STEP}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "center top",
                  }}
                  className={cn(
                    "sticky relative z-10 mb-6 rounded-[16px] border border-white/12 p-5 sm:p-7",
                    CARD_BG,
                    "shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.09)]",
                    "transition-transform duration-300 will-change-transform scroll-mt-28",
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-gold/15 ring-1 ring-brand-gold/30">
                      <Icon size={18} className="text-brand-gold" />
                    </span>
                    <h3 className="font-sans text-[1.25rem] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[1.5rem]">
                      {f.title}
                    </h3>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center sm:gap-7">
                    <div>
                      <p className="font-sans text-[0.9375rem] leading-relaxed text-mist">
                        {f.body}
                      </p>
                      <Link
                        href={f.href}
                        className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-sans text-[0.875rem] font-medium text-ink transition-colors hover:border-ink"
                      >
                        Learn more
                        <ArrowRight
                          size={14}
                          className="text-brand-gold transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>

                    <IllustrationPanel feature={f} />
                  </div>
                </article>
              );
            })}
            {/* Tail room so the final card holds its pinned position for a beat
                before the stack releases (otherwise it snaps away instantly). */}
            <div aria-hidden className="h-[22vh]" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Counts up from 0 to `value` when scrolled into view. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        if (reduce) {
          setN(value);
          return;
        }
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function IllustrationPanel({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const cornerGlow =
    feature.panel.corner === "tr"
      ? "radial-gradient(60% 70% at 100% 0%, rgba(251,191,36,0.28), transparent 60%)"
      : "radial-gradient(60% 70% at 100% 100%, rgba(249,115,22,0.26), transparent 60%)";

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] border border-white/15 bg-canvas">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Cpath d='M36 0H0V36' fill='none' stroke='%2326262b' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: "36px 36px",
        }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: cornerGlow }} />
      <Icon
        size={132}
        strokeWidth={1}
        className="absolute -bottom-6 -right-4 text-white/[0.06]"
        aria-hidden
      />
      <div className="absolute bottom-4 left-4 rounded-[10px] border border-white/15 bg-[#1c1c20] px-4 py-3">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-mist">
          {feature.panel.label}
        </p>
        <p className="mt-1 font-sans text-[1.375rem] font-semibold leading-none text-brand-gold">
          {feature.panel.value}
        </p>
      </div>
    </div>
  );
}
