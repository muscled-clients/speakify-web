"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Compare", href: "#compare" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-zinc-950/80 transition-colors duration-200 ${scrolled ? "border-b border-zinc-800/50" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Speakify" width={32} height={32} className="rounded-lg" />
          <span className="text-lg font-semibold text-zinc-100">Speakify</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/login" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200">
            Sign In
          </a>
          <a href="/start?plan=trial" className="inline-flex items-center gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors duration-200">
            Start Free Trial
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-zinc-400 hover:text-zinc-100">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900/50 transition-colors duration-200">
              {link.label}
            </a>
          ))}
          <div className="px-6 py-3">
            <a href="/start?plan=trial" className="inline-flex items-center gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors duration-200">
              Start Free Trial
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
