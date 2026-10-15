"use client";

// Opens a demo video in an accessible modal: focus trapped, closes on Esc /
// backdrop / close button, returns focus to the trigger. The video starts
// from the click (never the autoplay attribute), with sound, native controls
// and captions when a .vtt exists. Portalled to <body>.
//
// Trigger: by default a poster with a "Play demo" control (`thumb` = small).
// Pass `children` to use any content as the trigger instead (the struck tasks
// in the hero); the children then provide the accessible name.

import Image from "next/image";
import { ReactNode, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import { useDialog } from "./useDialog";

export default function DemoVideo({
  title,
  src,
  poster,
  captions,
  thumb = false,
  children,
  triggerClassName = "",
}: {
  title: string;
  src: string;
  poster?: string;
  /** WebVTT file; shown on by default so narration is readable on mute. */
  captions?: string;
  thumb?: boolean;
  children?: ReactNode;
  triggerClassName?: string;
}) {
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
      {children ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className={triggerClassName}
        >
          {children}
        </button>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Play demo: ${title}`}
          className="group relative block w-full aspect-video overflow-hidden rounded-lg bg-panel"
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              sizes={thumb ? "160px" : "(min-width: 1024px) 400px, 100vw"}
              className="object-cover"
            />
          )}
          <span
            aria-hidden
            className="absolute inset-0 bg-panel/0 transition-colors duration-150 group-hover:bg-panel/25"
          />
          {thumb ? (
            <span
              aria-hidden
              className="absolute left-2 bottom-2 flex items-center justify-center w-8 h-8 rounded-full bg-ceil text-on-ceil"
            >
              <Play className="w-3.5 h-3.5 translate-x-px" strokeWidth={2} fill="currentColor" />
            </span>
          ) : (
            // Bottom-left so it never covers the poster's headline
            <span
              aria-hidden
              className="absolute left-3 bottom-3 inline-flex items-center gap-2.5 rounded-full bg-ceil text-on-ceil pl-1.5 pr-4 py-1.5 font-bold text-[16px]"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-on-ceil text-ceil">
                <Play className="w-3.5 h-3.5 translate-x-px" strokeWidth={2} fill="currentColor" />
              </span>
              Play demo
            </span>
          )}
        </button>
      )}

      {open &&
        createPortal(
          <div
            onClick={close}
            className="fixed inset-0 z-50 bg-panel/85 flex items-center justify-center md:p-8"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Demo: ${title}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-card text-ink md:rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 pl-5 pr-2 py-2">
                <p className="font-bold text-lg truncate">{title}</p>
                <button
                  type="button"
                  data-autofocus
                  onClick={close}
                  aria-label="Close demo"
                  className="shrink-0 w-11 h-11 inline-flex items-center justify-center rounded-full hover:bg-paper transition-colors duration-150"
                >
                  <X className="w-5 h-5" strokeWidth={2} aria-hidden />
                </button>
              </div>
              <div className="aspect-video bg-panel">
                <video
                  ref={videoRef}
                  src={src}
                  poster={poster}
                  preload="none"
                  playsInline
                  controls
                  className="w-full h-full"
                >
                  {captions && (
                    <track kind="captions" src={captions} srcLang="en" label="English" default />
                  )}
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
