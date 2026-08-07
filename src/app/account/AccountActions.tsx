"use client";

import { useState } from "react";

export default function AccountActions({
  kind,
  label,
  plan = "trial",
}: {
  kind: "checkout" | "portal";
  label?: string;
  plan?: "trial" | "now";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setError(null);
    const path = kind === "checkout" ? "/api/stripe/create-checkout" : "/api/stripe/portal";
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kind === "checkout" ? { plan } : {}),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong. Try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={go}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-blue-400 shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-60 cursor-pointer"
      >
        {loading
          ? "One moment…"
          : label ?? (kind === "checkout" ? "Start 3-Day Free Trial" : "Manage Subscription")}
      </button>
      {error && <p className="text-xs text-red-400 mt-3">{error}</p>}
    </div>
  );
}
