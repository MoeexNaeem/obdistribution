import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Wordmark + geometric gold monogram. Gold is permitted on logo marks (PRD §3.1).
 * Monoline, flat — no glow.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Outer hairline square */}
        <rect
          x="1"
          y="1"
          width="24"
          height="24"
          rx="4"
          stroke="var(--color-brand-gold)"
          strokeWidth="1.5"
        />
        {/* O / B monoline mark */}
        <circle cx="10" cy="13" r="4.2" stroke="var(--color-brand-gold)" strokeWidth="1.5" />
        <path
          d="M16 8.4h2.6a2.3 2.3 0 0 1 0 4.6H16V8.4Zm0 4.6h2.9a2.3 2.3 0 0 1 0 4.6H16V13Z"
          stroke="var(--color-brand-gold)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-serif text-[1.05rem] font-bold leading-none tracking-tight text-ink">
        {site.name}
      </span>
    </span>
  );
}
