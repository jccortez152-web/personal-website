// Hero floor plan: one hospital floor drawn with simple strokes. A robot rides
// the blue route from the elevator to Nurses' station 4B; at three waypoints a
// callout appears as the agent notices something. Pure SVG + CSS (globals.css,
// .fp-*): the only automatic animation on the site, and the default styles are
// the finished state, so prefers-reduced-motion shows the end result.

const ROUTE = "M70 150 L70 240 L410 240 L410 372";

const notes = [
  { n: 1, text: "Elevator called", at: { left: "18.5%", top: "27%" }, marker: [108, 150] },
  { n: 2, text: "Door held 6 seconds", at: { left: "5%", top: "69%" }, marker: [300, 214] },
  {
    n: 3,
    text: "Wi-Fi dropped near Room 412, flagged to Slack",
    at: { left: "58%", top: "18%" },
    marker: [446, 214],
  },
];

const topRooms = [
  { x: 130, w: 130, label: "408" },
  { x: 260, w: 130, label: "410" },
  { x: 390, w: 130, label: "412" },
  { x: 520, w: 80, label: "414" },
  { x: 600, w: 90, label: "Stairs" },
];
const bottomRooms = [
  { x: 30, w: 140, label: "407" },
  { x: 170, w: 130, label: "409" },
  { x: 300, w: 220, label: "Nurses' station 4B" },
  { x: 520, w: 170, label: "411" },
];

export default function FloorPlan() {
  return (
    <figure>
      <div className="relative">
        <svg
          viewBox="0 0 720 480"
          role="img"
          aria-label="Floor plan of a hospital floor. A delivery robot rides from the elevator along the corridor to Nurses' station 4B. On the way the monitoring agent notes: 1, elevator called. 2, door held 6 seconds. 3, Wi-Fi dropped near Room 412, flagged to Slack."
          className="block w-full h-auto"
        >
          {/* Corridor floor + outer wall */}
          <rect x="30" y="30" width="660" height="420" className="fill-floor stroke-ink" strokeWidth="3" />

          {/* Elevator */}
          <rect x="30" y="30" width="100" height="170" className="fill-wall stroke-ink" strokeWidth="2" />
          <path d="M48 70 L112 126 M112 70 L48 126" className="stroke-corridor" strokeWidth="2" />
          <rect x="48" y="70" width="64" height="56" fill="none" className="stroke-corridor" strokeWidth="2" />
          <text x="80" y="56" textAnchor="middle" className="fill-ink-2 text-[17px]">Elevator</text>

          {topRooms.map((r) => (
            <g key={r.label}>
              <rect x={r.x} y="30" width={r.w} height="170" className="fill-wall stroke-ink" strokeWidth="2" />
              <text x={r.x + r.w / 2} y="56" textAnchor="middle" className="fill-ink-2 text-[17px]">
                {r.label}
              </text>
            </g>
          ))}
          {bottomRooms.map((r) => (
            <g key={r.label}>
              <rect x={r.x} y="280" width={r.w} height="170" className="fill-wall stroke-ink" strokeWidth="2" />
              {/* Room numbers by the door; the long station label sits low and
                  right so neither the route nor the ID badge covers it. */}
              <text
                x={r.label.length > 4 ? r.x + r.w - 12 : r.x + r.w / 2}
                y={r.label.length > 4 ? 440 : 318}
                textAnchor={r.label.length > 4 ? "end" : "middle"}
                className="fill-ink-2 text-[17px]"
              >
                {r.label}
              </text>
            </g>
          ))}

          {/* Door openings onto the corridor */}
          {[50, 175, 305, 435, 545, 625].map((x) => (
            <line key={`t${x}`} x1={x} y1="200" x2={x + 34} y2="200" className="stroke-floor" strokeWidth="4" />
          ))}
          {[60, 215, 392, 585].map((x) => (
            <line key={`b${x}`} x1={x} y1="280" x2={x + 34} y2="280" className="stroke-floor" strokeWidth="4" />
          ))}

          {/* Fire doors across the corridor, held open */}
          <path d="M300 200 L300 226 M300 254 L300 280" className="stroke-ink" strokeWidth="3" />
          <path d="M300 226 A26 26 0 0 1 274 200 M300 254 A26 26 0 0 0 274 280" fill="none" className="stroke-corridor" strokeWidth="1.5" />

          {/* Wi-Fi access point near 412 */}
          <g className="stroke-ink-2" fill="none" strokeWidth="2" strokeLinecap="round">
            <circle cx="470" cy="214" r="2.5" className="fill-ink-2" />
            <path d="M462 207 A11 11 0 0 1 478 207" />
            <path d="M456 201 A19 19 0 0 1 484 201" />
          </g>

          {/* Planned route, then the driven route drawing in on top */}
          <path d={ROUTE} fill="none" className="stroke-corridor" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
          <path
            d={ROUTE}
            pathLength={1}
            fill="none"
            className="fp-route stroke-route-blue"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Destination */}
          <circle cx="410" cy="372" r="17" className="fill-floor stroke-route-blue" strokeWidth="4" />

          {/* Waypoint markers */}
          {notes.map((n) => (
            <g key={n.n} className={`fp-note fp-note-${n.n}`}>
              <circle cx={n.marker[0]} cy={n.marker[1]} r="12" className="fill-ink" />
              <text
                x={n.marker[0]}
                y={n.marker[1] + 5}
                textAnchor="middle"
                className="fill-floor text-[14px] font-bold"
              >
                {n.n}
              </text>
            </g>
          ))}

          {/* Robot (top view) */}
          <g className="fp-robot">
            <circle r="14" className="fill-route-blue stroke-wall" strokeWidth="3" />
            <circle r="5" className="fill-wall" />
          </g>
        </svg>

        {/* Callouts beside the route (large screens) */}
        <ol aria-hidden className="hidden lg:block">
          {notes.map((n) => (
            <li
              key={n.n}
              className={`fp-note fp-note-${n.n} absolute max-w-[13rem] flex gap-2 items-start bg-wall border-l-4 border-route-blue px-3 py-2 text-[15px] leading-snug text-ink shadow-[0_1px_0_var(--color-rule)]`}
              style={n.at}
            >
              <span className="font-bold">{n.n}</span>
              {n.text}
            </li>
          ))}
        </ol>
      </div>

      {/* Callouts as a list (small screens, where text in the plan is too small) */}
      <ol aria-hidden className="lg:hidden mt-4 space-y-2 text-[16px]">
        {notes.map((n) => (
          <li key={n.n} className="flex gap-3 items-baseline">
            <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-ink text-floor text-[14px] font-bold">
              {n.n}
            </span>
            {n.text}
          </li>
        ))}
      </ol>

      <figcaption className="mt-4 lg:pl-[300px] text-[15px] text-ink-2">
        Illustration: what the fleet-monitoring agent watches for on one delivery.
      </figcaption>
    </figure>
  );
}
