// Hero — the manual tasks my agents took over, struck through on load. Each
// struck task is a button that opens the demo of the agent that does it now
// (or jumps to its entry when there's no video). Type only, on a ceil field.

import { agents, profile } from "@/lib/data";
import { getVideos } from "@/lib/videos";
import DemoVideo from "./ui/DemoVideo";

export default function Hero() {
  const tasks = agents
    .filter((a) => a.hero)
    .sort((a, b) => (a.hero ?? 0) - (b.hero ?? 0));
  const videos = getVideos(tasks.map((a) => a.video));

  const lineClass =
    "condensed text-left text-balance font-bold text-strike text-on-ceil hover:opacity-75 transition-opacity duration-150";

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="bg-ceil text-on-ceil"
      style={{ "--focus": "var(--color-on-ceil)" } as React.CSSProperties}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-10 md:pt-14 pb-16 md:pb-20">
        <ul className="space-y-1 md:space-y-0">
          {tasks.map((a, i) => {
            const video = a.video ? videos[a.video] : undefined;
            const text = (
              <>
                <s
                  className="strike strike-draw no-underline"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {a.manual}
                </s>
                <span className="sr-only">
                  {video
                    ? ` Now done by the ${a.name}. Play its demo.`
                    : ` Now done by the ${a.name}. Read about it.`}
                </span>
              </>
            );
            return (
              <li key={a.id}>
                {video ? (
                  <DemoVideo
                    title={a.name}
                    src={video.src}
                    poster={video.poster}
                    captions={video.captions}
                    triggerClassName={lineClass}
                  >
                    {text}
                  </DemoVideo>
                ) : (
                  <a href={`#agent-${a.id}`} className={`inline-block ${lineClass}`}>
                    {text}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-5 text-[16px]">Select a task to see the agent that does it now.</p>

        <h1
          id="hero-title"
          className="expanded mt-10 md:mt-12 font-extrabold text-[clamp(2rem,1.2rem+3.4vw,4rem)] leading-[1.05] tracking-tight"
        >
          My agents do these now.
        </h1>
        <p className="mt-5 max-w-[46ch] text-xl">{profile.headline}</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#agents"
            className="inline-flex items-center justify-center min-h-12 px-6 rounded-md bg-on-ceil text-ceil font-bold transition-colors duration-150 hover:bg-navy-deep hover:text-white"
          >
            Watch the demos
          </a>
          <a
            href={profile.links.resume}
            download
            className="inline-flex items-center justify-center min-h-12 px-6 rounded-md border-2 border-on-ceil font-bold transition-colors duration-150 hover:bg-on-ceil hover:text-ceil"
          >
            Download resume
          </a>
        </div>
      </div>
    </section>
  );
}
