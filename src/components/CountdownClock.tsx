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
      <span className="relative inline-flex items-center justify-center select-none w-[0.2em] self-start h-[1em] px-0 -mx-1 sm:-mx-1.5 md:-mx-2 flex-shrink-0">
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
    <span className="relative inline-flex items-center justify-center select-none w-[0.52em] text-center flex-shrink-0">
      {/* Ghost unlit 8 segment for physical LCD display effect */}
      <span className="text-accent/15 select-none pointer-events-none font-led">
        8
      </span>
      {/* Active illuminated cyan digit */}
      <span className="absolute inset-0 flex items-center justify-center text-accent font-led glow-text drop-shadow-[0_0_16px_hsl(var(--accent)/0.85)]">
        {char}
      </span>
    </span>
  );
};

const LCDBlock: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="flex items-center tracking-tighter">
        {value.split("").map((digit, i) => (
          <LCDDigit key={i} char={digit} />
        ))}
      </div>
      <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.15em] sm:tracking-[0.2em] text-accent/70 uppercase mt-1 sm:mt-1.5 font-semibold text-center">
        {label}
      </span>
    </div>
  );
};

export const CountdownClock: React.FC<CountdownClockProps> = ({
  onCriticalityChange,
  onAccessGranted,
}) => {
  // Target: October 24th, 2026 at 00:00:00 local time
  const targetDate = new Date(2026, 9, 24, 0, 0, 0, 0);

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
    <div className="w-full my-1 sm:my-2">
      {/* Expanded Cyberpunk LCD Bezel Board - Zero cut-off guarantee */}
      <div className="relative bg-black/90 backdrop-blur-xl border border-accent/40 rounded-xl p-3 sm:p-4 md:p-5 shadow-[0_0_50px_rgba(143,217,232,0.15)] overflow-hidden w-full">
        
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 sm:w-5 sm:h-5 border-t-2 border-l-2 border-accent"></div>
        <div className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-5 sm:h-5 border-t-2 border-r-2 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 sm:w-5 sm:h-5 border-b-2 border-l-2 border-accent"></div>
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-5 sm:h-5 border-b-2 border-r-2 border-accent"></div>

        {/* Subtle grid and vignette background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>

        {/* Top Header Telemetry */}
        <div className="relative z-10 flex items-center justify-between mb-2 sm:mb-3 border-b border-accent/20 pb-1.5 text-[9px] sm:text-xs font-mono text-accent/80 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-bold text-accent">ZERO HOUR COUNTDOWN</span>
          </div>
        </div>

        {/* Main LCD Digits Display - Tightened spacing & comfortable breathing room */}
        <div className="relative z-10 flex items-start justify-center gap-1 sm:gap-2 md:gap-2.5 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl py-2 sm:py-3.5 w-full select-none">
          <LCDBlock value={timeLeft.days} label="Days" />
          <LCDDigit char=":" />
          <LCDBlock value={timeLeft.hours} label="Hours" />
          <LCDDigit char=":" />
          <LCDBlock value={timeLeft.minutes} label="Minutes" />
          <LCDDigit char=":" />
          <LCDBlock value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
};

export default CountdownClock;
