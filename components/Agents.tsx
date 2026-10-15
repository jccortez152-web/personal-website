// Agents — featured agents as big alternating rows (poster as the product
// shot), the rest as tiles. The spotlight agent lives in the hero.

import { agents } from "@/lib/data";
import { getVideos } from "@/lib/videos";
import { joinList } from "@/lib/format";
import DemoVideo from "./ui/DemoVideo";
import Chevron from "./ui/Chevron";
import Section from "./ui/Section";

export default function Agents() {
  const videos = getVideos(agents.map((a) => a.video));
  const featured = agents.filter((a) => a.featured);
  const rest = agents.filter((a) => !a.featured && !a.spotlight);

  return (
    <Section
      id="agents"
      title="Agents."
      intro="Agents, Claude Skills and workflows I built inside a live robotics support operation. Each one took over work someone used to do by hand."
    >
      <div className="space-y-20 md:space-y-28">
        {featured.map((a, i) => {
          const video = a.video ? videos[a.video] : undefined;
          return (
            <article
              key={a.id}
              id={`agent-${a.id}`}
              className="reveal grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              {video && (
                <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                  <DemoVideo title={a.name} src={video.src} poster={video.poster} captions={video.captions} />
                </div>
              )}
              <div className={video ? "md:col-span-5" : "md:col-span-12"}>
                <h3 className="text-[28px] md:text-[34px] font-bold leading-tight tracking-[-0.02em]">
                  {a.name}
                </h3>
                {a.result && <p className="mt-3 text-[21px] leading-snug font-semibold">{a.result}</p>}
                <p className="mt-3 text-fg-2">{a.summary}</p>
                {a.stack && <p className="mt-3 text-[15px] text-fg-2">Built with {joinList(a.stack)}.</p>}
                {video && (
                  <DemoVideo
                    title={a.name}
                    src={video.src}
                    poster={video.poster}
                    captions={video.captions}
                    triggerClassName="link mt-4 inline-flex items-center min-h-11 text-[17px] text-link"
                  >
                    Watch the demo
                    <Chevron />
                  </DemoVideo>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <h3 className="reveal mt-24 md:mt-32 mb-8 text-center text-[28px] md:text-[34px] font-bold tracking-[-0.02em]">
        And more.
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {rest.map((a) => {
          const video = a.video ? videos[a.video] : undefined;
          return (
            <li key={a.id} id={`agent-${a.id}`} className="reveal rounded-[28px] bg-alt p-6 md:p-8 flex flex-col">
              {video && (
                <div className="mb-6">
                  <DemoVideo title={a.name} src={video.src} poster={video.poster} captions={video.captions} thumb />
                </div>
              )}
              <h4 className="text-[22px] font-semibold tracking-[-0.01em]">{a.name}</h4>
              {a.result && <p className="mt-2 font-semibold">{a.result}</p>}
              <p className="mt-2 text-fg-2">{a.summary}</p>
              {a.stack && <p className="mt-3 text-[15px] text-fg-2">Built with {joinList(a.stack)}.</p>}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
