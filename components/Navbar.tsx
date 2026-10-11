"use client";

// Sticky nav: translucent ink + blur, mono links, amber underline on the
// section in view. Below xl (8 links don't fit) it collapses to a menu button.

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "agents", label: "Agents" },
  { id: "projects", label: "Work" },
  { id: "demo", label: "Demo" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Track the section crossing the middle of the viewport.
  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-ink/80 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="inline-flex items-center min-h-11 font-bold tracking-tight text-fg"
        >
          Johannes Cortez
        </a>

        <nav aria-label="Sections" className="hidden xl:block">
          <ul className="flex items-center gap-6">
            {links.map((l, i) => (
              <li key={l.id}>
                <NavLink
                  id={l.id}
                  index={i + 1}
                  label={l.label}
                  active={active === l.id}
                />
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-card border border-line text-fg"
        >
          {open ? (
            <X className="w-5 h-5" strokeWidth={1.75} aria-hidden />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={1.75} aria-hidden />
          )}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="xl:hidden border-t border-line bg-ink"
        >
          <ul className="max-w-6xl mx-auto px-4 md:px-8 py-2">
            {links.map((l, i) => (
              <li key={l.id} className="border-b border-line last:border-b-0">
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "location" : undefined}
                  className={`flex items-center gap-4 min-h-12 label-mono ${
                    active === l.id ? "text-signal" : "text-fg-2"
                  }`}
                >
                  <span className="text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function NavLink({
  id,
  index,
  label,
  active,
}: {
  id: string;
  index: number;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "location" : undefined}
      className={`relative inline-flex items-center gap-2 min-h-11 font-mono text-[13px] uppercase tracking-[0.1em] transition-colors duration-150 ${
        active ? "text-fg" : "text-muted hover:text-fg"
      }`}
    >
      <span className={active ? "text-signal" : ""}>
        {String(index).padStart(2, "0")}
      </span>
      {label}
      <span
        aria-hidden
        className={`absolute left-0 right-0 bottom-2 h-px bg-signal transition-opacity duration-150 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </a>
  );
}
