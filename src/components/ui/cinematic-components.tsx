"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HolographicPanelProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "red" | "green" | "purple";
}

const colors = {
  cyan: "rgba(0, 212, 255, 0.2)",
  red: "rgba(255, 51, 102, 0.2)",
  green: "rgba(0, 255, 136, 0.2)",
  purple: "rgba(155, 89, 182, 0.2)",
};

export function HolographicPanel({ children, className, glowColor = "cyan" }: HolographicPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
        "after:absolute after:inset-0 after:border after:border-white/5 after:rounded-2xl after:pointer-events-none",
        className
      )}
      style={{
        boxShadow: `0 0 40px ${colors[glowColor]}`,
      }}
    >
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm"
        />
      </div>

      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
}

export function AIThinkingLoader({ message = "Neural Network Processing..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative w-24 h-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-l-2 border-cyan-500 shadow-[0_0_15px_rgba(0,212,255,0.5)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-b-2 border-r-2 border-purple-500 shadow-[0_0_10px_rgba(155,89,182,0.5)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_#fff]"
          />
        </div>
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-xs font-mono tracking-widest text-cyan-400 uppercase"
      >
        {message}
      </motion.p>
    </div>
  );
}

export function CinematicBadge({ 
  children, 
  variant = "info" 
}: { 
  children: React.ReactNode, 
  variant?: "info" | "warning" | "danger" | "success" 
}) {
  const variantStyles = {
    info: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5 shadow-[0_0_10px_rgba(0,212,255,0.2)]",
    warning: "border-yellow-500/30 text-yellow-400 bg-yellow-500/5 shadow-[0_0_10px_rgba(255,204,0,0.2)]",
    danger: "border-red-500/30 text-red-400 bg-red-500/5 shadow-[0_0_10px_rgba(255,51,102,0.2)]",
    success: "border-green-500/30 text-green-400 bg-green-500/5 shadow-[0_0_10px_rgba(0,255,136,0.2)]",
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
      variantStyles[variant]
    )}>
      {children}
    </span>
  );
}
