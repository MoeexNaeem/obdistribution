"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

/*
  FlowingMenu (React Bits) — rows of big names; on hover a marquee band slides
  in from the nearest edge and scrolls. Ported to TypeScript and adapted for the
  OB palette: the reveal band scrolls the category name + its description (no
  external images, so it works under the site CSP).
*/

export interface FlowingMenuItem {
  link: string;
  text: string;
  description: string;
}

interface FlowingMenuProps {
  items?: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

export default function FlowingMenu({
  items = [],
  speed = 18,
  textColor = "#ffffff",
  bgColor = "#0a0a0a",
  marqueeBgColor = "#fbbf24",
  marqueeTextColor = "#0a0a0a",
  borderColor = "#333333",
}: FlowingMenuProps) {
  return (
    <div className="h-full w-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      <nav className="m-0 flex h-full flex-col p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  );
}

interface MenuItemProps extends FlowingMenuItem {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
}

function MenuItem({
  link,
  text,
  description,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
}: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(3);

  const animationDefaults = { duration: 0.6, ease: "expo" as const };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector<HTMLElement>(".marquee-part");
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(3, needed));
    };
    // Deferred so we don't setState synchronously inside the effect body.
    const id = requestAnimationFrame(calculateRepetitions);
    window.addEventListener("resize", calculateRepetitions);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", calculateRepetitions);
    };
  }, [text, description]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector<HTMLElement>(".marquee-part");
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;
      if (animationRef.current) animationRef.current.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };
    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) animationRef.current.kill();
    };
  }, [text, description, repetitions, speed]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);
    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  return (
    <div
      className="relative flex-1 overflow-hidden text-center"
      ref={itemRef}
      style={{ borderTop: isFirst ? "none" : `1px solid ${borderColor}` }}
    >
      <a
        className="relative flex h-full cursor-pointer items-center justify-center font-sans text-[1.75rem] font-semibold uppercase tracking-[-0.01em] no-underline sm:text-[2.25rem]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full translate-y-[101%] overflow-hidden"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="flex h-full w-fit" ref={marqueeInnerRef}>
          {Array.from({ length: repetitions }).map((_, idx) => (
            <div
              className="marquee-part flex flex-shrink-0 items-center"
              key={idx}
              style={{ color: marqueeTextColor }}
            >
              <span className="whitespace-nowrap px-[1.4vw] font-sans text-[1.5rem] font-semibold uppercase leading-none sm:text-[2rem]">
                {text}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: marqueeTextColor }} />
              <span className="whitespace-nowrap px-[1.4vw] font-sans text-[0.9375rem] font-normal leading-none opacity-80">
                {description}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: marqueeTextColor }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
