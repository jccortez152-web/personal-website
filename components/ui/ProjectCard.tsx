// Shared card for agents and web-app projects. Raised surface, 1px border,
// amber border + 2px lift on hover. Optional mono stack header, "Result:" row,
// and case-study button (only where a case study exists).

import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

export default function ProjectCard({
  name,
  stackHeader,
  tagline,
  children,
  tags,
  result,
  onOpenCaseStudy,
  className = "",
}: {
  name: string;
  stackHeader?: string[];
  tagline?: string;
  children: ReactNode;
  tags?: string[];
  result?: string;
  onOpenCaseStudy?: () => void;
  className?: string;
}) {
  return (
    <article
      className={`card-hover flex flex-col bg-surface border border-line rounded-card p-6 md:p-8 ${className}`}
    >
      {stackHeader && (
        <p className="label-mono text-muted pb-4 mb-6 border-b border-line">
          {stackHeader.join(" / ")}
        </p>
      )}

      <h3 className="text-2xl font-bold tracking-tight text-fg">{name}</h3>
      {tagline && <p className="mt-2 text-fg-2">{tagline}</p>}

      <div className="mt-4 space-y-4 text-muted leading-relaxed flex-1">
        {children}
      </div>

      {tags && (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
          {tags.map((t) => (
            <li
              key={t}
              className="font-mono text-[13px] text-fg-2 px-3 py-1 border border-line rounded-full"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      {result && (
        <p className="mt-6 pt-4 border-t border-line text-fg-2 font-medium">
          <span className="label-mono text-muted mr-2">Result:</span>
          {result}
        </p>
      )}

      {onOpenCaseStudy && (
        <button
          type="button"
          onClick={onOpenCaseStudy}
          className="group mt-6 self-start inline-flex items-center gap-2 min-h-11 text-signal font-medium"
        >
          Read the case study
          <ArrowUpRight
            className="w-4 h-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden
          />
        </button>
      )}
    </article>
  );
}
