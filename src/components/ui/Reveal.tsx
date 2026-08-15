"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal — subtle fade/rise as content scrolls into view. Editorial, not flashy
 * (no glow, no big movement). Honors prefers-reduced-motion.
 */
const HIDDEN: Record<string, string> = {
  up: "opacity-0 translate-y-5",
  down: "opacity-0 -translate-y-5",
  left: "opacity-0 -translate-x-8",
  right: "opacity-0 translate-x-8",
};

export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "down" | "left" | "right";
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced-motion users still get the reveal, but the global reduced-motion
    // CSS collapses the transition to ~instant. setState happens only in the
    // (async) observer callback, never synchronously in the effect body.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cast to any so @react-three/fiber's global JSX augmentation doesn't collapse
  // the polymorphic tag's children/props to `never`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform]",
        shown ? "opacity-100 translate-x-0 translate-y-0" : HIDDEN[from],
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
