import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/* Reusable closing CTA banner — glass panel + gold glow + white pill CTA. */
export function CtaBanner({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-[20px] border border-white/12 bg-white/[0.03] px-8 py-14 text-center backdrop-blur-md sm:px-10 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px]"
            style={{
              background:
                "radial-gradient(55% 100% at 50% 120%, rgba(251,191,36,0.18), transparent 68%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-sans text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[2.5rem]">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-mist">
              {subtitle}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-2 rounded-full bg-white py-2 pl-6 pr-2 font-sans text-[0.9375rem] font-semibold text-canvas transition-opacity hover:opacity-90"
              >
                {ctaLabel}
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-canvas text-white">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
