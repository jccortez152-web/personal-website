// Section header: amber "§ 02 · SKILLS" label above the heading, on a dot-grid
// band that fades out so it never sits behind body copy.

import { ReactNode } from "react";

export default function SectionHeader({
  index,
  label,
  title,
  sub,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative mb-12 md:mb-16">
      <div
        aria-hidden
        className="absolute -inset-x-4 -top-8 -bottom-4 md:-inset-x-8 dot-grid pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="relative">
        <p className="label-mono text-signal">
          § {index} · {label}
        </p>
        <h2 className="mt-4 text-h2 font-bold text-fg max-w-3xl">{title}</h2>
        {sub && (
          <p className="mt-4 text-body text-fg-2 max-w-2xl">{sub}</p>
        )}
        {children}
      </div>
    </header>
  );
}
