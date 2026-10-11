# CLAUDE.md — Personal Website

Project: Portfolio site for Johannes Christopher O. Cortez (AI Automation Specialist · Robotics Fleet Ops; Robot Care Specialist at Relay Robotics). Audience is recruiters and hiring managers for AI automation / AI agent roles; the site must communicate "builds agents inside a live robotics operation" in under 10 seconds. Never use tier labels (L1/L2/L3).

This file distills `front-end-skill.md` (design thinking) and `taste-skill.md` (engineering rules) into the working contract for this repo. When the two conflict, **taste-skill rules win** — they encode hard technical constraints.

---

## 1. Stack & Architecture

- **Framework:** Next.js (App Router), React Server Components by default.
- **Styling:** Tailwind CSS. Check `package.json` for v3 vs v4 — never mix syntax. For v4, use `@tailwindcss/postcss`, not the v3 `tailwindcss` plugin.
- **Motion:** Framer Motion (wrapped in `MotionConfig reducedMotion="user"`) plus CSS keyframes in `globals.css`.
- **Icons:** `lucide-react` (already installed). `strokeWidth` 1.75.
- **Dependency rule:** Before importing any 3rd-party lib, verify it's in `package.json`. If missing, output the install command before the code.
- **Client/Server split:** Any component using motion, hover physics, or local state must be a leaf with `'use client'` at the top. Server components render static layout only.
- **Folder structure:** `/components`, `/app` (or `/pages`), `/styles`. Keep components small and reusable.

## 2. Active Design Dials (baseline)

- `DESIGN_VARIANCE: 8` — asymmetric, split-screen, generous negative space. **Centered hero is BANNED.**
- `MOTION_INTENSITY: 3` — subtle only: fade-and-rise on section enter (200–300ms), 150ms hover transitions. Everything disabled under `prefers-reduced-motion`.
- `VISUAL_DENSITY: 4` — daily-app spacing, not airy gallery, not packed cockpit.

Mobile (`< 768px`): collapse all asymmetric layouts to single column with `w-full px-4`.

## 3. Aesthetic Direction (this project)

"Fleet Console" theme. All tokens live in `app/globals.css` (`@theme`); use the utilities, never hardcoded colors.

- **Colors:** `ink` #0E1A24 background, `surface` #13222E raised, `line` rgba(234,240,243,0.12) borders. Text `fg` #EAF0F3, `fg-2` #B4C3CD, `muted` #9FB2BF (body contrast ≥ 4.5:1).
- **Accent:** `signal` #F2A93B amber, sparingly — links, key labels, active nav, focus rings, one highlight per section. Never large fills or body text. `live` #4FB286 only for "open to work" / live indicators.
- **No** gradient washes, glow effects, heavy shadows, or emoji.
- **Typography:** Space Grotesk (400/500/700) for display + body; JetBrains Mono for labels, section numbers, tags, code, metadata (`label-mono`: 13px uppercase, 0.15em). Both via `next/font`. `Inter` and serifs are banned.
- **Scale:** `text-hero` (40→72px), `text-h2` (32→40px), `text-body` (17→18px, 1.6 line height).
- **Components:** `SectionHeader` ("§ 02 · SKILLS" amber label + heading on a dot grid), `ProjectCard` (surface, 1px border, `card-hover` = amber border at 40% + 2px lift). Radius 10px cards (`rounded-card`), 999px chips. 8px spacing scale.
- **Dot grid** (`dot-grid`, 28px) only behind the hero and section headers.

## 4. Layout Rules

- Page container: `max-w-6xl mx-auto px-4 md:px-8`.
- Full-height sections: `min-h-[100dvh]`. **Never `h-screen`** — breaks iOS Safari.
- Multi-column: CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-6`). Never flexbox `calc()` math.
- **The 3-equal-cards row is BANNED.** Use Bento (asymmetric tiles), zig-zag 2-col, or horizontal scroll instead.
- Cards only when elevation conveys hierarchy. Otherwise group with `border-t`, `divide-y`, or whitespace.

## 5. Motion Rules

- Animate only `transform` and `opacity`. Never `top`/`left`/`width`/`height`.
- Section enter: `Reveal` (260ms ease-out fade-and-rise, once). Hover: 150ms.
- No parallax, magnetic hover, shimmer, scan lines, or marquees.
- Reduced motion: `globals.css` disables all CSS animation/transition and forces `[data-reveal]` visible; keep server/client markup identical (don't branch on `useReducedMotion` during render).

## 6. Required States

Every interactive surface must implement:

- **Loading** — skeletal loader matching the final layout (no generic spinners).
- **Empty** — composed empty state explaining how to populate.
- **Error** — inline, contextual, near the failing input.
- **Success / active** — tactile feedback, not just a color flip.

## 7. Content Discipline

- **Real content only.** Use the actual profile, role, projects, certifications. No "Acme", no "John Doe", no `99.99%` filler metrics.
- **Banned filler verbs:** elevate, seamless, unleash, next-gen, passionate, hardworking. Use concrete outcome language: "diagnosed", "reduced downtime", "shipped", "resolved".
- **No emojis** anywhere — markup, alt text, copy, code comments. Use Phosphor/Radix icons or clean SVG.
- Project cards must surface: **Problem → Solution → Stack → Impact** (impact is non-negotiable).

## 8. Performance Guardrails

- Grain/noise overlays go on `fixed inset-0 pointer-events-none` pseudo-layers only. Never on scrolling containers.
- Use `z-index` only for systemic layers (sticky nav, modals, overlays). No casual `z-50`.
- `will-change: transform` sparingly, only on elements actively animating.
- Wrap `useEffect` animation subscriptions in cleanup functions.

## 9. Pre-Flight Check (run mentally before finishing a component)

- [ ] Is this a server component, or does it actually need `'use client'`?
- [ ] Mobile collapse to single column verified for any asymmetric layout?
- [ ] Full-height sections use `min-h-[100dvh]`, not `h-screen`?
- [ ] Animation isolated to a leaf component? Memoized if perpetual?
- [ ] Loading + empty + error states present?
- [ ] No emojis, no `Inter`, no `#000`, no purple glow, no 3-card row?
- [ ] Content is real (Johannes's actual work), not generic portfolio filler?
- [ ] Copy uses concrete verbs, not "elevate"/"seamless"/"passionate"?

---

For deeper rationale on any rule, consult `front-end-skill.md` (design philosophy) or `taste-skill.md` (full directive matrix).
