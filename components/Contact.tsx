// Contact — the closing ceil field: the other bookend to the hero.

import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-ceil text-on-ceil"
      style={{ "--focus": "var(--color-on-ceil)" } as React.CSSProperties}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-20 md:py-28">
        <h2 id="contact-title" className="expanded text-title font-extrabold tracking-tight">
          Let&apos;s talk.
        </h2>
        <p className="mt-5 max-w-[52ch] text-xl">
          Open to AI automation, AI agent, and technical solutions roles. Remote-friendly across
          time zones.
        </p>

        <a
          href={`mailto:${profile.email}`}
          // Sized to stay on one line down to 320px; wraps cleanly below that.
          className="link mt-10 inline-block font-extrabold text-[clamp(1.125rem,0.4rem+3.6vw,2.75rem)] [overflow-wrap:anywhere]"
        >
          {profile.email}
        </a>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xl font-bold">
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center min-h-11">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center min-h-11">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
