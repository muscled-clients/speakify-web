import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata = { title: "Terms of Service - Speakify" };

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold text-zinc-100 mt-10 mb-3">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-zinc-400 leading-relaxed mb-4">{children}</p>;
}
function LI({ children }: { children: React.ReactNode }) {
  return <li className="text-sm text-zinc-400 leading-relaxed mb-2">{children}</li>;
}

export default function Terms() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 mb-2">Terms of Service</h1>
          <p className="text-sm text-zinc-500 mb-10">Last updated: August 7, 2026</p>

          <P>
            These terms govern your use of the Speakify application and website, operated by Unpuzzle
            (&quot;we&quot;, &quot;us&quot;). By creating an account or using Speakify, you agree to these terms.
          </P>

          <H2>The service</H2>
          <P>
            Speakify is a dictation app for macOS. Speech is transcribed on your device. An internet connection
            and an active subscription (or trial) are required to activate the app, and the app periodically
            confirms your subscription status online. You can stay fully offline for up to 14 days between
            checks. After 14 days the app reminds you to reconnect, and after 30 days without a successful
            check, dictation pauses until the app can confirm your subscription again.
          </P>

          <H2>Subscription and billing</H2>
          <ul className="list-disc pl-5 mb-4">
            <LI>Speakify costs $20 USD per month after a 3-day free trial.</LI>
            <LI>A payment method is required to start the trial. You will not be charged if you cancel before the trial ends.</LI>
            <LI>Subscriptions renew automatically each month until canceled.</LI>
            <LI>You can cancel anytime from your account page. Access continues to the end of the paid period.</LI>
            <LI>Prices may change; we will give at least 30 days notice before any change affects you.</LI>
          </ul>

          <H2>Refunds</H2>
          <P>
            If Speakify is not working for you, email support@speakify.dev within 14 days of your first charge
            and we will refund it in full. Refunds after that window are at our discretion, but we try to be fair. Charges appear on your card statement as MUSCLED-SPEAKIFY.
          </P>

          <H2>Your license</H2>
          <P>
            Your subscription grants you a personal, non-transferable license to use Speakify on Macs
            that you own or control. You may not resell, redistribute, sublicense, or share your account, and you
            may not reverse-engineer the app or circumvent its subscription checks.
          </P>

          <H2>Acceptable use</H2>
          <P>
            You are responsible for what you dictate and where you paste it. Do not use Speakify to break the
            law, infringe others&apos; rights, or record people without any consent required in your jurisdiction.
          </P>

          <H2>Your content</H2>
          <P>
            Everything you dictate belongs to you. Because transcription happens on your device, we never
            receive, store, or claim any rights over your dictated content. The one exception is text you
            explicitly choose to send to a third-party AI provider via the optional AI Cleanup feature,
            described in our Privacy Policy.
          </P>

          <H2>Disclaimers</H2>
          <P>
            Speakify is provided as-is. Speech recognition is imperfect: transcriptions can contain errors, and
            the app pastes text into other applications on your behalf. Review anything important before you
            send it. We do not warrant that the service will be uninterrupted or error-free.
          </P>

          <H2>Limitation of liability</H2>
          <P>
            To the maximum extent permitted by law, our total liability for any claim related to Speakify is
            limited to the amount you paid us in the 12 months before the claim. We are not liable for indirect,
            incidental, or consequential damages, including damage caused by transcription errors or text pasted
            into the wrong place.
          </P>

          <H2>Termination</H2>
          <P>
            You can stop using Speakify and cancel at any time. We may suspend or terminate accounts that
            violate these terms. Your local data remains on your device regardless.
          </P>

          <H2>Age</H2>
          <P>By subscribing you confirm you are at least 18 years old or the age of majority where you live.</P>

          <H2>Changes to these terms</H2>
          <P>
            We may update these terms. If changes are material we will notify you by email or in the app at
            least 14 days before they take effect. Continued use after that constitutes acceptance.
          </P>

          <H2>Contact</H2>
          <P>Questions about these terms: support@speakify.dev.</P>
        </div>
      </main>
      <Footer />
    </>
  );
}
