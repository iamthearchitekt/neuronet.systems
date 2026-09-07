import React, { useEffect, useState } from "react";

interface CountdownClockProps {
  onCriticalityChange?: (criticality: number) => void;
  onAccessGranted?: (granted: boolean) => void;
}

interface TimeRemaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isComplete: boolean;
}

const LCDDigit: React.FC<{ char: string }> = ({ char }) => {
  const isSeparator = char === ":";

  if (isSeparator) {
    return (
      <span className="relative inline-flex items-center justify-center select-none px-0.5 sm:px-1.5 md:px-2 flex-shrink-0">
        {/* Ghost unlit separator */}
        <span className="text-accent/15 select-none pointer-events-none font-led">
          :
        </span>
        {/* Active blinking separator */}
        <span className="absolute inset-0 flex items-center justify-center text-accent font-led glow-text animate-pulse">
          :
        </span>
      </span>
    );
  }

  return (
    <span className="relative inline-flex items-center justify-center select-none w-[0.62em] text-center flex-shrink-0">
      {/* Ghost unlit 8 segment for physical LCD display effect */}
      <span className="text-accent/15 select-none pointer-events-none font-led">
        8
      </span>
      {/* Active illuminated cyan digit */}
      <span className="absolute inset-0 flex items-center justify-center text-accent font-led glow-text drop-shadow-[0_0_20px_hsl(var(--accent)/0.85)]">
        {char}
      </span>
    </span>
  );
};

const LCDBlock: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="flex items-center tracking-tight">
        {value.split("").map((digit, i) => (
          <LCDDigit key={i} char={digit} />
        ))}
      </div>
      <span className="text-[9px] sm:text-xs md:text-sm font-mono tracking-[0.2em] sm:tracking-[0.25em] text-accent/70 uppercase mt-2 sm:mt-3 font-semibold">
        {label}
      </span>
    </div>
  );
};

export const CountdownClock: React.FC<CountdownClockProps> = ({
  onCriticalityChange,
  onAccessGranted,
}) => {
  // Target: October 4th, 2026 at 00:00:00 local time
  const targetDate = new Date(2026, 9, 4, 0, 0, 0, 0);

  const calculateTimeRemaining = (): TimeRemaining => {
    const diff = targetDate.getTime() - Date.now();

    if (diff <= 0) {
      return {
        days: "000",
        hours: "00",
        minutes: "00",
        seconds: "00",
        isComplete: true,
      };
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return {
      days: d.toString().padStart(3, "0"),
      hours: h.toString().padStart(2, "0"),
      minutes: m.toString().padStart(2, "0"),
      seconds: s.toString().padStart(2, "0"),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining);

  useEffect(() => {
    onAccessGranted?.(true);
    onCriticalityChange?.(47);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [onAccessGranted, onCriticalityChange]);

  return (
    <div className="w-full max-w-6xl mx-auto my-4 sm:my-8 px-1 sm:px-4">
      {/* Prominent ZERO HOUR & PROJECT NECROGENESIS Heading */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-[10px] sm:text-xs font-mono text-accent uppercase tracking-widest mb-2 shadow-[0_0_15px_rgba(143,217,232,0.2)]">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
          <span>PROJECT NECROGENESIS // PHASE 3</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-mono tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400 glow-text uppercase drop-shadow-[0_0_35px_rgba(143,217,232,0.6)]">
          ZERO HOUR
        </h1>
        
        <p className="text-xs sm:text-sm font-mono text-accent/80 tracking-[0.2em] uppercase mt-1">
          CONVERGENCE TARGET: OCTOBER 04, 2026 // 00:00:00
        </p>
      </div>

      {/* Expanded Cyberpunk LCD Bezel Board - Zero cut-off guarantee */}
      <div className="relative bg-black/90 backdrop-blur-xl border border-accent/40 rounded-lg p-3 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(143,217,232,0.18)] overflow-hidden w-full">
        
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 sm:w-5 sm:h-5 border-t-2 border-l-2 border-accent"></div>
        <div className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-5 sm:h-5 border-t-2 border-r-2 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 sm:w-5 sm:h-5 border-b-2 border-l-2 border-accent"></div>
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-5 sm:h-5 border-b-2 border-r-2 border-accent"></div>

        {/* Subtle grid and vignette background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>

        {/* Top Header Telemetry */}
        <div className="relative z-10 flex items-center justify-between mb-3 sm:mb-6 border-b border-accent/20 pb-2 text-[9px] sm:text-xs font-mono text-accent/80 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>T-MINUS // SYSTEM LAUNCH</span>
          </div>
          <div className="text-accent/60 truncate ml-2">
            NEURAL GRID: PHASE 3 ACTIVE
          </div>
        </div>

        {/* Main LCD Digits Display - Sized to never cut off */}
        <div className="relative z-10 flex items-center justify-center gap-0.5 sm:gap-2 md:gap-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl py-2 sm:py-6 overflow-x-auto select-none">
          <LCDBlock value={timeLeft.days} label="Days" />
          <LCDDigit char=":" />
          <LCDBlock value={timeLeft.hours} label="Hours" />
          <LCDDigit char=":" />
          <LCDBlock value={timeLeft.minutes} label="Minutes" />
          <LCDDigit char=":" />
          <LCDBlock value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Bottom Status Subtext */}
        <div className="relative z-10 mt-3 sm:mt-6 pt-2 border-t border-accent/20 flex flex-wrap items-center justify-between text-[9px] sm:text-xs font-mono text-accent/60 tracking-wider gap-2">
          <div>DIRECTIVE:// PROJECT NECROGENESIS - PHASE 3</div>
          <div className="animate-pulse text-accent font-medium">ZERO HOUR LOCKED // STATUS: SYNCHRONIZED</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownClock;
