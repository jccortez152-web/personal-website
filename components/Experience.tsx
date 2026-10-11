// Experience as a vertical timeline: thin rail, amber dot per role, each
// role in a raised card.

import { experience } from "@/lib/data";
import SectionHeader from "./ui/SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="px-4 md:px-8 py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="03" label="Experience" title="Where the work happened." />

        <ol className="relative max-w-4xl">
          <span aria-hidden className="absolute left-[5px] top-2 bottom-2 w-px bg-line" />
          {experience.map((e) => (
            <li key={e.company + e.role} className="relative pl-8 md:pl-12 pb-8 last:pb-0">
              <span
                aria-hidden
                className="absolute left-0 top-8 w-[11px] h-[11px] rounded-full bg-signal ring-4 ring-ink"
              />
              <article className="card-hover bg-surface border border-line rounded-card p-6 md:p-8">
                <p className="label-mono text-muted">{e.period}</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg">
                  {e.company}
                </h3>
                <p className="mt-1 text-fg-2 font-medium">{e.role}</p>
                <ul className="mt-6 space-y-3 text-muted leading-relaxed">
                  {e.bullets.map((b) => (
                    <li key={b} className="relative pl-5">
                      <span
                        aria-hidden
                        className="absolute left-0 top-[0.7em] w-2 h-px bg-fg-2"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
