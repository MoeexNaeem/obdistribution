import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  Hero product card — a wholesale "order assistant" mockup that mirrors the
  ada.cx demo card structure (brand header + waveform, message body, pill CTA)
  reframed for B2B fulfillment. Flat surfaces, hairline border, rationed gold.
*/
export function HeroCard() {
  return (
    <div className="relative rounded-[16px] border border-hairline bg-paper p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] sm:p-7">
      {/* Header: brand + waveform */}
      <div className="flex items-center justify-between border-b border-hairline pb-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-hairline bg-canvas font-serif text-[0.875rem] font-bold text-brand-gold">
            M
          </span>
          <span className="font-serif text-[1.0625rem] font-bold text-ink">
            Meridian Retail
          </span>
        </div>
        {/* Gold waveform mark */}
        <span className="flex items-end gap-[3px]" aria-hidden>
          {[10, 16, 8, 14, 6].map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-brand-gold"
              style={{ height: `${h}px` }}
            />
          ))}
        </span>
      </div>

      {/* Body */}
      <div className="pt-5">
        <p className="font-sans text-[0.75rem] uppercase tracking-[0.16em] text-mist">
          Order assistant
        </p>
        <div className="mt-3 space-y-3 font-serif text-[1.0625rem] leading-relaxed text-ink">
          <p>Give me a second to pull up your account…</p>
          <p>
            Thanks for reaching out. I found your wholesale account linked to{" "}
            <span className="text-brand-gold">OB-2481</span>.
          </p>
          <p className="text-mist">
            Your bulk order — 12 SKUs across Beauty &amp; Grocery — ships in 2
            business days. How can I help today?
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex justify-end">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5 font-sans text-[0.875rem] font-medium text-canvas transition-opacity hover:opacity-90"
        >
          See a sample order
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-canvas text-ink">
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
