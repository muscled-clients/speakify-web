"use client";

import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Zap, Lock, SlidersHorizontal } from "lucide-react";

const SHORTCUTS = [
  { code: "#mus", expansion: "muscledagency@gmail.com", label: "Work email" },
  { code: "#mikegmail", expansion: "mikeshopifyagency@gmail.com", label: "Client email" },
  { code: "#addr", expansion: "2200 Lakeshore Blvd W, Toronto, ON", label: "Address" },
  { code: "#cal", expansion: "calendly.com/muscled/intro-call", label: "Booking link" },
  { code: "#sig", expansion: "Best, Mahtab | Muscled Inc.", label: "Signature" },
  { code: "#eta", expansion: "Running 10 minutes late, be right there.", label: "Running late" },
  { code: "#inv", expansion: "Invoice attached. Net 15, e-transfer or card.", label: "Invoice terms" },
  { code: "#gh", expansion: "github.com/muscled-clients", label: "GitHub" },
  {
    code: "#standup",
    expansion: "Yesterday: shipped. Today: shipping. Blockers: none.",
    label: "Standup note",
  },
  { code: "#thx", expansion: "Thanks for your time, talk soon.", label: "Sign off" },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "Expands as you go",
    description:
      "Type the shortcode or say it while dictating. Hit space and the full text lands in place.",
  },
  {
    icon: SlidersHorizontal,
    title: "You define them",
    description:
      "Add, edit, and remove shortcodes in Settings. Use any trigger you can remember.",
  },
  {
    icon: Lock,
    title: "Stored on your Mac",
    description:
      "Your shortcodes stay local. Nothing is uploaded, nothing is synced to a server.",
  },
];

type Phase = "typing" | "space" | "expanded" | "clearing";

const TYPE_MS = 85;
const SPACE_MS = 320;
const HOLD_MS = 2100;
const CLEAR_MS = 420;

export function Shortcuts() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [reducedMotion, setReducedMotion] = useState(false);

  // A single mutable ref drives the loop so each timeout schedules exactly one successor.
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const current = SHORTCUTS[index];
    const clear = () => {
      if (timer.current) clearTimeout(timer.current);
    };

    if (phase === "typing") {
      if (typed.length < current.code.length) {
        timer.current = setTimeout(
          () => setTyped(current.code.slice(0, typed.length + 1)),
          TYPE_MS
        );
      } else {
        timer.current = setTimeout(() => setPhase("space"), SPACE_MS);
      }
    } else if (phase === "space") {
      timer.current = setTimeout(() => setPhase("expanded"), SPACE_MS);
    } else if (phase === "expanded") {
      timer.current = setTimeout(() => setPhase("clearing"), HOLD_MS);
    } else {
      timer.current = setTimeout(() => {
        setTyped("");
        setPhase("typing");
        setIndex((i) => (i + 1) % SHORTCUTS.length);
      }, CLEAR_MS);
    }

    return clear;
  }, [phase, typed, index, reducedMotion]);

  const current = SHORTCUTS[index];
  const showExpansion = reducedMotion || phase === "expanded" || phase === "clearing";
  const fading = phase === "clearing";

  return (
    <SectionWrapper id="shortcuts">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800/50 rounded-full px-4 py-1.5 mb-6">
          <Zap className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-sm text-zinc-400">Text shortcuts</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          Stop typing the same things over and over
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Your email, your address, your booking link, your standup update. Set a short trigger once
          and it expands into the full text every time.
        </p>
      </div>

      {/* Animated demo */}
      <div className="relative max-w-3xl mx-auto mb-14">
        <div className="bg-zinc-900/80 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
          {/* Title bar */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-zinc-800/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-zinc-500">New Message</span>
            <span className="ml-auto text-[11px] text-zinc-600 font-mono">{current.label}</span>
          </div>

          {/* Compose line */}
          <div
            className="px-6 md:px-8 py-8 flex items-center"
            style={{ minHeight: "120px" }}
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-base sm:text-lg md:text-2xl font-mono leading-relaxed break-all">
              {showExpansion ? (
                <span
                  key={`expansion-${index}`}
                  className={`text-zinc-100 ${
                    reducedMotion ? "" : fading ? "sc-fade-out" : "sc-snap-in"
                  }`}
                >
                  {current.expansion}
                </span>
              ) : (
                <span className="text-blue-400">{typed}</span>
              )}
              {!reducedMotion && !showExpansion && (
                <span className="sc-caret inline-block w-[2px] md:w-[3px] h-[1.1em] bg-blue-500 align-middle ml-0.5" />
              )}
            </p>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-800/50 bg-zinc-950/40">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <code className="font-mono text-blue-400">{current.code}</code>
              <span className="hidden sm:inline text-zinc-700">expands to</span>
              <span className="hidden sm:inline text-zinc-400 truncate max-w-[180px] md:max-w-xs">
                {current.expansion}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
              <kbd
                className={`px-2 py-0.5 border rounded font-mono text-[11px] transition-colors duration-150 ${
                  phase === "space" && !reducedMotion
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : "bg-zinc-800 border-zinc-700 text-zinc-400"
                }`}
              >
                space
              </kbd>
              <span>to expand</span>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
      </div>

      {/* Example grid */}
      <div className="grid sm:grid-cols-2 gap-3 mb-14">
        {SHORTCUTS.map((item, i) => (
          <div
            key={item.code}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors duration-300 ${
              i === index && !reducedMotion
                ? "bg-zinc-900 border-blue-500/30"
                : "bg-zinc-900/50 border-zinc-800/50"
            }`}
          >
            <code
              className={`text-sm font-mono shrink-0 transition-colors duration-300 ${
                i === index && !reducedMotion ? "text-blue-400" : "text-zinc-400"
              }`}
            >
              {item.code}
            </code>
            <span className="text-zinc-700 text-xs shrink-0">→</span>
            <span className="text-sm text-zinc-400 truncate">{item.expansion}</span>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
        {BENEFITS.map((benefit) => (
          <div
            key={benefit.title}
            className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6"
          >
            <div className="w-10 h-10 bg-zinc-800 border border-zinc-700/50 rounded-xl flex items-center justify-center mb-4">
              <benefit.icon className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">{benefit.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
