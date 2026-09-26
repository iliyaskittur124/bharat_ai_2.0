"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="w-full h-full relative overflow-hidden bg-navy flex flex-col items-center justify-center bg-gradient-to-br from-navy to-blue-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center"
      >
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
          onClick={() => router.push("/home")}
          className="px-8 py-4 bg-gradient-to-r from-electricBlue to-cyan text-navy font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
        >
          ENTER BHARAT AI
        </button>
      </motion.div>
      <div className="absolute bottom-10 text-xs text-gray-500 uppercase tracking-widest">
        All-India Decision Intelligence Platform
      </div>
    </main>
  );
}
