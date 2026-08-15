import { createElement } from "react";
import { cn } from "@/lib/utils";

/*
  Card (PRD §4.2):
  - Surface: Paper (#161618), flat on the canvas
  - Border: 1px solid hairline; hover can illuminate the border to Brand Gold
  - Content: Times 24px title, Times 16px body
  Set `hoverGold={false}` where the illuminate-on-hover is not wanted.
*/
export function Card({
  className,
  children,
  hoverGold = true,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  hoverGold?: boolean;
  as?: React.ElementType;
}) {
  return createElement(
    Tag,
    {
      className: cn(
        "rounded-[12px] border border-hairline bg-paper p-7",
        "transition-colors duration-300",
        hoverGold && "hover:border-brand-gold",
        className,
      ),
    },
    children,
  );
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className={cn("font-serif text-[1.5rem] font-bold leading-tight text-ink", className)}>
      {children}
    </h3>
  );
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("mt-3 font-serif text-[1rem] leading-relaxed text-mist", className)}>
      {children}
    </p>
  );
}
