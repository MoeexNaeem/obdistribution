"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Boxes, Truck, BarChart3, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Icons are resolved from string keys here (in the client boundary) rather than
  passed as component functions from a server component — functions cannot cross
  the server/client boundary.
*/
const ICONS: Record<string, LucideIcon> = {
  boxes: Boxes,
  truck: Truck,
  chart: BarChart3,
};

/*
  FeaturesTabs — custom equivalent of the React Bits Pro "Features 4" block.
  Auto-cycling tabbed interface: each tab has a title, blurb, and a feature list.
  A gold progress line tracks the active tab; auto-advance pauses on hover/focus.
*/

export interface FeatureTab {
  id: string;
  label: string;
  title: string;
  description: string;
  points: string[];
  /** Key into the local ICONS registry (e.g. "boxes"). */
  icon?: string;
}

export interface FeaturesTabsProps {
  tabs: FeatureTab[];
  /** Auto-advance interval, ms. Set 0 to disable. */
  interval?: number;
  className?: string;
}

export function FeaturesTabs({ tabs, interval = 5000, className }: FeaturesTabsProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setProgress(0);
    startRef.current = 0;
  }, []);

  useEffect(() => {
    if (!interval || paused) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const step = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / interval, 1);
      setProgress(p);
      if (p >= 1) {
        startRef.current = 0;
        setActive((a) => (a + 1) % tabs.length);
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = 0;
    };
  }, [interval, paused, tabs.length, active]);

  const activeTab = tabs[active];

  return (
    <div
      className={cn("grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Tab rail */}
      <div role="tablist" aria-label="Features" className="flex flex-col">
        {tabs.map((tab, i) => {
          const isActive = i === active;
          const Icon = tab.icon ? ICONS[tab.icon] : undefined;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => goTo(i)}
              className={cn(
                "group relative w-full border-t border-hairline py-5 pl-5 pr-4 text-left last:border-b",
                "transition-colors",
                isActive ? "text-ink" : "text-mist hover:text-ink",
              )}
            >
              {/* Active progress line on the left edge */}
              <span className="absolute left-0 top-0 h-full w-[2px] bg-hairline" aria-hidden>
                {isActive && (
                  <span
                    className="block w-full bg-brand-gold"
                    style={{ height: `${progress * 100}%` }}
                  />
                )}
              </span>
              <span className="flex items-center gap-3">
                {Icon ? (
                  <Icon
                    size={18}
                    className={cn(isActive ? "text-brand-gold" : "text-mist")}
                  />
                ) : null}
                <span className="font-serif text-[1.1875rem] font-bold">{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`panel-${activeTab.id}`}
        aria-labelledby={`tab-${activeTab.id}`}
        key={activeTab.id}
        className="rounded-[12px] border border-hairline bg-paper p-8 sm:p-10 [animation:fadeIn_0.5s_ease]"
      >
        <h3 className="font-serif text-[1.5rem] font-bold leading-tight text-ink sm:text-[2rem]">
          {activeTab.title}
        </h3>
        <p className="mt-4 font-serif text-[1rem] leading-relaxed text-mist sm:text-[1.1875rem]">
          {activeTab.description}
        </p>
        <ul className="mt-7 space-y-4">
          {activeTab.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <Check size={18} className="mt-1 shrink-0 text-brand-gold" />
              <span className="font-serif text-[1rem] text-mist">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FeaturesTabs;
