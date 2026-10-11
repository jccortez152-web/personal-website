// Colophon footer.

import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="px-4 md:px-8 py-12 border-t border-line">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted">
        <div>
          <span className="text-fg font-medium">{profile.name}</span>
          <br />
          {profile.location}
        </div>
        <div>
          Set in <span className="text-fg-2">Space Grotesk</span> &{" "}
          <span className="text-fg-2 font-mono">JetBrains Mono</span>.
          <br />
          Built with Next.js · Tailwind · Claude Code.
        </div>
        <div className="md:text-right">© {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
