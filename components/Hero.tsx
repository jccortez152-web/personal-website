// Hero — robotics-engineer control-panel feel.
// Layout (top → bottom):
//   1. Top kicker
//   2. Masthead grid: huge animated name on the left, floating cutout portrait on the right
//   3. Italic-serif tagline + body
//   4. CTAs
//   5. Live System Log panel (full width — the "live system" anchor)
//   6. Currently-shipping footnote line

import { ArrowUpRight, Download, Terminal } from "lucide-react";
import HeroVisualLayers from "./ui/HeroVisualLayers";
import CurrentlyRotator from "./ui/CurrentlyRotator";
import AnimatedMasthead from "./ui/AnimatedMasthead";
import AnimatedPortrait from "./ui/AnimatedPortrait";
import LiveSystemLog from "./LiveSystemLog";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] pt-28 pb-16 px-6 overflow-hidden"
    >
      <HeroVisualLayers />

      {/* Soft mesh-gradient backdrop, slow drift */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none animate-mesh-drift"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 12% 28%, rgba(163,230,53,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 90% 80%, rgba(163,230,53,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Top kicker */}
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500">
          <span className="h-px w-8 bg-ink-700" />
          <span>/portfolio · 2026</span>
          <span className="text-ink-700">·</span>
          <span>robotics + AI</span>
          <span className="hidden md:inline-block h-px flex-1 bg-ink-800/60 ml-2" />
          <span className="hidden md:inline-flex items-center gap-2 ml-auto text-ink-400">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-cyan-bright/60 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-cyan-bright" />
            </span>
            open to work
          </span>
        </div>

        {/* Masthead grid */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Name + statement */}
          <div className="lg:col-span-8 space-y-7">
            <AnimatedMasthead />

            <p className="font-display italic text-ink-200 leading-snug max-w-2xl text-2xl md:text-3xl lg:text-[2.5rem]">
              Robotics Engineer
              <span className="text-cyan-bright"> · </span>
              solving live system failures.
            </p>

            <p className="text-base md:text-lg text-ink-400 max-w-xl leading-relaxed">
              I diagnose robot failures from log data and live telemetry —
              and build the internal tools that prevent the next one.
              Front-line on a global fleet from {profile.location.split(",")[0]}.
              Open to AI / automation roles next.
            </p>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-2">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 text-ink-100 relative pb-1"
              >
                <span className="font-display italic text-lg">View work</span>
                <ArrowUpRight
                  className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                  strokeWidth={1.5}
                />
                {/* Animated underline grows from left on hover */}
                <span className="absolute left-0 bottom-0 h-px bg-cyan-bright w-full origin-left scale-x-100 group-hover:bg-cyan-bright transition-colors" />
              </a>
              <a
                href="#about"
                className="group inline-flex items-center text-ink-300 hover:text-ink-100 transition-colors font-display italic text-lg relative pb-1"
              >
                Read about
                <span className="absolute left-0 bottom-0 h-px bg-ink-300 w-0 group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href={profile.links.resume}
                className="group inline-flex items-center gap-1.5 text-ink-400 hover:text-cyan-bright transition-colors font-mono text-xs uppercase tracking-wider"
              >
                <Download
                  className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform"
                  strokeWidth={1.5}
                />
                resume
              </a>
              <a
                href="#demo"
                className="group inline-flex items-center gap-1.5 text-ink-500 hover:text-cyan-bright transition-colors font-mono text-xs uppercase tracking-wider ml-auto"
              >
                <Terminal className="w-3.5 h-3.5" strokeWidth={1.5} />
                live demo
              </a>
            </div>
          </div>

          {/* Portrait — transparent cutout, lime halo, float + cursor parallax */}
          <div className="lg:col-span-4">
            <figure className="relative">
              <div className="hidden lg:block absolute -left-7 top-2 -rotate-90 origin-top-left font-display italic text-ink-500 text-xs whitespace-nowrap z-10">
                fig. 01 — the engineer
              </div>

              {/* Glow + scan layers all live inside AnimatedPortrait now,
                  so the halo follows the float instead of staying static. */}
              <AnimatedPortrait
                src="/jc-portrait.png"
                alt={`${profile.name} — ${profile.role}`}
              />

              <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500">
                <span className="text-ink-300">{profile.shortName}</span>
                <span>JC · 2026</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Live system log — fleet ops feed, anchors the "live engineer" feel */}
        <div className="mt-14 lg:mt-20">
          <LiveSystemLog />
        </div>

        {/* Footnote: currently shipping rotator */}
        <div className="mt-10 pt-5 border-t border-ink-800/60 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright" />
            currently shipping
          </span>
          <span className="text-ink-300 normal-case tracking-normal text-sm font-sans">
            <CurrentlyRotator />
          </span>
          <span className="hidden sm:inline-block h-px flex-1 bg-ink-800/60" />
          <span className="text-ink-500">last commit · 14m ago</span>
        </div>
      </div>
    </section>
  );
}
