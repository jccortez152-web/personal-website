"use client";

// Web-app projects in an asymmetric 7/5 grid using the shared ProjectCard.
// Each card opens the case-study modal (Problem → Solution → Stack → Impact).

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { projects } from "@/lib/data";
import ProjectCard from "./ui/ProjectCard";
import SectionHeader from "./ui/SectionHeader";

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
    <section id="projects" className="px-4 md:px-8 py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="05"
          label="Work"
          title="Things I've shipped."
          sub="Internal web apps that closed real operational gaps."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              name={p.name}
              tagline={p.tagline}
              tags={p.stack}
              onOpenCaseStudy={() => setActiveId(p.id)}
              className={p.span === "wide" ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <p>{p.problem}</p>
            </ProjectCard>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setActiveId(null)}
            className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-surface border border-line rounded-t-card md:rounded-card max-h-[90dvh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`project-title-${active.id}`}
            >
              <button
                type="button"
                autoFocus
                onClick={() => setActiveId(null)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full border border-line hover:border-signal/40 flex items-center justify-center text-fg-2 hover:text-fg transition-colors duration-150"
                aria-label="Close case study"
              >
                <X className="w-4 h-4" strokeWidth={1.75} aria-hidden />
              </button>

              <div className="p-6 md:p-12">
                <p className="label-mono text-signal">Case study</p>
                <h3
                  id={`project-title-${active.id}`}
                  className="mt-4 pr-12 text-h2 font-bold text-fg"
                >
                  {active.name}
                </h3>
                <p className="mt-2 text-fg-2 text-lg">{active.tagline}</p>

                <div className="mt-10 space-y-8">
                  <Block label="Problem" body={active.problem} />
                  <Block label="Solution" body={active.solution} />
                  <div>
                    <h4 className="label-mono text-muted mb-3">Stack</h4>
                    <ul className="flex flex-wrap gap-2">
                      {active.stack.map((s) => (
                        <li
                          key={s}
                          className="font-mono text-[13px] text-fg-2 px-3 py-1 border border-line rounded-full"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
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
      <h4 className="label-mono text-muted mb-3">{label}</h4>
      <p
        className={`text-body ${highlight ? "text-fg" : "text-fg-2"}`}
      >
        {body}
      </p>
    </div>
  );
}
