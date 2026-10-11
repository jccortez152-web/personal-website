// AI Agents & Automations — placed before the web-app projects. Same
// ProjectCard, with a stack header and a "Result:" row; no case-study link
// since these have no case study.

import { agents } from "@/lib/data";
import ProjectCard from "./ui/ProjectCard";
import SectionHeader from "./ui/SectionHeader";

export default function Agents() {
  return (
    <section id="agents" className="px-4 md:px-8 py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="04"
          label="Agents"
          title="AI Agents & Automations"
          sub="Built inside a live robotics support operation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((a) => (
            <ProjectCard
              key={a.id}
              name={a.name}
              stackHeader={a.stack}
              result={a.result}
            >
              <p>{a.summary}</p>
            </ProjectCard>
          ))}
        </div>
      </div>
    </section>
  );
}
