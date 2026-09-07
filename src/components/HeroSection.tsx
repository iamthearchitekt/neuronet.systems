
import React, { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import CountdownClock from "./CountdownClock";
import HUDTelemetry from "./HUDTelemetry";
import PerformanceGraphs from "./PerformanceGraphs";

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [criticality, setCriticality] = useState(0);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Live performance graphs — desktop only, sits above the status bar */}
      <PerformanceGraphs />

      {/* Connection Status - Top bar (mobile: full-width band, desktop: below graphs on the right) */}
      <div className="fixed top-0 inset-x-0 z-50 sm:top-4 sm:inset-x-auto sm:right-4">
        <div className="bg-black/70 backdrop-blur-md border-b border-accent/20 px-4 py-2 sm:bg-transparent sm:backdrop-blur-0 sm:border-0 sm:p-0">
          <div className="text-accent text-[11px] sm:text-sm md:text-base font-mono tracking-wide animate-pulse glow-text uppercase text-center sm:text-right truncate">
            Synaptic grid firmware updating...
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 relative z-[3]">
        <div className={`text-center transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="discard entirely"></span>
          </div>
          
          
          {/* Large LCD Countdown Clock */}
            <CountdownClock 
              onAccessGranted={setAccessGranted} 
              onCriticalityChange={setCriticality}
            />
            
            {/* HUD Telemetry - positioned in content flow on mobile */}
            <HUDTelemetry criticality={criticality} />
        </div>
      </div>


    </section>
  );
};

export default HeroSection;
