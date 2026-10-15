// Contact — black closing band, centered, Apple-style.

import { profile } from "@/lib/data";
import Chevron from "./ui/Chevron";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-black text-on-black"
      style={{ "--focus": "var(--color-link-on-black)" } as React.CSSProperties}
    >
      <div className="reveal max-w-[1080px] mx-auto px-5 md:px-8 py-28 md:py-40 text-center">
        <h2 id="contact-title" className="text-hero font-bold">
          Let&apos;s talk.
        </h2>
        <p className="mt-5 mx-auto max-w-[34rem] text-lede text-on-black-2">
          Open to AI automation, AI agent, and technical solutions roles. Remote-friendly across
          time zones.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center min-h-12 px-7 rounded-full bg-blue text-white text-[17px] font-medium transition-opacity duration-150 hover:opacity-90"
          >
            Email me
          </a>
          <p className="text-on-black-2 [overflow-wrap:anywhere]">{profile.email}</p>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-2 text-[17px]">
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center min-h-11 text-link-on-black">
              LinkedIn
              <Chevron />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center min-h-11 text-link-on-black">
              GitHub
              <Chevron />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
