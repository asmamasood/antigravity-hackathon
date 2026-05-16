"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Activity, Map, Brain, BarChart3, Radio,
  Menu, X, Bell, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Shield },
  { href: "/dashboard", label: "Command", icon: Activity },
  { href: "/detect", label: "Detect", icon: Brain },
  { href: "/map", label: "Live Map", icon: Map },
  { href: "/agents", label: "AI Agents", icon: Radio },
  { href: "/simulation", label: "Simulation", icon: BarChart3 },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-[rgba(0,212,255,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff3366] to-[#0080ff] flex items-center justify-center glow-cyan">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00ff88]" />
              </div>
              <div>
                <span className="font-orbitron font-bold text-sm text-white tracking-wider">ResQ</span>
                <span className="font-orbitron font-bold text-sm text-[#00d4ff] tracking-wider"> AI</span>
              </div>
              <span className="hidden sm:block text-[10px] font-jetbrains text-[#3a6a8a] border border-[rgba(0,212,255,0.2)] px-1.5 py-0.5 rounded">
                v2.1.0
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                      active
                        ? "bg-[rgba(0,212,255,0.15)] text-[#00d4ff] border border-[rgba(0,212,255,0.3)]"
                        : "text-[#7eb3d4] hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Alert bell */}
              <button className="relative p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <Bell className="w-4 h-4 text-[#7eb3d4]" />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#ff3366] glow-red" />
              </button>
              {/* Live indicator */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-[10px] font-jetbrains text-[#00ff88] font-semibold">LIVE</span>
              </div>
              {/* Hamburger */}
              <button
                className="md:hidden p-1.5 rounded-lg hover:bg-white/5"
                onClick={() => setOpen(!open)}
              >
                {open ? <X className="w-5 h-5 text-[#00d4ff]" /> : <Menu className="w-5 h-5 text-[#7eb3d4]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[rgba(0,212,255,0.1)] bg-[rgba(2,4,8,0.95)]"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
                        active
                          ? "bg-[rgba(0,212,255,0.15)] text-[#00d4ff] border border-[rgba(0,212,255,0.25)]"
                          : "text-[#7eb3d4] hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
}
