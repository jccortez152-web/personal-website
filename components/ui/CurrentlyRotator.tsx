"use client";

// Tiny rotating accent phrase for the hero footnote line. Plain useState
// + setInterval — no framer-motion needed for this one-line widget.

import { useEffect, useState } from "react";

const phrases = [
  "the RoboChat customer widget",
  "the reimbursement portal at Relay",
  "the internal Relay Store",
  "this site (jcortez.dev)",
];

export default function CurrentlyRotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % phrases.length),
      3500,
    );
    return () => clearInterval(id);
  }, []);

  return <span className="text-cyan-bright">{phrases[i]}</span>;
}
