# CLAUDE.md — Personal Website

Project: Portfolio site for Johannes Christopher O. Cortez (Robot Care Specialist building AI automation at Relay Robotics). Audience is recruiters and hiring managers for AI automation / AI agent roles; the site must show in under 10 seconds that he builds working AI agents, then get them to watch a demo or make contact. Never use tier labels (L1/L2/L3).

Design work follows the `frontend-design` skill (plan → review against defaults → build → screenshot critique). `front-end-skill.md` and `taste-skill.md` hold older background notes; where anything conflicts with section 3 below (the Apple-style design), section 3 wins.

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
- Agents: `spotlight: true` (one agent) is the hero "product shot"; `featured: true` agents get large alternating rows; the rest are tiles. `highlights` holds the bento figures — real numbers from the site's own content only.
- Apps: the first project (RoboChat) leads with its live demo (`RoboChatDemo` — don't change its logic); projects with `problem` get a case-study modal; `link` adds an external link.

## 3. Design: Apple-style product page

The owner asked for an Apple-like site: his agents presented like products. Use Apple's visual language, never Apple's assets (no logo, product names, or SF Pro, which is licensed only for Apple platforms).

- **Colors (tokens only, never hardcoded):** theme-aware `base` (#FFFFFF), `alt` (#F5F5F7), `tile`, `fg` (#1D1D1F), `fg-2` (#6E6E73), `link` (#0066CC), `rule`. Fixed: `blue` (#0071E3, pill buttons with white text), `black` bands with `on-black` / `on-black-2` text, `link-on-black` (#2997FF), `tile-dark`.
- **Rhythm:** full-bleed bands alternate light gray, white and black. Section titles are centered, short, and end with a period ("Agents.").
- **Dark mode:** follows `prefers-color-scheme`; light bands turn black / near-black, black bands stay black.
- **Type:** Inter (variable, via `next/font`), the closest free match to SF Pro. Headlines bold with tight tracking: `text-hero` (44→80px), `text-title` (36→56px), `text-lede` (20→28px) in `fg-2`. Body 17px / 1.6. Sentence case.
- **Components:** `Section` (band + centered header), rounded tiles (28px radius), big rounded media (DemoVideo posters as product shots), pill buttons, text links with a `Chevron` (">") the way Apple does them. Pills keep a 44px tap area.
- **Focus:** 3px outline in `--focus` (blue; black bands use `link-on-black`).

### Still banned

Gradient washes and glows; monospace labels; ALL-CAPS eyebrows; § or 01/02 numbering; metadata joined with "·"; fake terminals or fake status text; filler or invented metrics; emoji.

## 4. Motion

- `.reveal` blocks ease in (fade + 32px rise) as they enter the viewport, using CSS scroll-driven animations only (no JS). Browsers without `animation-timeline` and reduced-motion users see content immediately.
- No other automatic motion. Hover: links underline, buttons dim slightly. Press: controls dim to 80% opacity. Buttons get `cursor: pointer` globally. Modals open instantly.

## 5. Layout Rules

- Container: `max-w-[1080px] mx-auto px-5 md:px-8`.
- Responsive 320px → 1440px with no horizontal scroll; touch targets ≥ 44px.

## 6. Content Discipline

- **Real content only.** No "Acme", no filler metrics.
- **Banned filler verbs:** elevate, seamless, unleash, next-gen, passionate, hardworking.
- **No emojis** anywhere.
- Lists in prose use commas and "and" ("Built with A, B and C."), not middle dots.
