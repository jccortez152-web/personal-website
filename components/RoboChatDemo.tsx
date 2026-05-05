"use client";

// Two-pane RoboChat demo. Left = customer chat widget (what a hospital nurse
// sees on the page). Right = the Slack channel where the operator (Johannes)
// receives notifications and replies. Click a customer prompt to play the
// round-trip: message → Slack notification → typing indicator → operator
// reply lands in both panes.
//
// This is the actual product — a chat-link-to-Slack-bridge for hospital
// customers, not an LLM bot.

import { useEffect, useRef, useState } from "react";
import { Bell, Hash, RotateCcw, Send, Slack } from "lucide-react";

type CustomerMsg = { role: "customer" | "operator"; text: string };
type SlackEvent =
  | {
      kind: "notification";
      site: string;
      nurse: string;
      preview: string;
    }
  | { kind: "typing" }
  | { kind: "message"; text: string };

const prompts = [
  {
    customer: "Robot stuck at Room 412 — won't move.",
    site: "Mercy General",
    nurse: "RN Linda P.",
    operator:
      "Hi! I see RLY-204 stalled. Can you check if anything's blocking the bumper sensor on the front? I'm pulling its nav logs from my side now.",
  },
  {
    customer: "Tray door won't open after delivery.",
    site: "St. John's Memorial",
    nurse: "RN Marcus T.",
    operator:
      "On it. The latch sometimes sticks after a hard charge — can you press the manual release on the side panel for 3 seconds? I'll send a remote unlock at the same time.",
  },
  {
    customer: "Battery's red. Robot won't return to dock on its own.",
    site: "Sacred Heart Medical",
    nurse: "RN Priya S.",
    operator:
      "Got it. I'll trigger return-to-dock from my side. If it doesn't move in 90s, the motor controller may need a quick reset — I'll walk you through it.",
  },
];

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function RoboChatDemo() {
  const [customerMsgs, setCustomerMsgs] = useState<CustomerMsg[]>([]);
  const [slackEvents, setSlackEvents] = useState<SlackEvent[]>([]);
  const [busy, setBusy] = useState(false);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());

  const customerScrollRef = useRef<HTMLDivElement>(null);
  const slackScrollRef = useRef<HTMLDivElement>(null);

  // Keep both panes scrolled to the latest line
  useEffect(() => {
    if (customerScrollRef.current) {
      customerScrollRef.current.scrollTop =
        customerScrollRef.current.scrollHeight;
    }
  }, [customerMsgs]);
  useEffect(() => {
    if (slackScrollRef.current) {
      slackScrollRef.current.scrollTop = slackScrollRef.current.scrollHeight;
    }
  }, [slackEvents]);

  const ask = async (idx: number) => {
    if (busy) return;
    setBusy(true);
    const p = prompts[idx];
    setUsedIndices((s) => new Set(s).add(idx));

    // 1. Customer message lands in the widget
    setCustomerMsgs((m) => [...m, { role: "customer", text: p.customer }]);
    await wait(600);

    // 2. Slack notification arrives in the operator channel
    setSlackEvents((e) => [
      ...e,
      {
        kind: "notification",
        site: p.site,
        nurse: p.nurse,
        preview: p.customer,
      },
    ]);
    await wait(1400);

    // 3. Operator typing
    setSlackEvents((e) => [...e, { kind: "typing" }]);
    await wait(1800);

    // 4. Operator message replaces the typing indicator in Slack
    setSlackEvents((e) => {
      const filtered = e.filter((ev) => ev.kind !== "typing");
      return [...filtered, { kind: "message", text: p.operator }];
    });
    await wait(800);

    // 5. Same operator response shows in the customer chat
    setCustomerMsgs((m) => [...m, { role: "operator", text: p.operator }]);

    setBusy(false);
  };

  const reset = () => {
    if (busy) return;
    setCustomerMsgs([]);
    setSlackEvents([]);
    setUsedIndices(new Set());
  };

  const empty = customerMsgs.length === 0 && slackEvents.length === 0;

  return (
    <section
      id="demo"
      className="px-6 py-32 md:py-40 border-t border-ink-800/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500 flex items-center gap-3 mb-6">
          <span>§ 05</span>
          <span className="h-px w-8 bg-ink-700" />
          <span>live demo</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          <div className="lg:col-span-7">
            <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight leading-[1.05] text-ink-100">
              Talk to RoboChat.
              <br />
              <span className="italic text-ink-400">
                Two sides of the same chat.
              </span>
            </h2>
            <p className="mt-6 text-ink-300 max-w-xl text-lg leading-relaxed">
              When a hospital nurse hits a wall with a robot, they open the
              chat link. I see it land in Slack and reply from there. They
              see my response appear in the bubble. No phone call, no
              install, no account.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
              built with{" "}
              <span className="text-ink-300">Slack Bolt</span> ·{" "}
              <span className="text-ink-300">Supabase</span> ·{" "}
              <span className="text-ink-300">SSE</span> ·{" "}
              <span className="text-ink-300">Next.js</span>
            </p>
          </div>
        </div>

        {/* Two-pane demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomerPane
            msgs={customerMsgs}
            scrollRef={customerScrollRef}
          />
          <SlackPane events={slackEvents} scrollRef={slackScrollRef} />
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500">
            Try a customer message →
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {prompts.map((p, idx) => {
              const used = usedIndices.has(idx);
              return (
                <button
                  key={p.customer}
                  onClick={() => ask(idx)}
                  disabled={busy || used}
                  className={`text-left text-sm px-3 py-2 border rounded-sm transition-colors disabled:cursor-not-allowed ${
                    used
                      ? "text-ink-500 border-ink-800 line-through"
                      : "text-ink-200 border-ink-800 hover:border-cyan-bright/40 hover:text-ink-100 disabled:opacity-40"
                  }`}
                >
                  {p.customer}
                </button>
              );
            })}
            <button
              onClick={reset}
              disabled={busy || empty}
              className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400 hover:text-ink-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw className="w-3 h-3" strokeWidth={1.5} />
              reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CustomerPane({
  msgs,
  scrollRef,
}: {
  msgs: CustomerMsg[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900 overflow-hidden flex flex-col h-[440px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.04)]">
      {/* Header */}
      <div className="px-5 py-3 border-b border-ink-800 flex items-center justify-between bg-ink-900">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-cyan-bright/10 border border-cyan-bright/30 flex items-center justify-center text-[10px] font-mono uppercase tracking-wider text-cyan-bright">
            RC
          </span>
          <div>
            <div className="text-ink-100 font-medium text-sm">RoboCare</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              an operator is here · usually replies in minutes
            </div>
          </div>
        </div>
        <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.25em] text-ink-500">
          customer view
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-6 space-y-3 scroll-smooth"
      >
        {msgs.length === 0 && (
          <div className="text-ink-500 text-sm text-center py-12 italic font-display">
            ↓ pick a sample message below to start a chat
          </div>
        )}
        {msgs.map((m, i) => (
          <CustomerBubble key={i} role={m.role} text={m.text} />
        ))}
      </div>

      {/* Input (visual only) */}
      <div className="border-t border-ink-800 px-5 py-3 flex items-center gap-3 bg-ink-950/60">
        <input
          disabled
          placeholder="type a message…"
          className="flex-1 bg-transparent text-sm text-ink-300 placeholder-ink-600 outline-none cursor-not-allowed"
        />
        <button
          disabled
          className="text-ink-600 cursor-not-allowed"
          aria-label="send"
        >
          <Send className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function CustomerBubble({
  role,
  text,
}: {
  role: "customer" | "operator";
  text: string;
}) {
  if (role === "customer") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-cyan-bright text-ink-950 px-4 py-2.5 rounded-2xl rounded-br-sm text-sm font-medium leading-relaxed">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start gap-2">
      <span className="w-7 h-7 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center text-[10px] font-mono text-ink-200 shrink-0 mt-1">
        JC
      </span>
      <div className="max-w-[85%] bg-ink-800 text-ink-100 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function SlackPane({
  events,
  scrollRef,
}: {
  events: SlackEvent[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="rounded-2xl border border-ink-800 bg-ink-900 overflow-hidden flex flex-col h-[440px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.04)]">
      {/* Slack-style header */}
      <div className="px-5 py-3 border-b border-ink-800 flex items-center justify-between bg-ink-950">
        <div className="flex items-center gap-2">
          <Slack className="w-4 h-4 text-cyan-bright" strokeWidth={1.5} />
          <div className="flex items-center text-ink-100 font-medium text-sm">
            <Hash
              className="w-3.5 h-3.5 inline-block opacity-50 mr-0.5"
              strokeWidth={1.5}
            />
            robocare-customer-chat
          </div>
        </div>
        <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.25em] text-ink-500">
          operator view
        </span>
      </div>

      {/* Channel timeline */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scroll-smooth"
      >
        {events.length === 0 && (
          <div className="text-ink-500 text-sm text-center py-12 italic font-display">
            channel is quiet · waiting for incoming chats
          </div>
        )}
        {events.map((e, i) => {
          if (e.kind === "notification") {
            return (
              <div
                key={i}
                className="border-l-2 border-cyan-bright pl-3 py-1.5"
              >
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-bright mb-1">
                  <Bell className="w-3 h-3" strokeWidth={1.5} />
                  new chat from {e.site}
                </div>
                <div className="text-xs text-ink-400 leading-relaxed">
                  <span className="text-ink-300">{e.nurse}:</span> "
                  {e.preview}"
                </div>
              </div>
            );
          }
          if (e.kind === "typing") {
            return (
              <div key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-md bg-ink-800 border border-ink-700 flex items-center justify-center text-[10px] font-mono text-ink-200 shrink-0">
                  JC
                </span>
                <div className="bg-ink-800 px-3 py-2.5 rounded-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright/70 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright/70 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-bright/70 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            );
          }
          // Operator message
          return (
            <div key={i} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-md bg-ink-800 border border-ink-700 flex items-center justify-center text-[10px] font-mono text-ink-200 shrink-0 mt-0.5">
                JC
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-ink-100 font-medium text-sm">
                    Johannes Cortez
                  </span>
                  <span className="font-mono text-[10px] text-ink-500">
                    just now
                  </span>
                </div>
                <div className="text-ink-200 text-sm leading-relaxed mt-0.5">
                  {e.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slack compose footer (visual only) */}
      <div className="border-t border-ink-800 px-3 py-2 bg-ink-950/60">
        <div className="border border-ink-800 rounded-md px-3 py-2 text-xs text-ink-600">
          message #robocare-customer-chat
        </div>
      </div>
    </div>
  );
}
