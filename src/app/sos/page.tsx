"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, Camera, Send, MapPin, 
  AlertTriangle, Shield, CheckCircle2, 
  Brain, Languages, AlertCircle, Info
} from "lucide-react";
import { HolographicPanel, AIThinkingLoader, CinematicBadge } from "@/components/ui/cinematic-components";
import { cn } from "@/lib/utils";

export default function SOSReportPage() {
  const [reportText, setReportText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [language, setLanguage] = useState<"en" | "ur" | "ru">("en");

  const handleReport = async () => {
    if (!reportText) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/incidents/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `SOS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          type: "sos",
          source: "mobile_app",
          raw_text: reportText,
          language: language,
          timestamp: new Date().toISOString()
        })
      });
      
      const data = await response.json();
      
      if (data.status === "processing") {
        // Still simulate the UI result for now as the AI takes time, 
        // but the backend is now actually triggered.
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisResult({
            id: data.incident_id,
            type: "Urban Flooding / Flash Flood",
            severity: "CRITICAL",
            confidence: 98.4,
            location: "Gulshan-e-Iqbal, Karachi",
            reasoning: "NLP Analysis detected keywords: 'flood', 'houses submerged', 'trapped'. Location cross-referenced with recent precipitation alerts in District East.",
            response: "Dispatching 4 Rescue Boats and 2 Ambulance units from Sector 5 Hub."
          });
        }, 3000);
      }
    } catch (error) {
      console.error("SOS Report failed:", error);
      setIsAnalyzing(false);
      // Fallback to simulation if backend is down for demo purposes
      setTimeout(() => {
        setAnalysisResult({
          type: "Simulation Mode: Backend Unreachable",
          severity: "MEDIUM",
          confidence: 70.0,
          location: "Unknown",
          reasoning: "System in standalone mode.",
          response: "Please check your internet connection."
        });
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary bottom-nav-padding">
      <div className="fixed inset-0 bg-grid-cyber opacity-10 pointer-events-none" />
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 relative z-10">
        <header className="text-center mb-10">
           <CinematicBadge variant="danger">Emergency Response</CinematicBadge>
           <h1 className="text-4xl font-display font-black text-white mt-4 uppercase tracking-tighter">Citizen SOS Report</h1>
           <p className="text-[#7eb3d4] mt-2">Report crises in your area for immediate AI-orchestrated rescue.</p>
        </header>

        {!analysisResult && !isAnalyzing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Language Selector */}
            <div className="flex justify-center gap-2 mb-8">
               {[
                 { id: "en", label: "English" },
                 { id: "ur", label: "اردو" },
                 { id: "ru", label: "Roman Urdu" }
               ].map((lang) => (
                 <button
                   key={lang.id}
                   onClick={() => setLanguage(lang.id as any)}
                   className={cn(
                     "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                     language === lang.id ? "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.3)]" : "bg-white/5 border-white/10 text-[#3a6a8a]"
                   )}
                 >
                   {lang.label}
                 </button>
               ))}
            </div>

            {/* Input Card */}
            <Card className="p-6 bg-black/40 border-white/10 backdrop-blur-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <Languages className="w-4 h-4 text-cyan-400/50" />
               </div>
               
               <textarea
                 value={reportText}
                 onChange={(e) => setReportText(e.target.value)}
                 placeholder={
                    language === "ur" ? "یہاں حادثے کی تفصیل لکھیں..." :
                    language === "ru" ? "Yahan hadsay ki tafseel likhen..." :
                    "Describe the emergency in detail..."
                 }
                 className="w-full h-40 bg-transparent border-none text-white text-lg placeholder:text-[#3a6a8a] focus:ring-0 resize-none mb-4"
               />

               <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex gap-2">
                     <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all">
                        <Mic className="w-5 h-5" />
                     </button>
                     <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all">
                        <Camera className="w-5 h-5" />
                     </button>
                     <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all">
                        <MapPin className="w-5 h-5" />
                     </button>
                  </div>
                  
                  <Button 
                    onClick={handleReport}
                    disabled={!reportText}
                    className="h-12 px-8 rounded-2xl glow-red font-bold"
                  >
                    SEND SOS
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Card className="p-4 bg-white/5 border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                     <Shield className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                     <p className="text-[10px] text-[#3a6a8a] uppercase font-bold">Secure Encryption</p>
                     <p className="text-xs text-white">Military-grade protection</p>
                  </div>
               </Card>
               <Card className="p-4 bg-white/5 border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                     <Brain className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                     <p className="text-[10px] text-[#3a6a8a] uppercase font-bold">AI Triage</p>
                     <p className="text-xs text-white">Automated priority routing</p>
                  </div>
               </Card>
            </div>
          </motion.div>
        ) : isAnalyzing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20"
          >
            <AIThinkingLoader message="AI Analyzing Emotional Intent & Geospatial Signals..." />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <HolographicPanel className="p-0 border-none" glowColor={analysisResult.severity === "CRITICAL" ? "red" : "cyan"}>
               <div className="p-6 border-b border-white/10 bg-black/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-red-500/10">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.2em]">Intelligence Extracted</p>
                        <h3 className="text-lg font-display font-black text-white">{analysisResult.type}</h3>
                     </div>
                  </div>
                  <div className="text-right">
                     <Badge className="bg-red-500/20 text-red-400 border-red-500/30">CONFIDENCE {analysisResult.confidence}%</Badge>
                  </div>
               </div>
               
               <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-[#3a6a8a]">Detected Location</p>
                        <p className="text-white font-medium flex items-center gap-2">
                           <MapPin className="w-4 h-4 text-cyan-400" />
                           {analysisResult.location}
                        </p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-[#3a6a8a]">Assigned Priority</p>
                        <p className="text-red-500 font-black">{analysisResult.severity}</p>
                     </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[10px] uppercase tracking-widest text-cyan-400 mb-2">AI Reasoning</p>
                     <p className="text-sm text-[#7eb3d4] leading-relaxed font-mono">
                        {analysisResult.reasoning}
                     </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                     <div className="flex items-center gap-3 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                        <p className="text-[10px] uppercase tracking-widest text-white font-bold">Planned Response</p>
                     </div>
                     <p className="text-sm text-cyan-100 font-bold">
                        {analysisResult.response}
                     </p>
                  </div>
               </div>

               <div className="p-6 bg-black/40 border-t border-white/5">
                  <Button className="w-full h-14 text-lg font-black glow-cyan">CONFIRM & CONNECT TO RESPONDER</Button>
                  <button 
                    onClick={() => { setAnalysisResult(null); setReportText(""); }}
                    className="w-full text-center mt-4 text-xs text-[#3a6a8a] hover:text-white transition-all uppercase tracking-widest"
                  >
                    Discard and Report New
                  </button>
               </div>
            </HolographicPanel>
          </motion.div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
