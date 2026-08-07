import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Check, X } from "lucide-react";

type CellValue = boolean | string;

interface ComparisonRow {
  feature: string;
  speakify: CellValue;
  wisprFlow: CellValue;
  superWhisper: CellValue;
}

const ROWS: ComparisonRow[] = [
  { feature: "Price", speakify: "$20/mo", wisprFlow: "$12–15/mo", superWhisper: "$8/mo" },
  { feature: "Works Offline (flights, secure sites)", speakify: true, wisprFlow: false, superWhisper: "Optional" },
  { feature: "Voice Ever Leaves Your Device", speakify: "Never", wisprFlow: "Always", superWhisper: "Sometimes" },
  { feature: "Global Hotkey + Auto-Paste", speakify: true, wisprFlow: true, superWhisper: true },
  { feature: "Custom Vocabulary & Corrections", speakify: true, wisprFlow: false, superWhisper: false },
  { feature: "Text Shortcodes (type less)", speakify: true, wisprFlow: false, superWhisper: false },
  { feature: "Voice Actions (“send it”)", speakify: true, wisprFlow: true, superWhisper: false },
  { feature: "Privacy Boxes (screen redaction)", speakify: true, wisprFlow: false, superWhisper: false },
  { feature: "Transcription History (local)", speakify: true, wisprFlow: "Cloud", superWhisper: true },
];

function renderCell(value: CellValue) {
  if (value === true) return <Check className="w-5 h-5 text-green-400 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-zinc-600 mx-auto" />;
  return <span className="text-sm text-zinc-300">{value}</span>;
}

export function Comparison() {
  return (
    <SectionWrapper id="compare">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          See how Speakify compares
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Other dictation tools send your voice to the cloud to transcribe it. Speakify never does.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-zinc-800/50 bg-zinc-900">
              <div className="text-sm font-medium text-zinc-500">Feature</div>
              <div className="text-sm font-semibold text-blue-400 text-center">Speakify</div>
              <div className="text-sm font-medium text-zinc-500 text-center">Wispr Flow</div>
              <div className="text-sm font-medium text-zinc-500 text-center">SuperWhisper</div>
            </div>
            {/* Data rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 gap-4 px-6 py-3.5 ${
                  i < ROWS.length - 1 ? "border-b border-zinc-800/30" : ""
                }`}
              >
                <div className="text-sm text-zinc-300">{row.feature}</div>
                <div className="text-center">{renderCell(row.speakify)}</div>
                <div className="text-center">{renderCell(row.wisprFlow)}</div>
                <div className="text-center">{renderCell(row.superWhisper)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
