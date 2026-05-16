"use client";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "critical" | "high" | "medium" | "low" | "info" | "default";
  className?: string;
  pulse?: boolean;
}

export function Badge({ children, variant = "default", className, pulse }: BadgeProps) {
  const variants = {
    critical: "badge-critical",
    high: "badge-high",
    medium: "badge-medium",
    low: "badge-low",
    info: "bg-[rgba(0,212,255,0.15)] border border-[rgba(0,212,255,0.4)] text-[#00d4ff]",
    default: "bg-white/10 border border-white/20 text-white/70",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold font-jetbrains uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
