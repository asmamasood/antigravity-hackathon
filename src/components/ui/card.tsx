"use client";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "red" | "green" | "orange" | "none";
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, glow = "none", hover = false, onClick }: CardProps) {
  const glowClasses = {
    cyan: "glow-cyan border-[rgba(0,212,255,0.3)]",
    red: "glow-red border-[rgba(255,51,102,0.3)]",
    green: "glow-green border-[rgba(0,255,136,0.3)]",
    orange: "glow-orange border-[rgba(255,102,0,0.3)]",
    none: "border-[rgba(0,212,255,0.15)]",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass rounded-xl p-4",
        glowClasses[glow],
        hover && "card-hover cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center justify-between mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-sm font-semibold text-[#7eb3d4] uppercase tracking-widest font-jetbrains", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>;
}
