import React, { useEffect, useState } from "react";
import CountdownClock from "./CountdownClock";
import CodeIDEWindow from "./CodeIDEWindow";
import AIAgentConsole from "./AIAgentConsole";
import HUDTelemetry from "./HUDTelemetry";
import PerformanceGraphs from "./PerformanceGraphs";
import { Bot, Sparkles, Terminal, Activity, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  pythonLines?: Array<{ id: number; text: string }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ pythonLines = [] }) => {
  const [loaded, setLoaded] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [criticality, setCriticality] = useState(47);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen pt-4 sm:pt-6 pb-12 px-2 sm:px-6 lg:px-8 flex flex-col justify-start">
      {/* Top AI Agent Platform Bar (Claude / Gemini style) */}
      <div className="w-full max-w-7xl mx-auto mb-4 sm:mb-6">
        <div className="bg-[#080d14]/80 backdrop-blur-xl border border-accent/25 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-[0_0_30px_rgba(143,217,232,0.08)]">
          {/* Left: Model Identity & Project */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-accent flex items-center justify-center shadow-[0_0_12px_rgba(143,217,232,0.4)]">
              <Bot className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs sm:text-sm text-white tracking-wide">
                  LAZURUS-3.5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold uppercase">
                  AGI AGENT
                </span>
                <span className="hidden md:inline-block text-[10px] font-mono text-accent/60">
                  // PROJECT NECROGENESIS - PHASE 3
                </span>
              </div>
            </div>
          </div>

          {/* Center / Right: Live Performance Sparklines (Loss, Reasoning, Sync) */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <PerformanceGraphs />
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-accent bg-accent/10 border border-accent/25 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-semibold">SYNCHRONIZED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split-Workspace: Left IDE Code Window + Right AI Agent & Zero Hour Countdown */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* LEFT COLUMN: Left-Justified IDE Window (Streaming Python Training Code) */}
        <div className="w-full lg:w-5/12 xl:w-[460px] flex-shrink-0 order-2 lg:order-1 h-[480px] sm:h-[560px] lg:h-[760px] sticky top-4">
          <CodeIDEWindow lines={pythonLines} />
        </div>

        {/* RIGHT COLUMN: AI Agent Command Center featuring ZERO HOUR Countdown & Telemetry */}
        <div className="w-full lg:flex-1 order-1 lg:order-2 flex flex-col items-center">
          
          {/* Main Hero Feature: ZERO HOUR Large LCD Countdown Clock */}
          <div className="w-full">
            <CountdownClock 
              onAccessGranted={setAccessGranted} 
              onCriticalityChange={setCriticality}
            />
          </div>

          {/* AI Agent Interactive Console (Claude / Gemini Style) */}
          <div className="w-full">
            <AIAgentConsole />
          </div>

          {/* System HUD Telemetry (CPU, Memory, Network, Neural, Grid Integrity) */}
          <div className="w-full mt-2">
            <HUDTelemetry criticality={criticality} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
