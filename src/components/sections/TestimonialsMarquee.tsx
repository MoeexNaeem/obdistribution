import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/content";

/*
  Testimonials — a single auto-scrolling marquee row of star-rated review cards
  over a warm gold glow. Drifts right-to-left and pauses on hover; content is
  duplicated so the loop is seamless.
*/

type Review = (typeof testimonials)[number];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({ t }: { t: Review }) {
  return (
    <figure className="w-[320px] shrink-0 rounded-[16px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md sm:w-[360px]">
      <div className="flex gap-1" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} className="text-brand-gold" fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-mist">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/15 font-sans text-[0.75rem] font-semibold text-brand-gold ring-1 ring-brand-gold/30">
          {initials(t.name)}
        </span>
        <div>
          <p className="font-sans text-[0.9375rem] font-semibold text-ink">{t.name}</p>
          <p className="mt-0.5 font-sans text-[0.8125rem] text-mist">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)";

function Row({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="group flex overflow-hidden"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <div
        className={cn(
          "flex w-max gap-5 py-1 will-change-transform group-hover:[animation-play-state:paused]",
          reverse
            ? "[animation:marquee_60s_linear_infinite_reverse]"
            : "[animation:marquee_60s_linear_infinite]",
        )}
      >
        {doubled.map((t, i) => (
          <ReviewCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsMarquee() {
  return (
    <section className="relative overflow-hidden border-t border-hairline py-20 sm:py-28">
      {/* Warm gold glow blooming from the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[460px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 118%, rgba(251,191,36,0.22), transparent 68%), radial-gradient(40% 80% at 78% 120%, rgba(249,115,22,0.14), transparent 66%)",
          filter: "blur(24px)",
        }}
      />

      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Testimonials
            </p>
            <h2 className="mt-4 font-sans text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
              Client feedback &amp; reviews
            </h2>
          </div>
        </Reveal>
      </Container>

      {/* Full-bleed marquee — a single auto-scrolling row */}
      <div className="relative z-10 mt-14">
        <Row items={testimonials} />
      </div>
    </section>
  );
}
