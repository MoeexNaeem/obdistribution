"use client";

import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/content";

/*
  FAQ accordion (PRD §5.3): horizontal hairline rules, no background fills on
  expansion — just pure typographic flow. Questions in Times 19px bold.
*/
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-hairline">
      {faqs.map((faq, i) => (
        <FaqRow
          key={faq.q}
          question={faq.q}
          answer={faq.a}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
          index={i}
        />
      ))}
    </div>
  );
}

function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-hairline">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-body-${index}`}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-sans text-[1.0625rem] font-semibold text-ink">
            {question}
          </span>
          <span className="shrink-0 text-brand-gold" aria-hidden>
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
          </span>
        </button>
      </h3>
      <div
        id={`faq-body-${index}`}
        role="region"
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p ref={bodyRef} className="pb-6 pr-10 font-sans text-[0.9375rem] leading-relaxed text-mist">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
