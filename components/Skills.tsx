// Skills — four tiles on white, plain lists inside.

import { skills } from "@/lib/data";
import Section from "./ui/Section";

export default function Skills() {
  return (
    <Section id="skills" title="Skills." intro="What I reach for now. Happy to learn whatever your team uses.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {skills.map((g) => (
          <div key={g.group} className="reveal rounded-[28px] bg-alt p-6 md:p-8">
            <h3 className="text-[22px] font-semibold tracking-[-0.01em]">{g.group}</h3>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[16px] text-fg-2">
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
