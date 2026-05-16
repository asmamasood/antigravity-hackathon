"use client";
import { motion } from "framer-motion";
import {
  Droplets, Thermometer, Car, AlertTriangle, Zap, MapPin,
  Clock, Users, ChevronRight, Activity
} from "lucide-react";
import { Crisis } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn, getSeverityBadgeClass } from "@/lib/utils";

const crisisIcons = {
  flood: Droplets,
  heatwave: Thermometer,
  accident: Car,
  road_blockage: AlertTriangle,
  infrastructure: Zap,
};

const crisisColors = {
  flood: { bg: "rgba(0,128,255,0.1)", border: "rgba(0,128,255,0.3)", text: "#0080ff" },
  heatwave: { bg: "rgba(255,102,0,0.1)", border: "rgba(255,102,0,0.3)", text: "#ff6600" },
  accident: { bg: "rgba(255,51,102,0.1)", border: "rgba(255,51,102,0.3)", text: "#ff3366" },
  road_blockage: { bg: "rgba(255,204,0,0.1)", border: "rgba(255,204,0,0.3)", text: "#ffcc00" },
  infrastructure: { bg: "rgba(155,89,182,0.1)", border: "rgba(155,89,182,0.3)", text: "#9b59b6" },
};

interface CrisisCardProps {
  crisis: Crisis;
  index?: number;
  compact?: boolean;
  onClick?: () => void;
}

export function CrisisCard({ crisis, index = 0, compact = false, onClick }: CrisisCardProps) {
  const Icon = crisisIcons[crisis.type];
  const colors = crisisColors[crisis.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl overflow-hidden border card-hover cursor-pointer",
        crisis.severity === "critical" 
          ? "bg-red-500/5 border-red-500/30 shadow-[0_0_20px_rgba(255,51,102,0.1)]" 
          : "bg-white/5 border-white/10",
        compact ? "p-4" : "p-6"
      )}
    >
      {/* Cinematic Scanning Line */}
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
      />

      <div className="flex gap-4">
        {/* Holographic Icon Container */}
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
          crisis.severity === "critical" ? "bg-red-500/20 border-red-500/40" : "bg-cyan-500/10 border-cyan-500/30"
        )}>
          <Icon className={cn("w-6 h-6", crisis.severity === "critical" ? "text-red-400" : "text-cyan-400")} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-cyan-400/70 font-bold tracking-widest">{crisis.id}</span>
                <Badge variant={crisis.severity as any} className="text-[9px] uppercase tracking-tighter">
                  {crisis.severity}
                </Badge>
              </div>
              <h3 className="text-white font-display font-bold truncate tracking-wide">
                {crisis.title}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#3a6a8a] font-mono">{crisis.timestamp.slice(11, 16)} Z</p>
              <div className="flex items-center gap-1 mt-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[9px] text-green-500 font-bold">LIVE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-[10px] text-[#7eb3d4] font-medium">
               <MapPin className="w-3 h-3 text-cyan-400" />
               <span className="truncate">{crisis.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#7eb3d4] font-medium">
               <Users className="w-3 h-3 text-yellow-400" />
               <span>{crisis.affectedPeople.toLocaleString()} RISK</span>
            </div>
          </div>

          {!compact && (
            <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
               <div className="flex justify-between items-end mb-1">
                  <span className="text-[9px] uppercase tracking-widest text-[#3a6a8a] font-bold">AI Processing Confidence</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{crisis.confidence}%</span>
               </div>
               <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${crisis.confidence}%` }}
                    className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_8px_rgba(0,212,255,0.5)]"
                  />
               </div>
               
               <div className="p-3 rounded-xl bg-black/20 border border-white/5 text-[10px] text-[#7eb3d4] leading-relaxed italic">
                  &quot;{crisis.aiReasoning.slice(0, 100)}...&quot;
               </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
