"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
  BlurHighlight — custom equivalent of the React Bits Pro "Blur Highlight" block.
  A paragraph that blurs in word-by-word as it scrolls into view, with selected
  phrases automatically highlighted in the brand gold. No Pro license required.
*/

export interface BlurHighlightProps {
  text: string;
  /** Phrases (case-insensitive) rendered in gold emphasis. */
  highlight?: string[];
  className?: string;
  /** Per-word stagger, ms. */
  stagger?: number;
  as?: React.ElementType;
}

type Token = { word: string; highlighted: boolean; isSpace: boolean; wordIndex: number };

function tokenize(text: string, highlight: string[]): Token[] {
  const words = text.split(/(\s+)/).filter((w) => w.length > 0);
  const normalizedHighlights = highlight.map((h) => h.toLowerCase());

  // Build a set of individual highlight words for fast lookup.
  const highlightWordSet = new Set<string>();
  normalizedHighlights.forEach((phrase) =>
    phrase.split(/\s+/).forEach((w) => highlightWordSet.add(w)),
  );

  // Assign a running index to non-space tokens so each word can be staggered
  // without mutating a counter during render.
  let wordIndex = -1;
  return words.map((word) => {
    if (/^\s+$/.test(word)) {
      return { word, highlighted: false, isSpace: true, wordIndex: -1 };
    }
    wordIndex += 1;
    const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
    return {
      word,
      highlighted: clean.length > 0 && highlightWordSet.has(clean),
      isSpace: false,
      wordIndex,
    };
  });
}

export function BlurHighlight({
  text,
  highlight = [],
  className,
  stagger = 40,
  as: Tag = "p",
}: BlurHighlightProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const tokens = useMemo(() => tokenize(text, highlight), [text, highlight]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Words blur in on view; reduced-motion CSS collapses the transition to
    // ~instant. State is set only in the async observer callback.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={cn(
        "font-serif text-[1.1875rem] leading-relaxed text-mist sm:text-[1.375rem]",
        className,
      )}
    >
      {tokens.map((token, i) => {
        if (token.isSpace) return <span key={i}>{token.word}</span>;
        const delay = inView ? token.wordIndex * stagger : 0;
        return (
          <span
            key={i}
            className={cn(
              "inline-block transition-[opacity,filter,transform] duration-[600ms] ease-out will-change-[opacity,filter,transform]",
              token.highlighted && "font-bold text-brand-gold",
            )}
            style={{
              transitionDelay: `${delay}ms`,
              opacity: inView ? 1 : 0,
              filter: inView ? "blur(0px)" : "blur(10px)",
              transform: inView ? "translateY(0)" : "translateY(0.25em)",
            }}
          >
            {token.word}
          </span>
        );
      })}
    </Component>
  );
}

export default BlurHighlight;
