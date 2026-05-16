"use client";
import { useState, useEffect } from "react";
import { TICKER_MESSAGES } from "@/lib/mock-data";
import { AlertTriangle } from "lucide-react";

export function CrisisTicker() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setIsVisible((v) => !v), 500);
    return () => clearInterval(timer);
  }, []);

  const repeated = [...TICKER_MESSAGES, ...TICKER_MESSAGES];

  return (
    <div className="relative overflow-hidden bg-[rgba(255,51,102,0.08)] border-y border-[rgba(255,51,102,0.2)] py-2">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#020408] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#020408] to-transparent pointer-events-none" />

      <div className="flex items-center gap-3 animate-ticker whitespace-nowrap">
        <div className="flex items-center gap-2 px-4 shrink-0">
          <span className={`text-[#ff3366] transition-opacity ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <AlertTriangle className="w-4 h-4 inline" />
          </span>
          <span className="text-[#ff3366] font-bold text-xs font-jetbrains tracking-widest">LIVE ALERTS</span>
        </div>
        {repeated.map((msg, i) => (
          <span key={i} className="text-xs text-[#7eb3d4] font-jetbrains px-6 shrink-0">
            {msg}
            <span className="mx-6 text-[rgba(0,212,255,0.3)]">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
