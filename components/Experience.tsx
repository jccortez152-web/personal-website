// Experience as an editorial timeline. Years in italic display serif,
// company names as bold sans, bullets as flowing prose with key terms
// emphasized. No timeline rail dots.

import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-6 py-32 md:py-40 border-t border-ink-800/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 flex items-center gap-3 mb-6">
          <span>§ 03</span>
          <span className="h-px w-8 bg-ink-700" />
          <span>track record</span>
        </div>

        <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink-100 max-w-3xl mb-20">
          Where the work happened.
        </h2>

        <div className="space-y-20 md:space-y-28">
          {experience.map((e) => (
            <article
              key={e.company + e.role}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
            >
              {/* Year + company on the left */}
              <header className="lg:col-span-4 space-y-3 lg:sticky lg:top-24 self-start">
                <div className="font-display italic text-3xl md:text-4xl text-cyan-bright tracking-tight leading-none">
                  {e.period}
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-ink-100 tracking-tight">
                  {e.company}
                </h3>
                <p className="text-ink-400 italic font-display text-lg">
                  {e.role}
                </p>
              </header>

              {/* Bullets as flowing prose */}
              <div className="lg:col-span-8 space-y-6 text-ink-300 leading-relaxed text-lg">
                {e.bullets.map((b) => (
                  <p key={b} className="border-l border-ink-800 pl-6">
                    {b}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
