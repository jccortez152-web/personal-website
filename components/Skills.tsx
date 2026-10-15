// Skills — four plain lists.

import { skills } from "@/lib/data";
import Section from "./ui/Section";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" intro="What I reach for now. Happy to learn whatever your team uses.">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12">
        {skills.map((g) => (
          <div key={g.group}>
            <h3 className="text-[20px] font-extrabold tracking-tight">{g.group}</h3>
            <ul className="mt-4 space-y-2 text-[17px] text-graphite">
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
