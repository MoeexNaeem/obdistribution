import { createElement } from "react";
import { cn } from "@/lib/utils";

/**
 * Section heading — left-aligned, Times 32px bold, no underline (PRD §4.3).
 * Responsive: scales up gently on large screens without losing the editorial feel.
 */
export function SectionHeading({
  as: Tag = "h2",
  eyebrow,
  className,
  children,
}: {
  as?: React.ElementType;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-brand-gold">
          {eyebrow}
        </p>
      ) : null}
      {createElement(
        Tag,
        {
          className:
            "font-serif text-[2rem] font-bold leading-[1.1] tracking-[-0.01em] text-ink sm:text-[2.5rem]",
        },
        children,
      )}
    </div>
  );
}

/** Underlined gold text link — Times/Arial, no icon arrows (PRD §4.3). */
export function TextLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = cn(
    "text-brand-gold underline underline-offset-4 decoration-from-font",
    "transition-opacity hover:opacity-80",
    className,
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
