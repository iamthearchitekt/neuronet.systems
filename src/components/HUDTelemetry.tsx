import React, { useEffect, useState } from "react";
import { Wifi } from "lucide-react";
import { useDeviceType } from "@/hooks/use-mobile";

interface HUDTelemetryProps {
  criticality?: number;
}

const HUDTelemetry: React.FC<HUDTelemetryProps> = ({ criticality = 0 }) => {
  const { isMobile, isTablet, isDesktop } = useDeviceType();
  const [telemetryData, setTelemetryData] = useState({
    cpu: 47,
    memory: 42,
    network: 49,
    neural: 50,
    gridIntegrity: 100
  });

  // Calculate degraded values based on criticality
  const getDegradedValues = (criticality: number) => {
    // During RECONNECTING state (40-55%), keep all values at 53.5% for calm 49-58% range
    if (criticality >= 40 && criticality <= 55) {
      return {
        cpu: 85,
        memory: 85,
        network: 85,
        neural: 85
      };
    }
    
    // For other states, use degradation formulas
    const degradation = criticality / 100;
    const variance = 5 + degradation * 15; // More erratic as system fails
    
    const cpuBase = 47 - (degradation * 32); // 47% -> 15%
    const memoryBase = 42 - (degradation * 27); // 42% -> 15%
    const networkBase = 49 - (degradation * 34); // 49% -> 15%
    const neuralBase = 50 - (degradation * 20); // 50% -> 30%
    
    return {
      cpu: Math.max(0, cpuBase + (Math.random() - 0.5) * variance),
      memory: Math.max(0, memoryBase + (Math.random() - 0.5) * variance),
      network: Math.max(0, networkBase + (Math.random() - 0.5) * variance),
      neural: Math.max(0, neuralBase + (Math.random() - 0.5) * (variance * 0.5))
    };
  };

  // Apply real-time fluctuation to a base value (±7%)
  const applyFluctuation = (baseValue: number, fluctuationPercent: number) => {
    const variance = baseValue * (fluctuationPercent / 100);
    const randomOffset = (Math.random() - 0.5) * 2 * variance;
    return Math.max(0, Math.min(100, baseValue + randomOffset));
  };

  // Clamp values to specified range
  const clampRange = (value: number, min = 80, max = 90) => {
    return Math.max(min, Math.min(max, value));
  };

  // Get system status based on criticality
  const getSystemStatus = (criticality: number) => {
    if (criticality >= 95) return { text: "TOTAL SYSTEM FAILURE", color: "text-red-500" };
    if (criticality >= 80) return { text: "CRITICAL FAILURE IMMINENT", color: "text-red-400" };
    if (criticality >= 60) return { text: "CRITICAL", color: "text-red-300" };
    if (criticality >= 45 && criticality <= 55) return { text: "SYSTEM UPDATE", color: "text-accent" };
    if (criticality >= 35) return { text: "WARNING", color: "text-green-400" };
    if (criticality >= 15) return { text: "CAUTION", color: "text-green-300" };
    return { text: "OPERATIONAL", color: "text-success" };
  };

  // Get grid integrity based on criticality
  const getGridIntegrity = (criticality: number) => {
    return Math.max(0, 100 - criticality);
  };

  // Get bar colors based on criticality
  const getBarColor = (criticality: number) => {
    if (criticality >= 80) return "bg-red-500/80";
    if (criticality >= 60) return "bg-red-400/80";
    if (criticality >= 35) return "bg-green-400/80";
    if (criticality >= 15) return "bg-green-300/80";
    return "bg-accent/80";
  };

  useEffect(() => {
    
    // Calculate base values less frequently
    let currentBase = getDegradedValues(criticality);
    
    const baseUpdateInterval = setInterval(() => {
      currentBase = getDegradedValues(criticality);
    }, 2000);
    
    // Apply fluctuation much more frequently for real-time jitter effect
    const fluctuationInterval = setInterval(() => {
      // Use 53.5 as base for grid integrity in RECONNECTING state
      const baseGridIntegrity = (criticality >= 40 && criticality <= 55) ? 82 : 100 - criticality;
      const newData = {
        cpu: clampRange(applyFluctuation(currentBase.cpu, 4.2)),
        memory: clampRange(applyFluctuation(currentBase.memory, 4.2)),
        network: clampRange(applyFluctuation(currentBase.network, 4.2)),
        neural: clampRange(applyFluctuation(currentBase.neural, 4.2)),
        gridIntegrity: clampRange(applyFluctuation(baseGridIntegrity, 4.2), 78, 85)
      };
      setTelemetryData(newData);
    }, criticality > 80 ? 200 : 400); // Slower, calmer updates

    return () => {
      clearInterval(baseUpdateInterval);
      clearInterval(fluctuationInterval);
    };
  }, [criticality]);

  return (
    <div className={`z-40 transition-all duration-300 ${
      isMobile 
        ? 'fixed bottom-3 left-3 right-3 flex flex-col items-stretch' 
        : 'fixed bottom-4 right-4'
    }`}>
      {/* Main Status Line */}
      <div className={`mb-2 font-bold tracking-wide text-accent glow-text ${
        isMobile ? "text-center text-[11px]" : "text-right text-sm"
      }`}>
        SYNAPTIC GRID INTEGRITY: {telemetryData.gridIntegrity.toFixed(0)}%
      </div>
      
      {/* HUD Telemetry Panel */}
      <div className={`hud-panel bg-black/90 backdrop-blur-md border border-accent/30 rounded font-mono transition-all duration-300 shadow-[0_0_24px_rgba(0,0,0,0.7)] ${
        isMobile 
          ? 'w-full p-2.5 text-xs' 
          : 'w-80 p-3 text-sm'
      }`}>
        {/* Header */}
        <div className={`text-accent/90 mb-2 border-b border-accent/20 pb-1 ${
          isMobile ? "text-center text-xs" : "text-xs"
        }`}>
          [ NEURONET TELEMETRY STREAM ]
        </div>
        
        {/* Telemetry Data Streams */}
        <div className={isMobile ? "space-y-1.5" : "space-y-1"}>
          <div className="flex justify-between items-center">
            <span className="text-accent/70">NODES:</span>
            <div className={`bg-black/50 border ${
              criticality >= 60 ? "border-red-400/50" : 
              criticality >= 35 ? "border-yellow-400/50" : "border-accent/30"
            } relative overflow-hidden ${
              isMobile ? "w-16 h-1.5" : "w-12 h-1"
            }`}>
              <div 
                className={`h-full glow-bar transition-all duration-100 ${
                  criticality >= 80 ? "animate-pulse" : ""
                } ${getBarColor(criticality)}`}
                style={{ width: `${(telemetryData.cpu / 100) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-accent/70">DATA CACHE:</span>
            <div className={`bg-black/50 border ${
              criticality >= 60 ? "border-red-400/50" : 
              criticality >= 35 ? "border-yellow-400/50" : "border-accent/30"
            } relative overflow-hidden ${
              isMobile ? "w-16 h-1.5" : "w-12 h-1"
            }`}>
              <div 
                className={`h-full glow-bar transition-all duration-100 ${
                  criticality >= 80 ? "animate-pulse" : ""
                } ${getBarColor(criticality)}`}
                style={{ width: `${(telemetryData.memory / 100) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-accent/70">SIGNAL LINK:</span>
            <Wifi className={`transition-all duration-300 wifi-signal-animate ${
              isMobile ? "w-4 h-4" : "w-5 h-5"
            } ${
              criticality >= 80 ? "text-red-500 animate-pulse" : 
              criticality >= 60 ? "text-red-400 wifi-bars-animate" :
              criticality >= 40 && criticality <= 55 ? "text-accent wifi-bars-animate" :
              criticality >= 35 ? "text-green-400 wifi-bars-animate" :
              "text-success wifi-bars-animate"
            }`} />
          </div>
        </div>
        
        {/* Status Indicators */}
        <div className={`pt-2 border-t border-accent/20 ${
          isMobile ? "mt-1.5 text-xs" : "mt-2 text-xs"
        }`}>
          <div className="flex justify-between">
            <span className="text-accent/60">STATUS:</span>
            <span className={`${getSystemStatus(criticality).color} font-bold transition-all duration-300 ${
              criticality >= 80 ? "animate-pulse" : ""
            }`}>{getSystemStatus(criticality).text}</span>
          </div>
        </div>
        
        {/* Scanning Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-[1px] bg-accent/40 shadow-scan animate-scan-sweep"
          />
        </div>
      </div>
    </div>
  );
};

export default HUDTelemetry;