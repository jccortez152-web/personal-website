# CLAUDE.md — Personal Website

Project: Portfolio site for Johannes Christopher O. Cortez (Robot Care Specialist building AI automation at Relay Robotics). Audience is recruiters and hiring managers for AI automation / AI agent roles; the site must show in under 10 seconds that he builds working agents that took over real manual work, then get them to watch a demo or make contact. Never use tier labels (L1/L2/L3).

Design work follows the `frontend-design` skill (plan → review against defaults → build → screenshot critique). `front-end-skill.md` and `taste-skill.md` hold older background notes; where anything conflicts with section 3 below (the "Struck off" design), section 3 wins.

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
- Agents: every agent has `manual` — the task it took over, phrased as the manual instruction ("Score every case for QA by hand."). Agents with `hero: n` appear as the struck tasks in the hero, in that order, and lead the Agents list.
- Apps: the first project (RoboChat) leads with its live demo (`RoboChatDemo` — don't change its logic); projects with `problem` get a case-study modal; `link` adds an external link.

## 3. Design: "Struck off"

The idea is his own line: "Every manual step is a candidate for an agent." The hero is a stack of real manual tasks, struck through on load; each struck task opens the demo of the agent that does it now. Agents reuse the device: the struck task, then the demo, then what the agent does.

- **Colors (tokens only, never hardcoded):** `ceil` #8DB3D6 (scrub blue, full fields only: hero and contact, plus the portrait tile and play controls), `paper` #F6F8F9 page, `ink` #16202A text, `graphite` #4A5561 secondary, `navy` #1D4A78 links and the primary button, `rule` hairlines, `card` raised panes. Fixed in both themes: `on-ceil` (text on ceil), `navy-deep` (fill behind white text), `panel` / `panel-fg` (dark UI panes).
- **Dark mode:** follows `prefers-color-scheme`; paper and ink swap, ceil fields stay ceil with `on-ceil` text.
- **Type:** one family, Archivo (variable, `wdth` axis via `next/font`). `condensed` utility (wdth 68) for struck manual tasks and years; `expanded` (wdth 122) for titles and the headline; normal width for body. Hero tasks `text-strike` (34→68px), section `text-title` (36→56px), body 18px / 1.6, under 70 characters per line. Sentence case everywhere.
- **The strike** (`.strike`, `.strike-draw` in `globals.css`): an ink bar drawn as a background so it follows wrapped lines. It means "an agent does this now" — never use it decoratively.
- **Focus:** 3px outline in `--focus` (navy on paper; ceil sections set it to `on-ceil`).
- **Layout:** left-aligned throughout. No cards: rows separated by rules and whitespace.

### AI tells — banned

Warm cream + serif + terracotta; near-black + single neon/amber accent; broadsheet hairline columns; identical rounded cards with soft shadows; gradient washes and glows; monospace labels; ALL-CAPS tracked eyebrows; § or 01/02 numbering (unless the content is a real sequence); metadata joined with "·"; "→" on links; fade-in on every section; hover lift on cards; fake terminals or fake status text; emoji.

## 4. Motion

- The hero strikes are the **only** automatic animation: each task is struck in sequence on load (~1.5s total, once). Default styles are the finished, struck state; the animation is wrapped in `prefers-reduced-motion: no-preference`.
- Everything else is static. Hover: link underline thickens, buttons change fill (120–150ms). Press: controls dim to 80% opacity (no movement). Buttons get `cursor: pointer` globally. Modals open instantly.

## 5. Layout Rules

- Container: `max-w-[1200px] mx-auto px-4 md:px-8`.
- Responsive 320px → 1440px with no horizontal scroll; touch targets ≥ 44px.

## 6. Content Discipline

- **Real content only.** No "Acme", no filler metrics.
- **Banned filler verbs:** elevate, seamless, unleash, next-gen, passionate, hardworking.
- **No emojis** anywhere.
- Lists in prose use commas and "and" ("Built with A, B and C."), not middle dots.
