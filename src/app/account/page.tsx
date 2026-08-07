import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { query } from "@/lib/db/pool";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CheckCircle2, Download } from "lucide-react";
import AccountActions from "./AccountActions";

export const dynamic = "force-dynamic";

interface SubRow {
  status: string;
  current_period_end: string | null;
  trial_end: string | null;
  cancel_at_period_end: boolean;
}

const STATUS_META: Record<string, { label: string; classes: string }> = {
  trialing: { label: "Trial", classes: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  active: { label: "Active", classes: "bg-green-500/15 text-green-400 border-green-500/30" },
  past_due: { label: "Payment issue", classes: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  canceled: { label: "Inactive", classes: "bg-red-500/15 text-red-400 border-red-500/30" },
};

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function Account({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session?.user) redirect("/login");

  const params = await searchParams;
  const justCheckedOut = params.checkout === "success";

  const { rows } = await query<SubRow>(
    `SELECT status, current_period_end, trial_end, cancel_at_period_end
     FROM subscriptions WHERE user_id = $1`,
    [session.user.id]
  );
  const sub = rows[0] ?? null;
  const meta = sub ? STATUS_META[sub.status] ?? { label: sub.status, classes: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30" } : null;

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {justCheckedOut && (
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4 mb-8">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <p className="text-sm text-zinc-200">
                {sub?.status === "trialing"
                  ? "Your trial has started. You're all set. Return to the Speakify app on your Mac and it unlocks within a few minutes."
                  : "You're subscribed. Return to the Speakify app on your Mac and it unlocks within a few minutes."}
              </p>
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 mb-1">Your Account</h1>
          <p className="text-sm text-zinc-500 mb-10">Signed in as {session.user.email}</p>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-100">Subscription</h2>
              {meta && (
                <span className={`text-xs font-medium border rounded-full px-3 py-1 ${meta.classes}`}>
                  {meta.label}
                </span>
              )}
            </div>

            {!sub ? (
              <>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  You&apos;re not subscribed yet. Start your 7-day free trial: full access to everything,
                  and you won&apos;t be charged until day 8.
                </p>
                <div className="flex flex-col gap-3">
                  <AccountActions kind="checkout" plan="trial" />
                  <AccountActions
                    kind="checkout"
                    plan="now"
                    label="Skip the trial, subscribe now for $20/month"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2 mb-6">
                  {sub.status === "trialing" && sub.trial_end && (
                    <p className="text-sm text-zinc-300">
                      Trial ends <span className="font-medium text-zinc-100">{fmt(sub.trial_end)}</span>
                      {". "}Your card is charged $20/month after that.
                    </p>
                  )}
                  {sub.status === "active" && sub.current_period_end && (
                    <p className="text-sm text-zinc-300">
                      Renews <span className="font-medium text-zinc-100">{fmt(sub.current_period_end)}</span> at $20/month.
                    </p>
                  )}
                  {sub.status === "past_due" && (
                    <p className="text-sm text-orange-300">
                      Your last payment failed. Update your payment method to keep dictating.
                    </p>
                  )}
                  {(sub.status === "canceled") && (
                    <p className="text-sm text-zinc-400">Your subscription has ended. Restart anytime. Your shortcodes, vocabulary, and history are still on your Mac.</p>
                  )}
                  {sub.cancel_at_period_end && sub.status !== "canceled" && (
                    <p className="text-xs text-zinc-500">
                      Cancellation scheduled. Access continues until the end of the period.
                    </p>
                  )}
                </div>
                <AccountActions
                  kind={sub.status === "canceled" ? "checkout" : "portal"}
                  label={sub.status === "canceled" ? "Resubscribe for $20/month" : undefined}
                />
              </>
            )}
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-100 mb-1">Get the app</h2>
                <p className="text-sm text-zinc-400">macOS 14+ on Apple Silicon. Already subscribed on another Mac? Just download and sign in with the same Google account.</p>
              </div>
              <a
                href="/downloads/Speakify.dmg"
                className="inline-flex items-center gap-2 bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
