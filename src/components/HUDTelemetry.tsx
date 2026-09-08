import React, { useEffect, useState } from "react";
import { Wifi } from "lucide-react";
import { useDeviceType } from "@/hooks/use-mobile";

interface HUDTelemetryProps {
  criticality?: number;
  className?: string;
}

const HUDTelemetry: React.FC<HUDTelemetryProps> = ({ criticality = 0, className = "" }) => {
  const [telemetryData, setTelemetryData] = useState({
    cpu: 47,
    memory: 42,
    network: 49,
    neural: 50,
    gridIntegrity: 100
  });

  // Calculate degraded values based on criticality
  const getDegradedValues = (criticality: number) => {
    if (criticality >= 40 && criticality <= 55) {
      return {
        cpu: 85,
        memory: 85,
        network: 85,
        neural: 85
      };
    }
    
    const degradation = criticality / 100;
    const variance = 5 + degradation * 15;
    
    const cpuBase = 47 - (degradation * 32);
    const memoryBase = 42 - (degradation * 27);
    const networkBase = 49 - (degradation * 34);
    const neuralBase = 50 - (degradation * 20);
    
    return {
      cpu: Math.max(0, cpuBase + (Math.random() - 0.5) * variance),
      memory: Math.max(0, memoryBase + (Math.random() - 0.5) * variance),
      network: Math.max(0, networkBase + (Math.random() - 0.5) * variance),
      neural: Math.max(0, neuralBase + (Math.random() - 0.5) * (variance * 0.5))
    };
  };

  const applyFluctuation = (baseValue: number, fluctuationPercent: number) => {
    const variance = baseValue * (fluctuationPercent / 100);
    const randomOffset = (Math.random() - 0.5) * 2 * variance;
    return Math.max(0, Math.min(100, baseValue + randomOffset));
  };

  const clampRange = (value: number, min = 80, max = 90) => {
    return Math.max(min, Math.min(max, value));
  };

  const getSystemStatus = (criticality: number) => {
    if (criticality >= 95) return { text: "TOTAL FAILURE", color: "text-red-500" };
    if (criticality >= 80) return { text: "CRITICAL", color: "text-red-400" };
    if (criticality >= 60) return { text: "DEGRADED", color: "text-amber-400" };
    if (criticality >= 45 && criticality <= 55) return { text: "PHASE 3 SYNC", color: "text-cyan-300" };
    if (criticality >= 35) return { text: "WARNING", color: "text-yellow-400" };
    return { text: "OPERATIONAL", color: "text-emerald-400" };
  };

  const getBarColor = (criticality: number) => {
    if (criticality >= 80) return "bg-red-500";
    if (criticality >= 60) return "bg-amber-400";
    return "bg-cyan-400";
  };

  useEffect(() => {
    let currentBase = getDegradedValues(criticality);
    
    const baseUpdateInterval = setInterval(() => {
      currentBase = getDegradedValues(criticality);
    }, 2000);
    
    const fluctuationInterval = setInterval(() => {
      const baseGridIntegrity = (criticality >= 40 && criticality <= 55) ? 82 : 100 - criticality;
      const newData = {
        cpu: clampRange(applyFluctuation(currentBase.cpu, 4.2)),
        memory: clampRange(applyFluctuation(currentBase.memory, 4.2)),
        network: clampRange(applyFluctuation(currentBase.network, 4.2)),
        neural: clampRange(applyFluctuation(currentBase.neural, 4.2)),
        gridIntegrity: clampRange(applyFluctuation(baseGridIntegrity, 4.2), 78, 85)
      };
      setTelemetryData(newData);
    }, 400);

    return () => {
      clearInterval(baseUpdateInterval);
      clearInterval(fluctuationInterval);
    };
  }, [criticality]);

  return (
    <div className={`w-full bg-[#080d14]/90 backdrop-blur-xl border border-accent/30 rounded-xl p-3.5 sm:p-4 shadow-[0_0_30px_rgba(143,217,232,0.1)] relative overflow-hidden font-mono ${className}`}>
      {/* Decorative corner brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent"></div>
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent"></div>
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-accent"></div>
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent"></div>

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-accent/15 pb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-accent/90 uppercase tracking-widest font-semibold text-[11px] sm:text-xs">
            SYSTEM TELEMETRY
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-accent/70">
            GRID INTEGRITY: <span className="text-cyan-300 font-bold">{telemetryData.gridIntegrity.toFixed(0)}%</span>
          </span>
          <span className={`${getSystemStatus(criticality).color} font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]`}>
            {getSystemStatus(criticality).text}
          </span>
        </div>
      </div>

      {/* Grid of Telemetry Data Streams */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Nodes / CPU */}
        <div className="bg-black/40 border border-accent/15 rounded-lg p-2.5">
          <div className="flex justify-between items-center mb-1.5 text-[11px]">
            <span className="text-accent/70">ACTIVE NODES</span>
            <span className="text-cyan-300 font-bold">{telemetryData.cpu.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/60 border border-accent/30 rounded-full overflow-hidden">
            <div
              className={`h-full ${getBarColor(criticality)} shadow-[0_0_8px_hsl(var(--accent))] transition-all duration-200`}
              style={{ width: `${telemetryData.cpu}%` }}
            />
          </div>
        </div>

        {/* Data Cache / Memory */}
        <div className="bg-black/40 border border-accent/15 rounded-lg p-2.5">
          <div className="flex justify-between items-center mb-1.5 text-[11px]">
            <span className="text-accent/70">SYNAPTIC CACHE</span>
            <span className="text-cyan-300 font-bold">{telemetryData.memory.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/60 border border-accent/30 rounded-full overflow-hidden">
            <div
              className={`h-full ${getBarColor(criticality)} shadow-[0_0_8px_hsl(var(--accent))] transition-all duration-200`}
              style={{ width: `${telemetryData.memory}%` }}
            />
          </div>
        </div>

        {/* Signal Link / Wifi */}
        <div className="bg-black/40 border border-accent/15 rounded-lg p-2.5 flex items-center justify-between">
          <div>
            <span className="text-accent/70 block text-[11px]">SIGNAL LINK</span>
            <span className="text-emerald-400 font-bold text-[11px]">OPTIMAL // 100%</span>
          </div>
          <Wifi className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
      </div>


    </div>
  );
};

export default HUDTelemetry;