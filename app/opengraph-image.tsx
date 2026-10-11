// Open Graph card, auto-wired as og:image and twitter:image. Wayfinding
// theme: floor background, a route line through the three route colors ending
// at a destination, name and title in Overpass. Fonts are static WOFF files in
// ./og-fonts (next/font can't feed ImageResponse).

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Johannes Cortez, Robot Care Specialist building AI automation at Relay Robotics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const floor = "#EEF1EC";
const wall = "#FFFFFF";
const ink = "#14262B";
const ink2 = "#3E5056";
const blue = "#2457C5";
const green = "#1E8A5A";
const yellow = "#E5B21A";

export default async function OG() {
  const dir = join(process.cwd(), "app", "og-fonts");
  const [overpass800, atkinson400, atkinson700] = await Promise.all([
    readFile(join(dir, "overpass-latin-800-normal.woff")),
    readFile(join(dir, "atkinson-hyperlegible-latin-400-normal.woff")),
    readFile(join(dir, "atkinson-hyperlegible-latin-700-normal.woff")),
  ]);

  const bar = (color: string, width: number) => (
    <div style={{ display: "flex", width, height: 14, background: color }} />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: floor,
          padding: "80px 88px",
          color: ink,
          fontFamily: "Atkinson",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700 }}>
          <div style={{ display: "flex", width: 22, height: 22, background: blue }} />
          AI agents
          <div style={{ display: "flex", width: 22, height: 22, background: green, marginLeft: 18 }} />
          Apps
          <div style={{ display: "flex", width: 22, height: 22, background: yellow, marginLeft: 18 }} />
          Experience
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        <div
          style={{
            display: "flex",
            fontFamily: "Overpass",
            fontSize: 112,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          Johannes Cortez
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 36, color: ink2, maxWidth: 940 }}>
          Robot Care Specialist building AI automation at Relay Robotics
        </div>

        {/* Floor route ending at a destination */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 56 }}>
          {bar(blue, 300)}
          {bar(green, 300)}
          {bar(yellow, 300)}
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              borderRadius: 999,
              background: wall,
              border: `10px solid ${ink}`,
              marginLeft: -4,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Overpass", data: overpass800, weight: 800, style: "normal" },
        { name: "Atkinson", data: atkinson400, weight: 400, style: "normal" },
        { name: "Atkinson", data: atkinson700, weight: 700, style: "normal" },
      ],
    },
  );
}
