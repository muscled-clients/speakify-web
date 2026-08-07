import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { query } from "@/lib/db/pool";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Download as DownloadIcon, Mic, CreditCard } from "lucide-react";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    icon: CreditCard,
    title: "Start your trial",
    text: "Sign in with Google and subscribe for $20/month.",
  },
  {
    icon: DownloadIcon,
    title: "Download & install",
    text: "Grab the DMG from your account page and drag Speakify into Applications.",
  },
  {
    icon: Mic,
    title: "Press Ctrl+Space",
    text: "Dictate into any app. Your voice never leaves your Mac.",
  },
];

export default async function Download() {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });

  let hasSubscription = false;
  if (session?.user) {
    const { rows } = await query<{ status: string }>(
      `SELECT status FROM subscriptions WHERE user_id = $1`,
      [session.user.id]
    );
    hasSubscription = rows.length > 0;
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
            {hasSubscription ? "Download Speakify" : "Get Speakify"}
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10">
            macOS 14 or later on Apple Silicon. About 140MB, with the speech model built in.
          </p>

          {hasSubscription ? (
            <div className="flex flex-col items-center gap-4 mb-20">
              <Button href="/downloads/Speakify.dmg" variant="primary" size="lg">
                <DownloadIcon className="w-5 h-5" />
                Download for Mac
              </Button>
              <p className="text-xs text-zinc-600">
                Launch it and sign in with the same Google account. It unlocks automatically.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 mb-20">
              <Button href="/start?plan=now" variant="primary" size="lg">
                Subscribe for $20/month
              </Button>
              <p className="text-xs text-zinc-600">
                The download unlocks right after checkout.
              </p>
              {!session?.user && (
                <p className="text-xs text-zinc-600">
                  Already subscribed? <a href="/login?next=/download" className="text-blue-400 hover:underline">Sign in</a> to download.
                </p>
              )}
            </div>
          )}

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
