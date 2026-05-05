"use client";

// Mock fleet telemetry panel rendered in the hero.
// Sells the "production engineer" story instantly — animated entry, perpetual
// status pulses, plausible MTTR/uptime metrics. Isolated as its own client leaf
// so the parent hero stays a server component.

import { motion } from "framer-motion";
import { Activity, CheckCircle2 } from "lucide-react";

type Status = "online" | "charging" | "idle" | "fault";

const robots: { id: string; site: string; status: Status; latency: number }[] = [
  { id: "RLY-204", site: "ATX-04", status: "online", latency: 42 },
  { id: "RLY-187", site: "DEN-02", status: "online", latency: 38 },
  { id: "RLY-291", site: "PHX-01", status: "charging", latency: 51 },
  { id: "RLY-142", site: "AUS-03", status: "online", latency: 47 },
  { id: "RLY-308", site: "SEA-01", status: "idle", latency: 39 },
];

const statusColor: Record<Status, string> = {
  online: "bg-emerald-400",
  charging: "bg-cyan-bright",
  idle: "bg-amber-300",
  fault: "bg-rose-400",
};

export default function TelemetryPanel() {
  return (
    <div className="relative rounded-2xl border border-ink-800 bg-ink-900/60 backdrop-blur-sm shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-ink-800/80">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-300">
          <Activity className="w-3.5 h-3.5 text-cyan-bright" strokeWidth={2} />
          Fleet Telemetry · live
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-ink-700" />
          <span className="w-2 h-2 rounded-full bg-ink-700" />
          <span className="w-2 h-2 rounded-full bg-cyan-bright" />
        </div>
      </div>

      {/* Stat row — no card containers, just dividers */}
      <div className="grid grid-cols-3 divide-x divide-ink-800/80 border-b border-ink-800/80">
        <Stat label="Online" value="187" delta="+3" />
        <Stat label="MTTR p50" value="11m" delta="-2m" tone="ok" />
        <Stat label="Open" value="0" delta="ok" tone="ok" />
      </div>

      {/* Fleet list */}
      <div className="divide-y divide-ink-800/60">
        {robots.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.4 + i * 0.06,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="flex items-center justify-between px-5 py-2.5 font-mono text-xs"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex w-1.5 h-1.5">
                <span
                  className={`absolute inline-flex w-full h-full rounded-full opacity-75 ${statusColor[r.status]} animate-ping`}
                />
                <span
                  className={`relative inline-flex w-1.5 h-1.5 rounded-full ${statusColor[r.status]}`}
                />
              </span>
              <span className="text-ink-100">{r.id}</span>
              <span className="text-ink-400">{r.site}</span>
            </div>
            <div className="flex items-center gap-4 text-ink-300">
              <span className="uppercase tracking-wider text-[10px] text-ink-400">
                {r.status}
              </span>
              <span className="tabular-nums">{r.latency}ms</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-ink-800/80 font-mono text-[11px] text-ink-400">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" strokeWidth={2} />
          last incident · resolved 14m ago
        </div>
        <span>updated · just now</span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone?: "ok";
}) {
  return (
    <div className="px-5 py-3">
      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-xl font-medium tracking-tight tabular-nums">
          {value}
        </span>
        <span
          className={`font-mono text-[10px] ${tone === "ok" ? "text-emerald-400" : "text-ink-400"}`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}
