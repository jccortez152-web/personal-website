// Apps — RoboChat leads with its live two-pane demo, then the other apps as a
// plain list with small posters, case studies and links.

import { projects } from "@/lib/data";
import { getVideos } from "@/lib/videos";
import { joinList } from "@/lib/format";
import RoboChatDemo from "./RoboChatDemo";
import CaseStudy from "./ui/CaseStudy";
import DemoVideo from "./ui/DemoVideo";
import Section from "./ui/Section";

export default function Apps() {
  const videos = getVideos(projects.map((p) => p.video));
  const [lead, ...rest] = projects;
  const leadVideo = lead.video ? videos[lead.video] : undefined;

  return (
    <Section
      id="apps"
      title="Apps"
      intro="Web apps, from internal tools that closed real operational gaps at Relay to builds for clients."
    >
      <article aria-labelledby="robochat-title">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-6">
            <h3 id="robochat-title" className="expanded text-[32px] md:text-[40px] leading-tight font-extrabold tracking-tight">
              {lead.name}
            </h3>
            <p className="mt-3 text-[20px] font-semibold">{lead.tagline}</p>
            <p className="mt-4 text-graphite max-w-[60ch]">
              When a hospital nurse hits a wall with a robot, they open the chat link. I see it land
              in Slack and reply from there. They see my response appear in the bubble. No phone
              call, no install, no account.
            </p>
            {lead.stack && (
              <p className="mt-3 text-[15px] text-graphite">Built with {joinList(lead.stack)}.</p>
            )}
            <div className="mt-1">
              <CaseStudy project={lead} />
            </div>
          </div>
          {leadVideo && (
            <div className="lg:col-span-6">
              <DemoVideo title={lead.name} src={leadVideo.src} poster={leadVideo.poster} captions={leadVideo.captions} />
            </div>
          )}
        </div>

        <h4 className="mt-12 mb-4 text-xl font-bold">Try it: two sides of the same chat</h4>
        <RoboChatDemo />
      </article>

      <h3 className="mt-20 md:mt-24 mb-2 text-[26px] font-extrabold tracking-tight">More apps</h3>
      <ul className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
        {rest.map((p) => {
          const video = p.video ? videos[p.video] : undefined;
          return (
            <li
              key={p.id}
              className={`grid gap-4 sm:gap-6 py-6 border-t border-rule ${
                video ? "grid-cols-[112px_1fr] sm:grid-cols-[160px_1fr]" : "grid-cols-1"
              }`}
            >
              {video && (
                <div>
                  <DemoVideo title={p.name} src={video.src} poster={video.poster} captions={video.captions} thumb />
                </div>
              )}
              <div className="min-w-0">
                <h4 className="text-[20px] leading-tight font-bold">{p.name}</h4>
                {p.tagline && <p className="mt-1 text-graphite">{p.tagline}</p>}
                {!p.problem && p.summary && (
                  <p className="mt-2 text-[16px] leading-relaxed text-graphite">{p.summary}</p>
                )}
                {p.stack && (
                  <p className="mt-2 text-[15px] text-graphite">Built with {joinList(p.stack)}.</p>
                )}
                {(p.problem || p.link) && (
                  <div className="mt-1 flex flex-wrap gap-x-6">
                    {p.problem && <CaseStudy project={p} />}
                    {p.link && (
                      <a
                        href={p.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link inline-flex items-center min-h-11 font-semibold text-navy"
                      >
                        {p.link.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
