import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Fraunces } from "next/font/google";
import "./globals.css";

// Display serif for editorial moments (masthead H1, pull quotes, section titles).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Resolves OG/Twitter image URLs absolutely. Vercel injects
// VERCEL_PROJECT_PRODUCTION_URL on production deploys; falls back to
// localhost during dev so social previews work in both environments.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Johannes Cortez — Robot Ops + AI Automations",
  description:
    "L1 RoboCare Specialist at Relay Robotics. Front-line diagnostics on a global robot fleet, building AI agents and internal tools on the side.",
  keywords: [
    "Robotics Engineer",
    "ROS",
    "Linux Diagnostics",
    "Robot Fleet",
    "Relay Robotics",
    "RoboCare",
    "AI Automation",
    "RAG",
    "LLM Agents",
  ],
  authors: [{ name: "Johannes Christopher O. Cortez" }],
  openGraph: {
    title: "Johannes Cortez — Robot Ops + AI Automations",
    description:
      "L1 RoboCare Specialist at Relay Robotics. Front-line diagnostics on a global robot fleet, building AI agents and internal tools on the side.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johannes Cortez — Robot Ops + AI Automations",
    description:
      "L1 RoboCare Specialist at Relay Robotics. Front-line diagnostics on a global robot fleet, building AI agents and internal tools on the side.",
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
