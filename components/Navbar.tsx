// Editorial navbar — italic display serif wordmark, mono section indices.

import Link from "next/link";

const links = [
  { href: "#about", label: "01 · about" },
  { href: "#skills", label: "02 · skills" },
  { href: "#experience", label: "03 · experience" },
  { href: "#projects", label: "04 · work" },
  { href: "#demo", label: "05 · demo" },
  { href: "#contact", label: "07 · contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-ink-950/70 border-b border-ink-800/60">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="#top"
          className="flex items-baseline gap-2 text-ink-100"
        >
          <span className="font-display italic text-lg leading-none">
            Johannes Cortez
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500">
            ↗
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-ink-100 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-300">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-cyan-bright/50 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-bright" />
          </span>
          open · ai + robotics
        </div>
      </div>
    </header>
  );
}
