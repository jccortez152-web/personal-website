"use client";

// Poster + play button that opens the demo video in an accessible modal:
// focus trapped, closes on Esc / backdrop / close button, returns focus to
// the play button. The video starts from the click (never the autoplay
// attribute), with sound and native controls. Portalled to <body> so it
// isn't clipped or offset by transformed ancestors. `tone` is the section's
// route color; `thumb` is the small size used in compact lists.

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import { useDialog } from "./useDialog";

const tones = {
  blue: "var(--color-route-blue)",
  green: "var(--color-route-green)",
};

export default function DemoVideo({
  title,
  src,
  poster,
  tone = "blue",
  thumb = false,
}: {
  title: string;
  src: string;
  poster?: string;
  tone?: keyof typeof tones;
  thumb?: boolean;
}) {
  const color = tones[tone];
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useDialog(open, close, dialogRef, triggerRef, () => {
    videoRef.current?.play().catch(() => {});
  });

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play demo: ${title}`}
        className="group relative block w-full aspect-video overflow-hidden rounded-md border border-rule bg-sign"
      >
        {poster && (
          <Image
            src={poster}
            alt=""
            fill
            sizes={thumb ? "160px" : "(min-width: 1024px) 680px, 100vw"}
            className="object-cover"
          />
        )}
        <span
          aria-hidden
          className="absolute inset-0 bg-sign/0 transition-colors duration-150 group-hover:bg-sign/25"
        />
        {thumb ? (
          <span
            aria-hidden
            className="absolute left-2 bottom-2 flex items-center justify-center w-8 h-8 rounded-full text-white"
            style={{ background: color }}
          >
            <Play className="w-3.5 h-3.5 translate-x-px" strokeWidth={2} fill="currentColor" />
          </span>
        ) : (
          // Bottom-left so it never covers the poster's headline
          <span
            aria-hidden
            className="absolute left-4 bottom-4 inline-flex items-center gap-3 rounded-full bg-wall text-ink pl-1.5 pr-4 py-1.5 font-bold"
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full text-white"
              style={{ background: color }}
            >
              <Play className="w-4 h-4 translate-x-px" strokeWidth={2} fill="currentColor" />
            </span>
            Play demo
          </span>
        )}
      </button>

      {open &&
        createPortal(
          <div
            onClick={close}
            style={{ "--route": color } as React.CSSProperties}
            className="fixed inset-0 z-50 bg-sign/85 flex items-center justify-center md:p-8"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Demo: ${title}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-wall text-ink md:rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 pl-5 pr-2 py-2 border-t-[6px]" style={{ borderTopColor: color }}>
                <p className="font-display font-extrabold text-lg truncate">{title}</p>
                <button
                  type="button"
                  data-autofocus
                  onClick={close}
                  aria-label="Close demo"
                  className="shrink-0 w-11 h-11 inline-flex items-center justify-center rounded-full text-ink hover:bg-floor transition-colors duration-150"
                >
                  <X className="w-5 h-5" strokeWidth={2} aria-hidden />
                </button>
              </div>
              <div className="aspect-video bg-sign">
                <video
                  ref={videoRef}
                  src={src}
                  poster={poster}
                  preload="none"
                  playsInline
                  controls
                  className="w-full h-full"
                >
                  Your browser can&apos;t play this video.
                </video>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
