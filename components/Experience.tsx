// Experience — clean timeline on white: dates left, role right.

import { experience } from "@/lib/data";
import Section from "./ui/Section";

export default function Experience() {
  return (
    <Section id="experience" title="Experience.">
      <ol className="max-w-[880px] mx-auto divide-y divide-rule">
        {experience.map((e) => (
          <li
            key={e.company + e.role}
            className="reveal grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-10 py-10 first:pt-0"
          >
            <p className="md:col-span-3 text-[17px] font-medium text-fg-2">{e.period}</p>
            <div className="md:col-span-9">
              <h3 className="text-[28px] font-bold leading-tight tracking-[-0.02em]">{e.company}</h3>
              <p className="mt-1 text-[19px] font-medium">{e.role}</p>
              <ul className="mt-5 space-y-3 list-disc pl-5 marker:text-fg-2 text-fg-2">
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
