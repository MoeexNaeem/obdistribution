"use client";

import { useEffect, useRef, useState } from "react";
import { Boxes, TrendingUp, Zap, Handshake, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { focusAreas } from "@/lib/content";

/*
  Focus areas (About page) — the pillars we hold ourselves to, as a clean
  hairline ledger: gold-marked title + supporting line, staggered fade-in on
  scroll. No metrics or percentages — just the commitments themselves.
*/

const icons: LucideIcon[] = [Boxes, TrendingUp, Zap, Handshake];

export function FocusBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="border-t border-hairline">
      {focusAreas.map((area, i) => {
        const Icon = icons[i] ?? Boxes;
        return (
          <div
            key={area.label}
            className={cn(
              "flex items-start gap-4 border-b border-hairline py-6 transition-all duration-700 ease-out sm:gap-5",
              shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-brand-gold/10 ring-1 ring-brand-gold/25">
              <Icon size={17} className="text-brand-gold" />
            </span>
            <div>
              <h3 className="font-sans text-[1.0625rem] font-semibold leading-tight text-ink">
                {area.label}
              </h3>
              <p className="mt-1.5 font-sans text-[0.9375rem] leading-relaxed text-mist">
                {area.blurb}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
