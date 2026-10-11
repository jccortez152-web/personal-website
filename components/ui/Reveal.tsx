"use client";

// Section enter: short fade-and-rise, fires once. Reduced motion is handled in
// globals.css ([data-reveal] is forced visible) so server and client markup
// stay identical.

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
