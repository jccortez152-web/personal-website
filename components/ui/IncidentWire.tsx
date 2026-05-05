// Horizontal "incident + build wire" marquee at the bottom of the hero.
// Mixes resolved incidents (robot ops side) with ship events (AI/build side)
// to read as one engineer working both worlds. Pure CSS animation (see
// globals.css) — no JS frame loop, pauses on hover.

type Kind = "incident" | "ship";

const items: { kind: Kind; time: string; site?: string; id?: string; label: string; end: string }[] = [
  { kind: "incident", time: "12:42", site: "ATX-04", id: "RLY-204", label: "navigation drift", end: "resolved · 8m" },
  { kind: "ship",     time: "12:31", label: "robochat v0.4 · kb embeddings reindexed",         end: "shipped · main" },
  { kind: "incident", time: "11:58", site: "DEN-02", id: "RLY-187", label: "battery cell imbalance", end: "escalated · L2" },
  { kind: "ship",     time: "11:22", label: "reimburse-portal · approval flow",                end: "deployed · staging" },
  { kind: "incident", time: "10:47", site: "AUS-03", id: "RLY-142", label: "lidar sync drift", end: "resolved · 14m" },
  { kind: "ship",     time: "10:18", label: "runbook scraper · 47 docs ingested",              end: "vector store synced" },
  { kind: "incident", time: "10:12", site: "SEA-01", id: "RLY-308", label: "wifi roaming chatter", end: "coverage flagged" },
  { kind: "incident", time: "09:34", site: "NYC-02", id: "RLY-052", label: "depth sensor desync", end: "resolved · 11m" },
  { kind: "ship",     time: "09:01", label: "triage prompt v3 · eval suite",                   end: "pass rate · 91%" },
  { kind: "incident", time: "08:18", site: "LAX-03", id: "RLY-217", label: "journald flood",   end: "resolved · 6m" },
  { kind: "incident", time: "07:51", site: "BOS-02", id: "RLY-118", label: "vpn handshake retry", end: "resolved · 9m" },
  { kind: "ship",     time: "07:09", label: "jcortez.dev · hero refactor",                     end: "deployed · vercel" },
];

export default function IncidentWire() {
  // Duplicate the list so the -50% translate produces a seamless loop.
  const stream = [...items, ...items];

  return (
    <div className="relative border-y border-ink-800/60 bg-ink-950/60 overflow-hidden">
      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-4 pr-6 bg-gradient-to-r from-ink-950 via-ink-950 to-transparent">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-bright/80 flex items-center gap-2">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-cyan-bright/60 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-cyan-bright" />
          </span>
          Live wire · ops + builds
        </span>
      </div>

      <div className="flex animate-marquee whitespace-nowrap py-3 pl-52">
        {stream.map((it, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-3 font-mono text-xs text-ink-300 px-6 border-r border-ink-800/40"
          >
            <span className="text-ink-500">{it.time}</span>

            {it.kind === "incident" ? (
              <>
                <span className="text-ink-400 uppercase tracking-wider">
                  {it.site}
                </span>
                <span className="text-ink-100">{it.id}</span>
                <span className="text-ink-300">·</span>
                <span>{it.label}</span>
                <span className="text-cyan-bright/60">→</span>
                <span className="text-emerald-400/90">{it.end}</span>
              </>
            ) : (
              <>
                <span className="text-cyan-bright/80 uppercase tracking-wider text-[10px] px-1.5 py-0.5 border border-cyan-bright/30 rounded">
                  ship
                </span>
                <span className="text-ink-100">{it.label}</span>
                <span className="text-cyan-bright/60">→</span>
                <span className="text-cyan-bright/90">{it.end}</span>
              </>
            )}
          </span>
        ))}
      </div>

      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent pointer-events-none" />
    </div>
  );
}
