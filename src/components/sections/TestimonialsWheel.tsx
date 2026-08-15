"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import OptionWheel from "@/components/reactbits/OptionWheel";
import { testimonials } from "@/lib/content";

/*
  Testimonials — client names on an interactive OptionWheel; the selected
  client's review appears beside it in a transparent, glowing glass card. The
  glass frame stays mounted (no flash); only the content crossfades on change.
*/

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialsWheel() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden border-t border-hairline py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
              Testimonials
            </p>
            <h2 className="mt-4 font-sans text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              Client feedback &amp; reviews
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Names wheel — gentle fade so neighbours stay readable */}
          <Reveal>
            <div
              className="relative h-[420px] w-full"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
              }}
            >
              <OptionWheel
                items={testimonials.map((x) => x.name)}
                defaultSelected={0}
                side="left"
                fontSize={1.9}
                spacing={1.5}
                curve={1}
                tilt={6}
                blur={1}
                fade={0.14}
                minOpacity={0.16}
                smoothing={220}
                inset={0}
                draggable
                textColor="#7d7d7d"
                activeColor="#ffffff"
                onChange={(i) => setActive(i)}
              />
            </div>
          </Reveal>

          {/* Review glass card — frame stays put; content crossfades */}
          <Reveal delay={120}>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px]"
                style={{
                  background:
                    "radial-gradient(55% 55% at 28% 22%, rgba(251,191,36,0.16), transparent 70%)",
                  filter: "blur(26px)",
                }}
              />
              <div className="relative overflow-hidden rounded-[18px] border border-white/12 bg-white/[0.035] p-6 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:p-8">
                <Quote size={26} className="text-brand-gold" aria-hidden />
                <div key={active} className="[animation:fadeIn_0.5s_ease]">
                  <blockquote className="mt-4 font-sans text-[1.125rem] font-medium leading-relaxed text-ink sm:text-[1.25rem]">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3.5 border-t border-white/10 pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold/15 font-sans text-[0.8125rem] font-semibold text-brand-gold ring-1 ring-brand-gold/30">
                      {initials(t.name)}
                    </span>
                    <div>
                      <p className="font-sans text-[0.9375rem] font-semibold text-ink">{t.name}</p>
                      <p className="mt-0.5 font-sans text-[0.75rem] uppercase tracking-[0.12em] text-mist">
                        {t.role}
                      </p>
                    </div>
                  </figcaption>
                </div>
              </div>
              <p className="mt-4 text-center font-sans text-[0.8125rem] text-mist lg:text-left">
                Scroll or drag the names to read each review.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
