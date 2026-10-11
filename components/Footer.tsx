// Footer — quiet colophon.

import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:pl-[112px] py-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-[15px] text-ink-2">
        <p>
          <span className="font-bold text-ink">{profile.name}</span>
          <br />
          {profile.location}
        </p>
        <p>
          Set in Overpass and Atkinson Hyperlegible.
          <br />
          Built with Next.js, Tailwind and Claude Code.
        </p>
        <p className="md:text-right">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
