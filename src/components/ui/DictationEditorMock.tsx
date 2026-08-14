"use client";

import { useEffect, useRef, useState } from "react";

// Sentences stream in chunk-by-chunk, the way Speakify's live transcription
// lands text at natural speech pauses.
const SENTENCES: string[][] = [
  ["Create a new marketing landing page", "for my SaaS application", "and keep the hero copy short."],
  ["Hey Sarah, the contract looks good.", "One change: net 15 instead of net 30.", "Send it back when you can."],
  ["Fix the login bug first,", "then ship the billing page", "and update the changelog."],
];

const CHUNK_MS = 1050;
const HOLD_MS = 2600;
const CLEAR_MS = 500;

export function DictationEditorMock() {
  const [sentence, setSentence] = useState(0);
  const [chunks, setChunks] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const parts = SENTENCES[sentence];
    if (chunks < parts.length) {
      timer.current = setTimeout(() => setChunks((c) => c + 1), CHUNK_MS);
    } else if (!fading) {
      timer.current = setTimeout(() => setFading(true), HOLD_MS);
    } else {
      timer.current = setTimeout(() => {
        setFading(false);
        setChunks(0);
        setSentence((s) => (s + 1) % SENTENCES.length);
      }, CLEAR_MS);
    }
    return () => clearTimeout(timer.current);
  }, [sentence, chunks, fading]);

  const visible = SENTENCES[sentence].slice(0, chunks);

  return (
    <div className="relative max-w-2xl mx-auto text-left">
      <div className="bg-zinc-900/70 border border-zinc-700/60 rounded-3xl backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(59,130,246,0.25)]">
        {/* Header: status dot, waveform, brand */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-2.5 w-28">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <span className="text-sm font-semibold text-zinc-100">Dictating</span>
          </div>
          <div className="flex items-center gap-[3px]" aria-hidden="true">
            {Array.from({ length: 34 }).map((_, i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-sky-400/80 animate-pulse"
                style={{
                  animationDelay: `${(i % 8) * 0.12}s`,
                  opacity: 0.35 + 0.5 * Math.sin((i / 34) * Math.PI),
                }}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-zinc-500 w-28 text-right">Speakify</span>
        </div>

        {/* Live transcript */}
        <div className="px-7 py-6 min-h-[120px]">
          <p
            className={`text-xl md:text-2xl font-medium text-zinc-100 leading-relaxed transition-opacity duration-500 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {visible.map((chunk, i) => (
              <span key={`${sentence}-${i}`} className="dm-chunk">
                {chunk}
                {i < visible.length - 1 ? " " : ""}
              </span>
            ))}
            <span className="inline-block w-[3px] h-[1.15em] bg-sky-400 align-middle ml-1 dm-caret" />
          </p>
          {visible.length === 0 && !fading && (
            <p className="text-xl text-zinc-600 font-medium -mt-9">start speaking...</p>
          )}
        </div>

        {/* Hint bar */}
        <div className="flex items-center gap-4 px-6 py-3.5 border-t border-zinc-800/60 bg-zinc-950/40 text-[11px] text-zinc-500 overflow-x-auto whitespace-nowrap">
          <Hint k="^space" label="paste" />
          <Hint k="esc" label="discard" />
          <Hint k="⌃↑↓" label="past dictations" />
          <Hint k="click / ⌥←→" label="move · speech inserts at cursor" />
        </div>
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
    </div>
  );
}

function Hint({ k, label }: { k: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 font-mono text-[10px] text-zinc-400">
        {k}
      </kbd>
      <span>{label}</span>
    </span>
  );
}
