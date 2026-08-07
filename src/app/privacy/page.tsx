import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata = { title: "Privacy Policy - Speakify" };

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold text-zinc-100 mt-10 mb-3">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-zinc-400 leading-relaxed mb-4">{children}</p>;
}
function LI({ children }: { children: React.ReactNode }) {
  return <li className="text-sm text-zinc-400 leading-relaxed mb-2">{children}</li>;
}

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 mb-2">Privacy Policy</h1>
          <p className="text-sm text-zinc-500 mb-10">Last updated: August 7, 2026</p>

          <P>
            Speakify is built on a simple principle: your voice belongs on your device. This policy explains
            exactly what data stays on your Mac, what small amount of data we process to run your subscription,
            and what happens in the optional features that use third-party services.
          </P>

          <H2>What stays on your Mac</H2>
          <ul className="list-disc pl-5 mb-4">
            <LI>Your voice recordings. Audio is transcribed on your device and the temporary recording file is deleted after transcription. Audio is never uploaded anywhere.</LI>
            <LI>Your transcriptions. Transcription history is stored in a local database on your Mac. It is never sent to our servers.</LI>
            <LI>Your shortcodes, vocabulary, corrections, and settings. All stored locally.</LI>
            <LI>Your usage statistics (words dictated, time saved). Computed and stored locally.</LI>
          </ul>

          <H2>What we process on our servers</H2>
          <P>To run your account and subscription, we store:</P>
          <ul className="list-disc pl-5 mb-4">
            <LI>Your name, email address, and profile picture from Google when you sign in with Google.</LI>
            <LI>Your subscription status, billing period dates, and a reference to your Stripe customer record.</LI>
            <LI>Standard server logs (IP address, request time) kept for a short period for security and debugging.</LI>
          </ul>
          <P>
            The Speakify app on your Mac checks your subscription status with our servers periodically. This
            check sends your session credentials and nothing else. No dictation content is ever included.
          </P>

          <H2>Payment</H2>
          <P>
            Payments are processed by Stripe. Your card number never touches our servers. Stripe&apos;s handling
            of your payment data is governed by their privacy policy. Charges appear on your statement as
            MUSCLED-SPEAKIFY.
          </P>

          <H2>Model downloads</H2>
          <P>
            The bundled speech model ships inside the app. If you choose to download an additional model
            (Tiny or Small) in Settings, the app fetches the model file from Hugging Face&apos;s public servers.
            That request reveals your IP address to Hugging Face, like any file download. No personal data is sent.
          </P>

          <H2>Optional: AI Cleanup</H2>
          <P>
            AI Cleanup is off by default. If you enable it and provide your own Anthropic API key, the text of
            each dictation (not the audio) is sent to Anthropic&apos;s API for grammar cleanup, under your own
            Anthropic account and their privacy terms. If you never enable it, no dictation content ever leaves
            your Mac. Your API key is stored in the macOS Keychain.
          </P>

          <H2>What we do not do</H2>
          <ul className="list-disc pl-5 mb-4">
            <LI>We do not collect analytics or telemetry from the app.</LI>
            <LI>We do not sell or share your data with advertisers.</LI>
            <LI>We do not train AI models on your data.</LI>
            <LI>We cannot access your recordings or transcriptions. They are not on our servers.</LI>
          </ul>

          <H2>Service providers</H2>
          <ul className="list-disc pl-5 mb-4">
            <LI>Google: sign-in authentication.</LI>
            <LI>Stripe: payment processing.</LI>
            <LI>Hetzner: server hosting for our website and subscription service.</LI>
            <LI>Hugging Face: optional speech model downloads.</LI>
            <LI>Anthropic: optional AI Cleanup, only if you enable it with your own key.</LI>
          </ul>

          <H2>Data retention and deletion</H2>
          <P>
            Local data is yours: you can clear transcription history in the app at any time, and uninstalling
            the app removes it. To delete your account and our server-side records (account details and
            subscription history), email support@speakify.dev and we will complete the deletion within 30 days.
          </P>

          <H2>Your rights</H2>
          <P>
            Depending on where you live (including the EU, UK, and California), you may have rights to access,
            correct, export, or delete your personal data. Because almost all Speakify data lives only on your
            device, most of these rights are directly in your hands. For anything server-side, contact
            support@speakify.dev.
          </P>

          <H2>Changes</H2>
          <P>
            If we change this policy, we will update the date above and note significant changes on this page.
            Material changes affecting your data will be announced in the app.
          </P>

          <H2>Contact</H2>
          <P>
            Questions about privacy: support@speakify.dev. Speakify is made by Unpuzzle.
          </P>
        </div>
      </main>
      <Footer />
    </>
  );
}
