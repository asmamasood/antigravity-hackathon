"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Activity, Map, Radio, BarChart3, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Shield },
  { href: "/dashboard", label: "Command", icon: Activity },
  { href: "/sos", label: "SOS", icon: AlertTriangle },
  { href: "/map", label: "Map", icon: Map },
  { href: "/agents", label: "Agents", icon: Radio },
  { href: "/simulation", label: "Simulate", icon: BarChart3 },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong border-t border-[rgba(0,212,255,0.15)]">
      <div className="flex items-center justify-around px-2 py-2 safe-bottom">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          const isSOS = label === "SOS";
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200",
                isSOS ? "text-red-500" : active ? "text-[#00d4ff]" : "text-[#3a6a8a] hover:text-[#7eb3d4]"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-all",
                isSOS ? "bg-red-500/10 shadow-[0_0_15px_rgba(255,51,102,0.3)] animate-pulse" : 
                active && "bg-[rgba(0,212,255,0.15)] glow-cyan"
              )}>
                <Icon className={cn("w-4 h-4", isSOS && "text-red-500")} />
              </div>
              <span className="text-[9px] font-semibold font-jetbrains">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
