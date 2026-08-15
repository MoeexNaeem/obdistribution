import { cn } from "@/lib/utils";

/*
  StatStrip — a compact, hairline-divided row of stats. Replaces boxed "stat
  card" grids with a single engineered strip that matches the directory motif.
*/
export function StatStrip({
  items,
  className,
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid overflow-hidden rounded-[14px] border border-hairline bg-white/[0.02]",
        "grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0",
        className,
      )}
    >
      {items.map((s) => (
        <div key={s.label} className="px-5 py-4">
          <dt className="font-sans text-[1.5rem] font-semibold leading-none tabular-nums text-ink">
            {s.value}
          </dt>
          <dd className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mist/60">
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default StatStrip;
