// Open Graph card, auto-wired as og:image and twitter:image. Same idea as the
// hero: manual tasks struck through on a ceil field, then the name. Archivo
// static WOFFs live in ./og-fonts (next/font can't feed ImageResponse).

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Johannes Cortez, Robot Care Specialist building AI automation at Relay Robotics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ceil = "#8DB3D6";
const ink = "#16202A";

const tasks = [
  "Watch a robot's logs through every delivery.",
  "Check the inbox for replies Salesforce missed.",
  "Score every case for QA by hand.",
];

export default async function OG() {
  const dir = join(process.cwd(), "app", "og-fonts");
  const [a400, a700, a800] = await Promise.all([
    readFile(join(dir, "archivo-latin-400-normal.woff")),
    readFile(join(dir, "archivo-latin-700-normal.woff")),
    readFile(join(dir, "archivo-latin-800-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: ceil,
          color: ink,
          padding: "72px 84px",
          fontFamily: "Archivo",
        }}
      >
        {tasks.map((t) => (
          <div key={t} style={{ display: "flex", alignSelf: "flex-start", position: "relative", fontSize: 46, fontWeight: 700, lineHeight: 1.25 }}>
            {t}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "56%",
                height: 5,
                background: ink,
                display: "flex",
              }}
            />
          </div>
        ))}

        <div style={{ flex: 1, display: "flex" }} />

        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
          Johannes Cortez
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 32, fontWeight: 400 }}>
          Robot Care Specialist building AI automation at Relay Robotics
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: a400, weight: 400, style: "normal" },
        { name: "Archivo", data: a700, weight: 700, style: "normal" },
        { name: "Archivo", data: a800, weight: 800, style: "normal" },
      ],
    },
  );
}
