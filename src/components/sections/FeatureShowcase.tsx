"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ShortcodeMockup } from "@/components/ui/ShortcodeMockup";
import { VocabularyMockup } from "@/components/ui/VocabularyMockup";
import { PrivacyBoxMockup } from "@/components/ui/PrivacyBoxMockup";

const TABS = [
  {
    id: "shortcodes",
    label: "Shortcodes",
    headline: "Type less with voice shortcodes",
    description:
      "Create custom triggers that expand into full text. Say 'conf' and it types out your full confirmation message. Works globally or per-app.",
  },
  {
    id: "vocabulary",
    label: "Vocabulary",
    headline: "Teach it your words",
    description:
      "Add names, jargon, and custom terms so Whisper recognizes them accurately. Set up auto-corrections for common mistranscriptions, per app.",
  },
  {
    id: "privacy",
    label: "Privacy Boxes",
    headline: "Hide sensitive content on screen",
    description:
      "Draw opaque boxes over API keys, passwords, and tokens before screen sharing or recording. Toggle them on and off with a hotkey.",
  },
];

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("shortcodes");
  const activeTabData = TABS.find((t) => t.id === activeTab)!;

  return (
    <SectionWrapper id="showcase">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          See it in action
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Speakify is more than dictation. Shortcodes, vocabulary training, and privacy tools, all built in.
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium"
                : "bg-zinc-900/50 text-zinc-400 border border-zinc-800/50 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab description */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-zinc-100 mb-2">{activeTabData.headline}</h3>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto">{activeTabData.description}</p>
      </div>

      {/* Mockup display */}
      <div className="max-w-3xl mx-auto">
        {activeTab === "shortcodes" && <ShortcodeMockup />}
        {activeTab === "vocabulary" && <VocabularyMockup />}
        {activeTab === "privacy" && <PrivacyBoxMockup />}
      </div>
    </SectionWrapper>
  );
}
