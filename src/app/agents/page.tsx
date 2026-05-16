"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Footer } from "@/components/shared/footer";
import { HolographicPanel, CinematicBadge, AIThinkingLoader } from "@/components/ui/cinematic-components";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Radio, Brain, Activity, Shield, 
  Map as MapIcon, Zap, ChevronRight,
  Database, Cpu, MessageSquare, AlertCircle,
  Clock, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const AGENTS = [
  {
    id: "collector",
    name: "Signal Collector",
    icon: Radio,
    color: "cyan",
    role: "Ingestion & Normalization",
    task: "Monitoring 4.2M social feeds, weather sensors & traffic nodes.",
    reasoning: "Filtering noise from Roman Urdu and Urdu signals using custom NLP transformers.",
    logs: ["Fetched Twitter feed", "Scanned District East Sensors", "Normalized 4,200 data points"]
  },
  {
    id: "detector",
    name: "Crisis Detector",
    icon: Brain,
    color: "purple",
    role: "Intent Classification",
    task: "Identifying emerging disaster patterns using neural vision.",
    reasoning: "Detected cluster of 'water level' keywords matching topographic flood risks.",
    logs: ["Pattern Match: Flash Flood", "Confidence: 96.4%", "Location: Gulshan-e-Iqbal"]
  },
  {
    id: "analyzer",
    name: "Severity Analyzer",
    icon: Activity,
    color: "red",
    role: "Impact Prediction",
    task: "Estimating public safety risks and infrastructure damage.",
    reasoning: "Projected impact on 42,000 residents. Predicted 3 major road blockages within 30 mins.",
    logs: ["Severity: CRITICAL", "Infrastructure Risk: HIGH", "Life Risk: 42k Citizens"]
  },
  {
    id: "planner",
    name: "Resource Planner",
    icon: Shield,
    color: "blue",
    role: "Strategic Orchestration",
    task: "Optimal resource allocation and route calculation.",
    reasoning: "Calculated nearest rescue nodes. Rerouting traffic via Lyari Expressway to avoid surge.",
    logs: ["Node 4 Dispatch: 4 Units", "Traffic Reroute Plan: Alpha", "ETA: 12.4 mins"]
  },
  {
    id: "outcome",
    name: "Outcome Engine",
    icon: Zap,
    color: "green",
    role: "Simulation & Prediction",
    task: "Calculating mission success probability and impact reduction.",
    reasoning: "Predicted 45% reduction in response time compared to manual dispatch.",
    logs: ["Success Prob: 92%", "Lives Saved Projection: 840", "Congestion Delta: -35%"]
  }
];

export default function AgentsWorkflowPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % AGENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary bottom-nav-padding overflow-hidden">
      <div className="fixed inset-0 bg-grid-cyber opacity-10 pointer-events-none" />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 relative z-10">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
           <div>
              <CinematicBadge variant="info">Multi-Agent Orchestration</CinematicBadge>
              <h1 className="text-5xl font-display font-black text-white mt-4 tracking-tighter">AI AGENT SWARM</h1>
              <p className="text-[#7eb3d4] mt-2 font-mono text-sm">Autonomous Intelligence Pipeline | ResQ-Net Core v4.2</p>
           </div>
           <div className="flex gap-4">
              <div className="px-6 py-3 rounded-2xl glass border-white/10 flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-xs font-bold text-white uppercase tracking-widest">Pipeline Active</span>
              </div>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-2xl glass border-white/10 hover:bg-white/5 text-white transition-all"
              >
                 {isPlaying ? "PAUSE SIMULATION" : "RESUME PIPELINE"}
              </button>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Agent Flow Navigation (Left) */}
           <div className="lg:col-span-4 space-y-4">
              {AGENTS.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  onClick={() => { setActiveStep(i); setIsPlaying(false); }}
                  className={cn(
                    "p-5 rounded-2xl transition-all cursor-pointer border group relative overflow-hidden",
                    activeStep === i 
                      ? `bg-${agent.color}-500/10 border-${agent.color}-500/30 shadow-[0_0_20px_rgba(0,212,255,0.1)]` 
                      : "bg-white/5 border-white/5 grayscale hover:grayscale-0 hover:border-white/20"
                  )}
                  whileHover={{ x: 10 }}
                >
                   {activeStep === i && (
                     <motion.div 
                       layoutId="active-indicator"
                       className={cn("absolute inset-y-0 left-0 w-1 bg-cyan-400")} 
                     />
                   )}
                   <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                        activeStep === i ? `bg-${agent.color}-500/20 text-${agent.color}-400 shadow-[0_0_15px_rgba(0,212,255,0.3)]` : "bg-white/10 text-white/50"
                      )}>
                         <agent.icon className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className={cn("font-display font-bold uppercase tracking-wider", activeStep === i ? "text-white" : "text-white/40")}>
                           {agent.name}
                         </h3>
                         <p className="text-[10px] text-[#3a6a8a] uppercase font-bold">{agent.role}</p>
                      </div>
                      <ChevronRight className={cn("w-4 h-4 ml-auto transition-transform", activeStep === i ? "text-cyan-400" : "text-white/20")} />
                   </div>
                </motion.div>
              ))}
           </div>

           {/* Reasoning & Logs (Right) */}
           <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                 {(() => {
                   const currentAgent = AGENTS[activeStep];
                   const AgentIcon = currentAgent.icon;
                   return (
                     <motion.div
                       key={activeStep}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="h-full"
                     >
                        <HolographicPanel className="h-full flex flex-col p-0 border-none" glowColor={currentAgent.color as any}>
                           <div className="p-8 border-b border-white/10 bg-black/20">
                              <div className="flex items-center gap-4 mb-6">
                                 <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", `bg-${currentAgent.color}-500/20`)}>
                                    <AgentIcon className={cn("w-8 h-8", `text-${currentAgent.color}-400`)} />
                                 </div>
                                 <div>
                                    <h2 className="text-3xl font-display font-black text-white uppercase">{currentAgent.name}</h2>
                                    <p className={cn("font-mono text-sm uppercase tracking-widest", `text-${currentAgent.color}-400`)}>
                                      Executing Autonomous Protocol
                                    </p>
                                 </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div>
                                    <p className="text-[10px] uppercase tracking-widest text-[#3a6a8a] mb-3">Core Objective</p>
                                    <p className="text-lg text-white font-light">{currentAgent.task}</p>
                                 </div>
                                 <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-[10px] uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
                                       <Cpu className="w-3 h-3" /> Autonomous Reasoning
                                    </p>
                                    <p className="text-sm text-[#7eb3d4] leading-relaxed italic">
                                       &quot;{currentAgent.reasoning}&quot;
                                    </p>
                                 </div>
                              </div>
                           </div>

                           <div className="flex-1 p-8 overflow-y-auto">
                              <p className="text-[10px] uppercase tracking-widest text-[#3a6a8a] mb-6 flex items-center gap-2">
                                 <Database className="w-3 h-3" /> Execution Log Stream
                              </p>
                              <div className="space-y-4">
                                 {currentAgent.logs.map((log, i) => (
                                   <motion.div
                                     key={i}
                                     initial={{ opacity: 0, x: -10 }}
                                     animate={{ opacity: 1, x: 0 }}
                                     transition={{ delay: i * 0.1 }}
                                     className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
                                   >
                                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                                      <div>
                                         <p className="text-xs text-white font-mono">{log}</p>
                                         <p className="text-[9px] text-[#3a6a8a] uppercase mt-1">Processed: 0.{i}ms ago</p>
                                      </div>
                                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto opacity-50" />
                                   </motion.div>
                                 ))}
                                 
                                 <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-white/10 opacity-50">
                                    <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                    <p className="text-xs text-cyan-400 font-mono italic">Continuously monitoring signal nodes...</p>
                                 </div>
                              </div>
                           </div>

                           <div className="p-8 bg-black/40 border-t border-white/5 flex items-center justify-between">
                              <div className="flex gap-8">
                                 <div>
                                    <p className="text-[10px] uppercase tracking-widest text-[#3a6a8a] mb-1">State</p>
                                    <p className="text-sm text-green-400 font-black">SYNCHRONIZED</p>
                                 </div>
                                 <div>
                                    <p className="text-[10px] uppercase tracking-widest text-[#3a6a8a] mb-1">Tokens</p>
                                    <p className="text-sm text-white font-black">4,821 / 1.5M</p>
                                 </div>
                              </div>
                              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                 VIEW NEURAL TRACE
                              </Button>
                           </div>
                        </HolographicPanel>
                     </motion.div>
                   );
                 })()}
              </AnimatePresence>
           </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
