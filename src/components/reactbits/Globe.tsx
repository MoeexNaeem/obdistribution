"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

/*
  Globe (COBE) — the 5KB WebGL globe, tuned for the OB dark/gold system.
  Gold markers on our trade hubs + gold arcs, gentle auto-rotation with
  drag-to-spin. Rendering pauses when scrolled off-screen and under
  prefers-reduced-motion; the WebGL context is released on unmount.
*/

type Marker = { location: [number, number]; size: number };

const MARKERS: Marker[] = [
  { location: [26.71, -80.06], size: 0.09 }, // West Palm Beach (HQ)
  { location: [40.71, -74.01], size: 0.05 }, // New York
  { location: [34.05, -118.24], size: 0.05 }, // Los Angeles
  { location: [51.51, -0.13], size: 0.05 }, // London
  { location: [25.2, 55.27], size: 0.05 }, // Dubai
  { location: [35.68, 139.65], size: 0.05 }, // Tokyo
  { location: [1.35, 103.82], size: 0.04 }, // Singapore
  { location: [-33.87, 151.21], size: 0.04 }, // Sydney
];

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  // Interaction / animation state kept in refs so the effect runs once.
  const phi = useRef(0);
  const widthRef = useRef(0);
  const pointerDown = useRef<number | null>(null);
  const rotationOffset = useRef(0);
  const visible = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    // Track the container width so the canvas backing store always matches its
    // displayed size (a plain window "resize" listener misses grid reflow and
    // the initial layout settle).
    widthRef.current = wrap.offsetWidth;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) widthRef.current = w;
    });
    ro.observe(wrap);

    // Pause rendering when the globe scrolls out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0.6,
      theta: 0.28,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 18000,
      mapBrightness: 5.4,
      mapBaseBrightness: 0.02,
      baseColor: [0.32, 0.32, 0.36],
      markerColor: [0.98, 0.75, 0.14], // brand gold
      glowColor: [0.18, 0.16, 0.11],
      markers: MARKERS,
      arcs: [
        { from: [26.71, -80.06], to: [51.51, -0.13] }, // WPB → London
        { from: [26.71, -80.06], to: [34.05, -118.24] }, // WPB → LA
        { from: [51.51, -0.13], to: [25.2, 55.27] }, // London → Dubai
        { from: [25.2, 55.27], to: [35.68, 139.65] }, // Dubai → Tokyo
        { from: [35.68, 139.65], to: [1.35, 103.82] }, // Tokyo → Singapore
        { from: [1.35, 103.82], to: [-33.87, 151.21] }, // Singapore → Sydney
      ],
      arcColor: [0.98, 0.75, 0.14],
      arcWidth: 0.45,
      arcHeight: 0.35,
    });

    // This cobe build has no internal render loop — we drive it ourselves so we
    // can auto-rotate, honour drag, resize, and pause off-screen / reduced-motion.
    let raf = 0;
    const render = () => {
      if (!reduced && visible.current && pointerDown.current === null) {
        phi.current += 0.0035;
      }
      globe.update({
        phi: phi.current + rotationOffset.current,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      raf = requestAnimationFrame(render);
    };
    render();

    // Drag to spin.
    const onPointerDown = (e: PointerEvent) => {
      pointerDown.current = e.clientX;
      canvas.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      pointerDown.current = null;
      canvas.style.cursor = "grab";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerDown.current === null) return;
      const delta = e.clientX - pointerDown.current;
      pointerDown.current = e.clientX;
      rotationOffset.current += delta / 200;
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    // Fade the canvas in once the first frame paints.
    const reveal = requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(reveal);
      cancelAnimationFrame(raf);
      globe.destroy();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        className="aspect-square h-full w-full cursor-grab touch-none opacity-0 transition-opacity duration-700"
        style={{ contain: "layout paint size" }}
      />
    </div>
  );
}

export default Globe;
