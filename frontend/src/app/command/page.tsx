"use client";

import AppShell from "@/components/layout/AppShell";
import { ShieldAlert, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CommandCenterPage() {
  const activeRisks = [
    { id: 1, title: 'Severe Heavy Rainfall', region: 'Maharashtra, West Coast', severity: 'CRITICAL', confidence: 85, cascade: ['Rainfall', 'Drainage', 'Flood', 'Road', 'Traffic'] },
    { id: 2, title: 'Water Stress Warning', region: 'Karnataka, Central', severity: 'HIGH', confidence: 78, cascade: ['Temperature', 'Evaporation', 'Water Supply'] },
    { id: 3, title: 'Infrastructure Vulnerability', region: 'Gujarat, Coastal', severity: 'HIGH', confidence: 72, cascade: ['Wind', 'Power Grid', 'Communication'] },
  ];

  return (
    <AppShell>
      <div className="h-full flex flex-col p-8 pt-24">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light tracking-wide text-white flex items-center">
              <ShieldAlert className="w-8 h-8 mr-4 text-red" />
              NATIONAL COMMAND CENTER
            </h1>
            <p className="text-gray-400 text-lg mt-2">All-India Risk Monitoring & Decision Support</p>
          </div>
        </header>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
           <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
             <div>
               <div className="text-gray-400 text-sm font-semibold mb-1">ACTIVE RISKS</div>
               <div className="text-4xl font-bold text-white">17</div>
             </div>
             <ShieldAlert className="w-10 h-10 text-gray-500 opacity-50" />
           </div>
           <div className="glass-panel p-6 rounded-2xl border border-red/30 bg-red/5 flex items-center justify-between">
             <div>
               <div className="text-gray-400 text-sm font-semibold mb-1">CRITICAL</div>
               <div className="text-4xl font-bold text-red">3</div>
             </div>
             <AlertTriangle className="w-10 h-10 text-red opacity-50" />
           </div>
           <div className="glass-panel p-6 rounded-2xl border border-amber/30 bg-amber/5 flex items-center justify-between">
             <div>
               <div className="text-gray-400 text-sm font-semibold mb-1">HIGH</div>
               <div className="text-4xl font-bold text-amber">6</div>
             </div>
             <AlertCircle className="w-10 h-10 text-amber opacity-50" />
           </div>
           <div className="glass-panel p-6 rounded-2xl border border-emerald/30 bg-emerald/5 flex items-center justify-between">
             <div>
               <div className="text-gray-400 text-sm font-semibold mb-1">RESOLVED (24h)</div>
               <div className="text-4xl font-bold text-emerald">12</div>
             </div>
             <CheckCircle2 className="w-10 h-10 text-emerald opacity-50" />
           </div>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          {/* Map Area */}
          <div className="col-span-8 glass-panel rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-black/40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
             <div className="text-gray-500 font-light tracking-widest z-10 flex flex-col items-center">
                <ShieldAlert className="w-16 h-16 mb-4 opacity-50" />
                <span>COMMAND CENTER MAP VIEW</span>
                <span className="text-xs mt-2">(Interactive Map Integration)</span>
             </div>
          </div>

          {/* Incident Panel */}
          <div className="col-span-4 glass-panel rounded-2xl border border-white/10 p-6 overflow-y-auto flex flex-col space-y-4">
             <h3 className="text-sm font-semibold text-gray-400 mb-2 tracking-wider">CRITICAL INCIDENTS</h3>
             
             {activeRisks.map(risk => (
               <div key={risk.id} className="p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/20 transition-colors cursor-pointer">
                 <div className="flex justify-between items-start mb-2">
                   <div className={`px-2 py-1 rounded text-[10px] font-bold ${risk.severity === 'CRITICAL' ? 'bg-red/20 text-red border border-red/30' : 'bg-amber/20 text-amber border border-amber/30'}`}>
                     {risk.severity}
                   </div>
                   <div className="text-xs text-cyan">CONFIDENCE: {risk.confidence}%</div>
                 </div>
                 <h4 className="text-white font-medium mb-1">{risk.title}</h4>
                 <div className="text-xs text-gray-400 mb-4">{risk.region}</div>
                 
                 <div className="text-xs text-gray-500 mb-2 font-semibold">CASCADE PREDICTION:</div>
                 <div className="flex flex-wrap gap-2">
                   {risk.cascade.map((node, i) => (
                     <div key={node} className="flex items-center text-[10px] text-gray-300">
                       <span className="px-2 py-1 bg-black/40 rounded border border-white/5">{node}</span>
                       {i < risk.cascade.length - 1 && <span className="mx-1 text-gray-600">→</span>}
                     </div>
                   ))}
                 </div>
               </div>
             ))}
             
             <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-colors text-white">
               GENERATE PREPARATION OPTIONS
             </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
