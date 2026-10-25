# Islam El Himes — Portfolio

Personal portfolio of **Islam El Himes** — Full Stack Developer and Computer
Engineering student at EMSI Tanger, progressively specializing in AI and Data
Science.

Built as a single-page interactive experience: a cursor-reactive neural field,
scroll-driven storytelling, and conceptual product showcases for each project.

---

## Features

- **Interactive neural background** — a pseudo-3D particle network on a single
  2D canvas. Nodes drift, connections light up near the cursor, and data pulses
  travel along links. Node count and pixel ratio scale down per device tier; the
  loop stops entirely when the tab is hidden or the field scrolls out of view.
- **Cinematic hero** — per-character masked name reveal, layered cursor
  parallax, and a live terminal panel showing the retrieval pattern from the
  featured project.
- **Career journey** — a scroll-drawn progression from Digital Development
  through Full Stack and Computer Engineering to the current AI & Data Science
  direction.
- **Skills ecosystem** — six domains rendered as an orbiting constellation
  around a central stack, with a "typical chain" showing how the technologies
  connect. Becomes an accordion on mobile rather than a shrunken orbit.
- **Project case studies** — a full-width featured presentation for JuriBot
  Sentinel with its animated data path, plus a grid of secondary projects. Each
  opens an accessible modal with problem, solution, features and architecture.
- **Conceptual product mockups** — bespoke SVG showcases per project, clearly
  labelled "Product concept" (see [Project visuals](#project-visuals)).
- **Interactive AI pipeline** — Data → Processing → Analysis → Model →
  Intelligence → Application, as a selectable stepper.
- **Contact form** — works with no backend by default; upgradeable to a real
  endpoint with one environment variable.
- **Accessibility** — semantic landmarks, keyboard-navigable throughout, focus
  trapping in the modal, visible focus rings, and full `prefers-reduced-motion`
  support.

---

## Tech stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 15 (App Router)                       |
| Language   | TypeScript (strict)                           |
| Styling    | Tailwind CSS v4 (CSS-first `@theme` tokens)   |
| Animation  | Motion (Framer Motion successor)              |
| Scrolling  | Lenis                                         |
| Visuals    | Canvas 2D + inline SVG                        |
| Fonts      | Space Grotesk · Inter · JetBrains Mono        |

### Why no Three.js

The background needs roughly ninety points, the lines between them, and a few
travelling pulses — a few thousand draw calls per frame, comfortably inside 2D
canvas territory. Using WebGL here would have added a runtime of well over
100 KB gzipped for a result that renders identically. The 3D feel comes from
doing the perspective projection by hand, which is about thirty lines of maths.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, Open Graph
│   ├── page.tsx                # section composition
│   ├── globals.css             # design tokens, primitives, reduced motion
│   ├── icon.svg                # favicon
│   ├── opengraph-image.tsx     # social card, generated at build time
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/                 # Navbar, Footer, SmoothScroll, ScrollProgress, CustomCursor
│   ├── sections/               # Hero, Journey, Skills, Projects, FeaturedProject,
│   │                           # ProjectCard, ProjectModal, Intelligence, Experience,
│   │                           # Education, Certifications, Credentials, Contact
│   ├── visuals/                # InteractiveBackground, showcases, ProjectVisual, JuribotFlow
│   ├── seo/                    # StructuredData (JSON-LD)
│   └── ui/                     # Button, Magnetic, Tilt, Reveal, SectionHeading, Icons
├── data/                       # ← all content lives here
│   ├── site.ts                 # name, links, navigation
│   ├── projects.ts
│   ├── skills.ts
│   ├── journey.ts
│   ├── experience.ts           # experience + education
│   ├── certifications.ts
│   └── pipeline.ts
├── hooks/                      # useMediaQuery, useActiveSection, useLockBodyScroll
├── lib/                        # cn, math helpers, shared motion variants
└── types/                      # shared domain types
```

---

## CV

Two controls, doing two different jobs:

**Download CV** (hero + contact) serves `public/cv/CV-Islam-El-Himes.pdf` —
this is what every visitor gets.

**Upload CV** (navbar) opens a real file picker. The chosen PDF is validated
(must be a real PDF, under 3MB) and stored **in your browser** via
localStorage; the Download button then serves that copy, and a dot on the
button plus a panel tell you an override is active, with a link back to the
published file. Because the site is statically hosted there is no server to
upload to, so this deliberately does not pretend to publish — the panel says
so in as many words.

**To publish a new CV to visitors, overwrite the file:**

```
public/cv/CV-Islam-El-Himes.pdf
```

**To publish a new CV, overwrite that one file** — no code change. On Vercel,
commit the replacement and push. Full notes, including how to rename it or
remove the button entirely, are in [`public/cv/README.md`](public/cv/README.md).

There is deliberately no upload UI: Vercel's runtime filesystem is read-only,
so in-browser uploads would need blob storage plus an authenticated route — a
login page on a public portfolio to replace dragging one file into one folder.

## Contact form

`POST /api/contact` (Node.js runtime) sends the message over SMTP with
Nodemailer. Fields: **name, email, subject, message**.

The route validates length and email shape, strips CR/LF from anything that
reaches a mail header (so a crafted field cannot inject extra headers), escapes
the HTML body, and applies a 3-per-10-minutes sliding window plus a honeypot
field. `SMTP_USER` / `SMTP_PASSWORD` are read only here — they are not
`NEXT_PUBLIC_`, so they are never bundled for the browser.

Responses: `200 {ok:true}` · `400` validation (with per-field `errors`) ·
`429` rate limited · `503 {code:"not_configured"}` when no credentials are set ·
`502` when the provider rejects the send.

When the server returns `503` the form falls back to opening the visitor's own
mail client with the message pre-filled, so a message is never silently lost.

Configuration and the Vercel steps are in [DEPLOYMENT.md](DEPLOYMENT.md).

> The rate limiter is in-memory, so on serverless it is per-instance — a speed
> bump for casual spam rather than a hard guarantee. Real limiting would need a
> shared store (e.g. Upstash Redis).

## The living background

`WorldBackdrop` is fixed behind the entire document, so scrolling moves
*through* one continuous world rather than past separately-decorated blocks —
that is what removes the hard section boundaries.

**Liquid climates.** Each section has its own atmosphere (hero = lavender
dawn, skills = technological blue, work = digital magenta, intelligence =
electric, contact = deep and immersive). The scroll-spy publishes the current
section as `data-world` on `<html>`, and the aurora blooms are tinted from
`--world-a/b/c`. Those three are registered with `@property` as `<color>`,
which is what lets the browser **interpolate** them — so the whole atmosphere
flows from one climate to the next over ~1.6s instead of cutting. Adjust or add
a climate in `globals.css` under `:root[data-world="…"]`.

Four blooms drift on different, non-integer-ratio durations (16s / 21s / 26s /
47s) so the field never settles into a visibly repeating loop.

## Theme

Dark is the default. The switch in the navbar toggles a `data-theme` attribute
on `<html>`; light mode overrides the same custom properties the whole system
is built from, so every utility (`bg-void-900`, `text-mist-400` …) follows
automatically. The choice persists in `localStorage`, and an inline script in
`<head>` applies it before first paint so there is no flash.

Light mode is a retuned palette — lavender ground, inverted violet text ramp,
deepened accents — not the dark theme with a white background. The glass,
glow and gradients survive the switch.

## Getting started

Requires Node.js 18.18 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

### Scripts

| Command             | Does                                        |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the dev server                        |
| `npm run build`     | Production build                            |
| `npm run start`     | Serve the production build                  |
| `npm run lint`      | ESLint                                      |
| `npm run typecheck` | TypeScript, no emit                         |

---

## Updating content

All content is in `src/data` — you should not need to edit a component to
change what the site says.

### Your links

`src/data/site.ts` is the one file to edit first:

```ts
github: null,     // ← replace with "https://github.com/your-username"
linkedin: null,   // ← replace with "https://www.linkedin.com/in/your-profile"
resume: null,     // ← replace with "/cv-islam-elhimes.pdf" after adding the file
url: "https://islamelhimes.vercel.app",  // ← your deployed URL
```

While a link is `null` the site does not invent one. In the contact section it
renders as an explicitly disabled row reading "Not published yet", and in the
footer it is omitted entirely. Nothing ever points at a URL that does not exist.

### Projects

Edit `src/data/projects.ts`. Each project carries its own summary, problem,
solution, features, architecture, stack and accent colours.

To enable the GitHub or Live demo buttons, replace `null` with the URL:

```ts
links: { github: "https://github.com/you/juribot", demo: null },
```

Buttons only render when a URL is present, so there are never dead controls.

### Everything else

| To change            | Edit                        |
| -------------------- | --------------------------- |
| Career journey       | `src/data/journey.ts`       |
| Skills & categories  | `src/data/skills.ts`        |
| Experience/education | `src/data/experience.ts`    |
| Certifications       | `src/data/certifications.ts`|
| AI pipeline & focus  | `src/data/pipeline.ts`      |
| Navigation           | `src/data/site.ts`          |

---

## Project visuals

Because original screenshots were not available for every project, each one
renders a **bespoke conceptual mockup** — an SVG built from that project's
written description, drawn in the site's palette.

These are **design concepts, not screenshots**. Every one is labelled
"Product concept" in the interface so a visitor is never left to assume
otherwise, and none of them display invented metrics, results or user data.

### Replacing one with a real screenshot

1. Drop the image in `public/projects/` (see the README in that folder for the
   suggested filenames and sizing).
2. In `src/data/projects.ts`, set the project's `screenshot`:

   ```ts
   screenshot: "/projects/juribot-showcase.png",
   ```

That is the only change needed. The mockup is bypassed, the image is served
through `next/image` with AVIF/WebP and lazy loading, and the label switches
from "Product concept" to "Interface".

Because the fallback is a *component* rather than a file path, a missing image
can never produce a broken-image icon.

---

## Contact form

By default the form has **no backend**. On submit it opens the visitor's own
mail client with the message pre-filled — which works everywhere, needs no
service, and keeps no secrets in the repository.

To deliver messages over HTTP instead, copy `.env.example` to `.env.local` and
set a form endpoint:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
```

The form then POSTs `{ name, email, message }` as JSON. Note this is a
`NEXT_PUBLIC_` variable and therefore visible in the browser — only put a
public form endpoint here, never a private API key.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project**, and import the repository.
3. Framework preset is detected as Next.js; no build settings need changing.
4. Add `NEXT_PUBLIC_CONTACT_ENDPOINT` under **Environment Variables** only if
   you are using a form endpoint.
5. Deploy.

After the first deploy, set `url` in `src/data/site.ts` to the real domain so
the canonical URL, sitemap and Open Graph tags point at the right place.

---

## Performance & SEO

- Fully statically prerendered — every route is `○ (Static)`.
- Fonts self-hosted through `next/font` with `display: swap`, no layout shift.
- Canvas work is throttled by device tier and paused when off-screen or hidden.
- Metadata, Open Graph, Twitter card, JSON-LD `Person`, `robots.txt` and
  `sitemap.xml` are all generated.
- The social card is generated at build time from `opengraph-image.tsx` using
  the runtime's default font, so the build never depends on a network fetch.

---

## Project assets

Detected and used:

| Project          | Assets                                                  |
| ---------------- | ------------------------------------------------------- |
| JuriBot Sentinel | 5 screenshots — landing, platform admin, company dashboard, login, register |
| FaceAttend       | 6 screenshots — landing, admin, teacher, student, justification, login |
| EDT Collaboratif | 2 screenshots — landing, dashboard                      |
| Travel Planner   | 11 figures extracted from `rapport_travelPlanne.pdf` (pp. 17–23) |

Not available, and therefore not fabricated:

- No GitHub or live-demo URLs for any project — those buttons are not rendered
  at all rather than linking nowhere. Add them in `src/data/projects.ts`.
- EDT Collaboratif has only two captures, so its gallery is short by design.
- The C++ school-management project on the CV has no screenshots, so it is not
  shown; adding it would have required inventing an interface.

## Content accuracy

Everything on this site is drawn from information supplied by Islam El Himes.
No companies, clients, awards, statistics, project outcomes, repositories or
live demos have been invented. Where a detail was not available it is left as a
clearly-marked `null` in `src/data` rather than filled with a plausible
placeholder, and the interface degrades honestly around it.

---

## Licence

Source code is free to learn from. The written content, CV details and personal
branding belong to Islam El Himes — please do not republish them as your own.
