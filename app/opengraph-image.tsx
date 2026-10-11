// Open Graph card, auto-wired as og:image and twitter:image. Fleet Console
// theme: ink background, dot grid, Space Grotesk name, amber route accent.
// Fonts are static WOFF files in ./og-fonts (next/font can't feed ImageResponse).

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Johannes Cortez — AI Automation Specialist · Robotics Fleet Ops";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#0E1A24";
const fg = "#EAF0F3";
const fg2 = "#B4C3CD";
const muted = "#9FB2BF";
const signal = "#F2A93B";
const live = "#4FB286";

export default async function OG() {
  const dir = join(process.cwd(), "app", "og-fonts");
  const [grotesk500, grotesk700, mono500] = await Promise.all([
    readFile(join(dir, "space-grotesk-latin-500-normal.woff")),
    readFile(join(dir, "space-grotesk-latin-700-normal.woff")),
    readFile(join(dir, "jetbrains-mono-latin-500-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: ink,
          padding: "72px 80px",
          color: fg,
          fontFamily: "Space Grotesk",
          position: "relative",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(234,240,243,0.08) 1px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: signal,
          }}
        >
          § Portfolio · 2026
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        <div
          style={{
            display: "flex",
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          Johannes Cortez
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 40,
            fontWeight: 500,
            color: fg2,
          }}
        >
          AI Automation Specialist · Robotics Fleet Ops
        </div>

        {/* Dotted amber route */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 48 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              border: `2px solid ${signal}`,
              display: "flex",
            }}
          />
          <div style={{ display: "flex", gap: 8, marginLeft: 10, marginRight: 10 }}>
            {Array.from({ length: 56 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 999,
                  background: signal,
                  display: "flex",
                }}
              />
            ))}
          </div>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: signal,
              display: "flex",
            }}
          />
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "JetBrains Mono",
            fontSize: 20,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: muted,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: live,
                display: "flex",
              }}
            />
            <span style={{ color: live }}>Open to work</span>
          </div>
          <span>github.com/jccortez152-web</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: grotesk500, weight: 500, style: "normal" },
        { name: "Space Grotesk", data: grotesk700, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono500, weight: 500, style: "normal" },
      ],
    },
  );
}
