import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Monitor, Smartphone } from "lucide-react";

export function Platforms() {
  return (
    <SectionWrapper id="platforms">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          Built for your Mac.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Speakify runs natively on macOS. iOS keyboard is on the roadmap, with the same offline engine and the same privacy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* macOS Card */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 bg-zinc-800 border border-zinc-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Monitor className="w-7 h-7 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-100 mb-2">macOS</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Menu bar app with global hotkey. macOS 14 or later on Apple Silicon.
          </p>
          <ul className="text-sm text-zinc-500 space-y-1.5">
            <li>Global Ctrl+Space hotkey (customizable)</li>
            <li>Auto-paste into any app</li>
            <li>Metal GPU acceleration</li>
            <li>Menu bar integration</li>
          </ul>
        </div>

        {/* iOS Card */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 bg-zinc-800 border border-zinc-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-7 h-7 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-100 mb-2">iOS <span className="ml-2 text-xs font-medium text-zinc-500 bg-zinc-800 border border-zinc-700/50 rounded-full px-2 py-0.5 align-middle">Coming Soon</span></h3>
          <p className="text-sm text-zinc-400 mb-4">
            Custom keyboard extension in development. Same on-device engine, working system-wide in any text field.
          </p>
          <ul className="text-sm text-zinc-500 space-y-1.5">
            <li>System-wide keyboard extension</li>
            <li>On-device whisper.cpp engine</li>
            <li>Works in any app</li>
            <li>No network permission needed</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
