"use client";

export default function HomeDashboard() {
  return (
    <div className="p-8 pt-24 h-full flex flex-col">
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-wide text-white">Good morning. Here's India's current resilience picture.</h1>
      </header>

      <div className="grid grid-cols-12 gap-6 flex-1">
        {/* National Resilience */}
        <div className="col-span-4 glass-panel rounded-2xl p-8 flex flex-col justify-between border border-emerald/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/10 blur-3xl rounded-full"></div>
          <div>
            <h3 className="text-gray-400 text-sm font-semibold tracking-wider mb-2">NATIONAL RESILIENCE INDICATOR</h3>
            <div className="text-7xl font-bold text-emerald">78<span className="text-3xl text-gray-500">/100</span></div>
            <div className="inline-block mt-4 px-3 py-1 bg-emerald/10 text-emerald text-xs rounded-full border border-emerald/20">
              Good
            </div>
          </div>
          
          <div className="space-y-4 mt-8 relative z-10">
            <div className="flex justify-between items-center"><span className="text-gray-300 text-sm">Hazard Exposure</span><span className="text-amber px-2 py-1 bg-amber/10 rounded text-xs border border-amber/20">62 - Medium</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-300 text-sm">Infrastructure</span><span className="text-emerald px-2 py-1 bg-emerald/10 rounded text-xs border border-emerald/20">74 - Normal</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-300 text-sm">Resource Stress</span><span className="text-amber px-2 py-1 bg-amber/10 rounded text-xs border border-amber/20">69 - Medium</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-300 text-sm">Mobility</span><span className="text-emerald px-2 py-1 bg-emerald/10 rounded text-xs border border-emerald/20">71 - Normal</span></div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
            <span className="text-gray-500 italic">Not an official government rating</span>
            <span className="text-cyan">SEEDED DATA</span>
          </div>
        </div>

        {/* Domains & Risks */}
        <div className="col-span-8 flex flex-col space-y-6">
          <div className="grid grid-cols-4 gap-4">
             {/* Domain Cards */}
             <div className="glass-panel p-4 rounded-xl border border-amber/30 hover:bg-white/5 cursor-pointer transition-all">
                <div className="text-gray-400 text-xs font-bold mb-2 tracking-wider">WEATHER</div>
                <div className="text-amber font-semibold">MEDIUM RISK</div>
             </div>
             <div className="glass-panel p-4 rounded-xl border border-red/30 hover:bg-white/5 cursor-pointer transition-all">
                <div className="text-gray-400 text-xs font-bold mb-2 tracking-wider">WATER</div>
                <div className="text-red font-semibold">HIGH RISK</div>
             </div>
             <div className="glass-panel p-4 rounded-xl border border-amber/30 hover:bg-white/5 cursor-pointer transition-all">
                <div className="text-gray-400 text-xs font-bold mb-2 tracking-wider">MOBILITY</div>
                <div className="text-amber font-semibold">MEDIUM RISK</div>
             </div>
             <div className="glass-panel p-4 rounded-xl border border-emerald/30 hover:bg-white/5 cursor-pointer transition-all">
                <div className="text-gray-400 text-xs font-bold mb-2 tracking-wider">ENERGY</div>
                <div className="text-emerald font-semibold">NORMAL</div>
             </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex-1 border border-white/5 relative overflow-hidden">
             <div className="absolute right-0 bottom-0 opacity-10">
               {/* Decorative map silhouette could go here */}
             </div>
             <h3 className="text-sm font-semibold text-gray-400 mb-6 tracking-wider">ACTIVE NATIONAL RISKS (3)</h3>
             
             <div className="space-y-3">
               {['Severe Heavy Rainfall - West Coast', 'Water Stress - Central Region', 'Infrastructure Vulnerability - Coastal'].map((risk, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan/30 cursor-pointer group transition-all">
                   <div className="flex items-center">
                     <div className={`w-2 h-2 rounded-full mr-4 ${i === 1 ? 'bg-red' : 'bg-amber shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></div>
                     <span className="text-gray-200 group-hover:text-white font-medium">{risk}</span>
                   </div>
                   <div className="text-xs px-3 py-1 bg-white/5 rounded-full text-gray-400 group-hover:bg-cyan/10 group-hover:text-cyan transition-colors">
                     View Details →
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
