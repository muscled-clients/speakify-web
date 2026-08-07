import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Download as DownloadIcon, KeyRound, Mic } from "lucide-react";

const STEPS = [
  {
    icon: DownloadIcon,
    title: "Download & install",
    text: "Grab the DMG and drag Speakify into Applications.",
  },
  {
    icon: KeyRound,
    title: "Sign in with Google",
    text: "Launch Speakify and sign in to start your 7-day free trial.",
  },
  {
    icon: Mic,
    title: "Press Ctrl+Space",
    text: "Dictate into any app. Your voice never leaves your Mac.",
  },
];

export default function Download() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
            Download Speakify
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
            macOS 14 or later on Apple Silicon. About 140MB — the speech model is built in.
          </p>

          <div className="flex flex-col items-center gap-4 mb-20">
            <Button href="/downloads/Speakify.dmg" variant="primary" size="lg">
              <DownloadIcon className="w-5 h-5" />
              Download for Mac
            </Button>
            <p className="text-xs text-zinc-600">
              Free for 7 days, then $20/month. Notarized by Apple.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STEPS.map((step, i) => (
              <div key={step.title} className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-zinc-800 border border-zinc-700/50 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-xs font-medium text-zinc-600 mb-2">STEP {i + 1}</p>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
