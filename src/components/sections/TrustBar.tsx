import { WifiOff, Zap, ShieldCheck, CalendarCheck } from "lucide-react";

const TRUST_ITEMS = [
  { icon: WifiOff, label: "Offline Dictation", description: "Transcribes without internet." },
  { icon: Zap, label: "Metal Accelerated", description: "Blazing fast on Apple Silicon." },
  { icon: ShieldCheck, label: "Voice Stays Local", description: "Audio never touches a server." },
  { icon: CalendarCheck, label: "3-Day Free Trial", description: "Try everything before you pay." },
];

export function TrustBar() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {TRUST_ITEMS.map((item) => (
          <div key={item.label} className="text-center p-6">
            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800/50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-100 mb-1">{item.label}</h3>
            <p className="text-xs text-zinc-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
