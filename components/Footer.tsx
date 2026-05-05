// Editorial colophon-style footer.

import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="px-6 pb-12 pt-16 border-t border-ink-800/60">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 mb-4">
          colophon
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-ink-400">
          <div>
            <span className="text-ink-100 font-display italic text-base">
              {profile.name}
            </span>
            <br />
            <span className="text-ink-500">{profile.location}</span>
          </div>
          <div>
            Set in <span className="text-ink-200 font-display italic">Fraunces</span> &{" "}
            <span className="text-ink-200 font-mono">Geist</span>.
            <br />
            <span className="text-ink-500">
              Built with Next.js · Tailwind · Claude Code.
            </span>
          </div>
          <div className="md:text-right">
            © {new Date().getFullYear()}.
            <br />
            <span className="text-ink-500">Last shipped · 14m ago</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
