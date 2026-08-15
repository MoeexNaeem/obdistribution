import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/*
  PageHero — the shared, clean hero for inner pages (About, Contact, Why OB,
  Wholesale). Eyebrow pill, Geist heading, subtitle, over a soft gold glow.
*/
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[340px]"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 0%, rgba(251,191,36,0.13), transparent 70%)",
        }}
      />
      <Container className="relative py-20 text-center sm:py-24">
        <Reveal className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-paper px-4 py-1.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-brand-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mx-auto mt-7 max-w-3xl font-sans text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[3.5rem]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-[1.0625rem] leading-relaxed text-mist">
            {subtitle}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
