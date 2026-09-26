"use client";

import AppShell from "@/components/layout/AppShell";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Activity, Droplets, CloudRain, Car, Zap } from "lucide-react";

interface SimulationImpacts {
  floodRisk: string;
  trafficDisruption: string;
  infrastructureRisk: string;
  emergencyAccess: string;
}

export default function FuturePage() {
  const [rainfall, setRainfall] = useState(100);
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'results'>('idle');
  const [impacts, setImpacts] = useState<SimulationImpacts | null>(null);

  const runSimulation = () => {
    setSimulationState('running');
    
    fetch('/api/backend/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rainfall, region: 'Maharashtra' })
    })
    .then(res => res.json())
    .then(data => {
      setImpacts(data.impacts);
      setTimeout(() => {
        setSimulationState('results');
      }, 3000); // Keep artificial delay for the visual agent animation
    })
    .catch(err => {
      console.error(err);
      setSimulationState('results');
    });
  };

  return (
    <AppShell>
      <div className="p-8 pt-24 h-full flex flex-col relative">
        <header className="mb-8">
          <h1 className="text-4xl font-light tracking-wide text-white mb-2">WHAT IF?</h1>
          <p className="text-gray-400 text-lg">Change the future variables. Understand the possible consequences.</p>
        </header>

        <div className="grid grid-cols-12 gap-8 flex-1">
          {/* Controls Panel */}
          <div className="col-span-5 flex flex-col space-y-6">
             <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <label className="block text-xs font-semibold text-gray-400 tracking-wider mb-2">REGION</label>
                <div className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white">
                  INDIA ▼ (Maharashtra)
                </div>
             </div>

             <div className="glass-panel p-6 rounded-2xl border border-electricBlue/20 flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-electricBlue/5 blur-3xl rounded-full"></div>
                
                <div className="flex space-x-4 mb-8">
                   <button className="px-4 py-2 bg-electricBlue/10 text-electricBlue rounded-lg border border-electricBlue/30 text-sm font-semibold flex items-center">
                     <CloudRain className="w-4 h-4 mr-2" /> Rainfall
                   </button>
                   <button className="px-4 py-2 bg-white/5 text-gray-400 hover:text-white rounded-lg border border-transparent text-sm font-semibold">
                     Temperature
                   </button>
                   <button className="px-4 py-2 bg-white/5 text-gray-400 hover:text-white rounded-lg border border-transparent text-sm font-semibold">
                     Traffic
                   </button>
                </div>

                <div className="my-12">
                   <div className="flex justify-between items-end mb-4">
                     <div>
                       <div className="text-xs text-gray-500 mb-1">BASELINE</div>
                       <div className="text-2xl text-white">100 mm</div>
                     </div>
                     <div className="text-right">
                       <div className="text-xs text-electricBlue mb-1">SCENARIO</div>
                       <div className="text-4xl font-bold text-electricBlue">{rainfall} mm</div>
                     </div>
                   </div>
                   
                   {/* Slider */}
                   <input 
                     type="range" 
                     min="50" 
                     max="300" 
                     value={rainfall}
                     onChange={(e) => setRainfall(Number(e.target.value))}
                     className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-electricBlue"
                   />
                   <div className="flex justify-between text-xs text-gray-500 mt-2">
                     <span>50 mm</span>
                     <span>300 mm</span>
                   </div>
                </div>

                <button 
                  onClick={runSimulation}
                  disabled={simulationState === 'running'}
                  className="w-full mt-auto py-4 bg-gradient-to-r from-electricBlue to-cyan text-navy font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center disabled:opacity-50"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  RUN SIMULATION
                </button>
             </div>
          </div>

          {/* Visualization / Results Panel */}
          <div className="col-span-7 glass-panel rounded-2xl border border-white/5 p-8 relative flex flex-col justify-center items-center">
             <AnimatePresence mode="wait">
               {simulationState === 'idle' && (
                 <motion.div 
                   key="idle"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="text-center text-gray-500"
                 >
                   <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                   <p>Adjust parameters and run simulation to see predicted impacts.</p>
                 </motion.div>
               )}

               {simulationState === 'running' && (
                 <motion.div 
                   key="running"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="w-full max-w-md"
                 >
                   <h3 className="text-xl text-center text-electricBlue mb-8 animate-pulse">ANALYZING SCENARIO...</h3>
                   <div className="space-y-4">
                     {['Weather Agent', 'Water Agent', 'Infrastructure Agent', 'Mobility Agent'].map((agent, i) => (
                       <div key={agent} className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/10">
                         <span className="text-gray-300 text-sm">{agent}</span>
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, delay: i * 0.4 }}
                            className="h-1 bg-cyan absolute bottom-0 left-0"
                         />
                         <span className="text-xs text-electricBlue animate-pulse">Processing</span>
                       </div>
                     ))}
                   </div>
                 </motion.div>
               )}

               {simulationState === 'results' && (
                 <motion.div 
                   key="results"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="w-full h-full flex flex-col"
                 >
                   <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                     <h3 className="text-2xl font-light">PREDICTED IMPACT</h3>
                     <span className="text-xs text-cyan border border-cyan/30 bg-cyan/10 px-3 py-1 rounded-full">SIMULATED SCENARIO</span>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div className={`p-4 rounded-xl border ${impacts?.floodRisk === 'HIGH' ? 'bg-red/10 border-red/20 text-red' : impacts?.floodRisk === 'MEDIUM' ? 'bg-amber/10 border-amber/20 text-amber' : 'bg-emerald/10 border-emerald/20 text-emerald'}`}>
                        <div className="flex items-center mb-2"><Droplets className="w-4 h-4 mr-2" /> Flood Risk</div>
                        <div className="text-lg font-bold">{impacts?.floodRisk || 'NORMAL'}</div>
                     </div>
                     <div className={`p-4 rounded-xl border ${impacts?.trafficDisruption === 'HIGH' ? 'bg-red/10 border-red/20 text-red' : impacts?.trafficDisruption === 'MEDIUM' ? 'bg-amber/10 border-amber/20 text-amber' : 'bg-emerald/10 border-emerald/20 text-emerald'}`}>
                        <div className="flex items-center mb-2"><Car className="w-4 h-4 mr-2" /> Traffic Disruption</div>
                        <div className="text-lg font-bold">{impacts?.trafficDisruption || 'NORMAL'}</div>
                     </div>
                     <div className={`p-4 rounded-xl border ${impacts?.infrastructureRisk === 'HIGH' ? 'bg-red/10 border-red/20 text-red' : impacts?.infrastructureRisk === 'MEDIUM' ? 'bg-amber/10 border-amber/20 text-amber' : 'bg-emerald/10 border-emerald/20 text-emerald'}`}>
                        <div className="flex items-center mb-2"><Zap className="w-4 h-4 mr-2" /> Infrastructure</div>
                        <div className="text-lg font-bold">{impacts?.infrastructureRisk || 'NORMAL'}</div>
                     </div>
                   </div>

                   <div className="mt-auto flex space-x-4">
                     <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-colors">
                       VIEW RISK CHAIN
                     </button>
                     <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-colors">
                       ASK MASTER AI
                     </button>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
