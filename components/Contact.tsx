// Contact — the end of the route: a destination sign with email and links.

import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      style={{ "--route": "var(--color-sign-fg)" } as React.CSSProperties}
    >
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 lg:pl-[112px] pt-8 pb-20 md:pb-32">
        {/* Last stretch of the route, ending at the sign */}
        <div aria-hidden className="hidden lg:block absolute left-[45px] top-0 h-[88px] w-[6px] bg-corridor" />
        <span
          aria-hidden
          className="hidden lg:block absolute left-[33px] top-[76px] w-[30px] h-[30px] rounded-full bg-ink"
        />

        <div className="bg-sign text-sign-fg rounded-lg p-8 md:p-14">
          <p className="flex items-center gap-3 text-lg font-bold">
            <span aria-hidden className="w-4 h-4 rounded-full bg-sign-fg" />
            You&apos;ve arrived
          </p>
          <h2 id="contact-title" className="mt-6 text-title font-extrabold">
            Let&apos;s talk.
          </h2>
          <p className="mt-4 max-w-[52ch] text-xl text-sign-fg-2">
            Open to AI automation, AI agent, and technical solutions roles. Remote-friendly across
            time zones.
          </p>

          <a
            href={`mailto:${profile.email}`}
            // Sized to stay on one line down to 375px; wraps cleanly below that.
            className="link mt-10 inline-block font-display font-extrabold text-[clamp(1.125rem,0.4rem+3.6vw,2.75rem)] [overflow-wrap:anywhere]"
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
      </div>
    </section>
  );
}
