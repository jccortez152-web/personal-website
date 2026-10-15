"use client";

// "Read the case study" link-button + modal (Problem, Solution, Built with,
// Impact). Same dialog behaviour as DemoVideo via useDialog.

import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Project } from "@/lib/data";
import { useDialog } from "./useDialog";
import { joinList } from "@/lib/format";

export default function CaseStudy({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDialog(open, close, dialogRef, triggerRef);

  const titleId = `case-study-${project.id}`;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="link inline-flex items-center min-h-11 font-bold text-navy"
      >
        Read the case study
        <span className="sr-only">: {project.name}</span>
      </button>

      {open &&
        createPortal(
          <div
            onClick={close}
            style={{ "--focus": "var(--color-navy)" } as React.CSSProperties}
            className="fixed inset-0 z-50 bg-panel/85 flex items-end md:items-center justify-center md:p-6"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto bg-card text-ink md:rounded-lg"
            >
              <button
                type="button"
                data-autofocus
                onClick={close}
                aria-label="Close case study"
                className="absolute top-3 right-3 w-11 h-11 inline-flex items-center justify-center rounded-full hover:bg-paper transition-colors duration-150"
              >
                <X className="w-5 h-5" strokeWidth={2} aria-hidden />
              </button>

              <div className="p-6 md:p-12">
                <h3 id={titleId} className="expanded pr-12 text-title font-extrabold tracking-tight">
                  {project.name}
                </h3>
                {project.tagline && <p className="mt-3 text-xl text-graphite">{project.tagline}</p>}

                <dl className="mt-10 space-y-8">
                  <Part label="Problem" body={project.problem} />
                  <Part label="Solution" body={project.solution} />
                  {project.stack && <Part label="Built with" body={`${joinList(project.stack)}.`} />}
                  <Part label="Impact" body={project.impact} strong />
                </dl>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function Part({ label, body, strong }: { label: string; body?: string; strong?: boolean }) {
  if (!body) return null;
  return (
    <div>
      <dt className="font-extrabold text-xl">{label}</dt>
      <dd className={`mt-2 max-w-[68ch] ${strong ? "text-ink font-bold" : "text-graphite"}`}>{body}</dd>
    </div>
  );
}
