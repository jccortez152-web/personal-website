// Small numbered section header used across the site to give a "console log" rhythm.
export default function SectionLabel({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-cyan-bright/80">
        <span>{index}</span>
        <span className="h-px w-8 bg-cyan-bright/40" />
      </div>
      <div className="mt-2 text-ink-100 text-sm font-mono uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
