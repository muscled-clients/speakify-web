import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Shield, Server, Eye, Lock } from "lucide-react";

const PRIVACY_POINTS = [
  { icon: Server, text: "Your voice and words never touch a server" },
  { icon: Eye, text: "No telemetry or analytics whatsoever" },
  { icon: Lock, text: "Audio processed in memory, never saved" },
  { icon: Shield, text: "Verify it yourself with any network monitor" },
];

export function Privacy() {
  return (
    <SectionWrapper>
      <div className="relative bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 md:p-12 overflow-hidden">
        {/* Gradient glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-6">
              Your voice never leaves your device
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Speakify uses whisper.cpp to process audio directly on your Mac&apos;s GPU. Your audio is transcribed on-device and the recording is immediately discarded. The only thing the app checks online is your subscription status, which contains no dictation data. We don&apos;t collect telemetry, analytics, or usage data. Run any network monitor and watch for yourself.
            </p>
            <div className="space-y-4">
              {PRIVACY_POINTS.map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-800 border border-zinc-700/50 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-sm text-zinc-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - On-device diagram */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-xs">
              <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="w-10 h-10 bg-zinc-700/50 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Your Mac</p>
                </div>
                <div className="space-y-3">
                  {["🎤 Microphone", "⚡ whisper.cpp + Metal", "📝 Text Output", "📋 Auto-Paste"].map(
                    (step) => (
                      <div
                        key={step}
                        className="bg-zinc-900 border border-zinc-800/50 rounded-lg px-4 py-2.5 text-center text-sm text-zinc-400"
                      >
                        {step}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-700/50 text-center">
                  <p className="text-xs text-zinc-600">No data leaves this device</p>
                </div>
              </div>

              {/* Crossed-out cloud */}
              <div className="absolute -right-4 -top-4 w-12 h-12 bg-zinc-900 border border-zinc-800/50 rounded-full flex items-center justify-center">
                <span className="text-lg">🚫☁️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
