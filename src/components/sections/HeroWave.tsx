"use client";

import { useEffect, useState } from "react";

/*
  HeroWave — a soft, flowing golden ribbon that anchors the centered hero
  (handhold.io-style). Each ribbon continuously morphs between wave shapes
  (SMIL) so the whole thing undulates like water, on top of a slow horizontal
  drift. Motion is disabled under prefers-reduced-motion.
*/

interface Ribbon {
  stroke: string;
  width: number;
  dur: string;
  values: string;
}

const ribbons: Ribbon[] = [
  {
    stroke: "url(#hw-gold)",
    width: 90,
    dur: "8s",
    values:
      "M-120 300 C 280 180 560 420 860 300 S 1360 180 1580 280;" +
      "M-120 320 C 280 250 560 360 860 300 S 1360 240 1580 300;" +
      "M-120 280 C 280 190 560 410 860 320 S 1360 150 1580 260;" +
      "M-120 300 C 280 180 560 420 860 300 S 1360 180 1580 280",
  },
  {
    stroke: "url(#hw-amber)",
    width: 64,
    dur: "11s",
    values:
      "M-120 370 C 340 270 720 470 1040 340 S 1420 250 1580 350;" +
      "M-120 350 C 340 320 720 400 1040 360 S 1420 300 1580 330;" +
      "M-120 390 C 340 280 720 450 1040 320 S 1420 240 1580 360;" +
      "M-120 370 C 340 270 720 470 1040 340 S 1420 250 1580 350",
  },
  {
    stroke: "url(#hw-pale)",
    width: 40,
    dur: "9.5s",
    values:
      "M-120 250 C 300 210 640 360 1000 250 S 1440 150 1580 240;" +
      "M-120 270 C 300 240 640 320 1000 270 S 1440 190 1580 250;" +
      "M-120 235 C 300 200 640 380 1000 235 S 1440 135 1580 225;" +
      "M-120 250 C 300 210 640 360 1000 250 S 1440 150 1580 240",
  },
];

const keyTimes = "0;0.34;0.67;1";
const keySplines = "0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1";

export function HeroWave({ className = "" }: { className?: string }) {
  // Start static (matches SSR) then enable motion after mount unless the user
  // prefers reduced motion — avoids a hydration mismatch.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // setTimeout (not rAF) so the state flips even if the tab starts hidden —
    // rAF is paused for hidden documents. Deferred call keeps lint happy.
    const id = setTimeout(() => setAnimate(true), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none ${className} ${
        animate ? "motion-safe:animate-[waveDrift_16s_ease-in-out_infinite]" : ""
      }`}
      style={{ filter: "blur(26px)" }}
    >
      <svg
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="hw-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hw-amber" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f59e0b" stopOpacity="0" />
            <stop offset="0.55" stopColor="#f97316" stopOpacity="0.75" />
            <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hw-pale" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fde68a" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fde68a" stopOpacity="0.8" />
            <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g fill="none" strokeLinecap="round">
          {ribbons.map((r, i) => {
            const first = r.values.split(";")[0];
            return (
              <path key={i} d={first} stroke={r.stroke} strokeWidth={r.width}>
                {animate && (
                  <animate
                    attributeName="d"
                    dur={r.dur}
                    repeatCount="indefinite"
                    values={r.values}
                    keyTimes={keyTimes}
                    calcMode="spline"
                    keySplines={keySplines}
                  />
                )}
              </path>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
