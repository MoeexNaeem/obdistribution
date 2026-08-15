import { createElement } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * A page section separated from its neighbours by a hairline rule rather than
 * an alternating background color (PRD §3.3, §5). Set `divide` to false for the
 * first section under the hero.
 */
export function Section({
  as: Tag = "section",
  divide = true,
  className,
  innerClassName,
  children,
  id,
}: {
  as?: React.ElementType;
  divide?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return createElement(
    Tag,
    {
      id,
      className: cn("py-16 sm:py-24", divide && "border-t border-hairline", className),
    },
    <Container className={innerClassName}>{children}</Container>,
  );
}
