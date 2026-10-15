"use client";

// Top bar: name, four destinations and the resume. The section in view is
// underlined. Below md the links fold into a "Menu" button.

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { id: "agents", label: "Agents" },
  { id: "apps", label: "Apps" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
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
    <header className="sticky top-0 z-40 bg-paper border-b border-rule">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-6">
        <a href="#top" className="expanded inline-flex items-center min-h-11 font-extrabold text-lg tracking-tight">
          Johannes Cortez
        </a>

        <nav aria-label="Site" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[16px] font-semibold">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "location" : undefined}
                  className={`inline-flex items-center min-h-11 underline-offset-[0.35em] decoration-2 ${
                    active === l.id ? "underline" : "hover:underline"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.links.resume}
                download
                className="inline-flex items-center min-h-11 px-4 rounded-md bg-navy text-paper font-bold transition-opacity duration-150 hover:opacity-90"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="md:hidden inline-flex items-center gap-2 min-h-11 px-3 rounded-md border border-rule font-semibold"
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
        <nav id="site-menu" aria-label="Site" className="md:hidden border-t border-rule">
          <ul className="max-w-[1200px] mx-auto px-4 py-2">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "location" : undefined}
                  className="flex items-center min-h-12 text-lg font-semibold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.links.resume} download className="flex items-center min-h-12 text-lg font-semibold">
                Download resume
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
