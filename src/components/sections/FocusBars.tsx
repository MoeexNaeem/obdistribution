"use client";

import { useEffect, useRef, useState } from "react";
import { focusAreas } from "@/lib/content";

/*
  Focus-area metrics (PRD §5.2): simple hairline tracks with a Brand Gold fill
  line. Labels in Arial 13px. The fill grows in when scrolled into view.
*/
export function FocusBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The gold fill grows in on view; reduced-motion CSS collapses the
    // transition to ~instant. State is set only in the async observer callback.
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
    <div ref={ref} className="space-y-8">
      {focusAreas.map((area, i) => (
        <div key={area.label}>
          <div className="flex items-baseline justify-between">
            <span className="text-fn uppercase tracking-[0.12em] text-mist">
              {area.label}
            </span>
            <span className="font-serif text-ink">{area.value}%</span>
          </div>
          <div className="mt-3 h-px w-full bg-hairline">
            <div
              className="h-px bg-brand-gold transition-[width] duration-1000 ease-out"
              style={{
                width: shown ? `${area.value}%` : "0%",
                transitionDelay: `${i * 120}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
