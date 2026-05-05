# CLAUDE.md — Personal Website

Project: Portfolio site for Johannes Christopher O. Cortez (Robotics Engineer / RoboCare Specialist). Audience is technical recruiters and engineering hiring managers; the site must communicate production-incident competence in under 10 seconds.

This file distills `front-end-skill.md` (design thinking) and `taste-skill.md` (engineering rules) into the working contract for this repo. When the two conflict, **taste-skill rules win** — they encode hard technical constraints.

---

## 1. Stack & Architecture

- **Framework:** Next.js (App Router), React Server Components by default.
- **Styling:** Tailwind CSS. Check `package.json` for v3 vs v4 — never mix syntax. For v4, use `@tailwindcss/postcss`, not the v3 `tailwindcss` plugin.
- **Motion:** Framer Motion for UI/Bento. GSAP/ThreeJS only for isolated full-page scrolltelling or canvas — never mix engines in the same tree.
- **Icons:** `@phosphor-icons/react` or `@radix-ui/react-icons` only. Single global `strokeWidth` (1.5 or 2.0).
- **Dependency rule:** Before importing any 3rd-party lib, verify it's in `package.json`. If missing, output the install command before the code.
- **Client/Server split:** Any component using motion, hover physics, or local state must be a leaf with `'use client'` at the top. Server components render static layout only.
- **Folder structure:** `/components`, `/app` (or `/pages`), `/styles`. Keep components small and reusable.

## 2. Active Design Dials (baseline)

- `DESIGN_VARIANCE: 8` — asymmetric, split-screen, generous negative space. **Centered hero is BANNED.**
- `MOTION_INTENSITY: 6` — fluid CSS + spring physics. Continuous micro-animations on key elements.
- `VISUAL_DENSITY: 4` — daily-app spacing, not airy gallery, not packed cockpit.

Mobile (`< 768px`): collapse all asymmetric layouts to single column with `w-full px-4`.

## 3. Aesthetic Direction (this project)

- **Theme:** Dark mode default. Off-black base (`zinc-950` / charcoal) — never `#000000`.
- **Accent:** A single desaturated electric blue or cyan. Saturation < 80%. **No purple/blue gradient glows. No neon.**
- **Tone:** Engineering / industrial — think production console, not consumer SaaS. Quiet confidence over hype.
- **Typography:** Pair a distinctive display sans (`Geist`, `Satoshi`, `Cabinet Grotesk`, or `Outfit`) with a mono for numbers/codes (`Geist Mono` / `JetBrains Mono`). **`Inter` is banned.** Serifs are banned for this project (technical UI).
- **Headlines:** `text-4xl md:text-6xl tracking-tighter leading-none`. Control hierarchy with weight + color, not just scale.
- **Body:** `text-base text-zinc-400 leading-relaxed max-w-[65ch]`.

## 4. Layout Rules

- Page container: `max-w-7xl mx-auto` (or `max-w-[1400px]`).
- Full-height sections: `min-h-[100dvh]`. **Never `h-screen`** — breaks iOS Safari.
- Multi-column: CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-6`). Never flexbox `calc()` math.
- **The 3-equal-cards row is BANNED.** Use Bento (asymmetric tiles), zig-zag 2-col, or horizontal scroll instead.
- Cards only when elevation conveys hierarchy. Otherwise group with `border-t`, `divide-y`, or whitespace.

## 5. Motion Rules

- Animate only `transform` and `opacity`. Never `top`/`left`/`width`/`height`.
- Spring defaults: `type: "spring", stiffness: 100, damping: 20`. No linear easing.
- Magnetic / continuous hover: `useMotionValue` + `useTransform`. **Never `useState` for per-frame motion.**
- Staggered reveals: `staggerChildren` (parent + children in same client tree) or CSS `animation-delay: calc(var(--index) * 100ms)`.
- Perpetual loops (pulse, shimmer, marquee, typewriter) must be memoized and isolated in their own tiny `'use client'` leaf — never re-render the parent layout.
- Tactile feedback on `:active`: `-translate-y-[1px]` or `scale-[0.98]`.

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
