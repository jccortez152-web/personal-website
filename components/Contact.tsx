// Editorial farewell. Big italic display serif "Let's talk." with the
// three contact channels as a clean inline list.

import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 py-32 md:py-40 border-t border-ink-800/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 flex items-center gap-3 mb-12">
          <span>§ 07</span>
          <span className="h-px w-8 bg-ink-700" />
          <span>fin</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              className="font-display font-light tracking-tight leading-[0.95] text-ink-100"
              style={{ fontSize: "clamp(48px, 9vw, 140px)" }}
            >
              Let's talk.
              <br />
              <span className="italic text-ink-400">
                If the role's interesting,
              </span>
              <br />
              <span className="italic text-cyan-bright">I'm interested.</span>
            </h2>

            <p className="mt-10 text-ink-400 max-w-xl text-lg leading-relaxed">
              Open to robotics ops, AI / automation engineering, internal
              tooling, or anywhere the three meet. {profile.location}, remote
              friendly across timezones.
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end">
            <ul className="space-y-1 border-t border-ink-800">
              <ContactRow
                href={`mailto:${profile.email}`}
                label="Email"
                value={profile.email}
              />
              <ContactRow
                href={profile.links.linkedin}
                label="LinkedIn"
                value="/in/johannesongcortez"
                external
              />
              <ContactRow
                href={profile.links.github}
                label="GitHub"
                value="@jccortez152-web"
                external
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  href,
  label,
  value,
  external,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <li className="border-b border-ink-800">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-baseline justify-between gap-6 py-5 hover:px-2 transition-all"
      >
        <span className="flex items-baseline gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 w-16 shrink-0">
            {label}
          </span>
          <span className="text-ink-100 group-hover:text-cyan-bright transition-colors font-display italic text-xl md:text-2xl break-all">
            {value}
          </span>
        </span>
        <ArrowUpRight
          className="w-4 h-4 text-ink-500 group-hover:text-cyan-bright group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
          strokeWidth={1.5}
        />
      </a>
    </li>
  );
}
