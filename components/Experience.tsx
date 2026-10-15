// Experience — a real sequence: years in a narrow left column, the role on
// the right.

import { experience } from "@/lib/data";
import Section from "./ui/Section";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="divide-y divide-rule">
        {experience.map((e) => (
          <li
            key={e.company + e.role}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 py-10 first:pt-0"
          >
            <p className="md:col-span-3 condensed font-bold text-[24px] md:text-[28px] leading-tight text-graphite">
              {e.period}
            </p>
            <div className="md:col-span-9 max-w-[68ch]">
              <h3 className="expanded text-[26px] md:text-[30px] leading-tight font-extrabold tracking-tight">
                {e.company}
              </h3>
              <p className="mt-1 font-semibold">{e.role}</p>
              <ul className="mt-5 space-y-3 list-disc pl-5 marker:text-graphite">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
