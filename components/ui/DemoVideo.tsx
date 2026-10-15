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
          className={`group relative block w-full aspect-video overflow-hidden bg-black ${thumb ? "rounded-xl" : "rounded-[28px]"}`}
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              sizes={thumb ? "(min-width: 768px) 400px, 100vw" : "(min-width: 1024px) 980px, 100vw"}
              className="object-cover"
            />
          )}
          <span
            aria-hidden
            className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20"
          />
          {thumb ? (
            <span
              aria-hidden
              className="absolute left-3 bottom-3 flex items-center justify-center w-10 h-10 rounded-full bg-on-black/90 text-black backdrop-blur"
            >
              <Play className="w-4 h-4 translate-x-px" strokeWidth={2} fill="currentColor" />
            </span>
          ) : (
            // Bottom-left so it never covers the poster's headline
            <span
              aria-hidden
              className="absolute left-3 bottom-3 md:left-6 md:bottom-6 inline-flex items-center gap-2 md:gap-2.5 rounded-full bg-on-black/90 text-black backdrop-blur pl-1 pr-3.5 py-1 md:pl-1.5 md:pr-5 md:py-1.5 font-semibold text-[14px] md:text-[17px]"
            >
              <span className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full bg-black text-on-black">
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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center md:p-8"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Demo: ${title}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-base text-fg md:rounded-[20px] overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 pl-5 pr-2 py-2">
                <p className="font-semibold text-lg truncate">{title}</p>
                <button
                  type="button"
                  data-autofocus
                  onClick={close}
                  aria-label="Close demo"
                  className="shrink-0 w-11 h-11 inline-flex items-center justify-center rounded-full hover:bg-alt transition-colors duration-150"
                >
                  <X className="w-5 h-5" strokeWidth={2} aria-hidden />
                </button>
              </div>
              <div className="aspect-video bg-black">
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
