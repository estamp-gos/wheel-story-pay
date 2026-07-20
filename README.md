# Vehicle Check

Professional marketing site for a vehicle history & inspection report service — Next.js, Tailwind CSS, and GSAP.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger + `@gsap/react`
- Lucide icons
- IP-based currency localization via `/api/geo`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — VIN search, features, pricing, FAQs preview |
| `/about` | Mission, data sourcing, team |
| `/contact` | Contact form + support details |
| `/faqs` | Searchable accordion FAQs |
| `/check` | Checkout placeholder after VIN submit |
| `/api/geo` | Country + localized price |

## Design system

Generated with UI/UX Pro Max (Trust & Authority + Conversion):

- Primary: `#1E293B` · Accent CTA: `#DC2626` · Price highlight: `#B45309`
- Typography: IBM Plex Sans Condensed (headings) + IBM Plex Sans (body)
- Light mode only

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # serve production build
```
