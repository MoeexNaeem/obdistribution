"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/*
  GlareCard — a card with a soft light "glare" that follows the cursor on hover
  (a radial highlight positioned at the pointer). Used for the About spotlight
  grid. The glare colour is configurable so the dark centre card can glow white
  while the side cards glow gold.
*/
export function GlareCard({
  children,
  className,
  glare = "rgba(251,191,36,0.14)",
}: {
  children: React.ReactNode;
  className?: string;
  glare?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-[16px] border border-white/10",
        "transition-colors duration-300 hover:border-white/25",
        className,
      )}
    >
      {/* Cursor-following glare */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), ${glare}, transparent 65%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}
