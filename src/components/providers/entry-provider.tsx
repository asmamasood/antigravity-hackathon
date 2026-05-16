"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Shield, Zap, Radio, Database, Cpu } from "lucide-react";

export function EntryProvider({ children }: { children: React.ReactNode }) {
  const [isBooting, setIsBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  const bootSteps = [
    { icon: Database, label: "Synchronizing Regional Signal Nodes...", delay: 800 },
    { icon: Cpu, label: "Loading Neural Triage Transformers...", delay: 1200 },
    { icon: Brain, label: "Initializing ResQ-Net Core v4.2...", delay: 1000 },
    { icon: Shield, label: "Activating Autonomous Response Protocols...", delay: 800 },
    { icon: Zap, label: "Command Center Online. Ready.", delay: 500 },
  ];

  useEffect(() => {
    let currentStep = 0;
    const runBootSequence = async () => {
      for (const step of bootSteps) {
        setBootStep(currentStep);
        await new Promise(resolve => setTimeout(resolve, step.delay));
        currentStep++;
      }
      setIsBooting(false);
    };

    runBootSequence();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isBooting && (
          <motion.div
            key="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#020408] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-grid-cyber opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1)_0%,transparent_70%)]" />
            
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative mb-12"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(0,212,255,0.4)]">
                 <Shield className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-cyan-500/20 rounded-full"
              />
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-display font-black text-white mb-2 tracking-[0.2em]"
            >
              RESQ AI
            </motion.h1>
            <p className="text-[10px] text-[#3a6a8a] font-bold uppercase tracking-[0.5em] mb-20">Autonomous Command</p>

            {/* Boot Progress */}
            <div className="w-64 space-y-4">
               <div className="flex items-center gap-3">
                  <motion.div
                    key={bootStep}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="p-2 rounded-lg bg-cyan-500/10"
                  >
                    {(() => {
                      const StepIcon = bootSteps[bootStep].icon;
                      return <StepIcon className="w-4 h-4 text-cyan-400" />;
                    })()}
                  </motion.div>
                  <p className="text-[10px] text-cyan-100 font-mono tracking-wider">
                    {bootSteps[bootStep]?.label}
                  </p>
               </div>
               
               <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${(bootStep / (bootSteps.length - 1)) * 100}%` }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                  />
               </div>
            </div>

            {/* Scanning Line */}
            <motion.div 
              animate={{ y: ["0vh", "100vh"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-px bg-cyan-500/20 blur-sm pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={isBooting ? "hidden" : "block"}>
        {children}
      </div>
    </>
  );
}
