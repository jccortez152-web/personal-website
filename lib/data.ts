// Centralized content. Edit here to update the entire site.

export const profile = {
  name: "Johannes Christopher O. Cortez",
  shortName: "Johannes Cortez",
  initials: "JC",
  role: "Robotics Engineer",
  location: "New Manila, Quezon City, Philippines",
  email: "jccortez152@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/johannesongcortez/",
    github: "https://github.com/jccortez152-web",
    resume: "/resume.pdf", // Drop the actual PDF into /public/resume.pdf
  },
};

export const education = {
  degree: "Bachelor of Science in Computer Engineering",
  school: "University of the East — Manila",
  period: "2018 — 2023",
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Robotics & Diagnostics",
    items: [
      "Advanced robot diagnostics (Linux · ROS)",
      "rosbag analysis",
      "Nav stack triage",
      "Sensor + elevator interaction triage",
      "Fleet monitoring & telemetry",
      "Embedded systems · IoT",
    ],
  },
  {
    group: "Networking & Linux",
    items: [
      "Linux logs (journald, syslog)",
      "tcpdump / Wireshark",
      "DHCP / DNS triage",
      "VPN troubleshooting",
      "Wi-Fi roaming RCA",
      "Network security fundamentals",
    ],
  },
  {
    group: "Tools & Platforms",
    items: [
      "Linux (Ubuntu, Debian)",
      "ServiceNow · Monday.com",
      "Make.com · Salesforce",
      "Slack · Microsoft Teams",
      "Git · GitHub",
      "Microsoft 365 · Google Suite",
    ],
  },
  {
    group: "Automation · Internal Tools",
    items: [
      "Cursor · Claude Code (vibe-coding)",
      "Make.com · n8n (workflow automation)",
      "Slack Bolt integrations",
      "Email + form automation",
      "Next.js · Supabase shipping stack",
      "Bash · Python tooling",
    ],
  },
];

export const experience = [
  {
    company: "Relay Robotics",
    role: "Robo Care Specialist (L1)",
    period: "2024 — Present",
    bullets: [
      "Advanced remote troubleshooting on a global fleet of autonomous service robots — using Linux diagnostics, system logs, and fleet monitoring tools to identify and resolve operational issues.",
      "Guide on-site consultants and customer staff through step-by-step troubleshooting during diagnostics and live service incidents.",
      "Investigate connectivity disruptions, navigation issues, sensor alerts, elevator interaction issues, and task cancellations — triaged from log data and live telemetry.",
      "Collaborate closely with L2 engineers and Solutions Architects on complex investigations and escalated cases; learn advanced techniques and share them with the L1 team.",
      "Publish weekly operational updates highlighting new technical findings, recurring issues, and troubleshooting insights for the wider RoboCare team.",
      "Maintain detailed incident documentation and knowledge base articles so solutions get standardized and reused across shifts.",
      "Recognized as a top-performing L1 specialist for fast ticket resolution and detailed case documentation.",
    ],
  },
  {
    company: "DXC Technology",
    role: "Technical Solutions Representative III — Microsoft Global Helpdesk",
    period: "2023 — 2024",
    bullets: [
      "L1 enterprise technical support for Microsoft 365 services, authentication issues, and endpoint concerns at high case volume.",
      "Logged and tracked cases in ServiceNow with accurate documentation and clean follow-ups.",
      "Identified recurring issues and partnered with senior teams during escalations to improve service reliability.",
      "Received the highest customer commendations on the team across three consecutive quarters; recognized as a top-performing L1 technician.",
    ],
  },
  {
    company: "Ignite Careers PH",
    role: "Front-End Web Developer Intern",
    period: "2021",
    bullets: [
      "Built responsive web interfaces in HTML, CSS, and vanilla JavaScript.",
      "Collaborated with project stakeholders to deliver front-end solutions aligned with project goals and deadlines.",
    ],
  },
];

export type ProjectSpan = "wide" | "narrow";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  span: ProjectSpan;
  problem: string;
  solution: string;
  stack: string[];
  impact: string;
};

export const projects: Project[] = [
  {
    id: "robochat",
    name: "RoboChat",
    tagline: "One link, one Slack thread, one nurse-to-engineer bridge.",
    span: "wide",
    problem:
      "Hospital nurses — Relay's customers — needed fast remote help when a robot got stuck or misbehaved. Phones and email were too slow for busy floors. By the time a request was answered, the robot had blocked a corridor for an hour, or the nurse had given up and routed around it.",
    solution:
      "A lightweight chat widget the nurse opens with a single link — no install, no account. On the engineer side, every new chat fires a Slack notification with context. I respond from Slack; the nurse sees my reply land in the chat bubble. Conversations persist as a searchable record.",
    stack: ["Next.js", "Slack Bolt", "Supabase", "Server-Sent Events"],
    impact:
      "Compressed nurse-to-engineer first-response time and replaced phone-tag with an async-friendly channel. Every conversation now lands in a searchable Slack channel for handoff and follow-up.",
  },
  {
    id: "reimbursement",
    name: "Relay Reimbursement Portal",
    tagline: "From spreadsheet thread to one-click approval.",
    span: "narrow",
    problem:
      "Reimbursement was a spreadsheet you filled out, attached to an email, and sent to your boss. Approvals lived in reply chains, status was opaque, and reconciling at quarter-close meant scraping inboxes.",
    solution:
      "A portal that generates the request form on click and emails it directly to the approver. Approvers approve or reject inside the portal — which auto-fires the reply email back to the requester, no manual step. Full audit trail kept.",
    stack: ["Next.js", "Supabase", "Resend", "Tailwind"],
    impact:
      "Replaced the spreadsheet-and-email dance with a single tracked workflow. Faster turnaround, nothing falls through, cleaner quarter-close.",
  },
  {
    id: "robocare-web",
    name: "RoboCare Website",
    tagline: "The faces behind the fleet.",
    span: "narrow",
    problem:
      "When a robot stalls in a hospital corridor at 2 AM, customers want to know they're not shouting into a void. Trust in the support team was implicit — but never made visible.",
    solution:
      "A public-facing site that formally introduces the RoboCare team — who we are, what we own, how we resolve incidents. Less product page, more brand story for the people behind the work.",
    stack: ["Next.js", "MDX", "Tailwind", "Vercel"],
    impact:
      "Customers now see exactly who's resolving their incident and how the team is structured. Cut the \"is anyone there?\" tension and built durable trust in the support function itself.",
  },
  {
    id: "relay-store",
    name: "Relay Store",
    tagline: "Internal store, internal currency.",
    span: "wide",
    problem:
      "Relay's internal employee store was scattered — no clean place to browse, no clean checkout flow with the company's internal currency. Admin overhead per transaction was high.",
    solution:
      "An e-commerce-style internal store: employees browse, add to cart, and check out using the company's internal credits. Inventory and balances tracked. Admin tooling for adding items and managing stock.",
    stack: ["Next.js", "Supabase", "Tailwind", "Internal SSO"],
    impact:
      "Turned a scattered perks process into a real internal product. Admins manage inventory once; employees self-serve from there.",
  },
];

export type CertKind = "cert" | "workshop" | "award";
export const certifications: {
  name: string;
  track?: string;
  kind: CertKind;
}[] = [
  {
    name: "Huawei Certified ICT Associate",
    track: "Internet of Things",
    kind: "cert",
  },
  { name: "ITIL", track: "IT Service Management", kind: "cert" },
  {
    name: "Microsoft 365 Fundamentals",
    track: "YESI Education",
    kind: "cert",
  },
  { name: "Network Security", kind: "cert" },
  { name: "Journey to the Cloud and TDD", kind: "workshop" },
  { name: "Basic React.js", kind: "workshop" },
  { name: "Web Development with WordPress", kind: "workshop" },
  { name: "Arduino Virtual Workshop", kind: "workshop" },
  { name: "Best Design Project — IoT Smart Garden", kind: "award" },
];
