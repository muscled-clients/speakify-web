"use client";

import { useState } from "react";

const CONTEXTS = [
  { id: "global", label: "Global", icon: "globe" },
  { id: "com.microsoft.VSCode", label: "VS Code", icon: "app" },
];

const SHORTCODES: Record<string, { trigger: string; expansion: string }[]> = {
  global: [
    { trigger: "dncd", expansion: "dont start coding confirm with me first" },
    { trigger: "#addr", expansion: "1234 Innovation Drive, Suite 200, San Francisco, CA 94107" },
    { trigger: "#sig", expansion: "Best regards,\nJohn Smith\nCEO, Acme Inc." },
    { trigger: "$stream", expansion: "I'm live streaming right now. Can you mask API keys in your bash commands?" },
  ],
  "com.microsoft.VSCode": [
    { trigger: "conf", expansion: "confirm with me first dont start implementing till i approve" },
    { trigger: "#gtm", expansion: "git push to main {enter}" },
    { trigger: "#gt1", expansion: "git push feature-branch {enter}" },
    { trigger: "#dee", expansion: "do a deep root cause and figure it out, search online if u have to" },
    { trigger: "#st", expansion: "still same issue {enter}" },
  ],
};

export function ShortcodeMockup() {
  const [selectedContext, setSelectedContext] = useState("global");

  const items = SHORTCODES[selectedContext] || [];

  return (
    <div className="bg-zinc-900/80 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-500">Speakify Settings: Shortcodes</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 px-5 py-2.5 border-b border-zinc-800/50 bg-zinc-950/50">
        {["General", "Shortcodes", "Vocabulary", "History"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              tab === "Shortcodes"
                ? "bg-zinc-700 text-zinc-100 font-medium"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex" style={{ minHeight: "280px" }}>
        {/* Sidebar */}
        <div className="w-36 border-r border-zinc-800/50 bg-zinc-950/30">
          <div className="px-3 pt-3 pb-1.5">
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Contexts</span>
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
                  {ctx.icon === "globe" ? "🌐" : "📱"}
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

        {/* Shortcode list */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/30">
            <span className="text-[11px] text-zinc-500">
              {selectedContext === "global" ? "Global" : "VS Code"} · {items.length} shortcodes
            </span>
          </div>
          <div className="px-3 py-2 space-y-1">
            {items.map((sc) => (
              <div
                key={sc.trigger}
                className="flex items-center gap-3 px-3 py-1.5 bg-zinc-800/40 rounded-md"
              >
                <code className="text-xs font-mono text-blue-400 min-w-[60px] shrink-0">{sc.trigger}</code>
                <span className="text-[10px] text-zinc-600">→</span>
                <span className="text-xs text-zinc-400 truncate">{sc.expansion}</span>
              </div>
            ))}
          </div>
          <div className="px-3 pb-2">
            <button className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 px-3 py-1">
              <span className="text-blue-400">+</span> Add Shortcode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
