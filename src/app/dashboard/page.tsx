"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Footer } from "@/components/shared/footer";
import { CrisisCard } from "@/components/shared/crisis-card";
import { ActivityTimeline } from "@/components/shared/activity-timeline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MOCK_CRISES, MOCK_ACTIVITY_LOGS, ANALYTICS_DATA } from "@/lib/mock-data";
import { 
  Activity, Shield, AlertTriangle, Users, 
  Clock, TrendingUp, Filter, Search, CloudRain,
  Thermometer, Droplets, Wind, RefreshCw
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie 
} from "recharts";

export default function DashboardPage() {
  const [weather, setWeather] = useState<any>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const activeCrises = MOCK_CRISES.filter(c => c.status !== "resolved");

  const fetchLiveData = async () => {
    setIsLoadingWeather(true);
    try {
      const res = await fetch('http://localhost:5000/api/signals');
      const data = await res.json();
      setWeather(data.weather);
    } catch (error) {
      console.error("Failed to fetch live weather", error);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary bottom-nav-padding">
      <Navbar />
      
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active Incidents", value: "6", icon: AlertTriangle, color: "#ff3366" },
            { label: "AI Confidence", value: "96.7%", icon: Shield, color: "#00d4ff" },
            { label: "People at Risk", value: "32.4k", icon: Users, color: "#ffcc00" },
            { label: "Response State", value: "Optimal", icon: Activity, color: "#00ff88" }
          ].map((stat, i) => (
            <Card key={i} className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-[10px] font-jetbrains text-[#3a6a8a] uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-white font-orbitron">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Live Feed & Weather */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Live Weather Widget */}
            <Card className="bg-gradient-to-br from-[#050d18] to-[#020408] border-[#00d4ff]/20">
               <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xs flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-[#00d4ff]" /> Live Karachi Weather
                    </CardTitle>
                    <button onClick={fetchLiveData} disabled={isLoadingWeather}>
                       <RefreshCw className={cn("w-3 h-3 text-[#3a6a8a]", isLoadingWeather && "animate-spin")} />
                    </button>
                  </div>
               </CardHeader>
               <CardContent>
                  {weather ? (
                    <div className="grid grid-cols-2 gap-4">
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[#00d4ff]/10">
                             <Thermometer className="w-5 h-5 text-[#00d4ff]" />
                          </div>
                          <div>
                             <p className="text-[10px] text-[#3a6a8a] uppercase">Temp</p>
                             <p className="text-lg font-bold text-white">{weather.temp}°C</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[#00ff88]/10">
                             <Droplets className="w-5 h-5 text-[#00ff88]" />
                          </div>
                          <div>
                             <p className="text-[10px] text-[#3a6a8a] uppercase">Humidity</p>
                             <p className="text-lg font-bold text-white">{weather.humidity}%</p>
                          </div>
                       </div>
                       <div className="col-span-2 p-3 rounded-xl bg-white/5 border border-white/5">
                          <div className="flex justify-between items-center">
                             <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full", weather.isRainy ? "bg-[#ff3366] animate-pulse" : "bg-[#00ff88]")} />
                                <span className="text-xs text-white font-medium capitalize">{weather.description}</span>
                             </div>
                             {weather.isRainy && <Badge variant="critical" className="text-[9px]">Rain Alert</Badge>}
                          </div>
                       </div>
                    </div>
                  ) : (
                    <div className="h-20 flex items-center justify-center">
                       <div className="w-4 h-4 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
               </CardContent>
            </Card>

            <Card className="flex-1 flex flex-col min-h-[500px]">
              <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#ff3366]" />
                    <CardTitle>Live Crisis Feed</CardTitle>
                  </div>
                  <Badge variant="critical" pulse>6 Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto max-h-[600px] custom-scrollbar">
                <div className="p-4 space-y-4">
                  {activeCrises.map((crisis, i) => (
                    <CrisisCard key={crisis.id} crisis={crisis} index={i} compact />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column: Visualizations */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Main AI Confidence Meter */}
            <Card>
              <CardHeader>
                <CardTitle>AI Reasoning Engine Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-[#7eb3d4]">Signal Extraction Accuracy</span>
                      <span className="text-[#00ff88]">98.2%</span>
                    </div>
                    <Progress value={98} color="green" size="sm" animated />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-[#7eb3d4]">Crisis Prediction Confidence</span>
                      <span className="text-[#00d4ff]">94.7%</span>
                    </div>
                    <Progress value={94} color="cyan" size="sm" animated />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-[#7eb3d4]">Resource Optimization Level</span>
                      <span className="text-[#ffcc00]">89.1%</span>
                    </div>
                    <Progress value={89} color="yellow" size="sm" animated />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time Comparison */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Response Impact (Minutes)</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ANALYTICS_DATA.responseTimeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#3a6a8a" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(5, 15, 30, 0.9)', borderColor: 'rgba(0, 212, 255, 0.2)', fontSize: '10px', borderRadius: '8px' }}
                      itemStyle={{ color: '#00d4ff' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                      {ANALYTICS_DATA.responseTimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 1 ? '#00d4ff' : '#3a6a8a'} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Crisis Type Distribution */}
            <Card>
               <CardHeader>
                  <CardTitle>Incident Distribution</CardTitle>
               </CardHeader>
               <CardContent className="h-[200px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ANALYTICS_DATA.crisisTypeDistribution}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ANALYTICS_DATA.crisisTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(5, 15, 30, 0.9)', borderColor: 'rgba(0, 212, 255, 0.2)', fontSize: '10px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {ANALYTICS_DATA.crisisTypeDistribution.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-[#7eb3d4]">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                        {d.name}
                      </div>
                    ))}
                  </div>
               </CardContent>
            </Card>
          </div>

          {/* Right Column: Agent Activity */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <Card className="flex-1 flex flex-col">
              <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#00ff88]" />
                  <CardTitle>Autonomous Agent Logs</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 overflow-y-auto max-h-[800px] custom-scrollbar">
                <ActivityTimeline logs={MOCK_ACTIVITY_LOGS} />
              </CardContent>
            </Card>
          </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
