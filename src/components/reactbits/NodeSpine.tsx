import { cn } from "@/lib/utils";

/*
  NodeSpine — a vertical branch/tree: gold nodes threaded on a hairline trunk,
  each carrying an indexed title + body. Replaces generic card grids with a
  single, engineered "ledger" that reads top-to-bottom. Optional per-node icon.
*/

export interface SpineItem {
  title: string;
  body: string;
  icon?: React.ReactNode;
}

export function NodeSpine({
  items,
  className,
}: {
  items: SpineItem[];
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)}>
      {/* Trunk — sits behind the opaque nodes so it reads as connective tissue */}
      <span
        aria-hidden
        className="absolute left-[17px] top-5 bottom-6 w-px bg-gradient-to-b from-hairline via-hairline to-transparent"
      />
      {items.map((it, i) => (
        <li key={it.title} className="relative flex gap-4 pb-9 last:pb-0">
          <span className="relative z-10 mt-0.5 flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full border border-hairline bg-[#141416]">
            {it.icon ? (
              <span className="text-brand-gold">{it.icon}</span>
            ) : (
              <span className="h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_0_4px_rgba(251,191,36,0.12)]" />
            )}
          </span>
          <div className="pt-0.5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[0.72rem] tabular-nums text-brand-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sans text-[1.0625rem] font-semibold leading-tight text-ink">
                {it.title}
              </h3>
            </div>
            <p className="mt-2 max-w-prose font-sans text-[0.9375rem] leading-relaxed text-mist">
              {it.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default NodeSpine;
