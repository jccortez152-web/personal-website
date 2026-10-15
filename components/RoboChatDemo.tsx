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
    <div>
      {/* Two-pane demo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerPane msgs={customerMsgs} scrollRef={customerScrollRef} />
        <SlackPane events={slackEvents} scrollRef={slackScrollRef} />
      </div>

      {/* Controls */}
      <div className="mt-6">
        <p className="font-bold">Try a customer message</p>
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          {prompts.map((p, idx) => {
            const used = usedIndices.has(idx);
            return (
              <button
                type="button"
                key={p.customer}
                onClick={() => ask(idx)}
                disabled={busy || used}
                className={`text-left text-[16px] min-h-11 px-4 py-2 rounded-md border-2 transition-colors duration-150 disabled:cursor-not-allowed ${
                  used
                    ? "border-rule text-graphite line-through"
                    : "border-rule bg-card text-ink hover:border-navy disabled:opacity-50"
                }`}
              >
                {p.customer}
              </button>
            );
          })}
          <button
            type="button"
            onClick={reset}
            disabled={busy || empty}
            className="link ml-auto inline-flex items-center gap-2 min-h-11 px-2 font-bold text-ink disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2} aria-hidden />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// Customer view — the light chat widget a nurse opens from a link.
function CustomerPane({
  msgs,
  scrollRef,
}: {
  msgs: CustomerMsg[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="rounded-lg bg-card text-ink border border-rule overflow-hidden flex flex-col h-[440px]">
      <div className="px-5 py-3 border-b border-rule flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="w-9 h-9 rounded-full bg-navy-deep text-white flex items-center justify-center text-[13px] font-bold"
          >
            RC
          </span>
          <div>
            <div className="font-bold text-[16px]">RoboCare</div>
            <div className="text-[14px] text-graphite">An operator is here and usually replies in minutes</div>
          </div>
        </div>
        <span className="hidden sm:inline text-[14px] text-graphite">Customer view</span>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-label="Customer chat"
        tabIndex={0}
        className="flex-1 overflow-y-auto px-5 py-6 space-y-3 scroll-smooth bg-paper"
      >
        {msgs.length === 0 && (
          <p className="text-graphite text-[15px] text-center py-12">
            Pick a sample message below to start a chat.
          </p>
        )}
        {msgs.map((m, i) => (
          <CustomerBubble key={i} role={m.role} text={m.text} />
        ))}
      </div>

      {/* Input (visual only) */}
      <div className="border-t border-rule px-5 py-2 flex items-center gap-3">
        <input
          disabled
          aria-label="Message (disabled in demo)"
          placeholder="Type a message…"
          className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-graphite outline-none cursor-not-allowed"
        />
        <button
          type="button"
          disabled
          className="w-11 h-11 inline-flex items-center justify-center text-graphite cursor-not-allowed"
          aria-label="Send (disabled in demo)"
        >
          <Send className="w-4 h-4" strokeWidth={2} aria-hidden />
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
        <div className="max-w-[85%] bg-ink text-paper px-4 py-2.5 rounded-2xl rounded-br-sm text-[15px] leading-relaxed">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start gap-2">
      <span
        aria-hidden
        className="w-7 h-7 rounded-full bg-navy-deep text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-1"
      >
        JC
      </span>
      <div className="max-w-[85%] bg-card border border-rule px-4 py-2.5 rounded-2xl rounded-bl-sm text-[15px] leading-relaxed">
        {text}
      </div>
    </div>
  );
}

// Operator view — the Slack channel, on a dark panel like the real app.
function SlackPane({
  events,
  scrollRef,
}: {
  events: SlackEvent[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="rounded-lg bg-panel text-panel-fg overflow-hidden flex flex-col h-[440px]">
      <div className="px-5 py-3 border-b border-panel-fg/15 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-[16px]">
          <Slack className="w-4 h-4" strokeWidth={2} aria-hidden />
          <Hash className="w-4 h-4 text-panel-fg-2" strokeWidth={2} aria-hidden />
          robocare-customer-chat
        </div>
        <span className="hidden sm:inline text-[14px] text-panel-fg-2">Operator view</span>
      </div>

      <div
        ref={scrollRef}
        aria-label="Operator Slack channel"
        tabIndex={0}
        className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scroll-smooth text-[15px]"
      >
        {events.length === 0 && (
          <p className="text-panel-fg-2 text-center py-12">
            The channel is quiet, waiting for incoming chats.
          </p>
        )}
        {events.map((e, i) => {
          if (e.kind === "notification") {
            return (
              <div key={i} className="border-l-4 border-ceil pl-3 py-1">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Bell className="w-4 h-4" strokeWidth={2} aria-hidden />
                  New chat from {e.site}
                </div>
                <div className="text-panel-fg-2 leading-relaxed">
                  <span className="text-panel-fg">{e.nurse}:</span> &ldquo;
                  {e.preview}&rdquo;
                </div>
              </div>
            );
          }
          if (e.kind === "typing") {
            return (
              <div key={i} className="flex items-center gap-3 text-panel-fg-2">
                <span
                  aria-hidden
                  className="w-7 h-7 rounded-md bg-navy-deep text-white flex items-center justify-center text-[12px] font-bold shrink-0"
                >
                  JC
                </span>
                Johannes is typing…
              </div>
            );
          }
          return (
            <div key={i} className="flex items-start gap-3">
              <span
                aria-hidden
                className="w-7 h-7 rounded-md bg-navy-deep text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5"
              >
                JC
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold">Johannes Cortez</span>
                  <span className="text-panel-fg-2 text-[13px]">just now</span>
                </div>
                <div className="text-panel-fg leading-relaxed mt-1">{e.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-panel-fg/15 px-3 py-2">
        <div className="border border-panel-fg/25 rounded-md px-3 py-2 text-[14px] text-panel-fg-2">
          Message #robocare-customer-chat
        </div>
      </div>
    </div>
  );
}
