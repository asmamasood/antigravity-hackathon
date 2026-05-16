"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Footer } from "@/components/shared/footer";
import { HolographicPanel, CinematicBadge } from "@/components/ui/cinematic-components";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, TrendingDown, Users, Clock, 
  Shield, Activity, Zap, CheckCircle2,
  TrendingUp, Download, Share2, ArrowRight
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, CartesianGrid, BarChart, Bar, Cell 
} from "recharts";
import { cn } from "@/lib/utils";

const PERFORMANCE_DATA = [
  { name: "0m", manual: 0, ai: 0 },
  { name: "5m", manual: 5, ai: 25 },
  { name: "10m", manual: 12, ai: 65 },
  { name: "15m", manual: 25, ai: 95 },
  { name: "20m", manual: 35, ai: 100 },
  { name: "30m", manual: 55, ai: 100 },
];

const IMPACT_METRICS = [
  { label: "Response Speed", manual: "42 min", ai: "4.2 min", icon: Clock, diff: "90% Faster", color: "cyan" },
  { label: "Resource Efficiency", manual: "65%", ai: "98%", icon: Zap, diff: "33% Gain", color: "purple" },
  { label: "People Protected", manual: "1,240", ai: "12,400", icon: Users, diff: "10x Safety", color: "green" },
  { label: "Infrastructure Saved", manual: "32%", ai: "84%", icon: Shield, diff: "+52% Protected", color: "blue" },
];

export default function SimulationResultsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary bottom-nav-padding overflow-hidden">
      <div className="fixed inset-0 bg-grid-cyber opacity-10 pointer-events-none" />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 relative z-10">
        <header className="mb-12">
           <CinematicBadge variant="success">Mission Analysis Report</CinematicBadge>
           <h1 className="text-5xl font-display font-black text-white mt-4 tracking-tighter uppercase">Simulation Results</h1>
           <p className="text-[#7eb3d4] mt-2 max-w-2xl">
             Comparing AI-orchestrated response vs manual procedures for the <b>Karachi Floods 2026 Scenario.</b>
           </p>
        </header>

        {/* Primary Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {IMPACT_METRICS.map((metric, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
                <HolographicPanel className="p-6" glowColor={metric.color as any}>
                   <div className="flex items-center justify-between mb-6">
                      <div className={cn("p-2 rounded-lg bg-white/5", `text-${metric.color}-400`)}>
                         <metric.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-green-400 flex items-center gap-1">
                         <TrendingUp className="w-3 h-3" /> {metric.diff}
                      </span>
                   </div>
                   <p className="text-[10px] uppercase tracking-widest text-[#3a6a8a] mb-4">{metric.label}</p>
                   
                   <div className="space-y-4">
                      <div>
                         <p className="text-[10px] text-white/40 uppercase mb-1">Manual Output</p>
                         <p className="text-xl font-display font-bold text-white/50">{metric.manual}</p>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                         <p className="text-[10px] text-cyan-400 uppercase mb-1">ResQ AI Output</p>
                         <p className="text-3xl font-display font-black text-white">{metric.ai}</p>
                      </div>
                   </div>
                </HolographicPanel>
             </motion.div>
           ))}
        </div>

        {/* Charts & Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
           
           {/* Velocity Chart */}
           <div className="lg:col-span-8">
              <HolographicPanel className="p-8 h-full">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Mission Execution Velocity</h3>
                    <div className="flex gap-4">
                       <div className="flex items-center gap-2 text-[10px] text-cyan-400">
                          <div className="w-2 h-2 rounded-full bg-cyan-400" /> ResQ AI
                       </div>
                       <div className="flex items-center gap-2 text-[10px] text-[#3a6a8a]">
                          <div className="w-2 h-2 rounded-full bg-[#3a6a8a]" /> Standard Ops
                       </div>
                    </div>
                 </div>
                 
                 <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={PERFORMANCE_DATA}>
                          <defs>
                             <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                          <XAxis dataKey="name" stroke="#3a6a8a" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis stroke="#3a6a8a" fontSize={10} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(5, 15, 30, 0.9)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '12px' }}
                          />
                          <Area type="monotone" dataKey="ai" stroke="#00d4ff" fillOpacity={1} fill="url(#colorAI)" strokeWidth={3} />
                          <Area type="monotone" dataKey="manual" stroke="#3a6a8a" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </HolographicPanel>
           </div>

           {/* AI Reasoning Summary */}
           <div className="lg:col-span-4">
              <HolographicPanel className="h-full flex flex-col p-8" glowColor="purple">
                 <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-8">AI Post-Incident Reasoning</h3>
                 
                 <div className="flex-1 space-y-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                       <p className="text-[10px] text-cyan-400 font-bold uppercase mb-2">Key Decision #1</p>
                       <p className="text-sm text-[#7eb3d4] leading-relaxed">
                         &quot;Rerouted ambulances through <b>Sector 4-B</b> despite 1.2m water level because AI predicted drainage rate would clear path within 8 minutes.&quot;
                       </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                       <p className="text-[10px] text-purple-400 font-bold uppercase mb-2">Optimization Result</p>
                       <p className="text-sm text-[#7eb3d4] leading-relaxed">
                         Autonomous multi-agent syncing prevented resource collision at <b>Johar Chowrangi</b>, saving 18 critical minutes.
                       </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20">
                       <p className="text-[10px] text-green-400 font-bold uppercase mb-2">Final Outcome</p>
                       <p className="text-lg text-white font-bold">
                         MISSION SUCCESS: 98.4%
                       </p>
                    </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
                    <Button className="w-full h-12 glow-cyan font-bold"><Download className="w-4 h-4 mr-2" /> EXPORT FULL REPORT</Button>
                    <Button variant="outline" className="w-full h-12 border-white/10"><Share2 className="w-4 h-4 mr-2" /> SHARE WITH COMMAND</Button>
                 </div>
              </HolographicPanel>
           </div>
        </div>

        {/* Tactical Success List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: "Grid Integrity Maintained", val: "94%", desc: "Power grid managed by AI to avoid short-circuiting in flood zones." },
             { title: "Traffic Rerouting Success", val: "100%", desc: "Zero vehicles stranded in primary flood corridors." },
             { title: "Alert Reach", val: "4.2M", desc: "Citizens notified via hyper-local emergency pulse broadcasts." },
           ].map((item, i) => (
             <Card key={i} className="p-6 bg-white/5 border-white/5 group hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                   <h4 className="text-sm font-display font-bold text-[#7eb3d4] uppercase">{item.title}</h4>
                   <div className="p-1 rounded bg-green-500/20">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                   </div>
                </div>
                <p className="text-3xl font-display font-black text-white mb-2">{item.val}</p>
                <p className="text-xs text-[#3a6a8a]">{item.desc}</p>
             </Card>
           ))}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
