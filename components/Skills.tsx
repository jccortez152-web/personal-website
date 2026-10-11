// Skills as grouped chip clusters.

import { skills } from "@/lib/data";
import SectionHeader from "./ui/SectionHeader";

export default function Skills() {
  return (
    <section id="skills" className="px-4 md:px-8 py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="02"
          label="Skills"
          title="What I work with."
          sub="Tool-pragmatic: this is what I reach for now. Happy to learn whatever your team uses."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {skills.map((g) => (
            <div key={g.group} className="border-t border-line pt-6">
              <h3 className="text-xl font-bold text-fg mb-4">{g.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[13px] text-fg-2 px-3 py-1.5 border border-line rounded-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
