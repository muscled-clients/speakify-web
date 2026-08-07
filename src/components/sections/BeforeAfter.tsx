import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function BeforeAfter() {
  return (
    <SectionWrapper id="demo">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          From messy speech to clean text
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Speakify&apos;s vocabulary corrections automatically clean up filler words, fix grammar, and expand your custom shortcodes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Before card */}
        <div className="bg-zinc-900 border border-zinc-800/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-400/80 rounded-full" />
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Raw Speech</span>
          </div>
          <p className="text-zinc-300 leading-relaxed font-mono text-sm">
            &quot;So um I wanted to uh send an email to the uh team and like let them know that the meeting is uh moved to like 3 PM tomorrow and um yeah also tell them to uh bring their laptops&quot;
          </p>
        </div>

        {/* After card */}
        <div className="bg-zinc-900 border border-blue-500/20 rounded-2xl p-6 relative">
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-400/80 rounded-full" />
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Cleaned Output</span>
          </div>
          <p className="text-zinc-100 leading-relaxed text-sm">
            I wanted to send an email to the team and let them know that the meeting is moved to 3 PM tomorrow. Also, tell them to bring their laptops.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
