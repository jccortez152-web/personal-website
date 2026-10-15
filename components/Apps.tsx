// Apps — on the light-gray band. RoboChat leads in a large tile with its
// live two-pane demo; the other apps follow as tiles.

import { projects } from "@/lib/data";
import { getVideos } from "@/lib/videos";
import { joinList } from "@/lib/format";
import RoboChatDemo from "./RoboChatDemo";
import CaseStudy from "./ui/CaseStudy";
import DemoVideo from "./ui/DemoVideo";
import Chevron from "./ui/Chevron";
import Section from "./ui/Section";

export default function Apps() {
  const videos = getVideos(projects.map((p) => p.video));
  const [lead, ...others] = projects;
  const leadVideo = lead.video ? videos[lead.video] : undefined;
  // Tiles with a video pair up first; video-less apps follow full width so
  // no tile sits half empty next to a poster.
  const hasVideo = (p: (typeof projects)[number]) => Boolean(p.video && videos[p.video]);
  const rest = [...others.filter(hasVideo), ...others.filter((p) => !hasVideo(p))];

  return (
    <Section
      id="apps"
      tone="alt"
      title="Apps."
      intro="Web apps, from internal tools that closed real operational gaps at Relay to builds for clients."
    >
      <article aria-labelledby="robochat-title" className="reveal rounded-[28px] bg-tile p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5">
            <h3 id="robochat-title" className="text-[32px] md:text-[40px] font-bold leading-tight tracking-[-0.025em]">
              {lead.name}
            </h3>
            <p className="mt-3 text-[21px] leading-snug font-semibold">{lead.tagline}</p>
            <p className="mt-3 text-fg-2">
              When a hospital nurse hits a wall with a robot, they open the chat link. I see it land
              in Slack and reply from there. They see my response appear in the bubble. No phone
              call, no install, no account.
            </p>
            {lead.stack && <p className="mt-3 text-[15px] text-fg-2">Built with {joinList(lead.stack)}.</p>}
            <div className="mt-2">
              <CaseStudy project={lead} />
            </div>
          </div>
          {leadVideo && (
            <div className="md:col-span-7">
              <DemoVideo title={lead.name} src={leadVideo.src} poster={leadVideo.poster} captions={leadVideo.captions} />
            </div>
          )}
        </div>

        <h4 className="mt-12 mb-5 text-[21px] font-semibold">Try it: two sides of the same chat.</h4>
        <RoboChatDemo />
      </article>

      <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {rest.map((p) => {
          const video = p.video ? videos[p.video] : undefined;
          return (
            <li key={p.id} className={`reveal rounded-[28px] bg-tile p-6 md:p-8 flex flex-col ${video ? "" : "md:col-span-2"}`}>
              {video && (
                <div className="mb-6">
                  <DemoVideo title={p.name} src={video.src} poster={video.poster} captions={video.captions} thumb />
                </div>
              )}
              <h4 className="text-[22px] font-semibold tracking-[-0.01em]">{p.name}</h4>
              {p.tagline && <p className="mt-1 font-medium">{p.tagline}</p>}
              {!p.problem && p.summary && <p className="mt-2 text-fg-2">{p.summary}</p>}
              {p.stack && <p className="mt-3 text-[15px] text-fg-2">Built with {joinList(p.stack)}.</p>}
              {(p.problem || p.link) && (
                <div className="mt-auto pt-3 flex flex-wrap gap-x-6">
                  {p.problem && <CaseStudy project={p} />}
                  {p.link && (
                    <a
                      href={p.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link inline-flex items-center min-h-11 text-[17px] text-link"
                    >
                      {p.link.label}
                      <Chevron />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
