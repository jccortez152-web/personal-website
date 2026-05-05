// Education + Certifications. Education leads as a single highlighted entry,
// followed by the full credential list with cert/workshop/award tagging on
// the right.

import { certifications, education } from "@/lib/data";

const kindLabel: Record<"cert" | "workshop" | "award", string> = {
  cert: "certified",
  workshop: "workshop",
  award: "award",
};

const kindClass: Record<"cert" | "workshop" | "award", string> = {
  cert: "text-cyan-bright/70",
  workshop: "text-ink-400",
  award: "text-amber-300/80",
};

export default function Certifications() {
  return (
    <section className="px-6 py-32 md:py-40 border-t border-ink-800/60">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 flex items-center gap-3 mb-6">
          <span>§ 06</span>
          <span className="h-px w-8 bg-ink-700" />
          <span>credentials</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink-100">
              Education &amp;
              <br />
              <span className="italic text-ink-400">certifications.</span>
              <br />
              <span className="italic text-ink-500 text-2xl md:text-3xl">
                For the record.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-1">
            {/* Education first — leads as the foundational entry */}
            <ul className="border-t border-ink-800 mb-12">
              <li className="border-b border-ink-800 py-5 flex items-baseline justify-between gap-6">
                <div>
                  <div className="text-ink-100 font-display italic text-xl md:text-2xl">
                    {education.degree}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 mt-1.5">
                    {education.school} · {education.period}
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-bright/70 shrink-0">
                  degree
                </span>
              </li>
            </ul>

            {/* Certifications, workshops, awards */}
            <ul className="border-t border-ink-800">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="border-b border-ink-800 py-5 flex items-baseline justify-between gap-6"
                >
                  <div>
                    <div className="text-ink-100 font-display italic text-xl md:text-2xl">
                      {c.name}
                    </div>
                    {c.track && (
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 mt-1.5">
                        {c.track}
                      </div>
                    )}
                  </div>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.25em] shrink-0 ${kindClass[c.kind]}`}
                  >
                    {kindLabel[c.kind]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
