"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Footer } from "@/components/shared/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SOCIAL_MEDIA_REPORTS } from "@/lib/mock-data";
import { 
  Brain, Send, Mic, Search, Globe, MessageSquare, 
  MapPin, AlertTriangle, ShieldCheck, Zap, Info,
  Bird, MessageCircle, Tablet, Languages
} from "lucide-react";

export default function DetectionPage() {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | any>(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        type: "flood",
        location: "Karachi, Gulshan Area",
        severity: "critical",
        confidence: 94.8,
        language: "Roman Urdu",
        reasoning: "The input contains keywords 'paani' (water), 'doob' (submerged), and 'rescue' along with a specific location 'Gulshan'. Contextual analysis indicates residential flooding with high urgency.",
        impact: "High - Residential zone, likely multiple casualties if not responded.",
        entities: ["Karachi", "Gulshan", "Street 14", "Paani"]
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary bottom-nav-padding">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Input & Feed */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-orbitron font-bold text-white flex items-center gap-3">
                <Brain className="w-8 h-8 text-[#00d4ff]" />
                Crisis Detection Lab
              </h1>
              <p className="text-[#7eb3d4] text-sm">
                Multilingual AI inference engine detecting emergencies from text, social media, and citizen reports.
              </p>
            </div>

            {/* Input Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                   <Badge variant="info" className="gap-1.5"><Languages className="w-3 h-3" /> Roman Urdu</Badge>
                   <Badge variant="info" className="gap-1.5"><Languages className="w-3 h-3" /> Urdu</Badge>
                   <Badge variant="info" className="gap-1.5"><Globe className="w-3 h-3" /> English</Badge>
                </div>
                <div className="text-[10px] font-jetbrains text-[#3a6a8a] uppercase tracking-widest">Inference v4.2</div>
              </div>
              
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter citizen report or paste social media text... (e.g., 'Gulshan mein paani bohot zyada aa gaya hai')"
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-[#3a6a8a] focus:outline-none focus:border-[#00d4ff]/50 transition-all resize-none font-jetbrains text-sm"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                   <Button variant="ghost" size="sm" icon={<Mic className="w-4 h-4" />}>Voice</Button>
                   <Button 
                    onClick={handleAnalyze} 
                    loading={isAnalyzing} 
                    disabled={!inputText.trim()}
                    className="glow-cyan"
                    icon={<Zap className="w-4 h-4" />}
                  >
                    Analyze Signal
                  </Button>
                </div>
              </div>
            </Card>

            {/* Social Media Simulation */}
            <div className="space-y-4">
              <h3 className="text-xs font-jetbrains font-bold text-[#3a6a8a] uppercase tracking-[0.2em] px-2">Live Social Intelligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SOCIAL_MEDIA_REPORTS.map((report, i) => (
                  <Card key={report.id} hover className="p-4 group">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {report.platform === "Twitter/X" ? <Bird className="w-3.5 h-3.5 text-[#1DA1F2]" /> : 
                           report.platform === "Facebook" ? <MessageCircle className="w-3.5 h-3.5 text-[#1877F2]" /> :
                           <Tablet className="w-3.5 h-3.5 text-[#25D366]" />}
                          <span className="text-[10px] font-bold text-white/70">{report.handle}</span>
                       </div>
                       <span className="text-[10px] text-[#3a6a8a] font-jetbrains">{report.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#7eb3d4] mb-3 line-clamp-2 italic">&quot;{report.text}&quot;</p>
                    <div className="flex items-center justify-between">
                       <Badge variant="info" className="text-[9px] py-0">{report.language}</Badge>
                       <div className="flex items-center gap-1">
                          <span className="text-[9px] text-[#3a6a8a] font-jetbrains">AI Confidence:</span>
                          <span className="text-[9px] font-bold text-[#00ff88]">{report.confidence}%</span>
                       </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Analysis Results */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full min-h-[500px] glass rounded-2xl flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full border-2 border-[#00d4ff]/20 flex items-center justify-center animate-spin duration-[3000ms]">
                       <div className="w-2 h-2 rounded-full bg-[#00d4ff] absolute top-0" />
                    </div>
                    <Brain className="w-8 h-8 text-[#00d4ff] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-white mb-2">Inference Running</h3>
                  <p className="text-[#7eb3d4] text-sm font-jetbrains max-w-[200px]">Extracting entities, determining intent, and scoring severity...</p>
                </motion.div>
              ) : analysisResult ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <Card className="glow-cyan border-[#00d4ff]/30 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0080ff] to-[#00d4ff]" />
                    <CardHeader>
                      <div className="flex items-center justify-between w-full">
                        <CardTitle className="text-[#00d4ff]">Inference Report</CardTitle>
                        <ShieldCheck className="w-5 h-5 text-[#00ff88]" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#3a6a8a] font-jetbrains uppercase">Crisis Type</span>
                          <div className="text-white font-bold flex items-center gap-2">
                             <AlertTriangle className="w-4 h-4 text-[#ffcc00]" />
                             {analysisResult.type.toUpperCase()}
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-[10px] text-[#3a6a8a] font-jetbrains uppercase">Confidence</span>
                          <div className="text-[#00ff88] font-bold font-orbitron">{analysisResult.confidence}%</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-[#3a6a8a] font-jetbrains uppercase">Extracted Location</span>
                        <div className="text-white font-semibold flex items-center gap-2">
                           <MapPin className="w-4 h-4 text-[#ff3366]" />
                           {analysisResult.location}
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-[10px] text-[#3a6a8a] font-jetbrains uppercase block mb-2">AI Reasoning</span>
                        <p className="text-xs text-[#7eb3d4] leading-relaxed font-jetbrains italic">
                          &quot;{analysisResult.reasoning}&quot;
                        </p>
                      </div>

                      <div className="space-y-2">
                         <div className="flex justify-between text-xs">
                            <span className="text-[#7eb3d4]">Severity Score</span>
                            <span className="text-[#ff3366] font-bold">9.2 / 10</span>
                         </div>
                         <Progress value={92} color="red" size="sm" />
                      </div>

                      <div className="pt-4 flex gap-3">
                         <Button className="flex-1" icon={<Send className="w-4 h-4" />}>Dispatch Rescue</Button>
                         <Button variant="outline" className="flex-1">Verify Source</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Entity extraction card */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="text-xs">Extracted Entities</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="flex flex-wrap gap-2">
                           {analysisResult.entities.map((ent: string, i: number) => (
                              <Badge key={i} variant="info" className="lowercase font-jetbrains text-[10px]">#{ent}</Badge>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="h-full min-h-[500px] glass rounded-2xl flex flex-col items-center justify-center p-8 text-center opacity-50">
                  <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center mb-6">
                    <Info className="w-6 h-6 text-[#3a6a8a]" />
                  </div>
                  <h3 className="text-lg font-orbitron font-bold text-white mb-2">Ready for Signal</h3>
                  <p className="text-[#3a6a8a] text-xs font-jetbrains max-w-[220px]">
                    Analysis results will appear here after processing input text or social feeds.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
