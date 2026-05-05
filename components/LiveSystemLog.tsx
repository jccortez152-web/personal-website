"use client";

// Terminal-style "Live System Log" panel for the hero. Simulates a fleet-ops
// log feed: a new line arrives every ~2s, oldest scrolls off after MAX_LINES.
// Levels color-coded (OK/INFO/WARN/ERR). Real wall-clock timestamps so the
// stream feels live. Pure visual — no real backend behind it.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Level = "OK" | "INFO" | "WARN" | "ERR";
type Event = { lvl: Level; msg: string };
type Line = Event & { id: number; ts: string };

const events: Event[] = [
  { lvl: "INFO", msg: "M2105 → wifi reconnect attempt" },
  { lvl: "OK", msg: "ssh tunnel established · pdx-04" },
  { lvl: "WARN", msg: "sensor_array · timeout on /dev/ttyUSB1" },
  { lvl: "INFO", msg: "task resumed · route 412-A" },
  { lvl: "OK", msg: "M2105 → handoff to charging dock" },
  { lvl: "INFO", msg: "M2102 → nav drift detected · auto-recover" },
  { lvl: "OK", msg: "M2102 → drift corrected · t=0.8s" },
  { lvl: "INFO", msg: "runbook · 'wifi-reconnect' → published" },
  { lvl: "WARN", msg: "M2107 → battery cell variance > threshold" },
  { lvl: "INFO", msg: "M2107 → escalated to L2 · ticket #4421" },
  { lvl: "OK", msg: "rosbag uploaded · 142MB → s3" },
  { lvl: "INFO", msg: "fleet status · 187 online · 3 charging" },
  { lvl: "OK", msg: "M2118 → returned to dock · trip #842" },
  { lvl: "WARN", msg: "M2099 → lidar sync drift · 24ms" },
  { lvl: "OK", msg: "M2099 → ntp resync · drift cleared" },
];

const MAX_LINES = 7;
const TICK_MS = 1900;

const lvlClass: Record<Level, string> = {
  OK: "text-emerald-400",
  INFO: "text-cyan-bright",
  WARN: "text-amber-300",
  ERR: "text-rose-400",
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
    <div className="rounded-md border border-ink-800 bg-ink-950/80 backdrop-blur-sm font-mono text-xs overflow-hidden shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-ink-800 bg-ink-900/40">
        <div className="flex items-center gap-3 text-ink-300">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-cyan-bright/60 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-cyan-bright" />
          </span>
          <span className="uppercase tracking-[0.2em] text-[10px]">
            live system log
          </span>
          <span className="text-ink-700">·</span>
          <span className="text-ink-500 text-[10px]">
            fleet ops · pdx-04
          </span>
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-ink-700" />
          <span className="w-2 h-2 rounded-full bg-ink-700" />
          <span className="w-2 h-2 rounded-full bg-cyan-bright/70" />
        </div>
      </div>

      {/* Log body */}
      <div ref={scrollRef} className="px-4 py-3 h-[200px] overflow-y-auto">
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
              <span className="text-ink-600 shrink-0">[{l.ts}]</span>
              <span className={`${lvlClass[l.lvl]} shrink-0 w-12`}>
                [{l.lvl}]
              </span>
              <span className="text-ink-200 truncate flex-1 min-w-0">
                {l.msg}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Prompt + blinking caret pinned to the bottom of the stream */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-ink-600">$</span>
          <span className="inline-block w-1.5 h-3 bg-cyan-bright/80 animate-caret" />
        </div>
      </div>
    </div>
  );
}
