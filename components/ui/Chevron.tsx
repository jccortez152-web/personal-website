// Apple-style text-link chevron: "Watch the demo >". Decorative.

import { ChevronRight } from "lucide-react";

export default function Chevron() {
  return (
    <ChevronRight
      aria-hidden
      className="inline-block w-[0.9em] h-[0.9em] -mt-px ml-0.5 align-middle"
      strokeWidth={2.25}
    />
  );
}
