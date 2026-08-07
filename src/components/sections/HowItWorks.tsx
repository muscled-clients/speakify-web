import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Mic, Cpu, ClipboardPaste } from "lucide-react";

const STEPS = [
  {
    number: "1",
    icon: Mic,
    title: "Press & Speak",
    description:
      "Hit Ctrl+Space and talk naturally. Speakify starts recording instantly from any app.",
  },
  {
    number: "2",
    icon: Cpu,
    title: "On-Device Processing",
    description:
      "whisper.cpp transcribes your audio using Metal GPU acceleration. Nothing leaves your Mac.",
  },
  {
    number: "3",
    icon: ClipboardPaste,
    title: "Text Appears",
    description:
      "Clean, corrected text is auto-pasted exactly where your cursor was. That's it.",
  },
];

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          Three steps. Zero friction.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          No accounts to create. No APIs to configure. Just install and start talking.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {STEPS.map((step) => (
          <div key={step.number} className="relative text-center">
            <div className="w-14 h-14 bg-zinc-900 border border-zinc-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
              <step.icon className="w-6 h-6 text-blue-500" />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full text-xs font-bold text-white flex items-center justify-center">
                {step.number}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">{step.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
