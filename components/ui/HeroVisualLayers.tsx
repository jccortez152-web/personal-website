"use client";

// Hero visual layers driven by mouse parallax.
// One mousemove listener feeds three layers (grid, glow, robot) at different
// depths via useMotionValue + useSpring. Per CLAUDE.md: no useState for
// per-frame motion, no scroll listeners, motion values stay outside the React
// render cycle so we don't repaint the parent on cursor movement.

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function HeroVisualLayers() {
  // Normalized [-1, 1] cursor offset from viewport center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring smoothing — gives the parallax that "follow with weight" feel
  const smoothX = useSpring(mouseX, {
    stiffness: 60,
    damping: 22,
    mass: 0.5,
  });
  const smoothY = useSpring(mouseY, {
    stiffness: 60,
    damping: 22,
    mass: 0.5,
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.set((e.clientX - w / 2) / (w / 2));
      mouseY.set((e.clientY - h / 2) / (h / 2));
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  // Subtle parallax depths per "subtle" requirement
  const gridX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const gridY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const glowX = useTransform(smoothX, [-1, 1], [-22, 22]);
  const glowY = useTransform(smoothY, [-1, 1], [-22, 22]);

  return (
    <>
      {/* Engineering grid, parallax */}
      <motion.div
        aria-hidden
        style={{ x: gridX, y: gridY }}
        className="absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_70%)]"
      />

      {/* Cyan glow blob, deeper parallax */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="absolute -z-10 left-[-10%] top-[20%] w-[500px] h-[500px] rounded-full bg-cyan-bright/10 blur-[140px]"
      />
    </>
  );
}
