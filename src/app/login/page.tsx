"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth/auth-client";

export default function Login() {
  const [loading, setLoading] = useState(false);

  async function signInGoogle() {
    setLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/account",
    });
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="relative bg-zinc-900/80 border border-zinc-800/50 rounded-2xl p-10 backdrop-blur-sm text-center">
          <a href="/" className="inline-flex items-center gap-2.5 mb-8">
            <Image src="/logo.png" alt="Speakify" width={36} height={36} className="rounded-lg" />
            <span className="text-xl font-semibold text-zinc-100">Speakify</span>
          </a>

          <h1 className="text-2xl font-bold text-zinc-100 mb-2">Sign in to Speakify</h1>
          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            One account for your subscription and every Mac you use Speakify on.
          </p>

          <button
            onClick={signInGoogle}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 bg-zinc-100 text-zinc-900 font-medium text-sm px-5 py-3 rounded-xl hover:bg-white transition-colors duration-200 disabled:opacity-60 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A10.97 10.97 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            {loading ? "Redirecting…" : "Continue with Google"}
          </button>

          <p className="text-xs text-zinc-600 mt-6">
            New here? Signing in creates your account and starts your 7-day free trial.
          </p>
        </div>
      </div>
    </main>
  );
}
