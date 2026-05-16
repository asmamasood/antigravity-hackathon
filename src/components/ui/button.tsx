"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-[#0080ff] to-[#00d4ff] text-white hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:scale-[1.02]",
    secondary:
      "bg-gradient-to-r from-[#9b59b6] to-[#0080ff] text-white hover:shadow-[0_0_25px_rgba(155,89,182,0.4)] hover:scale-[1.02]",
    danger:
      "bg-gradient-to-r from-[#ff3366] to-[#ff6600] text-white hover:shadow-[0_0_25px_rgba(255,51,102,0.5)] hover:scale-[1.02]",
    ghost:
      "bg-transparent text-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)]",
    outline:
      "bg-transparent border border-[rgba(0,212,255,0.4)] text-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)] hover:border-[rgba(0,212,255,0.7)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}
