// Education + certifications. Education leads, then the credential list with
// a mono kind chip on each row.

import { certifications, education } from "@/lib/data";
import SectionHeader from "./ui/SectionHeader";

const kindLabel: Record<"cert" | "workshop" | "award", string> = {
  cert: "Certified",
  workshop: "Workshop",
  award: "Award",
};

export default function Certifications() {
  return (
    <section id="credentials" className="px-4 md:px-8 py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="07"
          label="Credentials"
          title="Education & certifications."
        />

        <div className="max-w-4xl">
          <ul className="border-t border-line mb-12">
            <Item
              name={education.degree}
              meta={`${education.school} · ${education.period}`}
              kind="Degree"
              accent
            />
          </ul>

          <ul className="border-t border-line">
            {certifications.map((c) => (
              <Item
                key={c.name}
                name={c.name}
                meta={c.track}
                kind={kindLabel[c.kind]}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Item({
  name,
  meta,
  kind,
  accent,
}: {
  name: string;
  meta?: string;
  kind: string;
  accent?: boolean;
}) {
  return (
    <li className="border-b border-line py-5 flex items-start justify-between gap-6">
      <div>
        <div className="text-lg md:text-xl font-medium text-fg">{name}</div>
        {meta && <div className="mt-1 label-mono text-muted">{meta}</div>}
      </div>
      <span
        className={`shrink-0 font-mono text-[13px] px-3 py-1 border rounded-full ${
          accent ? "text-signal border-signal/40" : "text-fg-2 border-line"
        }`}
      >
        {kind}
      </span>
    </li>
  );
}
