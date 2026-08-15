# OB Distributions — Design System

**Direction:** *Golden dark editorial.* A near-black canvas, a single rationed gold
signal, clean grotesque type (Geist), hairline structure, and tasteful WebGL/CSS motion.
The base grew from a "Dark Broadsheet" spec; typography later moved to the Firecrawl-style
engineered grotesque (Geist) for a cleaner, more modern feel.

---

## 1. Color tokens

Defined in `src/app/globals.css` under `@theme`. Chromatic color is rationed — **gold is
the only accent**; everything else is a calibrated dark neutral.

| Token | Value | Role |
| --- | --- | --- |
| `--color-canvas` | `#0a0a0a` | Page background — the dominant surface |
| `--color-paper` | `#161618` | Card / nav / footer surfaces above the canvas |
| nav pill | `#1c1c20` | Slightly lighter surface for the floating nav & Services cards |
| `--color-ink` | `#ffffff` | Primary text, headings, white pill CTAs |
| `--color-mist` | `#dadada` | Secondary / body text |
| `--color-hairline` | `#333333` | Structural borders, dividers, grid lines |
| `--color-brand-gold` | `#fbbf24` | The single accent: eyebrows, icons, marks, highlights, glows |
| supporting warms | `#f97316` / `#f59e0b` / `#fde68a` | Amber → pale-gold used only inside gradients/shaders (waves, glows, lava) |

Borders on elevated/glass surfaces use `white/10–15` instead of the flat hairline, for a
brighter, cleaner edge. Text on gold uses the dark canvas color, never black.

---

## 2. Typography

Loaded via `next/font` and mapped onto the Tailwind tokens (`--font-serif` and
`--font-sans` **both** resolve to Geist Sans, so the whole site is one engineered face;
`--font-mono` is Geist Mono).

- **Geist Sans** — headings, body, UI. Weights 400 / 500 / 600. Tracking tightens on
  display sizes (`-0.02em`).
- **Geist Mono** — reserved for genuinely technical bits; most eyebrow/label chrome was
  moved back to Sans for a cleaner read.

### Type scale (current, "clean not bulky" pass)

| Role | Size | Notes |
| --- | --- | --- |
| Hero headline | 40px → **56px** (sm) | `font-semibold`, tight leading |
| Section heading | 28px → **40px** (sm) | `font-semibold`; Services heading 36px |
| Card title | 20–24px | `font-semibold` |
| Body | 15–17px | `text-mist`, `leading-relaxed` |
| Eyebrow / label | 12px | uppercase, `tracking-[0.2em]`, gold |
| Micro / footer | 13–14px | muted |

Rules: sentence case for copy; uppercase only for small tracked eyebrows; two weights of
emphasis (400/500–600), never heavier; numbers that count/align use `tabular-nums`.

---

## 3. Spacing, shape, layout

- **Container:** max-width `1200px`, responsive gutters (`Container.tsx`).
- **Section rhythm:** `py-20 sm:py-28`, separated by 1px hairline top borders (not
  alternating backgrounds) via `Section.tsx`.
- **Radius:** pills/CTAs `9999px`; cards `16px`; inputs/small `10–12px`; tags/buttons `4px`
  (legacy neutral button).
- **Elevation:** flat surfaces; depth from layering + soft shadows
  (`0 24px 60px -30px rgba(0,0,0,.9)`) and an inner top-highlight on glass
  (`inset 0 1px 0 rgba(255,255,255,.08)`). No heavy drop shadows.
- **Global backdrop** (`SiteBackground.tsx`): fixed dot grid + two warm gold glows + fine
  grain + edge vignette, so no open section reads as empty black.

---

## 4. Signature components & patterns

| Component | Pattern |
| --- | --- |
| **Navbar** | Announcement bar + floating rounded pill; links absolutely centered; Categories mega-dropdown; white pill CTA with circular arrow |
| **Button / CTA** | Primary = solid **white pill**, dark text, circular arrow (gold stays off button fills). Secondary = hairline pill. |
| **GlareCard** | Card with a radial highlight that follows the cursor on hover (gold on light cards, white on the dark centre) |
| **Glass cards** | `bg-[#1c1c20]/70` (or `white/[0.04]`) + `backdrop-blur`, `white/12` border, inner highlight |
| **Reveal** | Scroll-in fade + directional slide (`from="up|down|left|right"`), IntersectionObserver, reduced-motion aware |
| **Counter** | Stats count up 0 → target on view (`tabular-nums`) |

---

## 5. Motion inventory

All motion is scroll/visibility-gated (IntersectionObserver) and pauses off-screen; all
respect `prefers-reduced-motion`.

| Where | Effect | Tech |
| --- | --- | --- |
| Hero | Flowing golden "water" wave (morphing ribbons + drift) | Animated SVG (SMIL + CSS) |
| Services | Pinned sticky-stacking cards + scrollspy index + gold glow | CSS sticky + JS + `ogl` Strands bg |
| About | Cursor-follow glare, directional card reveals | CSS/JS + `three`/`@react-three/fiber` Antigravity bg |
| How We Help | Branches draw in from hub → cards | SVG `stroke-dashoffset` on view |
| Categories | Hover reveals a scrolling gold marquee band | `gsap` |
| Testimonials | Two opposite-direction infinite marquee rows | CSS keyframes |
| Partner banner | Gold-lava shader + magic rings + cursor-follow glow | `ogl` MoltenMetal + `three` MagicRings + CSS |

---

## 6. Do / Don't

**Do**
- Keep gold rationed — accents, marks, highlights, glows; not large fills or button backgrounds.
- Use hairlines (`#333` / `white/10`) as the primary structure.
- Gate every animation on visibility + reduced-motion; keep WebGL layers paused off-screen.
- Keep the tight type scale above; sentence case; two emphasis weights.
- Put text on gold in the dark canvas color.

**Don't**
- Don't introduce a second chromatic accent (blues/greens/purples) — warm gold family only.
- Don't oversize headings; the "clean, not bulky" scale is deliberate.
- Don't stack many WebGL contexts in one viewport — they're spread across sections that pause off-screen.
- Don't rely on external images in shaders/menus — the CSP blocks external hosts; use `/public` assets or text.

---

## 7. Quick token reference (Tailwind v4 `@theme`)

```css
--color-canvas:#0a0a0a; --color-paper:#161618; --color-ink:#ffffff;
--color-mist:#dadada; --color-hairline:#333333; --color-brand-gold:#fbbf24;
--font-serif: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
--font-sans:  var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
--font-mono:  var(--font-geist-mono), ui-monospace, Menlo, monospace;
--radius-card:12px; --radius-tag:4px; --container-page:1200px;
```

Content lives in `src/lib/site.ts` (business data, nav, categories) and
`src/lib/content.ts` (services, stats, testimonials, FAQs, values) — the single places to
swap real copy, testimonials, and category descriptions.
