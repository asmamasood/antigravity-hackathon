"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/shared/navbar";
import { BottomNav } from "@/components/shared/bottom-nav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_CRISES, MOCK_RESCUE_UNITS } from "@/lib/mock-data";
import { 
  Map as MapIcon, Navigation, Navigation2, Layers, Filter, 
  Search, Crosshair, Droplets, Thermometer, AlertTriangle,
  Ambulance, Shield, Zap, ChevronRight, Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#020408" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#020408" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#3a6a8a" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#00d4ff" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#7eb3d4" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#050d18" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1a2a3a" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#2a3a4a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#3a6a8a" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2a3a4a" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#3a6a8a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#001a33" }] },
];

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<any>(null);
  const [selectedCrisis, setSelectedCrisis] = useState(MOCK_CRISES[0]);
  const [showFloodZones, setShowFloodZones] = useState(true);
  const [showHeatZones, setShowHeatZones] = useState(false);
  
  // Simulation of moving rescue units
  const [rescuePositions, setRescuePositions] = useState(MOCK_RESCUE_UNITS);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (typeof window === "undefined" || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 24.8607, lng: 67.0011 }, // Karachi
        zoom: 12,
        styles: MAP_STYLE,
        disableDefaultUI: true,
        backgroundColor: "#020408",
      });

      // Add Incident Markers
      MOCK_CRISES.forEach(crisis => {
        const marker = new window.google.maps.Marker({
          position: crisis.coordinates,
          map: map,
          title: crisis.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: crisis.severity === "critical" ? "#ff3366" : "#ffcc00",
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: "#ffffff",
            scale: 10,
          }
        });

        marker.addListener("click", () => {
          setSelectedCrisis(crisis);
        });
      });

      setGoogleMap(map);
    };

    // Check if script is already loaded
    if (window.google) {
      initMap();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          initMap();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  // Update Markers for Rescue Units
  useEffect(() => {
    if (!googleMap) return;

    const markers: any[] = [];
    
    rescuePositions.forEach(unit => {
      const marker = new window.google.maps.Marker({
        position: unit.coordinates,
        map: googleMap,
        icon: {
          path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          fillColor: "#00ff88",
          fillOpacity: 0.9,
          strokeWeight: 1,
          strokeColor: "#ffffff",
          scale: 5,
        }
      });
      markers.push(marker);
    });

    const interval = setInterval(() => {
      setRescuePositions(prev => prev.map(unit => ({
        ...unit,
        coordinates: {
          lat: unit.coordinates.lat + (Math.random() - 0.5) * 0.0005,
          lng: unit.coordinates.lng + (Math.random() - 0.5) * 0.0005
        }
      })));
    }, 4000);

    return () => {
      clearInterval(interval);
      markers.forEach(m => m.setMap(null));
    };
  }, [googleMap, rescuePositions]);

  return (
    <div className="flex flex-col h-screen bg-bg-primary overflow-hidden">
      <Navbar />

      <main className="flex-1 relative overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Sidebar: Controls & Legend (Desktop) */}
        <div className="hidden md:flex w-80 glass-strong border-r border-white/5 flex-col z-20 shadow-2xl">
          <div className="p-4 border-b border-white/5 bg-black/20">
            <div className="flex items-center gap-2 mb-4">
              <MapIcon className="w-5 h-5 text-[#00d4ff]" />
              <h2 className="font-orbitron font-bold text-white uppercase tracking-wider">Tactical Command</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3a6a8a]" />
              <input 
                placeholder="Search sectors..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#00d4ff]/30 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Layers */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-jetbrains font-bold text-[#3a6a8a] uppercase tracking-widest">Map Layers</h3>
              {[
                { label: "Flood Zones", active: showFloodZones, set: setShowFloodZones, icon: Droplets, color: "#0080ff" },
                { label: "Heat Corridors", active: showHeatZones, set: setShowHeatZones, icon: Thermometer, color: "#ff6600" },
                { label: "Rescue Units", active: true, set: () => {}, icon: Ambulance, color: "#00ff88" },
              ].map((layer, i) => (
                <button 
                  key={i}
                  onClick={() => layer.set(!layer.active)}
                  className={cn(
                    "w-full flex items-center justify-between p-2.5 rounded-lg transition-all",
                    layer.active ? "bg-white/5 border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]" : "opacity-40 hover:opacity-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <layer.icon className="w-4 h-4" style={{ color: layer.active ? layer.color : '#3a6a8a' }} />
                    <span className="text-xs text-white font-medium">{layer.label}</span>
                  </div>
                  <div className={cn("w-2 h-2 rounded-full", layer.active ? "bg-[#00ff88] glow-green" : "bg-white/10")} />
                </button>
              ))}
            </div>

            {/* Selected Incident */}
            <div className="space-y-3">
               <h3 className="text-[10px] font-jetbrains font-bold text-[#3a6a8a] uppercase tracking-widest">Active Focus</h3>
               <AnimatePresence mode="wait">
                 <motion.div
                   key={selectedCrisis.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                 >
                    <Card className={cn(
                      "p-4 border-l-4",
                      selectedCrisis.severity === "critical" ? "border-l-[#ff3366] bg-[#ff3366]/5" : "border-l-[#ffcc00] bg-[#ffcc00]/5"
                    )}>
                        <div className="flex justify-between items-start mb-2">
                           <Badge variant={selectedCrisis.severity as any}>{selectedCrisis.severity.toUpperCase()}</Badge>
                           <span className="text-[10px] font-jetbrains text-[#3a6a8a]">{selectedCrisis.id}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1 font-orbitron">{selectedCrisis.title}</h4>
                        <p className="text-[10px] text-[#7eb3d4] mb-4 leading-relaxed">{selectedCrisis.location} — Estimated water depth: 3.2ft.</p>
                        <div className="grid grid-cols-2 gap-2">
                           <Button size="sm" className="w-full text-[9px] h-7 bg-[#ff3366]">Dispatch</Button>
                           <Button variant="outline" size="sm" className="w-full text-[9px] h-7">Details</Button>
                        </div>
                    </Card>
                 </motion.div>
               </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-white/5">
                <h3 className="text-[10px] font-jetbrains font-bold text-[#3a6a8a] uppercase tracking-widest mb-3">Live Feed</h3>
                <div className="space-y-2">
                   {MOCK_CRISES.slice(0, 3).map((c, i) => (
                      <div key={i} className="flex gap-2 items-start p-2 rounded hover:bg-white/5 cursor-pointer" onClick={() => setSelectedCrisis(c)}>
                         <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", c.severity === 'critical' ? 'bg-[#ff3366]' : 'bg-[#ffcc00]')} />
                         <div className="overflow-hidden">
                            <p className="text-[10px] text-white font-bold truncate">{c.title}</p>
                            <p className="text-[9px] text-[#3a6a8a]">{c.timestamp.slice(11, 16)} Z</p>
                         </div>
                      </div>
                   ))}
                </div>
            </div>
          </div>
        </div>

        {/* Real Google Map Container */}
        <div className="flex-1 relative bg-[#020408]">
          <div ref={mapRef} className="absolute inset-0 z-0" />
          
          {/* Overlay Effects */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />
          
          {/* Map Controls (Floating) */}
          <div className="absolute right-6 top-6 flex flex-col gap-2 z-30">
             <button 
              onClick={() => googleMap?.setCenter({ lat: 24.8607, lng: 67.0011 })}
              className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 text-white transition-all shadow-xl"
             >
                <Crosshair className="w-5 h-5 text-[#00d4ff]" />
             </button>
             <button className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 text-xl font-bold text-white shadow-xl">+</button>
             <button className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/10 text-xl font-bold text-white shadow-xl">-</button>
          </div>

          {/* Map Status Info Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto z-30">
             <div className="glass-strong px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-6 overflow-x-auto no-scrollbar shadow-2xl backdrop-blur-3xl">
                <div className="flex items-center gap-2 whitespace-nowrap">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#ff3366] glow-red" />
                   <span className="text-[10px] font-jetbrains text-[#7eb3d4] font-bold">Critical (3)</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#ffcc00] glow-yellow" />
                   <span className="text-[10px] font-jetbrains text-[#7eb3d4] font-bold">Medium (2)</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88] glow-green" />
                   <span className="text-[10px] font-jetbrains text-[#7eb3d4] font-bold">Units (12)</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2 whitespace-nowrap">
                   <Navigation2 className="w-3.5 h-3.5 text-[#00d4ff] animate-pulse" />
                   <span className="text-[10px] font-jetbrains text-[#00d4ff] font-bold">AUTO-ROUTING ACTIVE</span>
                </div>
             </div>
          </div>

          {/* Scanning Animation */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
             <motion.div 
               animate={{ y: ["0%", "100%", "0%"] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent shadow-[0_0_20px_rgba(0,212,255,0.2)]"
             />
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}

// Global window type for Google Maps
declare global {
  interface Window {
    google: any;
  }
}
