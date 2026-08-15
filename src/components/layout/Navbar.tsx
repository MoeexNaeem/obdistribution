"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tighten the floating pill (stronger border + shadow) once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="relative z-50">
      {/* ── Announcement bar ─────────────────────────────── */}
      <div className="w-full border-b border-hairline bg-canvas">
        <div className="mx-auto flex h-11 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <span className="hidden shrink-0 items-center gap-2 sm:inline-flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-gold" />
            <span className="font-sans text-[0.8125rem] uppercase tracking-[0.14em] text-mist">
              Wholesale 2026
            </span>
          </span>
          <p className="flex-1 truncate text-center font-serif text-[0.9375rem] text-mist">
            Now onboarding retailers for the new season —{" "}
            <span className="text-ink">get the full product catalog.</span>
          </p>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-1.5 font-sans text-[0.8125rem] text-ink"
          >
            <span className="underline decoration-brand-gold decoration-1 underline-offset-4">
              Get the catalog
            </span>
            <ArrowRight
              size={13}
              className="text-brand-gold transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {/* ── Floating nav pill ────────────────────────────── */}
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            "relative mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 rounded-[18px] px-3 pl-5 sm:px-4 sm:pl-6",
            "border bg-[#1c1c20]/95 backdrop-blur-xl transition-all duration-300",
            "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.9)]",
            scrolled ? "border-white/20" : "border-white/12",
          )}
        >
          {/* Left: brand */}
          <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo priority />
          </Link>

          {/* Center: links — absolutely centered in the bar */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex">
            <NavItem href="/" active={isActive("/")}>
              Home
            </NavItem>
            <NavItem href="/about" active={isActive("/about")}>
              About
            </NavItem>
            <NavItem href="/categories" active={isActive("/categories")}>
              Categories
            </NavItem>
            <NavItem href="/why-ob-distributions" active={isActive("/why-ob-distributions")}>
              Why OB
            </NavItem>
            <NavItem href="/contact" active={isActive("/contact")}>
              Contact
            </NavItem>
          </div>

          {/* Right: CTA */}
          <div className="flex items-center gap-2">
            <PillCta href="/wholesale-program" className="hidden sm:inline-flex">
              Wholesale Program
            </PillCta>

            {/* Mobile toggle */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        {open && (
          <div className="mx-auto mt-2 w-full max-w-[1200px] overflow-hidden rounded-[18px] border border-hairline bg-paper lg:hidden">
            <div className="flex flex-col p-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-[10px] px-4 py-3.5 font-sans text-[1rem] transition-colors",
                    isActive(item.href)
                      ? "bg-canvas text-ink"
                      : "text-mist hover:bg-canvas hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-hairline p-1 pt-3">
                <PillCta
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="w-full justify-center"
                >
                  Get in touch
                </PillCta>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-[10px] px-3 py-2 font-sans text-[0.9375rem] transition-colors",
        active ? "text-ink" : "text-mist hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

/**
 * ada.cx-style CTA: a solid white pill with dark label and a small dark circle
 * holding an arrow. Gold stays rationed — the emphasis is contrast, not fill.
 */
function PillCta({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5",
        "font-sans text-[0.875rem] font-medium text-canvas transition-opacity hover:opacity-90",
        className,
      )}
    >
      {children}
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-canvas text-ink">
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
