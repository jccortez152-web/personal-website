"use client";

// Fixed full-viewport wrapper that hosts the R3F scene as a page-wide
// backdrop. Scene is loaded with ssr:false so Three.js never tries to touch
// window/document during server render. Pointer-events:none so the canvas
// never blocks clicks on real content.

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

export default function Background3D() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
    >
      <Scene />
    </div>
  );
}
