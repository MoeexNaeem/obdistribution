import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatStrip } from "@/components/ui/StatStrip";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { GoogleMap } from "@/components/sections/GoogleMap";
import { Globe } from "@/components/reactbits/Globe";
import { DirectoryList, type DirEntry } from "@/components/reactbits/DirectoryList";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact OB Distributions to request our wholesale product list, discuss bulk orders, and get personalized pricing. Based in West Palm Beach, FL.",
};

export default function ContactPage() {
  const entries: DirEntry[] = [
    { name: "Phone", value: site.phone, kind: "tel", href: site.phoneHref, icon: <Phone size={17} /> },
    { name: "Email", value: site.email, kind: "mail", href: `mailto:${site.email}`, icon: <Mail size={17} /> },
    { name: "Address", value: site.address.full, kind: "geo", icon: <MapPin size={17} /> },
    { name: "Hours", value: "Mon–Fri · 9:00 AM – 5:00 PM ET", kind: "time", icon: <Clock size={17} /> },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's talk wholesale"
        subtitle="Request our product list, discuss bulk orders, or ask about onboarding — our team makes wholesale stress-free and reliable."
      />

      {/* Contact directory + form */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Details — directory listing */}
          <Reveal from="left">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Contact
            </p>
            <h2 className="mt-4 font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
              Reach our team directly
            </h2>
            <div className="mt-8">
              <DirectoryList entries={entries} />
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

      {/* Global reach — COBE globe */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal from="left">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Global Network
            </p>
            <h2 className="mt-4 max-w-md font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
              Sourcing that spans the globe
            </h2>
            <p className="mt-5 max-w-md font-sans text-[1rem] leading-relaxed text-mist sm:text-[1.0625rem]">
              From our West Palm Beach hub we work with trusted suppliers and logistics
              partners across major trade lanes — so the products your customers want arrive
              on time, wherever they&apos;re made.
            </p>
            <StatStrip
              className="mt-8 max-w-md"
              items={[
                { value: "8", label: "Trade hubs" },
                { value: "24/7", label: "Fulfillment" },
                { value: "200+", label: "Brands" },
                { value: "99%", label: "On-time" },
              ]}
            />
          </Reveal>

          <Reveal from="right" delay={120} className="flex justify-center">
            <div
              className="relative w-full max-w-[440px]"
              style={{
                maskImage: "radial-gradient(circle at 50% 50%, #000 62%, transparent 78%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 62%, transparent 78%)",
              }}
            >
              <Globe className="w-full" />
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
          <h2 className="mt-4 font-sans text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2rem]">
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
