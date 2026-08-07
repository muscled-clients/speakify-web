import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="download" className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-6">
          Start speaking. Stop typing.
        </h2>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
          Get Speakify and experience voice-to-text that actually respects your privacy.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/start?plan=now" variant="primary" size="lg">
            <Download className="w-5 h-5" />
            Subscribe for $20/month
          </Button>
          <Button href="/pricing" variant="secondary" size="lg">
            See Pricing
          </Button>
        </div>
        <p className="text-xs text-zinc-600 mt-6">
          macOS 14+ on Apple Silicon. ~140MB download. $20/month, cancel anytime.
        </p>
      </div>
    </section>
  );
}
