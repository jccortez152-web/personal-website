"use client";

// Poster + play button that opens the demo video in an accessible modal:
// focus trapped, closes on Esc / backdrop / close button, returns focus to
// the play button. The video starts from the click (never the autoplay
// attribute), with sound and native controls. Portalled to <body> so it
// isn't clipped or offset by transformed ancestors.

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";

export default function DemoVideo({
  title,
  src,
  poster,
}: {
  title: string;
  src: string;
  poster?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    videoRef.current?.play().catch(() => {});
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusable = [
        ...dialog.querySelectorAll<HTMLElement>("button, video, [href], [tabindex]:not([tabindex='-1'])"),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialog.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play demo: ${title}`}
        className="group relative block w-full aspect-video overflow-hidden rounded-[6px] border border-line bg-ink"
      >
        {poster && (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        {/* Bottom-left so it never covers the poster's headline */}
        <span
          aria-hidden
          className="absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-ink/85 border border-line pl-1 pr-3 py-1 transition-colors duration-150 group-hover:border-signal/40"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-signal text-ink">
            <Play className="w-4 h-4 translate-x-px" strokeWidth={1.75} fill="currentColor" />
          </span>
          <span className="label-mono text-fg">Play demo</span>
        </span>
      </button>

      {open &&
        createPortal(
          <div
            onClick={close}
            className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center md:p-8"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Demo: ${title}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-surface border-y md:border border-line md:rounded-card overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 pl-4 pr-2 py-2 border-b border-line">
                <p className="label-mono text-fg-2 truncate">
                  <span className="text-signal">Demo</span> · {title}
                </p>
                <button
                  type="button"
                  data-autofocus
                  onClick={close}
                  aria-label="Close demo"
                  className="shrink-0 w-11 h-11 inline-flex items-center justify-center rounded-full text-fg-2 hover:text-fg border border-transparent hover:border-signal/40 transition-colors duration-150"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} aria-hidden />
                </button>
              </div>
              <div className="aspect-video bg-ink">
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
