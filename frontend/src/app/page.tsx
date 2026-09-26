"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeScreen, setActiveScreen] = useState("splash");

  const screens = {
    splash: (
      <motion.div
        key="splash"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center w-full h-full bg-navy bg-gradient-to-br from-navy to-blue-900"
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-widest text-electricBlue mb-4 drop-shadow-lg shadow-electricBlue">
            BHARAT AI
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-light tracking-wide">
            National AI Resilience & Intelligence Platform
          </p>
          <p className="text-sm text-cyan mb-12 italic">
            "Understand possible consequences before they happen."
          </p>
          
          <button 
            onClick={() => setActiveScreen("home")}
            className="px-8 py-4 bg-gradient-to-r from-electricBlue to-cyan text-navy font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            ENTER BHARAT AI
          </button>
        </div>
        <div className="absolute bottom-10 text-xs text-gray-500 uppercase tracking-widest">
          All-India Decision Intelligence Platform
        </div>
      </motion.div>
    ),
    home: (
      <motion.div
        key="home"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        className="flex w-full h-full text-white bg-navy"
      >
        {/* Sidebar Navigation */}
        <div className="w-64 border-r border-white/10 glass-panel h-full p-6 flex flex-col">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-electricBlue">BHARAT AI</h2>
          </div>
          <nav className="flex-1 space-y-4">
            {["HOME", "MAP", "FUTURE", "AI", "MISSIONS"].map((item) => (
              <button 
                key={item} 
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  item === "HOME" ? "bg-electricBlue/10 text-electricBlue border border-electricBlue/30" : "hover:bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 flex flex-col">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-light">Good morning. Here's India's current resilience picture.</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">INDIA ▼</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electricBlue to-cyan flex items-center justify-center text-navy font-bold">
                AD
              </div>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-6 flex-1">
            {/* National Resilience */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-gray-400 text-sm mb-2">NATIONAL RESILIENCE INDICATOR</h3>
                <div className="text-6xl font-bold text-emerald">78<span className="text-2xl text-gray-500">/100</span></div>
              </div>
              <div className="space-y-3 mt-8">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Hazard Exposure</span><span className="text-amber">Medium</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Infrastructure</span><span className="text-emerald">Normal</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Resource Stress</span><span className="text-amber">Medium</span></div>
              </div>
              <div className="mt-6 text-xs text-gray-600 italic">Not an official government rating</div>
            </div>

            {/* Quick Actions */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
               <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-white/5 transition-colors border border-cyan/30 group">
                  <div className="text-cyan mb-2 group-hover:scale-110 transition-transform text-4xl">🗺️</div>
                  <h3 className="font-bold text-lg">OPEN AI RISK MAP</h3>
               </div>
               <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-white/5 transition-colors border border-electricBlue/30 group">
                  <div className="text-electricBlue mb-2 group-hover:scale-110 transition-transform text-4xl">⚡</div>
                  <h3 className="font-bold text-lg">WHAT IF?</h3>
               </div>
               <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-white/5 transition-colors">
                  <h3 className="font-bold text-lg text-gray-300">ASK MASTER AI</h3>
               </div>
               <div className="glass-panel rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-white/5 transition-colors">
                  <h3 className="font-bold text-lg text-gray-300">COMMAND CENTER</h3>
               </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg text-gray-400 mb-4 tracking-wide">ACTIVE NATIONAL RISKS</h3>
            <div className="flex space-x-4">
              {['Heavy Rainfall', 'Water Stress', 'Mobility Disruption'].map(risk => (
                <div key={risk} className="glass-panel px-6 py-4 rounded-xl flex-1 cursor-pointer hover:border-amber/50 transition-colors border border-white/5">
                  <div className="text-amber text-sm font-bold mb-1">MEDIUM RISK</div>
                  <div className="text-lg">{risk}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    )
  };

  return (
    <main className="w-full h-full relative overflow-hidden bg-navy">
      <AnimatePresence mode="wait">
        {screens[activeScreen as keyof typeof screens]}
      </AnimatePresence>
    </main>
  );
}
