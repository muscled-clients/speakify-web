export function PrivacyBoxMockup() {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-500">Privacy Boxes — Desktop</span>
        </div>
      </div>

      {/* Mock desktop with privacy boxes */}
      <div className="relative bg-zinc-950 p-4" style={{ minHeight: "300px" }}>
        {/* Fake desktop content underneath */}
        <div className="absolute inset-4 space-y-3">
          {/* Fake browser bar */}
          <div className="bg-zinc-800/60 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
              </div>
              <div className="flex-1 bg-zinc-700/50 rounded h-4 mx-8" />
            </div>
            {/* Fake page content */}
            <div className="space-y-2 pt-2">
              <div className="flex gap-3">
                <span className="text-[10px] text-zinc-500">API Key:</span>
                <div className="bg-zinc-700/40 rounded h-3 w-48" />
              </div>
              <div className="flex gap-3">
                <span className="text-[10px] text-zinc-500">Token:</span>
                <div className="bg-zinc-700/40 rounded h-3 w-56" />
              </div>
              <div className="flex gap-3">
                <span className="text-[10px] text-zinc-500">Password:</span>
                <div className="bg-zinc-700/40 rounded h-3 w-36" />
              </div>
              <div className="flex gap-3">
                <span className="text-[10px] text-zinc-500">Database:</span>
                <div className="bg-zinc-700/40 rounded h-3 w-44" />
              </div>
              <div className="flex gap-3">
                <span className="text-[10px] text-zinc-500">Secret:</span>
                <div className="bg-zinc-700/40 rounded h-3 w-40" />
              </div>
            </div>
          </div>

          {/* Fake terminal */}
          <div className="bg-zinc-800/60 rounded-lg p-3">
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-green-400/60">$ export BEARER_TOKEN=sk-xxxx...</p>
              <p className="text-[10px] font-mono text-zinc-500">$ curl -H &quot;Authorization: Bearer $TOKEN&quot; ...</p>
              <p className="text-[10px] font-mono text-zinc-500">$ ssh admin@192.168.1.xxx ...</p>
            </div>
          </div>
        </div>

        {/* Privacy Box 1 - covering API keys */}
        <div
          className="absolute bg-black/85 border border-white/15 rounded-sm"
          style={{
            top: "72px",
            left: "110px",
            width: "220px",
            height: "95px",
          }}
        >
          {/* Selection border */}
          <div className="absolute inset-0 border-2 border-blue-500 rounded-sm pointer-events-none" />
          {/* Optional text label inside */}
          <div className="flex items-center justify-center h-full">
            <span className="text-[10px] text-zinc-500 font-mono">Sensitive credentials hidden</span>
          </div>
        </div>

        {/* Privacy Box 2 - covering terminal secrets */}
        <div
          className="absolute bg-black/85 border border-white/15 rounded-sm"
          style={{
            top: "205px",
            left: "40px",
            width: "280px",
            height: "55px",
          }}
        >
          <div className="flex items-center justify-center h-full">
            <span className="text-[10px] text-zinc-500 font-mono">Terminal output hidden</span>
          </div>
        </div>

        {/* Hint overlay */}
        <div className="absolute bottom-2 right-3 flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[9px] text-zinc-400 font-mono">⌘⇧F</kbd>
          <span className="text-[9px] text-zinc-600">toggle boxes</span>
          <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[9px] text-zinc-400 font-mono">⌘⇧V</kbd>
          <span className="text-[9px] text-zinc-600">draw new</span>
        </div>
      </div>
    </div>
  );
}
