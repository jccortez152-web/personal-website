// Dynamic Open Graph card. File-based convention — Next.js auto-wires this
// as the page's og:image (and twitter:image, since no twitter-image.tsx
// overrides it). Edge runtime + ImageResponse from next/og.
//
// 1200×630 is the canonical OG size. Edge-cached after first render so
// social platforms get a fast PNG.

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Johannes Cortez — Robotics Engineer · solving live system failures.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0c0a09",
          padding: "72px 80px",
          color: "#fafaf9",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            display: "flex",
          }}
        />

        {/* Lime radial glow accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(ellipse 55% 70% at 78% 55%, rgba(163,230,53,0.18) 0%, rgba(163,230,53,0.04) 35%, rgba(163,230,53,0) 70%)",
            display: "flex",
          }}
        />

        {/* Top kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "18px",
            color: "#78716c",
            letterSpacing: "5px",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "1px",
              background: "#44403c",
              display: "flex",
            }}
          />
          <span>/ portfolio · 2026 · robotics + AI</span>
        </div>

        {/* Spacer pushes the name block down */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Name — masthead */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "168px",
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: "-7px",
          }}
        >
          <span>Johannes</span>
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>
            Cortez.
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: "36px",
            fontSize: "34px",
            fontStyle: "italic",
            color: "#d6d3d1",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            letterSpacing: "-0.5px",
          }}
        >
          <span>Robotics Engineer</span>
          <span style={{ color: "#a3e635", fontStyle: "normal" }}>·</span>
          <span>solving live system failures.</span>
        </div>

        {/* Spacer pushes the footer to the bottom */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "18px",
            color: "#a8a29e",
            letterSpacing: "5px",
            textTransform: "uppercase",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#a3e635",
                boxShadow: "0 0 24px rgba(163,230,53,0.65)",
                display: "flex",
              }}
            />
            <span>open to work</span>
          </div>
          <span style={{ color: "#d6d3d1" }}>github.com/jccortez152-web</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
