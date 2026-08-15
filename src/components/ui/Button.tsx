import Link from "next/link";
import { cn } from "@/lib/utils";

/*
  Neutral flat button (PRD §4.1):
  - Canvas background (#0a0a0a), 1px hairline border (white on hover), 4px radius
  - Label: Arial 13px, title/upper case, pure white — NEVER a gold fill
  A "quiet" variant drops the border for inline placement; "solid" uses paper.
*/

const base =
  "inline-flex items-center justify-center gap-2 rounded-[4px] text-fn uppercase tracking-[0.12em] " +
  "px-4 py-2.5 transition-colors duration-200 select-none";

const variants = {
  neutral:
    "bg-canvas text-ink border border-hairline hover:border-ink focus-visible:border-ink",
  solid:
    "bg-paper text-ink border border-hairline hover:border-ink focus-visible:border-ink",
  quiet: "bg-transparent text-mist hover:text-ink border border-transparent",
} as const;

type Variant = keyof typeof variants;

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "neutral", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    const { href, external, variant: _v, className: _c, children: _ch, ...rest } =
      props as ButtonAsLink;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
