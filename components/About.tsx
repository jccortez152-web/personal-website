// About — prose and pull quote on the left, a sidebar of vitals, current
// work, stack, receipts, and education on the right.

import { education, profile } from "@/lib/data";
import SectionHeader from "./ui/SectionHeader";

const stack = [
  "Claude Code",
  "Claude Skills",
  "n8n",
  "Next.js",
  "Supabase",
  "Slack Bolt",
  "Vercel",
];

export default function About() {
  return (
    <section id="about" className="px-4 md:px-8 py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="01" label="About" title="Hi, I'm Johannes." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <article className="lg:col-span-7 space-y-6 text-body text-fg-2">
            <p>
              I'm a Robot Care Specialist at Relay Robotics, supporting
              autonomous delivery robots in hospitals and hotels worldwide. My
              day is logs, telemetry, live incidents, and remote support for
              field technicians, plus post-mortems that turn every failure
              into a fix.
            </p>

            <p>
              When a manual process or blind spot slows the team down, I
              automate it: AI agents that watch live robot logs, Claude Skills
              that handle case triage and QA, and n8n workflows that connect
              Salesforce, Gmail, and Slack.
            </p>

            <blockquote className="!mt-10 pl-6 border-l-2 border-signal text-2xl md:text-[1.75rem] font-medium leading-snug text-fg">
              &ldquo;Every manual step is a candidate for an agent.&rdquo;
            </blockquote>
          </article>

          <aside className="lg:col-span-5 space-y-8">
            <Block label="Vitals">
              <Row k="Location" v={profile.location} />
              <Row k="Role" v="Robot Care Specialist · AI & Automation" />
              <Row k="Company" v="Relay Robotics, 2024 →" />
              <div className="flex items-baseline justify-between gap-4">
                <dt className="label-mono text-muted shrink-0">Open to</dt>
                <dd className="inline-flex items-center gap-2 text-right text-live font-medium">
                  <span aria-hidden className="w-2 h-2 rounded-full bg-live shrink-0" />
                  AI Automation · AI Agent roles
                </dd>
              </div>
            </Block>

            <Block label="Currently building">
              <Row k="01" v="Live Fleet-Monitoring Agent" />
            </Block>

            <div className="border-t border-line pt-4">
              <h3 className="label-mono text-muted mb-4">Stack today</h3>
              <ul className="flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li
                    key={s}
                    className="font-mono text-[13px] text-fg-2 px-3 py-1 border border-line rounded-full"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line pt-4">
              <h3 className="label-mono text-muted mb-4">Receipts</h3>
              <p className="text-fg-2 leading-relaxed">
                Highest customer commendations on the team for three
                consecutive quarters at DXC. Top performer for customer
                satisfaction and commendations at Relay.
              </p>
            </div>

            <Block label="Education">
              <Row k="Degree" v="BS Computer Engineering" />
              <Row k="School" v={education.school} />
              <Row k="Years" v={education.period} />
            </Block>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line pt-4">
      <h3 className="label-mono text-muted mb-4">{label}</h3>
      <dl className="space-y-3">{children}</dl>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="label-mono text-muted shrink-0">{k}</dt>
      <dd className="text-right text-fg">{v}</dd>
    </div>
  );
}
