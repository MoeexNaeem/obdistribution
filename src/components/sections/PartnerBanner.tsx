"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import MoltenMetal from "@/components/reactbits/MoltenMetal";
import MagicRings from "@/components/reactbits/MagicRings";

/*
  Partner With Purpose — the closing call-to-action card, backed by a molten
  (gold lava) shader with expanding magic rings glowing over it. The WebGL
  layers mount only after paint and stay off under prefers-reduced-motion,
  where a static gold glow stands in. A scrim keeps the copy readable.
*/
export function PartnerBanner() {
  const [fx, setFx] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setFx(true), 0);
    return () => clearTimeout(id);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = glowRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  return (
    <section
      className="relative overflow-hidden border-t border-hairline py-16 sm:py-24"
      onMouseMove={onMove}
    >
      {/* Gold glow that follows the cursor, behind the card */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(251,191,36,0.20), transparent 60%)",
        }}
      />
      <Container className="relative z-10">
        <Reveal>
          <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-[20px] border border-white/10">
            {/* Molten gold-lava base + magic rings */}
            {fx ? (
              <>
                <div className="absolute inset-0 z-0">
                  <MoltenMetal
                    color1="#2a1200"
                    color2="#f59e0b"
                    color3="#fff2cc"
                    colorMode="molten"
                    speed={0.3}
                    scale={4}
                    detail={3}
                    glow={1.6}
                    coreSize={0.1}
                    swirl={1}
                    fold={-0.2}
                    blackPoint={0.05}
                    brightness={1.15}
                    grain
                    grainIntensity={0.05}
                    mouseInteraction
                    mouseStrength={0.25}
                    opacity={0.95}
                  />
                </div>
                <div className="absolute inset-0 z-[1] mix-blend-screen">
                  <MagicRings
                    color="#fbbf24"
                    colorTwo="#f97316"
                    ringCount={6}
                    speed={0.8}
                    attenuation={10}
                    lineThickness={2}
                    baseRadius={0.35}
                    radiusStep={0.1}
                    scaleRate={0.1}
                    opacity={0.7}
                    noiseAmount={0.05}
                    ringGap={1.5}
                    parallax={0.03}
                  />
                </div>
              </>
            ) : (
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 80% at 50% 50%, rgba(249,115,22,0.28), transparent 70%), #120b02",
                }}
              />
            )}

            {/* Scrim — darkens the centre so the copy reads over the lava */}
            <div
              aria-hidden
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  "radial-gradient(70% 70% at 50% 50%, rgba(10,10,10,0.62), rgba(10,10,10,0.28))",
              }}
            />

            {/* Content */}
            <div className="relative z-10 px-6 py-14 text-center sm:px-10">
              <h2 className="mx-auto max-w-3xl font-sans text-[2rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[2.5rem]">
                Partner With Purpose
              </h2>
              <p className="mx-auto mt-5 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-white/80">
                Interested in stocking your store with high-demand products? Request our
                product list, discuss bulk orders, and get personalized wholesale pricing.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-white px-7 py-3 font-sans text-[0.9375rem] font-semibold text-canvas transition-opacity hover:opacity-90"
                >
                  Request Product List
                </Link>
                <Link
                  href={site.phoneHref}
                  className="font-sans text-[0.9375rem] font-medium text-white/90 transition-colors hover:text-white"
                >
                  Call {site.phone}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
