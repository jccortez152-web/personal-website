// Credentials — quiet two-column list on light gray, degree first.

import { certifications, education } from "@/lib/data";
import Section from "./ui/Section";

const kindLabel: Record<"cert" | "workshop" | "award", string> = {
  cert: "Certification",
  workshop: "Workshop",
  award: "Award",
};

export default function Certifications() {
  const items = [
    { name: education.degree, meta: `${education.school}, ${education.period}` },
    ...certifications.map((c) => ({
      name: c.name,
      meta: c.track ? `${kindLabel[c.kind]}, ${c.track}` : kindLabel[c.kind],
    })),
  ];

  return (
    <Section id="credentials" tone="alt" title="Education and certifications.">
      <ul className="reveal max-w-[880px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {items.map((i) => (
          <li key={i.name} className="py-4 border-t border-rule">
            <p className="font-medium">{i.name}</p>
            <p className="text-[15px] text-fg-2">{i.meta}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
