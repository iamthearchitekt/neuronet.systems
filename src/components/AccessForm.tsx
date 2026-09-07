import React, { useEffect, useRef, useState } from "react";

const AccessForm: React.FC<{ 
  onAccessGranted?: (granted: boolean) => void;
  onCriticalityChange?: (criticality: number) => void;
}> = ({ onAccessGranted, onCriticalityChange }) => {
  const countdownCleanup = useRef<(() => void) | null>(null);
  const countdownBoxRef = useRef<HTMLDivElement>(null);
  
  const [countdown, setCountdown] = useState<string>("");

  const getTargetDate = () => {
    // Target: October 17th, 2025 at midnight
    return new Date(2025, 9, 17, 0, 0, 0, 0); // Months are 0-indexed: 9 = October
  };

  const startCountdown = (alignToBoundary: boolean = false) => {
    const target = getTargetDate();
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown("000:00:00:00");
        onCriticalityChange?.(47); // Keep in RECONNECTING state
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      // Fixed criticality at 47% for RECONNECTING status (53% grid integrity)
      onCriticalityChange?.(47);
      
      const pad2 = (n: number) => n.toString().padStart(2, "0");
      const pad3 = (n: number) => n.toString().padStart(3, "0");
      
      setCountdown(`${pad3(days)}:${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`);
    };
    
    let intervalId: number | null = null;
    if (alignToBoundary) {
      update(); // Call immediately to avoid delay
      const msToNext = 1000 - (Date.now() % 1000);
      const timeoutId = window.setTimeout(() => {
        update();
        intervalId = window.setInterval(update, 1000) as unknown as number;
      }, msToNext);
      return () => {
        window.clearTimeout(timeoutId);
        if (intervalId) window.clearInterval(intervalId);
      };
    } else {
      update();
      const id = window.setInterval(update, 1000) as unknown as number;
      return () => window.clearInterval(id);
    }
  };


  // Start countdown on component mount
  useEffect(() => {
    countdownCleanup.current = startCountdown(true);
    onAccessGranted?.(true); // Trigger any parent logic immediately
    
    return () => {
      if (countdownCleanup.current) countdownCleanup.current();
    };
  }, [onAccessGranted]);

  return (
    <section className="py-8 px-4 sm:px-6 md:px-8 bg-transparent">
      <div className="container mx-auto max-w-4xl">
        {/* Hidden ref */}
        <div ref={countdownBoxRef} className="sr-only" aria-hidden="true"></div>
      </div>
    </section>
  );
};

export default AccessForm;