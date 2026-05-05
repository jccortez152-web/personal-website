"use client";

// Hero portrait — layered to feel like an interface scan, not a photo.
//
// Stack (back → front):
//   1. Pulsing 2-stop radial glow — bright inner halo around head + soft
//      outer halo around the subject; opacity + scale breathe on a 4.2s loop.
//   2. The cutout PNG (transparent bg) with desaturated mono filter and a
//      subtle drop-shadow stack (dark floor + lime ambient).
//   3. CRT scanlines texture overlay — repeating 1px lines, very subtle.
//   4. Lime sweep line that traverses top → bottom every 4.5s
//      (CSS keyframe in globals.css; transform-only, no layout properties).
//   5. L-shaped corner brackets in lime/50 — targeting-reticle framing.
//
// Two motion wrappers: outer = cursor parallax, inner = float + scale pulse
// running on independent timelines so the motion feels organic.

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

interface Props {
  src: string;
  alt: string;
}

export default function AnimatedPortrait({ src, alt }: Props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });
  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });

  const x = useTransform(smoothX, [-1, 1], [-12, 12]);
  const y = useTransform(smoothY, [-1, 1], [-10, 10]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      className="relative aspect-square w-full"
    >
      {/* Float + scale pulse — different durations so the two cycles desync */}
      <motion.div
        animate={{ y: [0, -10, 0], scale: [1, 1.018, 1] }}
        transition={{
          y: { duration: 5.4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-full h-full"
      >
        {/* 1. Pulsing glow — sits behind the photo, follows its float */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-6 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 35% 35% at 50% 28%, rgba(163,230,53,0.45) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 50% 46%, rgba(163,230,53,0.20) 0%, transparent 72%)",
          }}
        />

        {/* 2. The cutout */}
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 32vw, 100vw"
          className="object-contain"
          style={{
            filter:
              "contrast(1.05) saturate(0.9) brightness(0.98) drop-shadow(0 14px 36px rgba(0,0,0,0.55)) drop-shadow(0 0 28px rgba(163,230,53,0.20))",
          }}
        />

        {/* 3. CRT scanlines texture — very faint horizontal banding */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(163,230,53,0.18) 0, rgba(163,230,53,0.18) 1px, transparent 1px, transparent 3px)",
          }}
        />

        {/* 4. Lime sweep line — traverses top → bottom on a 4.5s loop.
            Wrapper is h-full so translateY(±100%) covers parent height
            without ever animating layout properties. */}
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute left-0 right-0 h-full animate-scan-sweep">
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(163,230,53,0.0) 8%, rgba(163,230,53,0.85) 50%, rgba(163,230,53,0.0) 92%, transparent 100%)",
                boxShadow:
                  "0 0 14px rgba(163,230,53,0.7), 0 0 28px rgba(163,230,53,0.35)",
              }}
            />
          </div>
        </div>

        {/* 5. Corner targeting brackets */}
        <CornerBracket pos="tl" />
        <CornerBracket pos="tr" />
        <CornerBracket pos="bl" />
        <CornerBracket pos="br" />
      </motion.div>
    </motion.div>
  );
}

function CornerBracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map: Record<typeof pos, string> = {
    tl: "top-1 left-1 border-t border-l",
    tr: "top-1 right-1 border-t border-r",
    bl: "bottom-1 left-1 border-b border-l",
    br: "bottom-1 right-1 border-b border-r",
  };
  return (
    <span
      aria-hidden
      className={`absolute w-5 h-5 border-cyan-bright/50 pointer-events-none ${map[pos]}`}
    />
  );
}
