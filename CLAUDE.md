# CLAUDE.md — Personal Website

Project: Portfolio site for Johannes Christopher O. Cortez (Robot Care Specialist building AI automation at Relay Robotics). Audience is recruiters and hiring managers for AI automation / AI agent roles; the site must communicate "builds the agents that keep robots moving" in under 10 seconds. Never use tier labels (L1/L2/L3).

This file distills `front-end-skill.md` (design thinking) and `taste-skill.md` (engineering rules) into the working contract for this repo. When the two conflict, **taste-skill rules win** — they encode hard technical constraints. Where either conflicts with section 3 below (the "Wayfinding" design), section 3 wins.

---

## 1. Stack & Architecture

- **Framework:** Next.js (App Router), React Server Components by default.
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`). Tokens in `app/globals.css` `@theme`.
- **Motion:** CSS only. No animation library.
- **Icons:** `lucide-react`, used sparingly (menu, close, play, chat UI).
- **Dependency rule:** Before importing any 3rd-party lib, verify it's in `package.json`. If missing, output the install command before the code.
- **Client/Server split:** Only components with state are `'use client'` (Navbar, DemoVideo, CaseStudy, RoboChatDemo). Sections are server components.

## 2. Content model

- All content lives in `lib/data.ts`. Demo videos: `public/videos/<name>.mp4` + `posters/<name>.jpg`, resolved at build time by `lib/videos.ts` (a player only appears if the MP4 exists). Captions: drop `public/videos/captions/<name>.vtt` (WebVTT) and the player picks it up, on by default; every narrated video should have one.
- Agents: `featured: true` items render as large alternating rows; the rest as a compact list.
- Apps: the first project (RoboChat) leads with its live demo (`RoboChatDemo` — don't change its logic); projects with `problem` get a case-study modal; `link` adds an external link.

## 3. Design: "Wayfinding"

The page is a hospital floor plan. A floor route runs down the left gutter (desktop) and changes color per section; on mobile each section starts with a short colored bar. Each section is a destination with its own route color. The nav is a wayfinding sign (dark bar, color swatches, no numbers).

- **Colors (tokens only, never hardcoded):** `floor` #EEF1EC page, `wall` #FFFFFF surfaces, `ink` #14262B text, `ink-2` secondary, `rule` hairlines, `corridor` neutral route. Routes: `route-blue` #2457C5 (AI agents), `route-green` #1E8A5A (Apps), `route-yellow` #E5B21A (Experience — line/fill only, never text). Text variants `route-blue-text`, `route-green-text` keep 4.5:1; `route-green-deep` is the fill behind white text. `sign`/`sign-fg` for the nav and destination sign.
- **Dark mode:** follows `prefers-color-scheme`; floor and ink swap, route colors stay, text tints lighten.
- **Type:** Overpass 700/800 (display), Atkinson Hyperlegible 400/700 (body), via `next/font`. Hero `text-hero` (44→96px), section `text-title` (36→56px), body 18px / 1.6, max ~68ch. Sentence case everywhere.
- **Focus:** two-tone — 3px outline in the section's `--route` color + 2px ink ring. `Section` sets `--route`.
- **Components:** `Section` (route rail, junction, sticky "you are here" dot, heading with color swatch), `FeatureRow` / `CompactItem` (no cards; rows and rules), `DemoVideo` and `CaseStudy` (modals via `useDialog`).

### AI tells — banned

Near-black + single neon/amber accent; monospace labels; ALL-CAPS tracked eyebrows; § or 01/02 numbering; metadata joined with "·"; "→" on links; identical rounded cards; fade-in on every section; hover lift on cards; fake terminals or fake status text; gradient washes and glows; emoji.

## 4. Motion

- The hero floor plan (`FloorPlan`, `.fp-*` in `globals.css`) is the **only** automatic animation: robot follows the route once (4.8s, kept under 5s so no pause control is needed), callouts fade in at waypoints. Default styles are the finished state; the animation is wrapped in `prefers-reduced-motion: no-preference`.
- Everything else is static. Hover: link underline thickens, buttons change fill (120–150ms). Press: controls dim to 80% opacity (no movement). Buttons get `cursor: pointer` globally. Modals open instantly.

## 5. Layout Rules

- Container: `max-w-[1280px] mx-auto px-4 md:px-8 lg:pl-[112px]` (the gutter holds the route at `left-[45px]`).
- Responsive 375px → 1440px with no horizontal scroll; touch targets ≥ 44px.

## 6. Content Discipline

- **Real content only.** No "Acme", no filler metrics.
- **Banned filler verbs:** elevate, seamless, unleash, next-gen, passionate, hardworking.
- **No emojis** anywhere.
- Lists in prose use commas and "and" ("Built with A, B and C."), not middle dots.
