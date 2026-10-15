// Footer — quiet colophon on paper, under the closing ceil field.

import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-[15px] text-graphite">
        <p>
          <span className="font-semibold text-ink">{profile.name}</span>
          <br />
          {profile.location}
        </p>
        <p>
          Set in Archivo.
          <br />
          Built with Next.js, Tailwind and Claude Code.
        </p>
        <p className="md:text-right">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
