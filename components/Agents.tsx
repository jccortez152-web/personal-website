// AI agents (blue route). The three strongest demos as large alternating rows,
// the rest as a compact two-column list with small posters.

import { agents } from "@/lib/data";
import { getVideos } from "@/lib/videos";
import Section from "./ui/Section";
import { CompactItem, FeatureRow } from "./ui/WorkItems";

export default function Agents() {
  const videos = getVideos(agents.map((a) => a.video));
  const featured = agents.filter((a) => a.featured);
  const rest = agents.filter((a) => !a.featured);

  return (
    <Section
      id="agents"
      route="blue"
      title="AI agents"
      intro="Agents, Claude Skills and workflows I built inside a live robotics support operation. Most have a short demo."
    >
      <div className="space-y-16 md:space-y-24">
        {featured.map((a, i) => (
          <FeatureRow
            key={a.id}
            name={a.name}
            result={a.result}
            summary={a.summary}
            stack={a.stack}
            video={a.video ? videos[a.video] : undefined}
            tone="blue"
            flip={i % 2 === 1}
          />
        ))}
      </div>

      <h3 className="mt-20 md:mt-28 mb-2 text-[28px] font-extrabold tracking-tight">
        More agents and skills
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
        {rest.map((a) => (
          <CompactItem
            key={a.id}
            name={a.name}
            summary={a.summary}
            result={a.result}
            stack={a.stack}
            video={a.video ? videos[a.video] : undefined}
            tone="blue"
          />
        ))}
      </div>
    </Section>
  );
}
