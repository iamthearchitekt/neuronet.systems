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
    <div className="relative min-h-screen pb-12 flex flex-col justify-start bg-black">
      {/* Top AI Agent Platform Header Bar - Running Full Length of the UI Design */}
      <header className="w-full border-b border-accent/25 bg-[#080d14]/95 backdrop-blur-xl px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 sticky top-0 z-40 mb-4 sm:mb-6 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Model Identity & Project Specs */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 via-cyan-400 to-accent flex items-center justify-center shadow-[0_0_15px_rgba(143,217,232,0.4)]">
              <Bot className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-sm sm:text-base text-white tracking-wide">
                  LAZURUS-3.5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold uppercase">
                  S.T.E.E.Z. // MILITECH
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-semibold uppercase hidden sm:inline">
                  GEN-3 OBJECTIVE
                </span>
              </div>
              <span className="text-[11px] font-mono text-accent/70">
                NEUROSYNTH DYNAMICS // PROJECT NECROGENESIS // BALTIMORE SECTOR
              </span>
            </div>
          </div>

          {/* Right: Telemetry Quick Status Indicators */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-accent/20 text-accent/80">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>NEURONET: 48 SUBJECTS SYNCED</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-accent/20 text-accent/80">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>DROP RATE: 0.000% [ZERO-FAIL]</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Split-Workspace: Left IDE Code Window + Right AI Agent & Zero Hour Countdown */}
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex-1 flex flex-col lg:flex-row gap-5 lg:gap-7 items-start">
        
        {/* LEFT COLUMN: Left-Justified IDE Window + Telemetry Boxes Underneath */}
        <div className="w-full lg:w-[42%] xl:w-[38%] 2xl:w-[36%] max-w-[680px] flex-shrink-0 order-1 flex flex-col gap-4">
          {/* Python IDE Window (Streaming Code & Logs) */}
          <div className="w-full h-[480px] sm:h-[540px] lg:h-[620px]">
            <CodeIDEWindow lines={pythonLines} />
          </div>

          {/* Telemetry Boxes Directly Underneath the Python Window */}
          <div className="w-full flex flex-col gap-4">
            <PerformanceGraphs />
            <HUDTelemetry criticality={criticality} />
          </div>
        </div>

        {/* RIGHT COLUMN: AI Agent Command Center featuring ZERO HOUR Countdown & Chat Console */}
        <div className="w-full lg:flex-1 order-2 flex flex-col items-stretch gap-4 sm:gap-6 min-w-0">
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
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
