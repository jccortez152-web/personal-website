"use client";

// Wayfinding sign: dark sign bar, each destination with its route-color swatch.
// The destination in view gets a thick bar in its color. Below lg it folds
// into a "Menu" button that opens the same sign as a list.

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { id: "about", label: "About", color: "var(--color-corridor)" },
  { id: "agents", label: "AI agents", color: "var(--color-route-blue)" },
  { id: "apps", label: "Apps", color: "var(--color-route-green)" },
  { id: "experience", label: "Experience", color: "var(--color-route-yellow)" },
  { id: "skills", label: "Skills", color: "var(--color-corridor)" },
  { id: "contact", label: "Contact", color: "var(--color-sign-fg)" },
];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

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
    <header
      className="sticky top-0 z-40 bg-sign text-sign-fg"
      // Focus ring is white on the dark sign (blue would be ~2.4:1 here).
      style={{ "--route": "var(--color-sign-fg)" } as React.CSSProperties}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="inline-flex items-center min-h-11 font-display font-extrabold text-xl tracking-tight"
        >
          Johannes Cortez
        </a>

        <nav aria-label="Site" className="hidden lg:block h-full">
          <ul className="flex h-full items-stretch gap-1">
            {links.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id} className="relative flex">
                  <a
                    href={`#${l.id}`}
                    aria-current={on ? "location" : undefined}
                    className={`flex items-center gap-2.5 px-3 text-[16px] font-bold transition-colors duration-150 ${
                      on ? "text-sign-fg" : "text-sign-fg-2 hover:text-sign-fg"
                    }`}
                  >
                    <span aria-hidden className="w-3 h-3" style={{ background: l.color }} />
                    {l.label}
                  </a>
                  <span
                    aria-hidden
                    className={`absolute left-3 right-3 bottom-0 h-1 transition-opacity duration-150 ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ background: l.color }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="lg:hidden inline-flex items-center gap-2 min-h-11 px-3 rounded-md border border-sign-fg/30 font-bold"
        >
          {open ? (
            <X className="w-5 h-5" strokeWidth={2} aria-hidden />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={2} aria-hidden />
          )}
          Menu
        </button>
      </div>

      {open && (
        <nav id="site-menu" aria-label="Site" className="lg:hidden border-t border-sign-fg/15">
          <ul className="max-w-[1280px] mx-auto px-4 md:px-8 py-2">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "location" : undefined}
                  className="flex items-center gap-4 min-h-12 text-lg font-bold"
                >
                  <span aria-hidden className="w-4 h-4" style={{ background: l.color }} />
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
