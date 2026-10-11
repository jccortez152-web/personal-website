// AI Agents & Automations — placed before the web-app projects. Same
// ProjectCard, with a stack header, an optional "Result:" row, and a demo
// video where one exists in public/videos; no case-study link.

import { agents } from "@/lib/data";
import { getVideos } from "@/lib/videos";
import ProjectCard from "./ui/ProjectCard";
import SectionHeader from "./ui/SectionHeader";

export default function Agents() {
  const videos = getVideos(agents.map((a) => a.video));

  return (
    <section id="agents" className="px-4 md:px-8 py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="04"
          label="Agents"
          title="AI Agents & Automations"
          sub="Agents, Claude Skills, and workflows built inside a live robotics support operation. Most have a short demo."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((a) => (
            <ProjectCard
              key={a.id}
              name={a.name}
              stackHeader={a.stack}
              result={a.result}
              video={a.video ? videos[a.video] : undefined}
            >
              <p>{a.summary}</p>
            </ProjectCard>
          ))}
        </div>
      </div>
    </section>
  );
}
