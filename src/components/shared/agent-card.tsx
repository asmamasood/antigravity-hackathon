"use client";
import { motion } from "framer-motion";
import {
  Antenna, Brain, BarChart3, GitBranch, Send, Bell,
  CheckCircle2, Loader2, Clock, Zap
} from "lucide-react";
import { Agent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const agentIcons: Record<string, React.ElementType> = {
  Antenna, Brain, BarChart3, GitBranch, Send, Bell, Zap,
};

const statusConfig = {
  idle: { color: "#3a6a8a", label: "IDLE", bg: "rgba(58,106,138,0.1)" },
  thinking: { color: "#ffcc00", label: "THINKING", bg: "rgba(255,204,0,0.1)" },
  executing: { color: "#00d4ff", label: "EXECUTING", bg: "rgba(0,212,255,0.1)" },
  done: { color: "#00ff88", label: "DONE", bg: "rgba(0,255,136,0.1)" },
};

interface AgentCardProps {
  agent: Agent;
  index?: number;
  expanded?: boolean;
}

export function AgentCard({ agent, index = 0, expanded = false }: AgentCardProps) {
  const Icon = agentIcons[agent.icon] || Brain;
  const status = statusConfig[agent.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={cn(
        "glass rounded-xl border p-4 relative overflow-hidden",
        agent.status === "executing" ? "border-[rgba(0,212,255,0.3)] glow-cyan" :
        agent.status === "thinking" ? "border-[rgba(255,204,0,0.3)]" :
        agent.status === "done" ? "border-[rgba(0,255,136,0.2)]" :
        "border-[rgba(0,212,255,0.1)]"
      )}
    >
      {/* Animated scan line for active agents */}
      {(agent.status === "executing" || agent.status === "thinking") && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-30"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Icon with pulse */}
        <div className="relative shrink-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: status.bg, border: `1px solid ${status.color}33` }}
          >
            <Icon className="w-5 h-5" style={{ color: status.color }} />
          </div>
          {(agent.status === "executing" || agent.status === "thinking") && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute h-full w-full rounded-full opacity-75" style={{ background: status.color }} />
              <span className="relative rounded-full h-3 w-3" style={{ background: status.color }} />
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h3 className="font-semibold text-white text-sm">{agent.name}</h3>
            <span
              className="text-[9px] font-jetbrains font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ color: status.color, background: status.bg }}
            >
              {agent.status === "thinking" && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
              {agent.status === "executing" && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status.color }} />}
              {agent.status === "done" && <CheckCircle2 className="w-2.5 h-2.5" />}
              {status.label}
            </span>
          </div>
          <p className="text-[10px] text-[#3a6a8a] font-jetbrains mb-2">{agent.role}</p>
          <p className="text-xs text-[#7eb3d4] truncate">{agent.currentTask}</p>

          {/* Stats */}
          <div className="flex gap-3 mt-2">
            <div className="flex items-center gap-1 text-[10px] text-[#3a6a8a] font-jetbrains">
              <CheckCircle2 className="w-3 h-3 text-[#00ff88]" />
              {agent.completedTasks.toLocaleString()} tasks
            </div>
          </div>
        </div>
      </div>

      {/* Logs (expanded view) */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-3 border-t border-[rgba(0,212,255,0.1)]"
        >
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {agent.logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-[#00ff88] font-jetbrains text-[10px] shrink-0 mt-0.5">▶</span>
                <span className="text-[11px] text-[#7eb3d4] font-jetbrains">{log}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
