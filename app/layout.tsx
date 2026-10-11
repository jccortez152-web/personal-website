import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Overpass } from "next/font/google";
import "./globals.css";

// Display: signage-style, like highway and hospital wayfinding.
const overpass = Overpass({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-overpass",
  display: "swap",
});

// Body: designed for legibility.
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

// Resolves OG/Twitter image URLs absolutely. Vercel injects
// VERCEL_PROJECT_PRODUCTION_URL on production deploys; falls back to
// localhost during dev so social previews work in both environments.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const title = "Johannes Cortez — AI Automation Specialist";
const description =
  "AI Automation Specialist building AI agents and automations inside a live robotics operation. Claude, n8n, MCP, Next.js, Supabase.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "AI Automation",
    "AI Agents",
    "Claude",
    "n8n",
    "MCP",
    "RAG",
    "Robotics Fleet Ops",
    "Next.js",
    "Supabase",
  ],
  authors: [{ name: "Johannes Christopher O. Cortez" }],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${overpass.variable} ${atkinson.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
