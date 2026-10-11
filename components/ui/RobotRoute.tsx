// Decorative dotted amber "robot route": origin waypoint, an orthogonal turn,
// and a dock marker. Percent coordinates keep the dots round at any width.

export default function RobotRoute({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      className={`block w-full h-10 text-signal ${className}`}
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0 8"
        opacity="0.75"
      >
        <line x1="6" y1="30" x2="64%" y2="30" />
        <line x1="64%" y1="30" x2="64%" y2="8" />
        <line x1="64%" y1="8" x2="96%" y2="8" />
      </g>
      <circle cx="6" cy="30" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="64%" cy="30" r="2.5" fill="currentColor" />
      <circle cx="96%" cy="8" r="5" fill="currentColor" />
    </svg>
  );
}
