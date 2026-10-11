// Contact — heading and intro on the left, the three channels as full-width
// link rows on the right.

import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import SectionHeader from "./ui/SectionHeader";

export default function Contact() {
  return (
    <section id="contact" className="px-4 md:px-8 py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              index="08"
              label="Contact"
              title="Let's talk."
              sub="Open to AI automation, AI agent, and technical solutions roles. Remote-friendly across time zones."
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <ul className="border-t border-line">
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
    <li className="border-b border-line">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center justify-between gap-6 min-h-16 py-4"
      >
        <span className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 min-w-0">
          <span className="label-mono text-muted sm:w-20 shrink-0">{label}</span>
          <span className="text-lg md:text-xl font-medium text-fg group-hover:text-signal transition-colors duration-150 break-all">
            {value}
          </span>
        </span>
        <ArrowUpRight
          className="w-4 h-4 text-muted group-hover:text-signal transition-colors duration-150 shrink-0"
          strokeWidth={1.75}
          aria-hidden
        />
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </li>
  );
}
