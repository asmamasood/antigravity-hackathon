"use client";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { ActivityLog } from "@/lib/mock-data";
import { cn, getSeverityColor } from "@/lib/utils";

interface ActivityTimelineProps {
  logs: ActivityLog[];
  maxItems?: number;
}

export function ActivityTimeline({ logs, maxItems }: ActivityTimelineProps) {
  const items = maxItems ? logs.slice(0, maxItems) : logs;

  return (
    <div className="space-y-0">
      {items.map((log, index) => {
        const color = getSeverityColor(log.severity);
        return (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="flex gap-3 relative"
          >
            {/* Timeline line */}
            {index < items.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-px bg-[rgba(0,212,255,0.1)]" />
            )}

            {/* Dot */}
            <div className="relative z-10 shrink-0 mt-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `${color}18`, border: `1px solid ${color}44` }}
              >
                {log.severity === "critical" ? (
                  <AlertTriangle className="w-3.5 h-3.5" style={{ color }} />
                ) : log.severity === "low" ? (
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color }} />
                ) : (
                  <Activity className="w-3.5 h-3.5" style={{ color }} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-4 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-jetbrains text-[#3a6a8a] flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />{log.timestamp}
                </span>
                <span
                  className="text-[10px] font-jetbrains font-semibold px-1.5 py-0.5 rounded"
                  style={{ color, background: `${color}18` }}
                >
                  {log.agent}
                </span>
              </div>
              <p className="text-sm font-semibold text-white">{log.action}</p>
              <p className="text-xs text-[#7eb3d4] mt-0.5 leading-relaxed">{log.detail}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
