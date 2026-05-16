"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Footer } from "@/components/shared/footer";
import { CrisisTicker } from "@/components/shared/crisis-ticker";
import { Button } from "@/components/ui/button";
import { HolographicPanel, CinematicBadge } from "@/components/ui/cinematic-components";
import { 
  Shield, Brain, Zap, Radio, 
  Map as MapIcon, Activity, ChevronRight,
  Sparkles, Globe, HeartPulse
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-bg-primary overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="vignette" />
      <div className="noise" />
      <div className="fixed inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
      
      {/* Moving Neural Background Simulation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <Navbar />
      <CrisisTicker />

      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-white uppercase">Pakistan National AI Command</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-display font-black text-white leading-tight mb-6">
              AI THAT SAVES LIVES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-shimmer bg-[length:200%_auto]">
                BEFORE HUMANS REACT
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-[#7eb3d4] text-lg md:text-xl font-light leading-relaxed mb-10">
              Introducing ResQ AI — Pakistan&apos;s autonomous disaster operating system. 
              Real-time multi-agent orchestration for floods, heatwaves, and urban crises.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/dashboard">
                <Button className="h-14 px-10 text-lg font-bold glow-cyan group">
                  LAUNCH COMMAND CENTER
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" className="h-14 px-10 text-lg font-bold border-white/10 hover:bg-white/5">
                VIEW LIVE SIMULATION
              </Button>
            </div>
          </motion.div>

          {/* Floating Stats Cards */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {[
              { label: "Active Nodes", val: "12,842", icon: Radio, color: "cyan" },
              { label: "AI Confidence", val: "99.8%", icon: Brain, color: "purple" },
              { label: "Response ETA", val: "1.4m", icon: Zap, color: "yellow" },
              { label: "System Health", val: "Optimal", icon: Activity, color: "green" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <HolographicPanel className="p-4" glowColor={stat.color as any}>
                  <stat.icon className={`w-5 h-5 mb-2 text-${stat.color}-400`} />
                  <p className="text-[10px] uppercase tracking-widest text-[#3a6a8a] mb-1">{stat.label}</p>
                  <p className="text-xl font-display font-bold text-white">{stat.val}</p>
                </HolographicPanel>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <CinematicBadge variant="info">Autonomous Capabilities</CinematicBadge>
            <h2 className="text-4xl font-display font-bold text-white mt-4">ENGINEERED FOR THE UNTHINKABLE</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Neural Crisis Detection",
                desc: "Processing multi-source signals in Roman Urdu, Urdu, and English to detect emergencies with 99% accuracy.",
                icon: Brain,
              },
              {
                title: "Agent Swarm Dispatch",
                desc: "Autonomous multi-agent coordination system that plans and executes rescue missions in seconds.",
                icon: Shield,
              },
              {
                title: "Predictive Simulation",
                desc: "Execution engines that simulate millions of disaster outcomes to find the most efficient path to safety.",
                icon: Zap,
              },
              {
                title: "Tactical City Maps",
                desc: "Live infrastructure monitoring with real-time flood zone prediction and automated traffic rerouting.",
                icon: MapIcon,
              },
              {
                title: "National Alert Grid",
                desc: "Hyper-localized emergency broadcasts reaching citizens before disaster strikes.",
                icon: Radio,
              },
              {
                title: "Vitals Integration",
                desc: "Connecting with medical systems and vitals monitoring for priority-based rescue operations.",
                icon: HeartPulse,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="group relative p-8 rounded-3xl glass border-white/5 hover:border-cyan-500/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-[#7eb3d4] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Workflow Visual Section */}
        <section className="py-32 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <CinematicBadge variant="success">Workflow Orchestration</CinematicBadge>
              <h2 className="text-5xl font-display font-bold text-white mt-6 mb-8">
                AUTONOMOUS <br />
                REASONING CHAIN
              </h2>
              <div className="space-y-6">
                {[
                  "Signal Collection & Ingestion",
                  "NLP-based Intent Detection",
                  "Severity & Impact Analysis",
                  "Dynamic Resource Planning",
                  "Rescue Execution Simulation",
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-white font-mono text-sm"
                  >
                    <div className="w-6 h-6 rounded-full border border-cyan-500 flex items-center justify-center text-[10px] text-cyan-400">
                      {i + 1}
                    </div>
                    {step}
                  </motion.div>
                ))}
              </div>
              <Button className="mt-12 glow-purple">EXPLORE AI ARCHITECTURE</Button>
            </div>
            
            <div className="relative">
              <HolographicPanel className="aspect-square flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full border-2 border-dashed border-cyan-500/20 rounded-full flex items-center justify-center"
                >
                  <div className="w-3/4 h-3/4 border-2 border-dashed border-purple-500/20 rounded-full flex items-center justify-center">
                     <Brain className="w-20 h-20 text-cyan-400 animate-pulse" />
                  </div>
                </motion.div>
                <div className="absolute top-0 right-0 p-4">
                  <Globe className="w-8 h-8 text-white/20 animate-spin" style={{ animationDuration: "10s" }} />
                </div>
              </HolographicPanel>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
