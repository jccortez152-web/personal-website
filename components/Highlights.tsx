// Highlights — a black band with a bento grid of real figures.

import { highlights } from "@/lib/data";
import Section from "./ui/Section";

export default function Highlights() {
  return (
    <Section id="highlights" tone="black" title="The short version." intro="What the agents and the work behind them add up to.">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {highlights.map((h) => (
          <li
            key={h.figure}
            className={`reveal rounded-[28px] bg-tile-dark p-8 md:p-10 flex flex-col justify-between min-h-[220px] ${
              h.span === 3 ? "md:col-span-3" : h.span === 2 ? "md:col-span-2" : ""
            }`}
          >
            <p className="text-[clamp(2.75rem,2rem+2.6vw,4.5rem)] font-bold leading-none tracking-[-0.03em]">
              {h.figure}
            </p>
            <p className="mt-6 text-[19px] leading-snug text-on-black-2 max-w-[26rem]">{h.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
