// Experience (yellow route) — a real sequence, so each role is a stop on the
// route. On desktop the stops sit on the gutter route; on mobile the list
// draws its own yellow line.

import { experience } from "@/lib/data";
import Section from "./ui/Section";

export default function Experience() {
  return (
    <Section id="experience" route="yellow" title="Experience">
      <ol className="relative max-w-[72ch] border-l-[6px] border-route-yellow lg:border-l-0 pl-8 lg:pl-0 space-y-16">
        {experience.map((e) => (
          <li key={e.company + e.role} className="relative">
            <span
              aria-hidden
              className="absolute top-1 w-[22px] h-[22px] rounded-full bg-route-yellow border-[4px] border-ink -left-[46px] lg:-left-[75px]"
            />
            <p className="text-ink-2">{e.period}</p>
            <h3 className="mt-1 text-[28px] md:text-[32px] leading-tight font-extrabold tracking-tight">
              {e.company}
            </h3>
            <p className="mt-1 font-bold">{e.role}</p>
            <ul className="mt-5 space-y-3 list-disc pl-5 marker:text-ink-2">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
