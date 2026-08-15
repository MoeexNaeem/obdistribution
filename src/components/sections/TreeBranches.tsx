"use client";

import { useEffect, useRef, useState } from "react";

/*
  TreeBranches — the golden branches of the HelpTree, drawn from the hub down to
  the three cards. Each branch "grows" (stroke-dashoffset draw-in) when the
  section scrolls into view; the tip nodes fade in once the branches arrive.
  Fills its (fixed-height) canopy container; viewBox x maps to the 3-col grid.
*/
export function TreeBranches() {
  const ref = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setOn(true), 0);
      return () => clearTimeout(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const draw = (delay: number): React.CSSProperties => ({
    strokeDasharray: "1",
    strokeDashoffset: on ? "0" : "1",
    transition: `stroke-dashoffset 1.1s cubic-bezier(0.33,1,0.68,1) ${delay}s`,
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 240"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ filter: "drop-shadow(0 0 10px rgba(251,191,36,0.45))" }}
    >
      <defs>
        <linearGradient id="ht-branch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.55" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#ht-branch)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        {/* Three main branches: hub (600,58) → card centres at y=240. The middle
            branch has a slight bow so it isn't a degenerate vertical bezier
            (which some renderers drop when animated via pathLength/dash). */}
        <path pathLength={1} d="M600 58 C 600 120 290 130 192 240" style={draw(0)} />
        <path pathLength={1} d="M600 58 C 597 132 603 188 600 240" style={draw(0.18)} />
        <path pathLength={1} d="M600 58 C 600 120 910 130 1008 240" style={draw(0.36)} />
        {/* Organic twigs */}
        <path
          pathLength={1}
          d="M430 138 C 400 160 388 180 376 208"
          strokeWidth="1.2"
          style={draw(0.55)}
        />
        <path
          pathLength={1}
          d="M770 138 C 800 160 812 180 824 208"
          strokeWidth="1.2"
          style={draw(0.68)}
        />
      </g>
      <g
        fill="#fbbf24"
        style={{ opacity: on ? 1 : 0, transition: "opacity 0.5s ease 1s" }}
      >
        <circle cx="600" cy="58" r="3.5" />
        <circle cx="192" cy="238" r="3.5" />
        <circle cx="600" cy="238" r="3.5" />
        <circle cx="1008" cy="238" r="3.5" />
      </g>
    </svg>
  );
}
