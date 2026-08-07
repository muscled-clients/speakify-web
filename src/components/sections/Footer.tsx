import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="Speakify" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-semibold text-zinc-100">Speakify</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Local-first voice-to-text for macOS. Your voice, your device, your privacy.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4">Product</h4>
            <a href="#features" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">Features</a>
            <a href="#how-it-works" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">How It Works</a>
            <a href="#compare" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">Compare</a>
            <a href="#download" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">Download</a>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4">Resources</h4>
            <a href="#faq" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">FAQ</a>
            <a href="/pricing" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">Pricing</a>
            <a href="/account" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">Your Account</a>
            <a href="mailto:support@speakify.dev" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">Support</a>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-100 mb-4">Legal</h4>
            <a href="/privacy" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">Privacy Policy</a>
            <a href="/terms" className="block text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200 mb-2.5">Terms of Service</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">&copy; 2026 Unpuzzle. All rights reserved.</p>
          <p className="text-sm text-zinc-500">Made with care for your privacy.</p>
        </div>
      </div>
    </footer>
  );
}
