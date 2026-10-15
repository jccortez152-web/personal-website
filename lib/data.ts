// Centralized content. Edit here to update the entire site.

export const profile = {
  name: "Johannes Christopher O. Cortez",
  shortName: "Johannes Cortez",
  initials: "JC",
  role: "Robot Care Specialist, AI and Automation",
  // Hero subline and OG title.
  headline:
    "Robot Care Specialist building AI automation at Relay Robotics, supporting delivery robots in hospitals and hotels.",
  location: "New Manila, Quezon City, Philippines",
  email: "jccortez152@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/johannesongcortez/",
    github: "https://github.com/jccortez152-web",
    resume: "/resume.pdf",
  },
};

export const education = {
  degree: "Bachelor of Science in Computer Engineering",
  school: "University of the East, Manila",
  period: "2018 to 2023",
};

// Four groups, plain lists. Items that used to be joined with "·" are split;
// duplicates (Claude Code, Make.com) appear once.
export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI and automation",
    items: [
      "Claude API",
      "Claude Code",
      "Claude Skills",
      "MCP",
      "RAG",
      "AI agents",
      "Prompt engineering",
      "OpenAI API",
      "Cursor",
      "n8n and Make.com workflow automation",
      "Slack Bolt integrations",
      "Email and form automation",
      "Next.js and Supabase",
      "Bash and Python tooling",
    ],
  },
  {
    group: "Robotics and Linux",
    items: [
      "Advanced robot diagnostics (Linux, ROS)",
      "rosbag analysis",
      "Nav stack triage",
      "Sensor and elevator interaction triage",
      "Fleet monitoring and telemetry",
      "Embedded systems and IoT",
      "Linux logs (journald, syslog)",
      "tcpdump and Wireshark",
      "DHCP and DNS triage",
      "VPN troubleshooting",
      "Wi-Fi roaming RCA",
      "Network security fundamentals",
    ],
  },
  {
    group: "Identity and endpoint",
    items: [
      "Microsoft Entra ID",
      "Intune",
      "Conditional Access",
      "MFA",
      "VPN",
      "Quick Assist",
      "Exchange Online",
    ],
  },
  {
    group: "Tools and platforms",
    items: [
      "Linux (Ubuntu, Debian)",
      "Grafana and Loki",
      "ServiceNow",
      "Monday.com",
      "Salesforce",
      "Slack",
      "Microsoft Teams",
      "Confluence",
      "Git and GitHub",
      "Microsoft 365",
      "Google Workspace",
    ],
  },
];

export const experience = [
  {
    company: "Relay Robotics",
    role: "Robot Care Specialist | AI & Automation",
    period: "2024 to present",
    bullets: [
      "Provide remote technical support for a global fleet of autonomous delivery robots in hospitals and hotels, diagnosing live faults across navigation, connectivity, sensors, docking, and elevator and door integrations using SSH, Linux logs, Grafana/Loki, and rosbag analysis.",
      "Remotely support field technicians during robot installs, hardware swaps, and site commissioning.",
      "Perform post-mortem analysis on incidents, reconstructing robot behavior from logs and rosbag data to pinpoint root causes.",
      "Design and ship internal AI agents and automations, several sanctioned or extended at engineering leadership's request.",
      "Author KB articles and weekly fleet-wide technical updates.",
      "Partner with engineers and Solutions Architects on complex investigations.",
    ],
  },
  {
    company: "DXC Technology",
    role: "Technical Solutions Representative III — Microsoft Global Helpdesk (Managed Services)",
    period: "2023 to 2024",
    bullets: [
      "Delivered managed service support for Microsoft's global workforce under client SLAs.",
      "Resolved Entra ID identity issues: lockouts, password resets, MFA, and sign-in failures.",
      "Supported Intune-managed devices: enrollment, compliance, app deployments, and Conditional Access blocks.",
      "Troubleshot corporate VPN connectivity; delivered remote support through Quick Assist and Teams.",
      "Resolved Microsoft 365 issues across Outlook, Exchange Online, Teams, OneDrive, and SharePoint.",
      "Managed incidents in ServiceNow following ITIL.",
      "Highest customer commendations on the team for three consecutive quarters.",
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

// AI agents and automations. Each one names the manual task it replaced
// (`manual`), rendered struck through. `hero` sets the order of the struck
// tasks in the opening list (lower first).
// No case-study modal, so no problem/solution.
// `video` is the base name of public/videos/<name>.mp4 (+ posters/<name>.jpg);
// an item only shows a player if that file exists at build time.
export type Agent = {
  id: string;
  name: string;
  stack?: string[];
  summary: string;
  result?: string;
  manual: string;
  hero?: number;
  video?: string;
};

export const agents: Agent[] = [
  {
    id: "fleet-monitor",
    name: "Live Fleet-Monitoring Agent",
    manual: "Watch a robot's logs through every delivery.",
    hero: 1,
    stack: ["Claude Code", "SSH", "n8n"],
    summary:
      "Watches a robot's live logs during deliveries and flags anomalies with context. Uses a credential-separation design so the agent never holds robot credentials.",
    result: "Approved by engineering for production robots.",
    video: "live-fleet-monitoring-agent",
  },
  {
    id: "case-queue",
    name: "Autonomous Case-Queue Agent",
    manual: "Pick up new cases from the queue.",
    hero: 5,
    stack: ["Anthropic SDK", "Python"],
    summary:
      "Continuous-loop agent on the Anthropic SDK that picks up new support cases on a timer and backs off when the queue is empty.",
    video: "autonomous-case-queue-agent",
  },
  {
    id: "ops-suite",
    name: "Ops Automation Suite",
    manual: "Check the inbox for replies Salesforce missed.",
    hero: 2,
    stack: ["n8n", "Gmail", "Slack", "Salesforce"],
    summary:
      "Detects genuine customer replies that Salesforce missed and routes them to Slack.",
    result:
      "Missed replies reach Slack in real time, plus flags for cases idle 48+ hours or that appear deleted.",
    video: "ops-automation-suite",
  },
  {
    id: "chrome-slack-monitor",
    name: "Claude in Chrome & Slack Monitoring",
    manual: "Open the log dashboard and live map every time a delivery starts.",
    stack: ["Claude in Chrome", "Grafana", "Slack"],
    summary:
      "Monitors production robots through the log dashboard and live map the moment a delivery starts, triggered by a Slack alert.",
    video: "claude-in-chrome-slack-monitoring",
  },
  {
    id: "robocare-skill",
    name: "RoboCare Specialist Skill",
    manual: "Send the hard cases up the chain.",
    stack: ["Claude Skills", "Atlassian Rovo MCP", "Confluence", "Slack MCP"],
    summary:
      "One Claude skill holding our full diagnostic playbook, elevator SOPs and KB authoring via Confluence MCP.",
    result: "Lets frontline specialists handle escalation-level work.",
    video: "robocare-specialist-skill",
  },
  {
    id: "team-dashboard",
    name: "Team Performance Dashboard",
    manual: "Count each agent's cases against the team average by hand.",
    summary:
      "CSV-upload dashboard showing each agent's case count against the team average, mapped to the scorecard's star bands.",
    video: "team-performance-dashboard",
  },
  {
    id: "case-filler",
    name: "Salesforce Case Filler",
    manual: "Fill every categorization field on every case.",
    hero: 3,
    stack: ["Claude Skills", "Claude in Chrome", "Salesforce"],
    summary:
      "Reads each case's subject and comments and fills all categorization fields.",
    result: "Removes a 2–3 minute manual step per case.",
  },
  {
    id: "qa-audit",
    name: "QA Case Audit",
    manual: "Score every case for QA by hand.",
    hero: 4,
    stack: ["Claude Skills", "Python", "ReportLab"],
    summary:
      "Scores each case's categorization against its comments.",
    result: "Every case scored out of 100, with per-agent PDF reports.",
    video: "qa-case-audit-skill",
  },
];

export type ProjectSpan = "wide" | "narrow";

// Projects with problem/solution/impact get the case-study modal; the rest
// show `summary` and an optional external link.
export type Project = {
  id: string;
  name: string;
  tagline?: string;
  span: ProjectSpan;
  summary?: string;
  problem?: string;
  solution?: string;
  stack?: string[];
  impact?: string;
  link?: { href: string; label: string };
  video?: string;
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
    video: "robochat",
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
    video: "reimbursement-portal",
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
    video: "internal-employee-store",
  },
  {
    id: "custom-crm",
    name: "Custom CRM",
    span: "wide",
    summary:
      "Contacts, kanban pipeline, activity timeline, real email via Resend, audit log, and Facebook/Instagram lead capture via Zapier.",
    stack: ["Resend", "Zapier"],
    link: { href: "https://crm-project-pied.vercel.app", label: "View live site" },
    video: "custom-crm",
  },
  {
    id: "content-pipeline",
    name: "Content Pipeline App",
    span: "narrow",
    summary:
      "Built for social media manager clients to manage content production from idea to posted.",
    video: "content-pipeline-app",
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
