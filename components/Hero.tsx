// Hero — centered headline and actions on light gray, then the spotlight
// agent's demo as a big framed "product shot" with its caption.

import { agents, profile } from "@/lib/data";
import { getVideos } from "@/lib/videos";
import DemoVideo from "./ui/DemoVideo";
import Chevron from "./ui/Chevron";

export default function Hero() {
  const spot = agents.find((a) => a.spotlight);
  const video = spot?.video ? getVideos([spot.video])[spot.video] : undefined;

  return (
    <section id="top" aria-labelledby="hero-title" className="bg-alt">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 text-center">
        <p className="text-[19px] md:text-[21px] font-semibold">{profile.shortName}</p>
        <h1 id="hero-title" className="mt-3 text-hero font-bold">
          AI agents that do the work.
        </h1>
        <p className="mt-5 mx-auto max-w-[36rem] text-lede text-fg-2">{profile.headline}</p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <a
            href="#agents"
            className="inline-flex items-center justify-center min-h-12 px-7 rounded-full bg-blue text-white text-[17px] font-medium transition-opacity duration-150 hover:opacity-90"
          >
            Watch the demos
          </a>
          <a
            href={profile.links.resume}
            download
            className="link inline-flex items-center min-h-11 text-[17px] text-link"
          >
            Download resume
            <Chevron />
          </a>
        </div>

        {spot && video && (
          <figure className="reveal mt-14 md:mt-20">
            <DemoVideo title={spot.name} src={video.src} poster={video.poster} captions={video.captions} />
            <figcaption className="mt-6 mx-auto max-w-[44rem]">
              <span className="font-semibold">{spot.name}.</span>{" "}
              <span className="text-fg-2">
                {spot.summary} {spot.result}
              </span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
