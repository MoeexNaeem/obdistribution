import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { GoogleMap } from "@/components/sections/GoogleMap";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact OB Distributions to request our wholesale product list, discuss bulk orders, and get personalized pricing. Based in West Palm Beach, FL.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's talk wholesale"
        subtitle="Request our product list, discuss bulk orders, or ask about onboarding — our team makes wholesale stress-free and reliable."
      />

      {/* Contact info + form */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Details */}
          <Reveal from="left">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Contact
            </p>
            <h2 className="mt-4 font-sans text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
              Reach our team directly
            </h2>
            <div className="mt-8 grid gap-3">
              <ContactRow icon={<Phone size={18} />} label="Phone">
                <a href={site.phoneHref} className="transition-colors hover:text-brand-gold">
                  {site.phone}
                </a>
              </ContactRow>
              <ContactRow icon={<Mail size={18} />} label="Email">
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand-gold">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon={<MapPin size={18} />} label="Address">
                {site.address.full}
              </ContactRow>
              <ContactRow icon={<Clock size={18} />} label="Hours">
                Mon–Fri, 9:00 AM – 5:00 PM ET
              </ContactRow>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal from="right" delay={120}>
            <div className="rounded-[18px] border border-white/12 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <Section>
        <Reveal>
          <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
            Find Us
          </p>
          <h2 className="mt-4 font-sans text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
            West Palm Beach, Florida
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-8">
          <GoogleMap className="h-[420px]" />
        </Reveal>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-[14px] border border-white/10 bg-white/[0.02] p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-gold/15 text-brand-gold ring-1 ring-brand-gold/30">
        {icon}
      </span>
      <div>
        <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.14em] text-mist/70">
          {label}
        </p>
        <p className="mt-1 font-sans text-[1rem] text-ink">{children}</p>
      </div>
    </div>
  );
}
