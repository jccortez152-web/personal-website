// Agents — one row per agent: the manual task it replaced (struck, condensed),
// its demo, and what it does now. The hero's tasks come first, in hero order.

import { agents } from "@/lib/data";
import { getVideos } from "@/lib/videos";
import { joinList } from "@/lib/format";
import DemoVideo from "./ui/DemoVideo";
import Section from "./ui/Section";

export default function Agents() {
  const videos = getVideos(agents.map((a) => a.video));
  const ordered = [
    ...agents.filter((a) => a.hero).sort((a, b) => (a.hero ?? 0) - (b.hero ?? 0)),
    ...agents.filter((a) => !a.hero),
  ];

  return (
    <Section
      id="agents"
      title="Agents"
      intro="Agents, Claude Skills and workflows I built inside a live robotics support operation. Each one took over a task someone used to do by hand."
    >
      <ol className="divide-y divide-rule">
        {ordered.map((a) => {
          const video = a.video ? videos[a.video] : undefined;
          return (
            <li
              key={a.id}
              id={`agent-${a.id}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 py-10 first:pt-0 scroll-mt-24"
            >
              <p className="lg:col-span-3 condensed font-bold text-[26px] md:text-[30px] leading-[1.1] text-graphite">
                <s className="strike no-underline">{a.manual}</s>
                <span className="sr-only"> (no longer done by hand)</span>
              </p>
              {video && (
                <div className="lg:col-span-4">
                  <DemoVideo title={a.name} src={video.src} poster={video.poster} captions={video.captions} />
                </div>
              )}
              <div className={video ? "lg:col-span-5" : "lg:col-span-9"}>
                <h3 className="text-[24px] md:text-[26px] leading-tight font-extrabold tracking-tight">
                  {a.name}
                </h3>
                {a.result && <p className="mt-2 text-[19px] font-semibold">{a.result}</p>}
                <p className="mt-3 text-graphite max-w-[60ch]">{a.summary}</p>
                {a.stack && (
                  <p className="mt-3 text-[15px] text-graphite">Built with {joinList(a.stack)}.</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
