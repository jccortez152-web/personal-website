"use client";

// Sticky sub-bar, like an Apple product page: name on the left, section
// links and a blue Resume pill on the right, frosted over the content. The
// section in view is shown in full-strength text. Below md the links fold
// into a menu.

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { id: "agents", label: "Agents" },
  { id: "apps", label: "Apps" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
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
    <header className="sticky top-0 z-40 bg-base/80 backdrop-blur-xl backdrop-saturate-150 border-b border-rule">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 h-14 flex items-center justify-between gap-6">
        <a href="#top" className="inline-flex items-center min-h-11 text-[20px] font-semibold tracking-tight">
          Johannes Cortez
        </a>

        <div className="flex items-center gap-2 md:gap-7">
          <nav aria-label="Site" className="hidden md:block">
            <ul className="flex items-center gap-6 text-[14px]">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? "location" : undefined}
                    className={`inline-flex items-center min-h-11 transition-colors duration-150 ${
                      active === l.id ? "text-fg" : "text-fg-2 hover:text-fg"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-fg-2"
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              strokeWidth={2}
              aria-hidden
            />
          </button>

          {/* 44px tap area around a small pill */}
          <a
            href={profile.links.resume}
            download
            className="group inline-flex items-center min-h-11 rounded-full"
          >
            <span className="inline-flex items-center h-8 px-4 rounded-full bg-blue text-white text-[13px] font-medium transition-opacity duration-150 group-hover:opacity-90">
              Resume
            </span>
          </a>
        </div>
      </div>

      {open && (
        <nav id="site-menu" aria-label="Site" className="md:hidden border-t border-rule">
          <ul className="max-w-[1080px] mx-auto px-5 py-2">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "location" : undefined}
                  className="flex items-center min-h-12 text-[17px] font-medium"
                >
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
