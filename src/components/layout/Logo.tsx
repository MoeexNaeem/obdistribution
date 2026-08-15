import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import logo from "@/logo/Logo.png";

/**
 * Brand lockup — the OB Distributions logo (3D box mark + wordmark). Rendered
 * from the supplied PNG at a fixed height; width scales to preserve the aspect
 * ratio. Pass `priority` for above-the-fold placements (navbar).
 */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt={`${site.name} logo`}
      priority={priority}
      sizes="170px"
      className={cn("h-8 w-auto select-none sm:h-9", className)}
    />
  );
}
