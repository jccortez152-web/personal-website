// A full-bleed band: white, light gray or black. Centered title and intro,
// Apple product-page style. Black bands set a lighter focus ring.

import { CSSProperties, ReactNode } from "react";

export type Tone = "base" | "alt" | "black";

const toneClass: Record<Tone, string> = {
  base: "bg-base text-fg",
  alt: "bg-alt text-fg",
  black: "bg-black text-on-black",
};

export default function Section({
  id,
  tone = "base",
  title,
  intro,
  children,
}: {
  id: string;
  tone?: Tone;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const style =
    tone === "black" ? ({ "--focus": "var(--color-link-on-black)" } as CSSProperties) : undefined;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={toneClass[tone]} style={style}>
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 py-24 md:py-32">
        <header className="reveal mb-14 md:mb-20 text-center max-w-[40rem] mx-auto">
          <h2 id={`${id}-title`} className="text-title font-bold">
            {title}
          </h2>
          {intro && (
            <p
              className={`mt-5 text-lede text-balance ${tone === "black" ? "text-on-black-2" : "text-fg-2"}`}
            >
              {intro}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
