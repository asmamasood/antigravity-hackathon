"use client";
import { motion } from "framer-motion";
import { Shield, Globe } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="glass border-t border-[rgba(0,212,255,0.1)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff3366] to-[#0080ff] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-orbitron font-bold text-white">ResQ <span className="text-[#00d4ff]">AI</span></span>
            </div>
            <p className="text-xs text-[#3a6a8a] leading-relaxed">
              Autonomous Disaster Command System for Pakistan&apos;s smart cities. AI-powered emergency response at scale.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-[#7eb3d4] uppercase tracking-widest font-jetbrains mb-3">Quick Access</h4>
            <div className="space-y-2">
              {[
                { href: "/dashboard", label: "AI Command Dashboard" },
                { href: "/detect", label: "Crisis Detection" },
                { href: "/map", label: "Live Emergency Map" },
                { href: "/agents", label: "AI Agent Workflow" },
                { href: "/simulation", label: "Simulation Results" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="block text-xs text-[#3a6a8a] hover:text-[#00d4ff] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-xs font-semibold text-[#7eb3d4] uppercase tracking-widest font-jetbrains mb-3">System Status</h4>
            <div className="space-y-2">
              {[
                { label: "AI Inference Engine", status: "Online" },
                { label: "Sensor Network", status: "847 Active" },
                { label: "Alert System", status: "Operational" },
                { label: "Data Pipeline", status: "Live" },
              ].map(({ label, status }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs text-[#3a6a8a]">{label}</span>
                  <span className="text-xs font-jetbrains text-[#00ff88] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[rgba(0,212,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[10px] text-[#3a6a8a] font-jetbrains">
            © 2026 ResQ AI — Autonomous Disaster Command System · Pakistan
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-[#3a6a8a] font-jetbrains">Built for Hackathon 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
