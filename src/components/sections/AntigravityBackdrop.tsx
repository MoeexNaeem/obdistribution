"use client";

import { useEffect, useState } from "react";
import Antigravity from "@/components/reactbits/Antigravity";

/*
  Client wrapper for the Antigravity field: mounts only after paint (WebGL is
  client-only) and stays unmounted under prefers-reduced-motion. Tuned subtle
  and gold to sit professionally behind the About section.
*/
export function AntigravityBackdrop() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setOn(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!on) return null;

  return (
    <Antigravity
      color="#fbbf24"
      autoAnimate
      count={300}
      magnetRadius={6}
      ringRadius={7}
      waveSpeed={0.4}
      waveAmplitude={1}
      particleSize={1.5}
      lerpSpeed={0.05}
      particleVariance={1}
      rotationSpeed={0}
      depthFactor={1}
      pulseSpeed={3}
      particleShape="capsule"
      fieldStrength={10}
    />
  );
}
