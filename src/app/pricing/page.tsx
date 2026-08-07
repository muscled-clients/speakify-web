import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const FEATURES = [
  "On-device speech-to-text that never sends your voice off your Mac",
  "Works fully offline (flights, secure environments)",
  "Global hotkey to dictate into any app",
  "Custom vocabulary and corrections",
  "Text shortcodes that expand as you type",
  "Voice actions, like saying “send it” to press Enter",
  "Privacy boxes for screen redaction",
  "Local transcription history",
  ];

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
            One plan. Everything included.
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Try everything free for 7 days. Cancel anytime from your account page, no emails and no hoops.
          </p>
        </div>

        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative bg-zinc-900/80 border border-zinc-800/50 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="text-5xl font-bold text-zinc-100">$20</span>
              <span className="text-lg text-zinc-500">/month</span>
            </div>
            <p className="text-sm text-zinc-500 text-center mb-8">after a 7-day free trial</p>

            <ul className="space-y-3 mb-8 text-left">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-zinc-300 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            <Button href="/start?plan=trial" variant="primary" size="lg" className="w-full">
              Start 7-Day Free Trial
            </Button>
            <p className="text-center mt-3">
              <a href="/start?plan=now" className="text-sm text-blue-400 hover:underline">
                Convinced already? Skip the trial and subscribe now
              </a>
            </p>
            <p className="text-xs text-zinc-600 text-center mt-4">
              Card required to start. You won&apos;t be charged until day 8, and there is a 14-day money-back guarantee after your first charge. Licensed for your personal Macs.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
