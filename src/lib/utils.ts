/**
 * Minimal className joiner. Keeps a tiny footprint — no clsx/tailwind-merge
 * dependency needed for this project's class-composition patterns.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
