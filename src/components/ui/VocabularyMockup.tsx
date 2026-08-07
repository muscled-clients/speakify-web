"use client";

import { useState } from "react";

const CONTEXTS = [
  { id: "global", label: "Global", icon: "globe" },
  { id: "org.mozilla.firefox", label: "Firefox", icon: "app" },
];

const VOCABULARY: Record<string, string[]> = {
  global: ["Mahtab", "Waleed", "Tayyab", "Munaza", "Awais", "Hasan", "Unpuzzle", "Backblaze", "Speakify"],
  "org.mozilla.firefox": [],
};

const CORRECTIONS: Record<string, { wrong: string; right: string }[]> = {
  global: [],
  "org.mozilla.firefox": [
    { wrong: "you tube", right: "youtube" },
    { wrong: "git push", right: "gitpush" },
  ],
};

export function VocabularyMockup() {
  const [selectedContext, setSelectedContext] = useState("global");

  const words = VOCABULARY[selectedContext] || [];
  const corrections = CORRECTIONS[selectedContext] || [];

  return (
    <div className="bg-zinc-900/80 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-500">Speakify Settings: Vocabulary</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 px-5 py-2.5 border-b border-zinc-800/50 bg-zinc-950/50">
        {["General", "Shortcodes", "Vocabulary", "History"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              tab === "Vocabulary"
                ? "bg-zinc-700 text-zinc-100 font-medium"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex" style={{ minHeight: "320px" }}>
        {/* Sidebar */}
        <div className="w-36 border-r border-zinc-800/50 bg-zinc-950/30">
          <div className="px-3 pt-3 pb-1.5">
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">App Profiles</span>
          </div>
          <div className="px-1.5 space-y-0.5">
            {CONTEXTS.map((ctx) => (
              <button
                key={ctx.id}
                onClick={() => setSelectedContext(ctx.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors text-xs ${
                  selectedContext === ctx.id
                    ? "bg-blue-500/20 text-zinc-100"
                    : "text-zinc-400 hover:bg-zinc-800/50"
                }`}
              >
                <span className={`text-[10px] ${ctx.icon === "globe" ? "text-blue-400" : "text-purple-400"}`}>
                  {ctx.icon === "globe" ? "🌐" : "🦊"}
                </span>
                {ctx.label}
              </button>
            ))}
          </div>
          <div className="px-1.5 pt-2">
            <button className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <span className="text-blue-400">+</span> Add App
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/30">
            <span className="text-[11px] text-zinc-500">
              {selectedContext === "global" ? "Global" : "Firefox"} · {words.length} words, {corrections.length} corrections
            </span>
          </div>

          <div className="px-4 py-3 space-y-4 overflow-y-auto" style={{ maxHeight: "260px" }}>
            {/* Vocabulary Words */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-200 mb-1">Vocabulary Words</h4>
              <p className="text-[10px] text-zinc-500 mb-2">Passed to Whisper to improve recognition accuracy.</p>

              {/* Input */}
              <div className="flex gap-2 mb-2">
                <div className="flex-1 bg-zinc-800/60 border border-zinc-700/50 rounded-md px-2.5 py-1 text-xs text-zinc-500">
                  Add words (comma-separated)...
                </div>
                <button className="px-2.5 py-1 bg-zinc-800 border border-zinc-700/50 rounded-md text-xs text-zinc-500">
                  Add
                </button>
              </div>

              {/* Word tags */}
              {words.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {words.map((word) => (
                    <span
                      key={word}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-800/60 border border-zinc-700/30 rounded text-xs text-zinc-300"
                    >
                      {word}
                      <span className="text-zinc-600 hover:text-red-400 cursor-pointer text-[10px]">×</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-zinc-600 italic">Words you add will be suggested to Whisper during transcription.</p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-800/50" />

            {/* Auto-Corrections */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-200 mb-1">Auto-Corrections</h4>
              <p className="text-[10px] text-zinc-500 mb-2">Whisper mis-transcriptions are automatically replaced.</p>

              {/* Input */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 bg-zinc-800/60 border border-zinc-700/50 rounded-md px-2.5 py-1 text-xs text-zinc-500">
                  Wrong word
                </div>
                <span className="text-[10px] text-zinc-600">→</span>
                <div className="flex-1 bg-zinc-800/60 border border-zinc-700/50 rounded-md px-2.5 py-1 text-xs text-zinc-500">
                  Correct word
                </div>
                <button className="px-2.5 py-1 bg-zinc-800 border border-zinc-700/50 rounded-md text-xs text-zinc-500">
                  Add
                </button>
              </div>

              {/* Correction list */}
              {corrections.length > 0 ? (
                <div className="space-y-1">
                  {corrections.map((c) => (
                    <div key={c.wrong} className="flex items-center gap-2 px-3 py-1 bg-zinc-800/40 rounded-md">
                      <span className="text-xs text-red-400/80 font-mono">{c.wrong}</span>
                      <span className="text-[10px] text-zinc-600">→</span>
                      <span className="text-xs text-green-400/80 font-mono">{c.right}</span>
                      <span className="ml-auto text-zinc-600 hover:text-red-400 cursor-pointer text-[10px]">🗑</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-zinc-600 italic">Corrections will be auto-learned as you edit transcriptions.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
