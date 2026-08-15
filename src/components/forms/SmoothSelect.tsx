"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  SmoothSelect — a custom, accessible listbox that replaces the native <select>
  so the dropdown matches the dark/gold system and opens/closes smoothly.

  It writes the chosen value into a hidden <input name=…> so the existing
  FormData flow (fd.get(name)) and server-side zod validation keep working
  unchanged. Keyboard: Enter/Space/↓ open, ↑/↓ move, Enter select, Esc close,
  type-ahead by first letter. Closes on outside click.
*/

export interface SelectOption {
  value: string;
  label: string;
}

export function SmoothSelect({
  id,
  name,
  options,
  placeholder,
  invalid,
}: {
  id: string;
  name: string;
  options: readonly SelectOption[];
  placeholder: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0); // highlighted index while open
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listboxId = useId();

  const selected = options.find((o) => o.value === value) ?? null;

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (open) optionRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openWith = (index: number) => {
    setActive(index >= 0 ? index : 0);
    setOpen(true);
  };

  const choose = (index: number) => {
    const opt = options[index];
    if (!opt) return;
    setValue(opt.value);
    setActive(index);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openWith(selected ? options.indexOf(selected) : 0);
        else setActive((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openWith(selected ? options.indexOf(selected) : 0);
        else setActive((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else openWith(selected ? options.indexOf(selected) : 0);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        // Type-ahead: jump to the first option starting with the typed letter.
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const i = options.findIndex((o) =>
            o.label.toLowerCase().startsWith(e.key.toLowerCase()),
          );
          if (i >= 0) {
            if (!open) setOpen(true);
            setActive(i);
          }
        }
    }
  };

  return (
    <div ref={rootRef} className="relative">
      {/* Value carrier for FormData + server validation */}
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => (open ? setOpen(false) : openWith(selected ? options.indexOf(selected) : 0))}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-[10px] border bg-canvas px-4 py-3 text-left",
          "font-sans text-[0.9375rem] transition-colors hover:border-white/25",
          "focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/25",
          open && "border-brand-gold ring-1 ring-brand-gold/25",
          !open && (invalid ? "border-brand-gold/60" : "border-white/12"),
          selected ? "text-ink" : "text-mist/60",
        )}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 text-mist transition-transform duration-200",
            open && "rotate-180 text-brand-gold",
          )}
        />
      </button>

      {/* Panel — animated open/close, no hard mount flip */}
      <div
        className={cn(
          "absolute left-0 right-0 top-[calc(100%+8px)] z-40 origin-top",
          "transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={open ? `${listboxId}-${active}` : undefined}
          className={cn(
            "no-scrollbar max-h-60 overflow-y-auto rounded-[12px] border border-white/12 bg-[#1c1c20] p-1.5",
            "shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.06),0_20px_50px_-20px_rgba(0,0,0,0.85)]",
          )}
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            const isActive = i === active;
            return (
              <li
                key={o.value}
                id={`${listboxId}-${i}`}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 rounded-[8px] px-3 py-2.5",
                  "font-sans text-[0.9375rem] transition-colors",
                  isActive ? "bg-white/[0.07] text-ink" : "text-mist",
                  isSelected && "text-brand-gold",
                )}
              >
                <span className="truncate">{o.label}</span>
                {isSelected ? <Check size={15} className="shrink-0 text-brand-gold" /> : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
