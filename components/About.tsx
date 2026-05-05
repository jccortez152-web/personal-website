// Long-form magazine profile. Drops the dashboard fact-rail in favor of
// editorial prose with a pull quote, plus a tight sidebar of "vitals" and
// the current stack.

import { education, profile } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="px-6 py-32 md:py-40 border-t border-ink-800/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section breadcrumb */}
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 flex items-center gap-3 mb-12">
          <span>§ 01</span>
          <span className="h-px w-8 bg-ink-700" />
          <span>about</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Long-form prose */}
          <article className="lg:col-span-7 space-y-7 text-ink-200 text-lg leading-relaxed">
            <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink-100 mb-8">
              Hi, I'm Johannes.
              <br />
              <span className="italic text-ink-300">A short profile.</span>
            </h2>

            <p>
              I'm an L1 RoboCare Specialist at Relay Robotics, currently in
              the seat where production robot fleets meet the people running
              them. My day is logs, telemetry, and live incidents — not
              whiteboards.
            </p>

            <p>
              I work the diagnostic path most tickets need: reading the
              rosbag, reproducing the fault, writing the runbook so the next
              person on shift doesn't start from zero. When a fault actually
              needs L2, they get a clean trace — not a "have you tried turning
              it off and on again."
            </p>

            {/* Pull quote */}
            <blockquote className="my-10 pl-6 border-l-2 border-cyan-bright/70 font-display italic text-2xl md:text-3xl leading-snug text-ink-100">
              "Most tickets close at L1.
              <br />
              The rest get a clean trace,
              <br />
              not a shrug."
            </blockquote>

            <p>
              When a runbook isn't enough, I ship the workflow that replaces
              it.{" "}
              <span className="text-ink-100 italic font-display">
                RoboChat
              </span>{" "}
              is the chat link hospital nurses open to reach me — every
              customer conversation lands in a Slack channel instead of a
              missed phone call. The{" "}
              <span className="text-ink-100 italic font-display">
                Reimbursement Portal
              </span>{" "}
              turned a spreadsheet-and-email loop into one-click approvals.
              I build fast with{" "}
              <span className="font-mono text-base text-ink-100">
                Claude Code
              </span>{" "}
              and{" "}
              <span className="font-mono text-base text-ink-100">Cursor</span>
              , shipping in days, not quarters.
            </p>

            <p className="text-ink-300">
              Open to roles in robotics ops, internal tooling, or AI /
              automation — and to growing into the latter from the
              operator's seat.
            </p>
          </article>

          {/* Sidebar — vitals + stack */}
          <aside className="lg:col-span-4 lg:col-start-9 space-y-10 lg:pt-2">
            <Block label="Vitals">
              <Row k="Location" v={profile.location} />
              <Row k="Role" v="L1 RoboCare Specialist" />
              <Row k="Company" v="Relay Robotics, 2024 →" />
              <Row k="Open to" v="AI + Robotics roles" accent />
            </Block>

            <Block label="Currently building">
              <Row k="01" v="The RoboChat customer widget" />
              <Row k="02" v="Reimbursement portal at Relay" />
              <Row k="03" v="jcortez.dev (this site)" />
            </Block>

            <Block label="Stack today">
              <p className="text-ink-200 text-sm leading-relaxed">
                <span className="text-ink-100 font-mono">Cursor</span> ·{" "}
                <span className="text-ink-100 font-mono">Claude Code</span> ·{" "}
                <span className="text-ink-100 font-mono">Next.js</span> ·{" "}
                <span className="text-ink-100 font-mono">Supabase</span> ·{" "}
                <span className="text-ink-100 font-mono">Slack Bolt</span> ·{" "}
                <span className="text-ink-100 font-mono">Vercel</span> ·{" "}
                <span className="text-ink-100 font-mono">n8n</span>
              </p>
            </Block>

            <Block label="Receipts">
              <p className="text-ink-300 text-sm leading-relaxed">
                Highest customer commendations on the team across three
                consecutive quarters at DXC. Top-performing L1 specialist at
                Relay for fast ticket resolution and case documentation.
              </p>
            </Block>

            <Block label="Education">
              <Row k="Degree" v="BS Computer Engineering" />
              <Row k="School" v="University of the East — Manila" />
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
    <div className="border-t border-ink-800 pt-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-bright/80 mb-4">
        {label}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({
  k,
  v,
  accent,
}: {
  k: string;
  v: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <span className="font-mono text-ink-500 text-xs uppercase tracking-wider shrink-0">
        {k}
      </span>
      <span
        className={`text-right ${accent ? "text-cyan-bright italic font-display text-base" : "text-ink-100"}`}
      >
        {v}
      </span>
    </div>
  );
}
