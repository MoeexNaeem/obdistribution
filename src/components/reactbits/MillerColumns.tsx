"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  MillerColumns — a Finder-style column browser for the catalog. Column 1 lists
  categories; hovering / selecting one reveals its product lines in column 2 and
  a detail panel in column 3, with a live breadcrumb path. On small screens the
  three panes stack into a drilled-down list. Engineered, not "card soup".
*/

export interface MillerItem {
  slug: string;
  name: string;
  blurb: string;
  lines: string[];
  icon?: React.ReactNode;
}

export function MillerColumns({
  items,
  ctaHref = "/wholesale-program",
  ctaLabel = "Request this line",
}: {
  items: MillerItem[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(items.length - 1);
    }
  };

  return (
    <div className="overflow-hidden rounded-[16px] border border-hairline bg-[#0c0c0e] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
      {/* Breadcrumb / window bar */}
      <div className="flex items-center justify-between gap-4 border-b border-hairline bg-[#141416] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-1.5 font-mono text-[0.75rem] text-mist/70">
          <span className="text-mist/40">~</span>
          <span className="text-mist/30">/</span>
          <span>catalog</span>
          <span className="text-mist/30">/</span>
          <span className="truncate text-brand-gold">{current.slug}</span>
        </div>
        <span className="hidden shrink-0 font-mono text-[0.7rem] text-mist/40 sm:block">
          {items.length} categories · {current.lines.length} lines
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Pane A — categories */}
        <div
          role="listbox"
          aria-label="Distribution categories"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="no-scrollbar py-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-brand-gold/40 md:max-h-[460px] md:overflow-y-auto"
        >
          {items.map((it, i) => {
            const on = i === active;
            return (
              <button
                key={it.slug}
                type="button"
                role="option"
                aria-selected={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                  on ? "bg-white/[0.05]" : "hover:bg-white/[0.025]",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-1/2 h-7 -translate-y-1/2 rounded-r bg-brand-gold transition-all",
                    on ? "w-[3px] opacity-100" : "w-0 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] border transition-colors",
                    on
                      ? "border-brand-gold/40 bg-brand-gold/15 text-brand-gold"
                      : "border-hairline text-mist group-hover:text-ink",
                  )}
                >
                  {it.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block truncate font-sans text-[0.9375rem] font-medium transition-colors",
                      on ? "text-ink" : "text-mist group-hover:text-ink",
                    )}
                  >
                    {it.name}
                  </span>
                  <span className="block font-mono text-[0.7rem] text-mist/40">
                    {it.lines.length} lines
                  </span>
                </span>
                <ChevronRight
                  size={15}
                  className={cn(
                    "shrink-0 transition-all",
                    on
                      ? "translate-x-0 text-brand-gold opacity-100"
                      : "-translate-x-1 text-mist/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Pane B — product lines ("files") */}
        <div className="border-t border-hairline md:border-l md:border-t-0">
          <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
            <FolderOpen size={14} className="text-brand-gold" />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist/50">
              {current.slug}/
            </span>
          </div>
          <ul className="no-scrollbar p-2 md:max-h-[411px] md:overflow-y-auto">
            {current.lines.map((line) => (
              <li key={line}>
                <div className="flex items-center gap-2.5 rounded-[8px] px-3 py-2.5 text-mist transition-colors hover:bg-white/[0.035] hover:text-ink">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-gold/70" />
                  <span className="font-sans text-[0.875rem]">{line}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pane C — detail */}
        <div className="flex flex-col border-t border-hairline p-6 md:border-l md:border-t-0">
          <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/30">
            {current.icon}
          </span>
          <h3 className="mt-5 font-sans text-[1.25rem] font-semibold leading-tight text-ink">
            {current.name}
          </h3>
          <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-mist">
            {current.blurb}
          </p>
          <div className="mt-6 flex items-center gap-2 font-mono text-[0.72rem] text-mist/50">
            <Folder size={13} className="text-mist/40" />
            {current.lines.length} product lines in stock
          </div>
          <div className="mt-auto pt-8">
            <Link
              href={ctaHref}
              className="group/link inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 font-sans text-[0.875rem] font-medium text-ink transition-colors hover:border-white/30"
            >
              {ctaLabel}
              <ArrowUpRight
                size={15}
                className="text-brand-gold transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MillerColumns;
