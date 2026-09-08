import React, { useEffect, useState } from "react";
import CountdownClock from "./CountdownClock";
import CodeIDEWindow from "./CodeIDEWindow";
import AIAgentConsole from "./AIAgentConsole";
import HUDTelemetry from "./HUDTelemetry";
import PerformanceGraphs from "./PerformanceGraphs";
import { Sparkles, Terminal, Activity, ShieldCheck, Cpu } from "lucide-react";

interface HeroSectionProps {
  pythonLines?: Array<{ id: number; text: string }>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ pythonLines = [] }) => {
  const [loaded, setLoaded] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [criticality, setCriticality] = useState(47);
  const [dropRate, setDropRate] = useState("0.000");
  const [isJittering, setIsJittering] = useState(false);

  useEffect(() => {
    setLoaded(true);

    const interval = setInterval(() => {
      if (Math.random() > 0.45) {
        const microRate = (Math.random() * 0.006).toFixed(3);
        setDropRate(microRate);
        setIsJittering(true);
        setTimeout(() => {
          setDropRate("0.000");
          setIsJittering(false);
        }, 900);
      } else {
        setDropRate("0.000");
        setIsJittering(false);
      }
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen pb-4 flex flex-col justify-start bg-black">
      {/* Top AI Agent Platform Header Bar - Running Full Length of the UI Design */}
      <header className="w-full border-b border-accent/25 bg-[#080d14]/95 backdrop-blur-xl px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2 sm:py-2.5 sticky top-0 z-40 mb-2.5 sm:mb-3 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <img 
              src="/branding-icon.png" 
              alt="S.T.E.E.Z. / NeuroNet Branding Icon" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] flex-shrink-0" 
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-sm sm:text-base text-white tracking-wide">
                  LAZURUS-3
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold uppercase">
                  AGI INTERFACE
                </span>
              </div>
              <span className="text-[11px] font-mono text-accent/70">
                NEUROSYNTH DYNAMICS // PROJECT NECROGENESIS // POWER PLANT FACILITY
              </span>
            </div>
          </div>

          {/* Right: Telemetry Quick Status Indicators */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-accent/20 text-accent/80">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>NEURONET: GLOBAL Z-HOST SYNC</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-accent/20 text-accent/80 transition-all">
              <Activity className={`w-3 h-3 transition-colors duration-300 ${isJittering ? "text-cyan-200 animate-pulse" : "text-cyan-400"}`} />
              <span>
                UPLINK DROP:{" "}
                <span className={`font-mono font-semibold transition-colors duration-200 ${isJittering ? "text-cyan-200" : "text-cyan-400"}`}>
                  {dropRate}%
                </span>{" "}
                <span className="text-emerald-400 font-semibold">[ZERO-FAIL]</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Split-Workspace: Left IDE Code Window + Right AI Agent & Zero Hour Countdown */}
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex-1 flex flex-col lg:flex-row gap-4 lg:gap-5 items-start">
        
        {/* LEFT COLUMN: Left-Justified IDE Window + Telemetry Boxes Underneath */}
        <div className="w-full lg:w-[52%] xl:w-[50%] 2xl:w-[48%] max-w-[960px] flex-shrink-0 order-1 flex flex-col gap-3">
          {/* Python IDE Window (Streaming Code & Logs) */}
          <div className="w-full h-[440px] sm:h-[480px] lg:h-[520px]">
            <CodeIDEWindow lines={pythonLines} />
          </div>

          {/* Telemetry Boxes Directly Underneath the Python Window */}
          <div className="w-full flex flex-col gap-3">
            <PerformanceGraphs />
            <HUDTelemetry criticality={criticality} />
          </div>
        </div>

        {/* RIGHT COLUMN: AI Agent Command Center featuring ZERO HOUR Countdown & Chat Console */}
        <div className="w-full lg:flex-1 order-2 flex flex-col items-stretch gap-2.5 sm:gap-3 min-w-0">
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
