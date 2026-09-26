"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Map as MapIcon, SlidersHorizontal, BrainCircuit, Flag, Settings, ShieldAlert, BarChart3, Globe2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const navigation = [
    { name: 'HOME', href: '/home', icon: LayoutDashboard },
    { name: 'MAP', href: '/map', icon: MapIcon },
    { name: 'FUTURE', href: '/future', icon: SlidersHorizontal },
    { name: 'AI', href: '/ai', icon: BrainCircuit },
    { name: 'MISSIONS', href: '/missions', icon: Flag },
  ];

  const secondaryNav = [
    { name: 'Command Center', href: '/command', icon: ShieldAlert },
    { name: 'Data Explorer', href: '/data', icon: BarChart3 },
    { name: 'Global Library', href: '/global', icon: Globe2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex w-full h-full text-white bg-navy">
      {/* Sidebar Navigation */}
      <div 
        className="h-full border-r border-white/10 glass-panel flex flex-col transition-all duration-300"
        style={{ width: isExpanded ? '240px' : '80px' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="p-6 h-20 flex items-center justify-center border-b border-white/5">
          <h2 className={`font-bold text-electricBlue transition-opacity duration-300 ${isExpanded ? 'opacity-100 text-xl' : 'opacity-0 w-0 hidden'}`}>
            BHARAT AI
          </h2>
          {!isExpanded && <div className="text-electricBlue font-bold text-2xl">B</div>}
        </div>
        
        <nav className="flex-1 space-y-2 p-3 mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-electricBlue/10 text-electricBlue border border-electricBlue/30 shadow-[0_0_15px_rgba(0,229,255,0.15)]" 
                    : "hover:bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={`ml-4 text-sm font-medium transition-opacity duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
          
          <div className={`pt-8 pb-2 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <span className="px-4 text-xs font-semibold text-gray-500 tracking-wider">MORE</span>
          </div>
          
          {isExpanded && secondaryNav.map((item) => (
             <Link 
               key={item.name} 
               href={item.href}
               className="flex items-center px-4 py-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
             >
               <item.icon className="w-4 h-4 flex-shrink-0" />
               <span className="ml-4 text-sm whitespace-nowrap">{item.name}</span>
             </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <header className="absolute top-0 right-0 p-6 z-10">
           <div className="flex items-center space-x-6 glass-panel px-4 py-2 rounded-full border border-white/10">
              <span className="text-sm font-medium text-electricBlue flex items-center">
                <span className="w-2 h-2 rounded-full bg-electricBlue mr-2 animate-pulse"></span>
                LIVE STATUS
              </span>
              <span className="text-sm text-gray-400 border-l border-white/20 pl-6">INDIA ▼</span>
           </div>
        </header>

        <motion.main 
          className="flex-1 w-full h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
