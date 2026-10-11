"use client";

// Framer Motion honours the OS "reduce motion" setting site-wide.
// CSS animations/transitions are handled in globals.css.

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
