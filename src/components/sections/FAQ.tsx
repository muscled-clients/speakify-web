"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "How does the free trial work?",
    answer:
      "You get full access to everything for 3 days. A card is required to start, but you won't be charged until day 4. Cancel anytime before then and you pay nothing. Cancellation is self-serve from your account page.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "Email support@speakify.dev within 14 days of your first charge and we refund it in full, no questions asked. Before that, canceling during the trial costs nothing. Charges appear on your card statement as MUSCLED-SPEAKIFY.",
  },
  {
    question: "Why does Speakify cost more than some cloud tools?",
    answer:
      "Because your voice never leaves your Mac. Cloud dictation tools subsidize their price by processing your audio on their servers. For comparison, Wispr Flow charges $12 to $15 per month and processes your audio on their servers. Speakify runs the speech model on your own hardware for a flat $20: no per-word limits, works offline, works in secure environments, and keeps every word you say on your device.",
  },
  {
    question: "Does my voice or text ever leave my Mac?",
    answer:
      "Your audio is transcribed entirely on-device and your transcription history is stored locally. Neither ever touches our servers. The app makes exactly two kinds of network requests: a periodic subscription check (which sends no dictation data), and one-time speech model downloads. The optional AI Cleanup feature, off by default, sends text to Anthropic's API only if you enable it with your own key.",
  },
  {
    question: "How does it work offline?",
    answer:
      "Speakify uses whisper.cpp, a native port of OpenAI's Whisper model, running directly on your Mac with Metal GPU acceleration. The base model ships inside the app, so dictation works the moment you install: on a plane, in a SCIF, anywhere. The app checks your subscription in the background when it can. You can stay fully offline for up to 14 days with no interruption; after that it reminds you to reconnect, and after 30 days offline dictation pauses until it can check in.",
  },
  {
    question: "How accurate is the transcription?",
    answer:
      "The bundled Base model is excellent for everyday English dictation. You can download the larger Small model in Settings for higher accuracy, or the Tiny model for maximum speed. Custom vocabulary lets you teach it names and jargon it would otherwise miss.",
  },
  {
    question: "What happens if I cancel?",
    answer:
      "You keep access until the end of your billing period. After that, dictation pauses until you resubscribe. Your settings, shortcodes, vocabulary, and transcription history stay on your Mac. Nothing is deleted, because none of it was ever on our servers.",
  },
  {
    question: "What Macs are supported?",
    answer:
      "Speakify requires macOS 14 (Sonoma) or later on Apple Silicon (M1 or newer). Intel Macs are not supported. The speech engine relies on Apple Silicon's performance to deliver near-instant transcription.",
  },
  {
    question: "How is this different from Wispr Flow or SuperWhisper?",
    answer:
      "Wispr Flow sends your audio to cloud servers for processing. SuperWhisper offers offline modes but with a different feature set. Speakify is local-first by default and adds tools the others don't have: text shortcodes, per-app custom vocabulary, voice actions like saying 'send it' to press Enter, and privacy boxes for screen redaction.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <SectionWrapper id="faq">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          Frequently asked questions
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Everything you need to know about Speakify.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
            >
              <span className="text-sm font-medium text-zinc-100 pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className={`accordion-content ${openIndex === i ? "open" : ""}`}>
              <div>
                <div className="px-6 pb-4">
                  <p className="text-sm text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
