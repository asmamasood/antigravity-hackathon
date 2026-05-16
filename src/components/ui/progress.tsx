"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  color?: "cyan" | "green" | "red" | "orange" | "yellow";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  color = "cyan",
  size = "md",
  showLabel = false,
  label,
  animated = true,
  className,
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    cyan: "from-[#0080ff] to-[#00d4ff]",
    green: "from-[#00ff88] to-[#00cc66]",
    red: "from-[#ff3366] to-[#ff6699]",
    orange: "from-[#ff6600] to-[#ffaa00]",
    yellow: "from-[#ffcc00] to-[#ffee55]",
  };

  const glowColors = {
    cyan: "rgba(0,212,255,0.6)",
    green: "rgba(0,255,136,0.6)",
    red: "rgba(255,51,102,0.6)",
    orange: "rgba(255,102,0,0.6)",
    yellow: "rgba(255,204,0,0.6)",
  };

  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-[#7eb3d4] font-jetbrains">{label}</span>}
          {showLabel && (
            <span className="text-xs font-bold font-jetbrains" style={{ color: glowColors[color] }}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-white/5 rounded-full overflow-hidden", heights[size])}>
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", colors[color])}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            boxShadow: `0 0 10px ${glowColors[color]}`,
          }}
        />
      </div>
    </div>
  );
}
