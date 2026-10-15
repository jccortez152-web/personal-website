// Plain section: a title, an optional intro, content. No labels, swatches or
// numbering above the title.

import { ReactNode } from "react";

export default function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-20 md:py-28">
        <header className="mb-12 md:mb-16 max-w-[64ch]">
          <h2 id={`${id}-title`} className="expanded text-title font-extrabold tracking-tight">
            {title}
          </h2>
          {intro && <p className="mt-5 text-graphite">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
