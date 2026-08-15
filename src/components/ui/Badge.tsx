import { cn } from "@/lib/utils";

/**
 * Micro-tag: Arial 13px, hairline border, 4px radius, no gold fill (PRD §5.1).
 * e.g. "TRUSTED WHOLESALE DISTRIBUTOR".
 */
export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hairline",
        "px-3 py-1 font-sans text-[0.75rem] uppercase tracking-[0.14em] text-mist",
        className,
      )}
    >
      {children}
    </span>
  );
}
