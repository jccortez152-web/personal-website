// Footer — small gray colophon on light gray, Apple-style.

import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-alt">
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 py-8 text-[13px] leading-relaxed text-fg-2 flex flex-col md:flex-row md:justify-between gap-2">
        <p>
          Copyright © {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <p>Set in Inter. Built with Next.js, Tailwind and Claude Code.</p>
      </div>
    </footer>
  );
}
