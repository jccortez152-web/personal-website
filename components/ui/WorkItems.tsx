// Work layouts shared by AI agents and Apps: a large alternating FeatureRow and
// a compact list row. No cards — rows separated by rules.

import { ReactNode } from "react";
import type { VideoAsset } from "@/lib/videos";
import { joinList } from "@/lib/format";
import DemoVideo from "./DemoVideo";

type Tone = "blue" | "green";

const toneText: Record<Tone, string> = {
  blue: "text-route-blue-text",
  green: "text-route-green-text",
};

export function FeatureRow({
  name,
  result,
  summary,
  stack,
  video,
  tone,
  flip,
}: {
  name: string;
  result?: string;
  summary: string;
  stack?: string[];
  video?: VideoAsset;
  tone: Tone;
  flip?: boolean;
}) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        {video ? (
          <DemoVideo title={name} src={video.src} poster={video.poster} tone={tone} />
        ) : (
          <NoVideo tone={tone} />
        )}
      </div>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <h3 className="text-[28px] md:text-[32px] leading-tight font-extrabold tracking-tight">
          {name}
        </h3>
        {result && (
          <p className={`mt-4 text-[22px] leading-snug font-bold ${toneText[tone]}`}>{result}</p>
        )}
        <p className="mt-4 text-ink-2">{summary}</p>
        {stack && (
          <p className="mt-4 text-[15px] text-ink-2">Built with {joinList(stack)}.</p>
        )}
      </div>
    </article>
  );
}

export function CompactItem({
  name,
  tagline,
  summary,
  result,
  stack,
  video,
  tone,
  children,
}: {
  name: string;
  tagline?: string;
  summary?: string;
  result?: string;
  stack?: string[];
  video?: VideoAsset;
  tone: Tone;
  children?: ReactNode;
}) {
  return (
    <article className="grid grid-cols-[112px_1fr] sm:grid-cols-[160px_1fr] gap-4 sm:gap-6 py-6 border-t border-rule">
      <div>
        {video ? (
          <DemoVideo title={name} src={video.src} poster={video.poster} tone={tone} thumb />
        ) : (
          <NoVideo tone={tone} small />
        )}
      </div>
      <div className="min-w-0">
        <h3 className="text-[20px] leading-tight font-bold">{name}</h3>
        {tagline && <p className="mt-1 text-ink-2">{tagline}</p>}
        {summary && <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{summary}</p>}
        {result && (
          <p className={`mt-2 text-[16px] font-bold ${toneText[tone]}`}>{result}</p>
        )}
        {stack && (
          <p className="mt-2 text-[15px] text-ink-2">Built with {joinList(stack)}.</p>
        )}
        {children}
      </div>
    </article>
  );
}

// Wall tile where there's no demo video yet: a small route glyph in the
// section color instead of a fake poster.
function NoVideo({ tone, small }: { tone: Tone; small?: boolean }) {
  const color = tone === "blue" ? "var(--color-route-blue)" : "var(--color-route-green)";
  return (
    <div className="relative aspect-video rounded-md border border-rule bg-wall overflow-hidden">
      <svg aria-hidden viewBox="0 0 160 90" className="absolute inset-0 w-full h-full">
        <path
          d="M28 22 V58 H112"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="122" cy="58" r="9" fill="var(--color-wall)" stroke={color} strokeWidth="5" />
      </svg>
      {!small && (
        <span className="absolute left-6 bottom-4 text-[15px] text-ink-2">No demo video yet</span>
      )}
    </div>
  );
}
