// A destination on the floor plan. On desktop the section's route runs down
// the left gutter in its color, with a junction where the color changes and a
// "you are here" dot that rides along via position: sticky (scroll-driven, no
// JS). On mobile the route becomes a short colored bar above the heading.
// Sets --route so focus rings inside the section use its color.

import { CSSProperties, ReactNode } from "react";

export type Route = "blue" | "green" | "yellow" | "corridor";

export const routeVar: Record<Route, string> = {
  blue: "var(--color-route-blue)",
  green: "var(--color-route-green)",
  yellow: "var(--color-route-yellow)",
  corridor: "var(--color-corridor)",
};

export default function Section({
  id,
  route,
  title,
  intro,
  end,
  children,
}: {
  id: string;
  route: Route;
  title: ReactNode;
  intro?: ReactNode;
  /** Final destination: the route stops at the heading instead of running on. */
  end?: boolean;
  children: ReactNode;
}) {
  const style = { "--route": routeVar[route] } as CSSProperties;

  return (
    <section id={id} style={style} aria-labelledby={`${id}-title`}>
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 lg:pl-[112px] py-20 md:py-32">
        {/* Gutter route (desktop) */}
        <div
          aria-hidden
          className={`hidden lg:block absolute left-[45px] w-[6px] bg-[var(--route)] top-0 ${
            end ? "h-[164px]" : "bottom-0"
          }`}
        >
          {!end && (
            <span className="sticky top-[50vh] -ml-[7px] mt-[200px] block w-5 h-5 rounded-full bg-wall border-[3px] border-ink" />
          )}
        </div>
        {/* Junction where the route turns into this section */}
        <span
          aria-hidden
          className={`hidden lg:block absolute left-[36px] top-[140px] w-6 h-6 rounded-full border-[6px] border-[var(--route)] ${
            end ? "bg-[var(--route)]" : "bg-floor"
          }`}
        />

        {/* Mobile route bar */}
        <span aria-hidden className="lg:hidden block w-16 h-1.5 mb-8 bg-[var(--route)]" />

        <header className="mb-12 md:mb-16 max-w-[68ch]">
          <h2
            id={`${id}-title`}
            className="flex items-center gap-4 text-title font-extrabold text-ink"
          >
            <span aria-hidden className="shrink-0 w-5 h-5 md:w-6 md:h-6 bg-[var(--route)]" />
            {title}
          </h2>
          {intro && <p className="mt-6 text-ink-2">{intro}</p>}
        </header>

        {children}
      </div>
    </section>
  );
}
