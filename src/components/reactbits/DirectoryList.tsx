import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  DirectoryList — contact details rendered as a file browser: a path bar, a
  column header, and one "file" row per contact method (name, value, type
  badge). Reads like a directory listing rather than a stack of cards.
*/

export interface DirEntry {
  name: string;
  value: string;
  kind: string; // short mono type tag, e.g. "tel", "mail", "geo"
  href?: string;
  icon: React.ReactNode;
}

export function DirectoryList({
  path = "~/contact",
  entries,
}: {
  path?: string;
  entries: DirEntry[];
}) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-hairline bg-[#0c0c0e] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
      {/* Path bar */}
      <div className="flex items-center justify-between gap-4 border-b border-hairline bg-[#141416] px-4 py-2.5">
        <span className="font-mono text-[0.75rem] text-mist/70">{path}</span>
        <span className="font-mono text-[0.7rem] text-mist/40">{entries.length} items</span>
      </div>

      {/* Column header */}
      <div className="grid grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-hairline px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-mist/40">
        <span aria-hidden />
        <span>Name</span>
        <span>Type</span>
      </div>

      {/* Rows */}
      <ul>
        {entries.map((e) => {
          const inner = (
            <div className="grid grid-cols-[36px_1fr_auto] items-center gap-3 px-4 py-3.5 transition-colors group-hover:bg-white/[0.03]">
              <span className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-hairline text-mist transition-colors group-hover:border-brand-gold/40 group-hover:text-brand-gold">
                {e.icon}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5">
                  <span className="font-sans text-[0.9375rem] font-medium text-ink">{e.name}</span>
                  {e.href ? (
                    <ArrowUpRight
                      size={13}
                      className="text-brand-gold opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  ) : null}
                </span>
                <span className="mt-0.5 block truncate font-sans text-[0.875rem] text-mist">
                  {e.value}
                </span>
              </span>
              <span className="rounded-[5px] border border-hairline px-2 py-0.5 font-mono text-[0.68rem] text-mist/60">
                {e.kind}
              </span>
            </div>
          );
          return (
            <li key={e.name} className="border-b border-hairline last:border-0">
              {e.href ? (
                <Link href={e.href} className="group block">
                  {inner}
                </Link>
              ) : (
                <div className={cn("group block")}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DirectoryList;
