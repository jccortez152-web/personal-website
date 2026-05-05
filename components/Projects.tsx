"use client";

// Projects as alternating full-width case-study rows. Each project gets a
// typographic visual block (no fabricated screenshots) on one side and prose
// on the other; rows alternate direction so the page doesn't read as a list.
// Tiles open the same case-study modal as before.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/lib/data";

// Each project gets its own visual treatment — color block + abstract pattern —
// so the case-study rows don't look identical.
type Treatment = {
  bg: string;
  pattern: React.ReactNode;
  numberColor: string;
};

const treatments: Record<string, Treatment> = {
  robochat: {
    bg: "bg-[#1a2510]",
    numberColor: "text-cyan-bright",
    pattern: (
      <>
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_2px_2px,rgba(163,230,53,0.18)_1px,transparent_0)] [background-size:18px_18px] opacity-50" />
        <div className="absolute right-6 bottom-6 font-mono text-[10px] uppercase tracking-wider text-cyan-bright/70">
          {"> "}thinking…
          <span className="inline-block w-[6px] h-[10px] bg-cyan-bright align-[-1px] ml-1 animate-caret" />
        </div>
      </>
    ),
  },
  reimbursement: {
    bg: "bg-[#241a14]",
    numberColor: "text-amber-200",
    pattern: (
      <>
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(251,191,36,0.06)_1px,transparent_1px)] [background-size:100%_28px]" />
        <div className="absolute right-6 bottom-6 font-mono text-[10px] uppercase tracking-wider text-amber-200/70">
          ¶ approved · routed
        </div>
      </>
    ),
  },
  "robocare-web": {
    bg: "bg-[#101924]",
    numberColor: "text-sky-300",
    pattern: (
      <>
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(125,211,252,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute right-6 bottom-6 font-mono text-[10px] uppercase tracking-wider text-sky-300/70">
          / runbook · indexed
        </div>
      </>
    ),
  },
  "relay-store": {
    bg: "bg-[#22141d]",
    numberColor: "text-rose-300",
    pattern: (
      <>
        <div className="absolute inset-0 [background-image:repeating-linear-gradient(45deg,rgba(251,113,133,0.06)_0_8px,transparent_8px_16px)]" />
        <div className="absolute right-6 bottom-6 font-mono text-[10px] uppercase tracking-wider text-rose-300/70">
          order · dispatched
        </div>
      </>
    ),
  },
};

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === activeId);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section
      id="projects"
      className="px-6 py-32 md:py-40 border-t border-ink-800/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 flex items-center gap-3 mb-6">
          <span>§ 04</span>
          <span className="h-px w-8 bg-ink-700" />
          <span>selected work</span>
        </div>
        <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink-100 max-w-3xl mb-20">
          Things I've shipped.{" "}
          <span className="italic text-ink-400">
            Internal tools that closed real operational gaps.
          </span>
        </h2>

        {/* Case study rows */}
        <div className="space-y-28 md:space-y-36">
          {projects.map((p, i) => (
            <CaseStudyRow
              key={p.id}
              project={p}
              index={i}
              treatment={treatments[p.id]}
              onOpen={() => setActiveId(p.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
            className="fixed inset-0 z-50 bg-ink-950/85 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-ink-900 border border-ink-800 rounded-t-sm md:rounded-sm max-h-[90dvh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`project-title-${active.id}`}
            >
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full border border-ink-800 hover:border-ink-700 flex items-center justify-center text-ink-400 hover:text-ink-100 transition-colors z-10"
                aria-label="Close case study"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>

              <div className="p-8 md:p-12">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-bright/80">
                  case study
                </div>
                <h3
                  id={`project-title-${active.id}`}
                  className="mt-3 font-display font-light text-3xl md:text-5xl tracking-tight leading-[1.05]"
                >
                  {active.name}
                </h3>
                <p className="mt-2 italic font-display text-ink-400 text-lg">
                  {active.tagline}
                </p>

                <div className="mt-10 space-y-8">
                  <Block label="Problem" body={active.problem} />
                  <Block label="Solution" body={active.solution} />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-bright/80 mb-3">
                      Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {active.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-xs text-ink-200 px-3 py-1.5 border border-ink-800 rounded-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Block label="Impact" body={active.impact} highlight />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CaseStudyRow({
  project,
  index,
  treatment,
  onOpen,
}: {
  project: Project;
  index: number;
  treatment: Treatment;
  onOpen: () => void;
}) {
  const flipped = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      {/* Visual block */}
      <div
        className={`lg:col-span-6 ${flipped ? "lg:order-2" : "lg:order-1"}`}
      >
        <button
          onClick={onOpen}
          className={`group relative w-full aspect-[4/3] overflow-hidden rounded-sm ${treatment.bg} border border-ink-800 hover:border-cyan-bright/40 hover:shadow-[0_30px_80px_-30px_rgba(163,230,53,0.45),0_0_60px_-15px_rgba(163,230,53,0.25)] hover:scale-[1.005] transition-all duration-500 text-left`}
        >
          {treatment.pattern}
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
            <div
              className={`font-mono text-xs uppercase tracking-[0.25em] ${treatment.numberColor}`}
            >
              N° {number}
            </div>
            <div>
              <h3 className="font-display font-light text-3xl md:text-5xl tracking-tight leading-[0.95] text-ink-100">
                {project.name.replace("Relay ", "")}
              </h3>
              <p className="mt-2 italic font-display text-ink-300/90">
                {project.tagline}
              </p>
            </div>
          </div>
          <span className="absolute top-6 right-6 w-10 h-10 rounded-full border border-ink-700 group-hover:border-cyan-bright group-hover:text-cyan-bright text-ink-400 flex items-center justify-center transition-colors">
            <ArrowUpRight
              className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={1.5}
            />
          </span>
        </button>
      </div>

      {/* Prose */}
      <div
        className={`lg:col-span-6 space-y-6 ${flipped ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500">
            n° {number}
          </span>
          <span className="h-px flex-1 bg-ink-800" />
        </div>

        <h3 className="font-display font-light text-3xl md:text-4xl tracking-tight leading-[1.05] text-ink-100">
          {project.name}
        </h3>

        <p className="text-ink-300 leading-relaxed">{project.problem}</p>

        <p className="text-ink-200 leading-relaxed">
          <span className="text-cyan-bright italic font-display text-base">
            Solution —{" "}
          </span>
          {project.solution}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] uppercase tracking-wider text-ink-400 px-2 py-1 border border-ink-800 rounded-sm"
            >
              {s}
            </span>
          ))}
        </div>

        <button
          onClick={onOpen}
          className="group inline-flex items-center gap-1.5 text-ink-100 hover:text-cyan-bright transition-colors font-display italic text-lg border-b border-ink-700 hover:border-cyan-bright pb-1"
        >
          Read the case study
          <ArrowUpRight
            className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </article>
  );
}

function Block({
  label,
  body,
  highlight,
}: {
  label: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-bright/80 mb-3">
        {label}
      </div>
      <p
        className={`leading-relaxed ${highlight ? "text-ink-100 text-lg" : "text-ink-300"}`}
      >
        {body}
      </p>
    </div>
  );
}
