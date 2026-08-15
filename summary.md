# OB Distributions — Project Summary

A modern **B2B wholesale marketing & lead-generation website** for OB Distributions,
migrated from WordPress to a Next.js application. It is a marketing site (no cart /
accounts / checkout): the dynamic pieces are the contact & lead-capture forms.

- **Live reference (old site):** obdistributions.com
- **Business model reference (competitor):** stratamerchants.com
- **Deploy target:** Hostinger (Node, `output: "standalone"`)

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 (custom tokens in `globals.css`) |
| Database | MongoDB (official driver) |
| Fonts | Geist Sans (primary) + Geist Mono, via `next/font` |
| Icons | Lucide React |
| Validation | Zod |
| Animation / WebGL | `ogl` (Strands, MoltenMetal), `three` + `@react-three/fiber` (Antigravity), `three` (MagicRings), `gsap` (FlowingMenu), `lenis` (ScrollStack), CSS |

Full dependency list: `next, react, react-dom, tailwindcss, mongodb, zod, lucide-react, lenis, ogl, three, @react-three/fiber, gsap`.

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — the full marketing landing page (see sections below) |
| `/about` | About Us — hero, values, animated focus-area bars |
| `/why-ob-distributions` | Differentiators (ScrollStack) + FAQ accordion |
| `/contact` | Contact form + keyless Google Maps embed |
| `/api/contact` (POST) | Contact form submissions → MongoDB |
| `/api/leads` (POST) | "Request product list" / onboarding leads → MongoDB |
| `/sitemap.xml`, `/robots.txt` | SEO |

---

## Homepage sections (in order)

1. **Announcement bar + floating nav** (`Navbar.tsx`) — ada.cx-style: thin top promo bar, a rounded floating pill nav with a **Categories mega-dropdown**, centered links, account icon, and a white "Speak to an expert" pill CTA.
2. **Hero** (`page.tsx` + `HeroWave.tsx`) — handhold.io-style centered headline with a soft, water-like **flowing golden wave** (animated SVG) anchored below.
3. **Services** (`GrowthInMotion.tsx`) — "Everything You Need to Grow Your Retail Business". Sticky left index (01–06 + counting stats: 7+ / 30+ / 200+ / 99%) beside **pinned, glassy stacking cards** that pile up on scroll, over an ambient **Strands** field.
4. **About Us** (`AboutSpotlight.tsx`) — spotlight grid: four **glare cards** (cursor-follow highlight) flanking a dark centre "Our Philosophy" card, over an **Antigravity** particle field. Cards animate in from different directions.
5. **How We Help You Grow** (`HelpTree.tsx` + `TreeBranches.tsx`) — a branching **tree**: a hub with golden branches that draw in on scroll down to three glass leaf cards, with side glows.
6. **Distribution Categories** (`CategoriesMenu.tsx` + `FlowingMenu.tsx`) — a **flowing menu**: category rows whose hover reveals a gold marquee band scrolling the name + description.
7. **Statement** (`BlurHighlight.tsx`) — a blur-in paragraph with gold highlight words.
8. **Testimonials** (`TestimonialsMarquee.tsx`) — two **auto-scrolling rows** (row 1 → left, row 2 → right) of star-rated review cards over a gold glow.
9. **Partner With Purpose** (`PartnerBanner.tsx`) — closing CTA on a **MoltenMetal** (gold-lava shader) + **MagicRings** card, with a **cursor-following glow** behind it.
10. **Footer** (`Footer.tsx`) — clean, compact contact + navigation columns.

---

## Backend & security

- **Forms:** `/api/contact` and `/api/leads` write to MongoDB collections `contact_submissions` and `leads`, each with `meta` (ip, user-agent, referer) + `createdAt`.
- **Connection:** cached MongoDB client (`lib/mongodb.ts`) — safe for HMR, serverless, and a long-lived Node server. Without `MONGODB_URI`, dev validates + accepts but does not persist; prod returns 503.
- **Validation:** Zod schemas (`lib/validation.ts`), trimmed + length-capped.
- **Rate limiting:** in-memory 5 req/min per IP per endpoint (`lib/rateLimit.ts`).
- **Spam:** hidden honeypot field (filled → silently dropped).
- **Headers** (`next.config.ts`): CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy; `x-powered-by` off. Dev-only `unsafe-eval` + HMR websocket allowed.

---

## Project structure

```
src/
  app/
    page.tsx                    # Home (composes the sections above)
    about/ why-ob-distributions/ contact/   # inner pages
    api/contact/ api/leads/     # form endpoints
    sitemap.ts robots.ts globals.css layout.tsx
  components/
    layout/    Navbar, Footer, Logo, SiteBackground
    ui/        Container, Section, Button, Badge, Card, Heading, Reveal, GlareCard
    sections/  HeroWave, GrowthInMotion, AboutSpotlight, HelpTree, TreeBranches,
               CategoriesMenu, TestimonialsMarquee, PartnerBanner, AntigravityBackdrop,
               FocusBars, FaqAccordion, GoogleMap
    reactbits/ Strands, FlowingMenu, MagicRings, MoltenMetal, Antigravity,
               BlurHighlight, BorderGlow, ScrollExpand, ScrollStack, FeaturesTabs, OptionWheel
  lib/         site.ts, content.ts, mongodb.ts, validation.ts, rateLimit.ts, apiResponse.ts, utils.ts
public/        hero.svg, showcase.svg
```

**Parked (built but not currently used on the home page):** `ScrollExpand`, `ScrollStack`,
`BorderGlow`, `FeaturesTabs`, `OptionWheel`, and sections `BuiltToScale`, `HeroCard`,
`TestimonialsWheel`. Kept for reuse; safe to delete if unwanted.

---

## Running & deploying

```bash
npm install
cp .env.example .env.local     # set MONGODB_URI to persist form submissions
npm run dev                    # http://localhost:3000
npm run build && npm run start # production
```

Environment variables: `MONGODB_URI` (required in prod), `MONGODB_DB` (default
`obdistributions`), `NEXT_PUBLIC_SITE_URL`. Hostinger: build, set env vars in the panel,
run `node .next/standalone/server.js` (Node 20+). See `README.md` for full deploy steps.

---

## Status

Production build passes, ESLint clean, all pages and forms verified in the browser
(contact/leads validation, rate limiting, honeypot). Marketing content is placeholder-grade
where real copy/testimonials/images aren't yet supplied — swap in `lib/content.ts` and
`lib/site.ts`.

## Known notes

- The homepage runs up to **4 WebGL contexts** (Strands, Antigravity, MoltenMetal, MagicRings); each pauses when scrolled off-screen and under `prefers-reduced-motion`.
- Category-menu hover reveals **text** (name + description) rather than images, because the CSP blocks external images and none are supplied yet.
