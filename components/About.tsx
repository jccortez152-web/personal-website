// About — light-gray band: portrait and story, a large centered pull quote,
// then the facts in a tile.

import Image from "next/image";
import { education, profile } from "@/lib/data";
import { joinList } from "@/lib/format";
import Section from "./ui/Section";

const stack = ["Claude Code", "Claude Skills", "n8n", "Next.js", "Supabase", "Slack Bolt", "Vercel"];

export default function About() {
  return (
    <Section id="about" tone="alt" title="Hi, I'm Johannes.">
      <div className="reveal grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-4 flex justify-center">
          <div className="relative w-[220px] h-[270px] rounded-[28px] overflow-hidden bg-tile">
            <Image
              src="/jc-portrait.png"
              alt={`Photo of ${profile.name}`}
              fill
              sizes="220px"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="md:col-span-8 space-y-5 text-[19px] leading-relaxed">
          <p>
            I&apos;m a Robot Care Specialist at Relay Robotics, supporting autonomous delivery robots
            in hospitals and hotels worldwide. My day is logs, telemetry, live incidents, and remote
            support for field technicians, plus post-mortems that turn every failure into a fix.
          </p>
          <p className="text-fg-2">
            When a manual process or blind spot slows the team down, I automate it: AI agents that
            watch live robot logs, Claude Skills that handle case triage and QA, and n8n workflows
            that connect Salesforce, Gmail, and Slack.
          </p>
        </div>
      </div>

      <blockquote className="reveal my-20 md:my-28 mx-auto max-w-[18ch] text-center text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em]">
        Every manual step is a candidate for an agent.
      </blockquote>

      <dl className="reveal rounded-[28px] bg-tile p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
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
    </Section>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[15px] font-semibold">{k}</dt>
      <dd className="mt-1 text-fg-2">{v}</dd>
    </div>
  );
}
