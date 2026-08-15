import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";

const linkCls =
  "font-sans text-[0.875rem] text-mist transition-colors hover:text-ink";
const headCls =
  "font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-mist/70";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline bg-paper">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs font-sans text-[0.9375rem] leading-relaxed text-mist">
              {site.subTagline}
            </p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a href={site.phoneHref} className={`inline-flex items-center gap-2.5 ${linkCls}`}>
                  <Phone size={15} className="text-brand-gold" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={`inline-flex items-center gap-2.5 ${linkCls}`}>
                  <Mail size={15} className="text-brand-gold" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 font-sans text-[0.875rem] text-mist">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-gold" />
                {site.address.full}
              </li>
            </ul>
          </div>

          {/* Navigate */}
          <div>
            <h4 className={headCls}>Navigate</h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={headCls}>Support</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/why-ob-distributions#faq" className={linkCls}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkCls}>
                  Onboard
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkCls}>
                  Request Product List
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="font-sans text-[0.8125rem] text-mist/70">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-sans text-[0.8125rem] uppercase tracking-[0.14em] text-mist/70">
            {site.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
