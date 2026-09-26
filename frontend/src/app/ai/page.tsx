"use client";

import AppShell from "@/components/layout/AppShell";
import { useState } from "react";
import { BrainCircuit, Send, User, Bot, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  metadata?: {
    confidence?: number;
    dataSource?: string;
  }
}

export default function AIPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'I am the Master AI, India\'s decision intelligence layer. I can explain risk chains, analyze current data, and suggest preparation options based on the platform\'s simulation engine. What would you like to know?',
      metadata: {
        dataSource: 'SYSTEM READY'
      }
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI Response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'Based on the seeded data for the Maharashtra region, a 200mm rainfall scenario increases urban flood risk from Medium to High. This creates a cascading effect disrupting traffic and increasing infrastructure vulnerability. \n\nPreparation Options:\n1. Inspect drainage hotspots\n2. Prepare alternate routes\n3. Monitor vulnerable coastal infrastructure.',
        metadata: {
          confidence: 72,
          dataSource: 'SEEDED DEMO DATA'
        }
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <AppShell>
      <div className="h-full flex flex-col p-8 pt-24 max-w-5xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light tracking-wide text-white flex items-center">
              <BrainCircuit className="w-8 h-8 mr-4 text-electricBlue" />
              MASTER AI
            </h1>
            <p className="text-gray-400 text-lg mt-2">India's decision intelligence layer</p>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex flex-col items-end">
            <span className="text-xs text-gray-500 mb-1">PLATFORM STATUS</span>
            <span className="text-sm text-emerald flex items-center font-semibold">
              <ShieldCheck className="w-4 h-4 mr-1" /> ACTIVE & SECURE
            </span>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <BrainCircuit className="w-96 h-96" />
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex space-x-4 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-cyan text-navy' : 'bg-navy border border-electricBlue text-electricBlue shadow-[0_0_15px_rgba(0,229,255,0.2)]'}`}>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <div className={`p-4 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-cyan/10 border border-cyan/20 text-white rounded-tr-sm' 
                          : 'bg-black/40 border border-white/10 text-gray-200 rounded-tl-sm'
                      }`}>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                      </div>
                      
                      {msg.role === 'ai' && msg.metadata && (
                        <div className="flex space-x-3 text-[10px] font-semibold tracking-wider">
                           {msg.metadata.dataSource && (
                             <span className="px-2 py-1 bg-white/5 text-gray-400 rounded flex items-center border border-white/5">
                               SOURCE: {msg.metadata.dataSource}
                             </span>
                           )}
                           {msg.metadata.confidence && (
                             <span className="px-2 py-1 bg-amber/10 text-amber rounded flex items-center border border-amber/20">
                               <AlertTriangle className="w-3 h-3 mr-1" />
                               CONFIDENCE: {msg.metadata.confidence}%
                             </span>
                           )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>

           {/* Input Area */}
           <div className="p-4 bg-black/40 border-t border-white/10 z-10">
             <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-2 focus-within:border-electricBlue/50 transition-colors">
               <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 placeholder="Ask Master AI to analyze risks or simulate scenarios..."
                 className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder-gray-500 text-sm"
               />
               <button 
                 onClick={handleSend}
                 disabled={!input.trim()}
                 className="w-10 h-10 rounded-lg bg-electricBlue text-navy flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
               >
                 <Send className="w-4 h-4" />
               </button>
             </div>
             <div className="text-center mt-2 text-[10px] text-gray-600">
               BHARAT AI provides decision support and does not automatically dispatch emergency services.
             </div>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
