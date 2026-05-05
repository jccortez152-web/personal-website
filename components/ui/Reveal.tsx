"use client";

// Scroll-triggered section reveal. Fades + slides up + tiny scale-in with a
// cinematic ease-out-expo curve. Fires once when ~10% of the section enters
// the viewport, then stays put (no replay on scroll-up). Per CLAUDE.md:
// animates only transform/opacity, no scroll listeners.

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Reveal({
  children,
  y = 40,
  delay = 0,
  amount = 0.12,
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.6,
        // ease-out-expo — quick attack, soft settle. Reads engineered, not lazy.
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
