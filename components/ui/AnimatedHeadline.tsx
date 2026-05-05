"use client";

// Rotating headline. Cycles through 4 framings of the role every ~5.5s.
// The first phrase matches the spec'd headline so SSR/SEO gets the canonical line.
// AnimatePresence has initial={false} so the very first paint is opacity=1
// (crawlers/no-JS users see the full H1).

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phrase = { lines: [string, string, string]; accent: 0 | 1 | 2 };

const phrases: Phrase[] = [
  {
    lines: ["Robotics Engineer", "solving real-world", "system failures."],
    accent: 1,
  },
  {
    lines: ["Front-line at L1", "when a robot", "stops moving."],
    accent: 0,
  },
  {
    lines: ["From rosbag", "to RAG pipeline", "in one shift."],
    accent: 1,
  },
  {
    lines: ["Building agents", "that close tickets", "before I do."],
    accent: 1,
  },
  {
    lines: ["Where logs become", "decisions,", "and fleets keep moving."],
    accent: 0,
  },
];

const ROTATE_MS = 5500;

export default function AnimatedHeadline() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % phrases.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-[0.95] font-medium relative">
      {/* Visually hidden anchor for screen readers — keeps the spec'd headline indexable */}
      <span className="sr-only">
        Robotics Engineer solving real-world system failures.
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          aria-hidden
          className="block"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ type: "spring", stiffness: 110, damping: 22 }}
        >
          {phrases[i].lines.map((line, j) => (
            <motion.span
              key={j}
              className={`block ${j === phrases[i].accent ? "italic font-light text-cyan-bright" : ""}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: j * 0.07,
                type: "spring",
                stiffness: 130,
                damping: 22,
              }}
            >
              {line}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}
