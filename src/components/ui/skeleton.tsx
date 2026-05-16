"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  rows?: number;
  circle?: boolean;
}

export function Skeleton({ className, rows = 1, circle = false }: SkeletonProps) {
  if (rows > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "animate-pulse bg-white/5 rounded-lg",
              i === rows - 1 ? "w-3/4" : "w-full",
              "h-4",
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "animate-shimmer",
        circle ? "rounded-full" : "rounded-lg",
        "bg-white/5",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-xl p-4 border border-[rgba(0,212,255,0.1)] space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10" circle />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton rows={3} />
    </div>
  );
}
