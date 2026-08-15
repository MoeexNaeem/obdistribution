# OB Distributions — Next.js Website

B2B wholesale distribution marketing & lead-generation site. Built to the
**"Dark Broadsheet"** design system (editorial structure + premium dark/gold
palette) defined in the PRD.

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (custom editorial tokens)
- **Database:** MongoDB (contact & lead submissions)
- **Icons:** Lucide React (monoline)
- **Fonts:** system Times (serif) + Arial (sans) — no web-font downloads
- **Deploy target:** Node server (`output: "standalone"`) — Hostinger-ready

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in MONGODB_URI
npm run dev                  # http://localhost:3000
```

> Without `MONGODB_URI` set, form submissions are **validated and accepted but
> not persisted** in development (a warning is logged). In production a missing
> URI returns `503` so submissions are never silently dropped.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (standalone output) |
| `npm run start` | Run the production server |
| `npm run lint` | ESLint |

---

## Environment variables

See [`.env.example`](.env.example).

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | prod | MongoDB connection string (Atlas or self-hosted) |
| `MONGODB_DB` | no | Database name (default `obdistributions`) |
| `NEXT_PUBLIC_SITE_URL` | no | Absolute URL for metadata / sitemap / robots |

---

## Project structure

```
src/
  app/
    page.tsx                 # Home
    about/page.tsx           # About
    why-ob-distributions/    # Why OB (differentiators + FAQ)
    contact/page.tsx         # Contact (form + Google Map)
    api/
      contact/route.ts       # POST — contact submissions
      leads/route.ts         # POST — "request product list" leads
    sitemap.ts / robots.ts   # SEO
    globals.css              # Design tokens (@theme) + utilities
  components/
    layout/                  # Navbar, Footer, Logo
    ui/                      # Button, Card, Badge, Section, Heading, Reveal…
    reactbits/               # ScrollExpand, ScrollStack, BorderGlow,
                             #   BlurHighlight*, FeaturesTabs*  (* custom builds)
    sections/                # FocusBars, FaqAccordion, GoogleMap
    forms/                   # ContactForm
  lib/
    site.ts                  # Business data (address, phone, nav, categories)
    content.ts               # Page copy (services, stats, FAQs, values…)
    mongodb.ts               # Cached connection helper
    validation.ts            # zod schemas
    rateLimit.ts             # in-memory per-IP limiter
    apiResponse.ts           # JSON response helpers
```

### React Bits components

- **Provided by client & ported to TS:** `ScrollExpand`, `ScrollStack`, `BorderGlow`.
- **Custom-built equivalents of React Bits *Pro*** (no license key required):
  - `BlurHighlight` — blur-in paragraph with automatic gold highlighting.
  - `FeaturesTabs` — auto-cycling tabbed feature interface ("Features 4").

---

## Database

Two collections are written to:

- `contact_submissions` — from the Contact form.
- `leads` — from "Request Product List" / onboarding.

Each document stores the submitted fields plus `meta` (IP, user-agent, referer)
and `createdAt`. To read submissions, connect to your database (e.g. MongoDB
Compass / Atlas UI) — there is no admin panel in this marketing build.

Suggested indexes:

```js
db.contact_submissions.createIndex({ createdAt: -1 })
db.leads.createIndex({ createdAt: -1 })
db.leads.createIndex({ email: 1 })
```

---

## Security

- **Validation:** every API payload is parsed with zod (trimmed, length-capped).
- **Rate limiting:** 5 requests/min per IP per endpoint (in-memory). For a
  multi-instance deployment, swap `lib/rateLimit.ts` for a shared store.
- **Spam:** hidden honeypot field — filled submissions are accepted then dropped.
- **Headers** (`next.config.ts`): Content-Security-Policy, HSTS, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy. `x-powered-by` off.
- The CSP allows the Google Maps embed (`frame-src https://www.google.com`) and,
  in **development only**, `unsafe-eval` + the HMR websocket.

---

## Google Maps

The Contact page uses a **keyless** Google Maps embed (iframe) pointed at the
business address — no API key or billing required. See
`src/components/sections/GoogleMap.tsx`.

---

## Deploying to Hostinger

This app builds to a self-contained Node server (`output: "standalone"`).

1. **Build locally or on the server:**
   ```bash
   npm install
   npm run build
   ```
2. **Files needed at runtime** (if copying a standalone bundle):
   - `.next/standalone/` (contains a minimal `server.js` + `node_modules`)
   - `.next/static/`  → copy into `.next/standalone/.next/static/`
   - `public/`        → copy into `.next/standalone/public/`
3. **Set environment variables** in the Hostinger panel: `MONGODB_URI`,
   `MONGODB_DB`, `NEXT_PUBLIC_SITE_URL`.
4. **Start command:**
   ```bash
   node .next/standalone/server.js
   ```
   (defaults to port 3000 — set `PORT` if your plan requires a specific port).

On a Hostinger plan that runs `npm` scripts directly, `npm run build` followed by
`npm run start` also works. Point your domain at the Node app and ensure the
Node version is 20+.
