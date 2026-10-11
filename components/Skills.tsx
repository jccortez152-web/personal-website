// Skills (corridor route) — four headings, plain lists.

import { skills } from "@/lib/data";
import Section from "./ui/Section";

export default function Skills() {
  return (
    <Section
      id="skills"
      route="corridor"
      title="Skills"
      intro="What I reach for now. Happy to learn whatever your team uses."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12">
        {skills.map((g) => (
          <div key={g.group}>
            <h3 className="text-[22px] font-extrabold tracking-tight pb-3 border-b-2 border-ink">
              {g.group}
            </h3>
            <ul className="mt-4 space-y-2 text-[17px] text-ink-2">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
