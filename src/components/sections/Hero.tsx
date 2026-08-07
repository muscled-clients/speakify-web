import { Button } from "@/components/ui/Button";
import { WaveformVisualizer } from "@/components/ui/WaveformVisualizer";
import { Download, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Gradient glow blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800/50 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-zinc-400">Private by design. Your voice never leaves your Mac</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 mb-6">
          Your voice, transcribed.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Instantly. Privately.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Speakify turns your speech into text, entirely on your Mac. No cloud transcription, works offline, even on a plane. Just press{" "}
          <kbd className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-300 font-mono">⌃Space</kbd>{" "}
          and start talking.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button href="/start?plan=now" variant="primary" size="lg">
            <Download className="w-5 h-5" />
            Get Speakify
          </Button>
          <Button href="#features" variant="secondary" size="lg">
            See Features
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-zinc-500 mb-16">$20/month. Cancel anytime. 14-day money-back guarantee.</p>

        {/* App mockup: recording window */}
        <div className="relative max-w-2xl mx-auto">
          <div className="bg-zinc-900/80 border border-zinc-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            {/* Waveform */}
            <div className="flex items-center justify-center mb-6">
              <WaveformVisualizer />
            </div>
            {/* Bottom bar */}
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-lg font-bold text-zinc-100">Speakify</p>
                <p className="text-sm text-zinc-500">by Unpuzzle</p>
              </div>
              <p className="text-sm text-zinc-500">esc to cancel</p>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
