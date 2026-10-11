"use client";

// Console-style log panel for the hero. Simulates a fleet-ops log feed: a new
// line arrives every ~2s, oldest scrolls off after MAX_LINES. Labelled
// "sample feed" and aria-hidden — pure decoration, no real backend behind it.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Level = "OK" | "INFO" | "WARN" | "ERR";
type Event = { lvl: Level; msg: string };
type Line = Event & { id: number; ts: string };

const events: Event[] = [
  { lvl: "INFO", msg: "M2105 → wifi reconnect attempt" },
  { lvl: "OK", msg: "ssh tunnel established" },
  { lvl: "WARN", msg: "sensor_array · timeout on /dev/ttyUSB1" },
  { lvl: "INFO", msg: "task resumed · route 412-A" },
  { lvl: "OK", msg: "M2105 → handoff to charging dock" },
  { lvl: "INFO", msg: "M2102 → nav drift detected · auto-recover" },
  { lvl: "OK", msg: "M2102 → drift corrected · t=0.8s" },
  { lvl: "INFO", msg: "runbook · 'wifi-reconnect' → published" },
  { lvl: "WARN", msg: "M2107 → battery cell variance > threshold" },
  { lvl: "INFO", msg: "M2107 → agent flagged anomaly · posted to slack" },
  { lvl: "OK", msg: "rosbag uploaded · 142MB → s3" },
  { lvl: "INFO", msg: "fleet status · 187 online · 3 charging" },
  { lvl: "OK", msg: "M2118 → returned to dock · trip #842" },
  { lvl: "WARN", msg: "M2099 → lidar sync drift · 24ms" },
  { lvl: "OK", msg: "M2099 → ntp resync · drift cleared" },
];

const MAX_LINES = 7;
const TICK_MS = 1900;

const lvlClass: Record<Level, string> = {
  OK: "text-fg-2",
  INFO: "text-muted",
  WARN: "text-signal",
  ERR: "text-signal",
};

const ts = (d: Date) => d.toTimeString().slice(0, 8);

export default function LiveSystemLog() {
  const [lines, setLines] = useState<Line[]>([]);
  const idRef = useRef(0);
  const eventIdxRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Seed initial 4 lines so the panel doesn't start empty
  useEffect(() => {
    const seed: Line[] = [];
    const now = new Date();
    for (let i = 0; i < 4; i++) {
      const e = events[i];
      const d = new Date(now.getTime() - (4 - i) * 2300);
      seed.push({ id: idRef.current++, ts: ts(d), ...e });
    }
    eventIdxRef.current = 4;
    setLines(seed);
  }, []);

  // Append a new line every TICK_MS, drop the oldest beyond MAX_LINES
  useEffect(() => {
    const id = setInterval(() => {
      const e = events[eventIdxRef.current % events.length];
      eventIdxRef.current++;
      setLines((prev) => {
        const next: Line = {
          id: idRef.current++,
          ts: ts(new Date()),
          ...e,
        };
        return [...prev, next].slice(-MAX_LINES);
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll to keep the latest line visible
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      aria-hidden
      className="rounded-card border border-line bg-surface font-mono text-[13px] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-line">
        <span className="label-mono text-fg-2">fleet log</span>
        <span className="label-mono text-muted">sample feed</span>
      </div>

      {/* Log body */}
      <div ref={scrollRef} className="px-4 py-3 h-[216px] overflow-hidden bg-ink">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-3 py-0.5 leading-relaxed"
            >
              <span className="text-muted shrink-0 hidden sm:inline">[{l.ts}]</span>
              <span className={`${lvlClass[l.lvl]} shrink-0 w-12`}>
                [{l.lvl}]
              </span>
              <span className="text-fg-2 truncate flex-1 min-w-0">
                {l.msg}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Prompt + blinking caret pinned to the bottom of the stream */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-muted">$</span>
          <span className="inline-block w-1.5 h-3 bg-signal animate-caret" />
        </div>
      </div>
    </div>
  );
}
