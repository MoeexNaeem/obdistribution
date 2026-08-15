import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import FlowingMenu from "@/components/reactbits/FlowingMenu";
import { categories } from "@/lib/site";

/*
  Our Distribution Categories — a FlowingMenu: each category is a big row that,
  on hover, reveals a gold marquee band scrolling the name + its description.
*/
export function CategoriesMenu() {
  const items = categories.map((c) => ({
    link: "/contact",
    text: c.name,
    description: c.blurb,
  }));

  return (
    <section id="categories" className="border-t border-hairline py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.2em] text-brand-gold">
            Our Distribution Categories
          </p>
          <h2 className="mt-4 max-w-3xl font-sans text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            Wholesale solutions for every retailer
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-[1.0625rem] leading-relaxed text-mist">
            At OB Distributions, we focus on helping retailers stock the right products
            at the right prices. Explore our distribution categories and get access to
            high-quality inventory that drives sales and keeps your shelves full.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12 overflow-hidden rounded-[16px] border border-hairline">
          <div className="h-[520px] sm:h-[600px]">
            <FlowingMenu
              items={items}
              speed={22}
              textColor="#ffffff"
              bgColor="#0c0c0e"
              marqueeBgColor="#fbbf24"
              marqueeTextColor="#0a0a0a"
              borderColor="#33333a"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
