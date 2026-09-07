import React, { useEffect, useState } from "react";
import CountdownClock from "./CountdownClock";
import CodeIDEWindow from "./CodeIDEWindow";
import AIAgentConsole from "./AIAgentConsole";
import HUDTelemetry from "./HUDTelemetry";
import PerformanceGraphs from "./PerformanceGraphs";
import { Bot, Sparkles, Terminal, Activity, ShieldCheck, Cpu } from "lucide-react";

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
    <section className="relative min-h-screen pt-3 sm:pt-5 pb-12 px-2 sm:px-4 lg:px-8 flex flex-col justify-start">
      {/* Top AI Agent Platform Header (Claude / Gemini style) */}
      <div className="w-full max-w-7xl mx-auto mb-4 sm:mb-6">
        <div className="bg-[#080d14]/90 backdrop-blur-xl border border-accent/30 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-[0_0_30px_rgba(143,217,232,0.1)]">
          
          {/* Left: Model Identity & Project Specs */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 via-cyan-400 to-accent flex items-center justify-center shadow-[0_0_15px_rgba(143,217,232,0.4)]">
              <Bot className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm sm:text-base text-white tracking-wide">
                  LAZURUS-3.5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold uppercase">
                  NEURAL AGENT
                </span>
              </div>
              <span className="text-[11px] font-mono text-accent/70">
                PROJECT NECROGENESIS // PHASE 3 INITIATIVE
              </span>
            </div>
          </div>

          {/* Right: Telemetry Quick Status Indicators */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-accent/20 text-accent/80">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>CONTEXT: 1M TOKENS</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-accent/20 text-accent/80">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>LATENCY: 38ms</span>
            </div>

            <div className="flex items-center gap-2 text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(143,217,232,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-semibold text-emerald-400">ZERO HOUR LOCKED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split-Workspace: Left IDE Code Window + Right AI Agent & Zero Hour Countdown */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* LEFT COLUMN: Left-Justified IDE Window (Streaming Python Training Code) */}
        <div className="w-full lg:w-5/12 xl:w-[460px] flex-shrink-0 order-2 lg:order-1 h-[480px] sm:h-[560px] lg:h-[780px] sticky top-4">
          <CodeIDEWindow lines={pythonLines} />
        </div>

        {/* RIGHT COLUMN: AI Agent Command Center featuring ZERO HOUR Countdown & Telemetry */}
        <div className="w-full lg:flex-1 order-1 lg:order-2 flex flex-col items-center gap-4 sm:gap-6">
          
          {/* Main Hero Feature: ZERO HOUR Large LCD Countdown Clock */}
          <div className="w-full">
            <CountdownClock 
              onAccessGranted={setAccessGranted} 
              onCriticalityChange={setCriticality}
            />
          </div>

          {/* Unified Telemetry Deck: Real-Time Performance Sparklines & System HUD */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <PerformanceGraphs />
            <HUDTelemetry criticality={criticality} />
          </div>

          {/* AI Agent Interactive Console (Claude / Gemini Style) */}
          <div className="w-full">
            <AIAgentConsole />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
