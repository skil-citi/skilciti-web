# Skilciti — website

Marketing site for **Skilciti**, a Nairobi-based software & systems company. Rebuilt from scratch as a
fast, animated, fully responsive Next.js app with the teal brand from the new logo.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 with design tokens in `src/app/globals.css` |
| Motion | [`motion`](https://motion.dev) (scroll-linked parallax, reveals, springs) + [`lenis`](https://lenis.darkroom.engineering) smooth scrolling |
| Icons | `lucide-react` |
| Fonts | Outfit (display), Plus Jakarta Sans (body), JetBrains Mono (accents) via `next/font` |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## Where things live

```
src/
  app/                    routes: / · /about · /services · /contact · /api/contact
                          + sitemap, robots, Open Graph image, 404, page-transition template
  components/
    brand/                vector logo (traced from the supplied artwork) + <Logo />
    layout/               navbar, footer, theme toggle, smooth scroll, scroll progress, cursor glow
    home/                 hero, services bento, manifesto, process, industries, toolkit, values, CTA
    ui/                   Button, Reveal, SplitText, SpotlightCard, Magnetic, Marquee, Parallax, PageHero
    contact/              contact form
  lib/
    content.ts            ★ ALL site copy & data — services, process, industries, values, toolkit, contact info
    contact.ts            form validation shared by client and API
```

**To change wording, services, contact details or the tech list, edit `src/lib/content.ts`.**
Brand colours live at the top of `src/app/globals.css` (`--brand`, `--brand-bright`, …).

## Effects

Parallax glow layers and a cursor-reactive node network in the hero · 3D-tilting hero composition ·
masked word-by-word headlines · scroll-lit manifesto text · sticky process timeline with a scroll-filled line ·
horizontally drifting industry type · cursor-tracking spotlight cards · magnetic buttons · infinite marquee ·
animated gradient border · Lenis inertial scrolling · scroll progress bar · light/dark theme with a
cross-fade (View Transitions API). Everything respects `prefers-reduced-motion`.

## Contact form

`POST /api/contact` validates input, ignores bots via a honeypot field, rate-limits per IP, and sends the
message through [Resend](https://resend.com). Copy `.env.example` to `.env.local` and set:

```bash
RESEND_API_KEY=...                      # required in production
CONTACT_TO_EMAIL=info@skilciti.com
CONTACT_FROM_EMAIL="Skilciti <hello@your-verified-domain.com>"
NEXT_PUBLIC_SITE_URL=https://skilciti.com
```

Without `RESEND_API_KEY`: in development messages are logged to the server console; in production the form
shows a friendly "email us directly" message instead of failing silently. The rate limiter is in-memory
(per server instance) — swap it for Redis/Upstash if you scale horizontally.

## Deploying

Works out of the box on Vercel (`pnpm build`, Node 20+). Set the environment variables above in the project
settings. All four pages are prerendered as static content; only `/api/contact` runs on demand.

## Next.js 16 notes

This project enables **Cache Components** (`cacheComponents: true`). During render, avoid `Math.random()`,
`Date.now()` and `new Date()` in components (use effects, or the `seeded()` helper in `src/lib/utils.ts`) —
otherwise the static shell can't be prerendered. See `AGENTS.md` / `node_modules/next/dist/docs/` for details.
