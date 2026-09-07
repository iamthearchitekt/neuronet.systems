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
      <span className="relative inline-flex items-center justify-center select-none px-1 sm:px-2 md:px-3">
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
    <span className="relative inline-flex items-center justify-center select-none w-[0.62em] text-center">
      {/* Ghost unlit 8 segments for true LCD display look */}
      <span className="text-accent/15 select-none pointer-events-none font-led">
        8
      </span>
      {/* Active illuminated digit */}
      <span className="absolute inset-0 flex items-center justify-center text-accent font-led glow-text drop-shadow-[0_0_15px_hsl(var(--accent)/0.8)]">
        {char}
      </span>
    </span>
  );
};

const LCDBlock: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center tracking-tight">
        {value.split("").map((digit, i) => (
          <LCDDigit key={i} char={digit} />
        ))}
      </div>
      <span className="text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-accent/70 uppercase mt-2 sm:mt-3 font-semibold">
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
    <div className="w-full max-w-5xl mx-auto my-6 sm:my-10 px-2 sm:px-4">
      {/* Cyberpunk LCD Bezel Panel */}
      <div className="relative bg-black/85 backdrop-blur-md border border-accent/40 rounded-sm p-4 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(143,217,232,0.15)] overflow-hidden">
        
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-accent"></div>
        <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-accent"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-accent"></div>

        {/* Subtle radial vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>

        {/* Top Header Label */}
        <div className="relative z-10 flex items-center justify-between mb-4 sm:mb-6 border-b border-accent/20 pb-2 text-[10px] sm:text-xs font-mono text-accent/80 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span>T-MINUS // SYSTEM LAUNCH</span>
          </div>
          <div className="text-accent/60">
            TARGET: 2026.10.04 // 00:00:00
          </div>
        </div>

        {/* Main LCD Digits Display */}
        <div className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl py-2 sm:py-4">
          <LCDBlock value={timeLeft.days} label="Days" />
          <LCDDigit char=":" />
          <LCDBlock value={timeLeft.hours} label="Hours" />
          <LCDDigit char=":" />
          <LCDBlock value={timeLeft.minutes} label="Minutes" />
          <LCDDigit char=":" />
          <LCDBlock value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Bottom Status Subtext */}
        <div className="relative z-10 mt-4 sm:mt-6 pt-2 border-t border-accent/20 flex flex-wrap items-center justify-between text-[10px] sm:text-xs font-mono text-accent/60 tracking-wider">
          <div>LOC:// NEURONET.SYSTEMS</div>
          <div className="animate-pulse text-accent">GRID INTEGRITY: SYNCHRONIZED</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownClock;
