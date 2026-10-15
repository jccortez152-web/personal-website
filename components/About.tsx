// About — portrait, two paragraphs, the pull quote, and a plain facts list.

import Image from "next/image";
import { education, profile } from "@/lib/data";
import { joinList } from "@/lib/format";
import Section from "./ui/Section";

const stack = ["Claude Code", "Claude Skills", "n8n", "Next.js", "Supabase", "Slack Bolt", "Vercel"];

export default function About() {
  return (
    <Section id="about" title="Hi, I'm Johannes.">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="relative shrink-0 w-[140px] h-[172px] rounded-lg overflow-hidden bg-ceil">
              <Image
                src="/jc-portrait.png"
                alt={`Photo of ${profile.name}`}
                fill
                sizes="140px"
                className="object-cover object-top"
              />
            </div>
            <div className="space-y-5 max-w-[60ch]">
              <p>
                I&apos;m a Robot Care Specialist at Relay Robotics, supporting autonomous delivery
                robots in hospitals and hotels worldwide. My day is logs, telemetry, live
                incidents, and remote support for field technicians, plus post-mortems that turn
                every failure into a fix.
              </p>
              <p>
                When a manual process or blind spot slows the team down, I automate it: AI agents
                that watch live robot logs, Claude Skills that handle case triage and QA, and n8n
                workflows that connect Salesforce, Gmail, and Slack.
              </p>
            </div>
          </div>
          <blockquote className="expanded mt-12 font-extrabold text-[28px] md:text-[36px] leading-[1.1] tracking-tight max-w-[22ch]">
            Every manual step is a candidate for an agent.
          </blockquote>
        </div>

        <dl className="lg:col-span-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 content-start text-[17px]">
          <Fact k="Location" v="New Manila, Quezon City" />
          <Fact k="Role" v={profile.role} />
          <Fact k="At" v="Relay Robotics, since 2024" />
          <Fact k="Open to" v="AI automation and AI agent roles" />
          <Fact k="Building" v="Live Fleet-Monitoring Agent" />
          <Fact k="Stack today" v={joinList(stack)} />
          <Fact
            k="Receipts"
            v="Highest customer commendations on the team for three consecutive quarters at DXC. Top performer for customer satisfaction and commendations at Relay."
          />
          <Fact k="Education" v={`BS Computer Engineering, ${education.school}, ${education.period}`} />
        </dl>
      </div>
    </Section>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="font-bold">{k}</dt>
      <dd className="text-graphite">{v}</dd>
    </>
  );
}
