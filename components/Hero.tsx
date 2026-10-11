// Hero — left-aligned intro, framed portrait on the right, a dotted amber
// "robot route" running beneath, then the sample log console.

import Image from "next/image";
import { ArrowRight, Download, Terminal } from "lucide-react";
import LiveSystemLog from "./LiveSystemLog";
import RobotRoute from "./ui/RobotRoute";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Dot grid, faded out toward the text column */}
      <div
        aria-hidden
        className="absolute inset-0 dot-grid pointer-events-none [mask-image:linear-gradient(to_left,black_15%,transparent_65%)]"
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16 items-center">
          <div className="md:col-span-7 animate-rise">
            <div className="flex flex-wrap items-center gap-4">
              <p className="label-mono text-muted">Portfolio · 2026</p>
              <p className="inline-flex items-center gap-2 rounded-full border border-live/40 px-3 py-1 label-mono text-live">
                <span aria-hidden className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-live/60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-live" />
                </span>
                Open to work
              </p>
            </div>

            <h1 className="mt-6 text-hero font-bold text-fg">
              Johannes Cortez
            </h1>

            <p className="mt-4 text-xl md:text-2xl font-medium text-fg-2">
              AI Automation Specialist · Robotics Fleet Ops
            </p>

            <p className="mt-6 text-body text-muted max-w-xl">
              I build AI agents and automations that replace manual work,
              inside a live, safety-critical robotics operation. Open to AI
              automation and AI agent roles.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#agents"
                className="group inline-flex items-center gap-2 min-h-12 px-6 rounded-card bg-signal text-ink font-bold transition-colors duration-150 hover:bg-signal/90"
              >
                View work
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </a>
              <a
                href={profile.links.resume}
                className="inline-flex items-center gap-2 min-h-12 px-6 rounded-card border border-line text-fg font-medium transition-colors duration-150 hover:border-signal/40"
              >
                <Download className="w-4 h-4" strokeWidth={1.75} aria-hidden />
                Resume
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 min-h-12 px-6 rounded-card border border-line text-fg font-medium transition-colors duration-150 hover:border-signal/40"
              >
                <Terminal className="w-4 h-4" strokeWidth={1.75} aria-hidden />
                Live demo
              </a>
            </div>
          </div>

          <figure className="md:col-span-5 w-full max-w-sm md:max-w-none animate-rise">
            <div className="relative aspect-[4/5] rounded-card border border-line bg-surface overflow-hidden">
              <Image
                src="/jc-portrait.png"
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 384px"
                className="object-cover object-bottom"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 label-mono text-muted">
              <span className="text-fg-2 whitespace-nowrap">{profile.shortName}</span>
              <span className="whitespace-nowrap">Quezon City, PH</span>
            </figcaption>
          </figure>
        </div>

        <RobotRoute className="mt-12 md:mt-16" />

        <div className="mt-8">
          <LiveSystemLog />
        </div>
      </div>
    </section>
  );
}
