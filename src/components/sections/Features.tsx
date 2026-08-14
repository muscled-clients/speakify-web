import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Keyboard, ClipboardPaste, BookType, EyeOff, History, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: Keyboard,
    title: "Global Hotkey",
    description:
      "Press Ctrl+Space from any app and watch your words land in a live editor. Fix anything with a click, recall past dictations with Ctrl+Up, paste when ready.",
  },
  {
    icon: ClipboardPaste,
    title: "Auto-Paste",
    description:
      "Transcribed text automatically appears wherever your cursor is: emails, docs, Slack, anywhere.",
  },
  {
    icon: BookType,
    title: "Vocabulary & Shortcodes",
    description:
      "Teach Speakify your terminology. Expand shortcodes like 'addr' into your full address automatically.",
  },
  {
    icon: EyeOff,
    title: "Privacy Boxes",
    description:
      "Obscure sensitive areas of your screen during recordings. Your private data stays invisible.",
  },
  {
    icon: History,
    title: "Transcription History",
    description:
      "Access your recent transcriptions with arrow-key recall. Copy, edit, and reuse past dictations.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Powered by whisper.cpp models supporting multiple languages with automatic detection.",
  },
];

export function Features() {
  return (
    <SectionWrapper id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          Everything you need, nothing you don&apos;t
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Built for speed and simplicity. Every feature works offline, on device, with zero setup.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="group bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 hover:border-blue-500/30 hover:bg-zinc-900/80 transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-zinc-800 border border-zinc-700/50 rounded-xl flex items-center justify-center mb-4 group-hover:border-blue-500/30 transition-colors duration-200">
              <feature.icon className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">{feature.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
