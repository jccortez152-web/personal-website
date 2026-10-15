// Open Graph card, auto-wired as og:image and twitter:image. Apple-style:
// light gray, centered name and headline, gray subline, one blue pill.
// Inter static WOFFs live in ./og-fonts (next/font can't feed ImageResponse).

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Johannes Cortez. AI agents that do the work. Robot Care Specialist building AI automation at Relay Robotics.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const dir = join(process.cwd(), "app", "og-fonts");
  const [i400, i600, i700] = await Promise.all([
    readFile(join(dir, "inter-latin-400-normal.woff")),
    readFile(join(dir, "inter-latin-600-normal.woff")),
    readFile(join(dir, "inter-latin-700-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F5F7",
          color: "#1D1D1F",
          fontFamily: "Inter",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>Johannes Cortez</div>
        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          AI agents that do the work.
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#6E6E73", maxWidth: 900 }}>
          Robot Care Specialist building AI automation at Relay Robotics
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            padding: "14px 34px",
            borderRadius: 999,
            background: "#0071E3",
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          Watch the demos
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: i400, weight: 400, style: "normal" },
        { name: "Inter", data: i600, weight: 600, style: "normal" },
        { name: "Inter", data: i700, weight: 700, style: "normal" },
      ],
    },
  );
}
