"use client";

import AppShell from "@/components/layout/AppShell";
import { useState } from "react";
import { Layers, MapPin } from "lucide-react";

export default function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState("ALL");
  const layers = ["ALL", "WEATHER", "WATER", "FLOOD", "TRAFFIC"];

  return (
    <AppShell>
      <div className="relative w-full h-full">
        {/* Map Placeholder (Simulating MapLibre/Leaflet) */}
        <div className="absolute inset-0 bg-[#0a1526] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-80 flex flex-col items-center justify-center">
           <div className="w-[800px] h-[800px] border border-white/5 rounded-full absolute mix-blend-overlay"></div>
           <div className="w-[600px] h-[600px] border border-electricBlue/20 rounded-full absolute mix-blend-overlay"></div>
           <div className="w-[400px] h-[400px] border border-cyan/40 rounded-full absolute animate-[pulse_4s_ease-in-out_infinite]"></div>
           <div className="text-gray-500 text-2xl font-light tracking-widest mt-32">ALL-INDIA RISK MAP</div>
           
           {/* Simulated Map Markers */}
           <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-red rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-ping"></div>
           <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-amber rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
           <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-emerald rounded-full shadow-[0_0_15px_rgba(5,150,105,0.8)]"></div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-24 left-8 right-8 flex justify-between pointer-events-none">
          <div className="glass-panel p-2 rounded-xl flex space-x-2 pointer-events-auto">
            <div className="px-3 py-1 text-xs font-semibold text-gray-400 flex items-center">
              <Layers className="w-4 h-4 mr-2" />
              LAYERS
            </div>
            <div className="w-px h-6 bg-white/20 self-center"></div>
            {layers.map(layer => (
              <button 
                key={layer}
                onClick={() => setSelectedLayer(layer)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  selectedLayer === layer 
                    ? 'bg-electricBlue text-navy shadow-[0_0_10px_rgba(0,229,255,0.5)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Region Panel */}
        <div className="absolute right-8 top-40 w-80 glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
             <div>
               <h3 className="text-xl font-bold text-white flex items-center">
                 <MapPin className="w-5 h-5 mr-2 text-cyan" />
                 Maharashtra
               </h3>
               <p className="text-sm text-gray-400">Pune District</p>
             </div>
             <div className="px-2 py-1 bg-red/20 text-red text-xs font-bold rounded border border-red/30">
               HIGH
             </div>
          </div>
          
          <div className="space-y-4 my-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">Top Risk</div>
              <div className="text-white font-medium">Urban Flood Risk</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Data Source</div>
              <div className="text-cyan text-xs font-bold">SEEDED DEMO</div>
            </div>
          </div>
          
          <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-colors">
            VIEW DETAILS
          </button>
        </div>
      </div>
    </AppShell>
  );
}
