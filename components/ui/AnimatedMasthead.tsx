"use client";

// Animated masthead H1. Two layers of motion:
//  1. Mount cascade — letters of "Johannes" reveal one by one with a tiny
//     rotation, then "Cortez." slides in as a unit shortly after.
//  2. Continuous shimmer — a soft lime gradient sweeps left → right through
//     the italic "Cortez." every 6 seconds (CSS, see globals.css).
// Canonical "Johannes Cortez" stays in the DOM via sr-only span for SEO/SR.

import { motion } from "framer-motion";

const FIRST = "Johannes";
const LAST = "Cortez.";

export default function AnimatedMasthead() {
  return (
    <h1
      className="font-display font-light tracking-tight leading-[0.9] text-ink-100"
      style={{ fontSize: "clamp(64px, 13vw, 200px)" }}
    >
      <span className="sr-only">Johannes Cortez.</span>

      {/* Line 1: "Johannes" — letter cascade */}
      <span aria-hidden className="block">
        {FIRST.split("").map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 80, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              delay: i * 0.05,
              type: "spring",
              stiffness: 90,
              damping: 22,
            }}
            style={{ display: "inline-block" }}
          >
            {c}
          </motion.span>
        ))}
      </span>

      {/* Line 2: "Cortez." — slides in as a unit, then shimmers continuously */}
      <motion.span
        aria-hidden
        className="block italic font-normal animate-name-shimmer"
        initial={{ opacity: 0, y: 80, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          delay: 0.55,
          type: "spring",
          stiffness: 80,
          damping: 22,
        }}
      >
        {LAST}
      </motion.span>
    </h1>
  );
}
