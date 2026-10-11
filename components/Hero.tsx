// Hero — headline and actions on the left, the floor plan on the right with a
// staff-ID badge clipped to it. The page route starts here, bottom left.

import Image from "next/image";
import FloorPlan from "./FloorPlan";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      style={{ "--route": "var(--color-route-blue)" } as React.CSSProperties}
    >
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 lg:pl-[112px] pt-12 md:pt-20 pb-20 md:pb-28">
        {/* Start of the page route */}
        <div aria-hidden className="hidden lg:block absolute left-[45px] top-[62%] bottom-0 w-[6px] bg-corridor" />
        <span
          aria-hidden
          className="hidden lg:block absolute left-[36px] top-[62%] -mt-3 w-6 h-6 rounded-full border-[6px] border-corridor bg-floor"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <h1 className="text-hero font-extrabold text-ink text-balance">
              I build the agents that keep robots moving.
            </h1>
            <p className="mt-6 max-w-[34ch] text-xl text-ink-2">{profile.headline}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#agents"
                className="inline-flex items-center justify-center min-h-12 px-6 rounded-md bg-route-blue text-white font-bold transition-colors duration-150 hover:bg-ink"
              >
                See my work
              </a>
              <a
                href={profile.links.resume}
                download
                className="inline-flex items-center justify-center min-h-12 px-6 rounded-md border-2 border-ink text-ink font-bold transition-colors duration-150 hover:bg-ink hover:text-floor"
              >
                Download resume
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <FloorPlan />
            <IdBadge />
          </div>
        </div>
      </div>
    </section>
  );
}

// Staff ID badge: clipped onto the plan on large screens, inline below it
// on small ones.
function IdBadge() {
  return (
    <div className="mt-8 lg:mt-0 lg:absolute lg:-bottom-20 lg:-left-10 w-full max-w-[320px] bg-wall border border-rule rounded-lg shadow-[0_2px_0_var(--color-rule)]">
      <span aria-hidden className="block mx-auto mt-2 w-12 h-2 rounded-full bg-floor border border-rule" />
      <span aria-hidden className="block mt-2 h-2 bg-route-blue" />
      <div className="flex gap-4 p-4">
        <div className="relative shrink-0 w-[84px] h-[104px] rounded-sm overflow-hidden bg-floor border border-rule">
          <Image
            src="/jc-portrait.png"
            alt={`Photo of ${profile.name}`}
            fill
            sizes="84px"
            className="object-cover object-top"
          />
        </div>
        <div className="min-w-0">
          <p className="font-display font-extrabold text-xl leading-tight text-ink">
            {profile.shortName}
          </p>
          <p className="mt-1 text-[15px] leading-snug text-ink-2">{profile.role}</p>
          <p className="mt-2 text-[15px] leading-snug text-ink">
            Open to AI automation and AI agent roles
          </p>
        </div>
      </div>
    </div>
  );
}
