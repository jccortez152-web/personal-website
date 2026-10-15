// Apps (green route). RoboChat leads with its live two-pane demo, then the
// other apps as a compact list.

import { projects } from "@/lib/data";
import { getVideos } from "@/lib/videos";
import { joinList } from "@/lib/format";
import RoboChatDemo from "./RoboChatDemo";
import CaseStudy from "./ui/CaseStudy";
import DemoVideo from "./ui/DemoVideo";
import Section from "./ui/Section";
import { CompactItem } from "./ui/WorkItems";

export default function Apps() {
  const videos = getVideos(projects.map((p) => p.video));
  const [lead, ...rest] = projects;
  const leadVideo = lead.video ? videos[lead.video] : undefined;

  return (
    <Section
      id="apps"
      route="green"
      title="Apps"
      intro="Web apps, from internal tools that closed real operational gaps at Relay to builds for clients."
    >
      {/* Lead: RoboChat */}
      <article aria-labelledby="robochat-title">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <h3 id="robochat-title" className="text-[32px] md:text-[40px] leading-tight font-extrabold tracking-tight">
              {lead.name}
            </h3>
            <p className="mt-3 text-[22px] leading-snug font-bold text-route-green-text">{lead.tagline}</p>
            <p className="mt-4 text-ink-2">
              When a hospital nurse hits a wall with a robot, they open the chat link. I see it land
              in Slack and reply from there. They see my response appear in the bubble. No phone
              call, no install, no account.
            </p>
            {lead.stack && (
              <p className="mt-4 text-[15px] text-ink-2">Built with {joinList(lead.stack)}.</p>
            )}
            <div className="mt-2">
              <CaseStudy project={lead} />
            </div>
          </div>
          {leadVideo && (
            <div className="lg:col-span-6">
              <DemoVideo title={lead.name} src={leadVideo.src} poster={leadVideo.poster} captions={leadVideo.captions} tone="green" />
            </div>
          )}
        </div>

        <h4 className="mt-12 mb-4 text-xl font-bold">Try it: two sides of the same chat</h4>
        <RoboChatDemo />
      </article>

      <h3 className="mt-20 md:mt-28 mb-2 text-[28px] font-extrabold tracking-tight">More apps</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
        {rest.map((p) => (
          <CompactItem
            key={p.id}
            name={p.name}
            tagline={p.tagline}
            summary={p.problem ? undefined : p.summary}
            stack={p.stack}
            video={p.video ? videos[p.video] : undefined}
            tone="green"
          >
            {(p.problem || p.link) && (
              <div className="mt-1 flex flex-wrap gap-x-6">
                {p.problem && <CaseStudy project={p} />}
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link inline-flex items-center min-h-11 font-bold text-route-green-text"
                  >
                    {p.link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            )}
          </CompactItem>
        ))}
      </div>
    </Section>
  );
}
