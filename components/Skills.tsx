// Skills as typographic prose, not panels. Each group renders as a flowing
// paragraph: italic-serif group title → em dash → comma-separated items.
// Reads like a magazine "Tools of the Trade" sidebar.

import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section
      id="skills"
      className="px-6 py-32 md:py-40 border-t border-ink-800/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 flex items-center gap-3 mb-6">
          <span>§ 02</span>
          <span className="h-px w-8 bg-ink-700" />
          <span>tools of the trade</span>
        </div>

        <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink-100 max-w-3xl mb-16">
          What I work with.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-9 space-y-12">
            {skills.map((g) => (
              <div key={g.group} className="border-t border-ink-800 pt-6">
                <h3 className="font-display italic text-2xl md:text-3xl text-ink-100 mb-4">
                  {g.group}
                </h3>
                <p className="text-ink-300 text-lg leading-relaxed">
                  {g.items.map((item, i) => (
                    <span key={item}>
                      <span className="text-ink-100">{item}</span>
                      {i < g.items.length - 1 && (
                        <span className="text-ink-600">{" · "}</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-3 space-y-6 text-sm text-ink-400 leading-relaxed">
            <p className="italic font-display text-lg text-ink-200">
              A note on the stack.
            </p>
            <p>
              I'm tool-pragmatic. The list above is what I reach for now;
              what matters is the diagnostic instinct under it — and shipping
              the next thing on Friday.
            </p>
            <p className="text-ink-500">
              Happy to learn whatever your team uses.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
