import React, { useState, useRef, useEffect } from "react";
import { 
  Camera, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Maximize2, 
  Radio, 
  Activity
} from "lucide-react";

export const SecurityCamFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  const [frameTick, setFrameTick] = useState(1048);

  // Live ticking timestamp for CCTV surveillance authenticity
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const yr = now.getFullYear();
      const mo = String(now.getMonth() + 1).padStart(2, "0");
      const da = String(now.getDate()).padStart(2, "0");
      const hr = String(now.getHours()).padStart(2, "0");
      const mi = String(now.getMinutes()).padStart(2, "0");
      const se = String(now.getSeconds()).padStart(2, "0");
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, "0");
      setCurrentTimeStr(`${yr}-${mo}-${da} ${hr}:${mi}:${se}:${ms}`);
      setFrameTick((prev) => (prev + 1) % 99999);
    };

    updateTime();
    const timer = setInterval(updateTime, 100);
    return () => clearInterval(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="w-full my-1 sm:my-2 text-left">
      {/* Container matching dark glassmorphic terminal aesthetic */}
      <div className="bg-[#080d14]/95 backdrop-blur-xl border border-accent/30 rounded-xl p-3 sm:p-3.5 shadow-[0_0_30px_rgba(143,217,232,0.08)] relative overflow-hidden flex flex-col">
        {/* Corner bracket accents */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-accent"></div>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-accent"></div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-accent"></div>

        {/* Camera Header Bar */}
        <div className="flex items-center justify-between border-b border-accent/20 pb-2 mb-2">
          {/* Left: Camera Identification & Blinking REC */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold text-red-400 tracking-wider">
                ● REC
              </span>
            </div>

            <div className="h-3 w-[1px] bg-accent/20"></div>

            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono font-bold text-xs text-white tracking-wide">
                CAM_04 // SUB-LEVEL 3 LAB FEED
              </span>
            </div>

            <span className="hidden md:inline-block text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
              SEC-SURVEILLANCE
            </span>
          </div>

          {/* Right: Camera Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Mute/Unmute Toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? "Unmute Lab Audio" : "Mute Lab Audio"}
              className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 transition-all ${
                !isMuted 
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" 
                  : "bg-black/40 text-accent/60 hover:text-accent hover:bg-white/5 border border-accent/20"
              }`}
            >
              {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="text-[9px] hidden sm:inline">{!isMuted ? "AUDIO LIVE" : "MUTED"}</span>
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              title={isPlaying ? "Pause Feed" : "Resume Feed"}
              className="p-1.5 rounded bg-black/40 text-accent/60 hover:text-accent hover:bg-white/5 border border-accent/20 text-xs transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={handleFullscreen}
              title="Fullscreen CCTV"
              className="p-1.5 rounded bg-black/40 text-accent/60 hover:text-accent hover:bg-white/5 border border-accent/20 text-xs transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video Viewport Container */}
        <div className="relative rounded-lg overflow-hidden border border-accent/20 bg-black/90 aspect-[4/3] max-h-[300px] sm:max-h-[340px] w-full flex items-center justify-center">
          {/* Main Security Cam Video Stream */}
          <video
            ref={videoRef}
            src="/lab-cam-feed-web.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support HTML5 video streaming.
          </video>

          {/* CRT Scanline & Grain Texture Effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"
          />

          {/* CCTV HUD Corner Crosshair Markers */}
          <div className="absolute top-2 left-2 pointer-events-none text-cyan-400/70 font-mono text-[9px] leading-tight">
            <div className="border-t border-l border-cyan-400/60 w-3 h-3 mb-1"></div>
            <div className="bg-black/70 px-1 py-0.5 rounded border border-cyan-500/20 backdrop-blur-sm">
              <span className="text-emerald-400 font-semibold">[LIVE]</span> 24.0 FPS // IR-ON
            </div>
          </div>

          <div className="absolute top-2 right-2 pointer-events-none text-right font-mono text-[9px] leading-tight">
            <div className="border-t border-r border-cyan-400/60 w-3 h-3 ml-auto mb-1"></div>
            <div className="bg-black/70 px-1.5 py-0.5 rounded border border-cyan-500/20 text-accent/80 backdrop-blur-sm">
              {currentTimeStr || "2026-10-24 19:00:00"}
            </div>
          </div>

          <div className="absolute bottom-2 left-2 pointer-events-none font-mono text-[9px] leading-tight">
            <div className="bg-black/70 px-1.5 py-0.5 rounded border border-cyan-500/20 text-accent/80 backdrop-blur-sm flex items-center gap-1.5">
              <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
              <span>FACILITY: POWER PLANT // SECTOR: B-4</span>
            </div>
            <div className="border-b border-l border-cyan-400/60 w-3 h-3 mt-1"></div>
          </div>

          <div className="absolute bottom-2 right-2 pointer-events-none text-right font-mono text-[9px] leading-tight">
            <div className="bg-black/70 px-1.5 py-0.5 rounded border border-cyan-500/20 text-accent/80 backdrop-blur-sm">
              FRM: #{String(frameTick).padStart(5, "0")} // RAW_H264
            </div>
            <div className="border-b border-r border-cyan-400/60 w-3 h-3 ml-auto mt-1"></div>
          </div>

          {/* Center Target Reticle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-10 h-10 border border-dashed border-cyan-400/50 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-cyan-400/80 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom Surveillance Status Bar */}
        <div className="flex items-center justify-between pt-2 mt-1.5 text-[9px] sm:text-[10px] font-mono text-accent/60">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-2.5 h-2.5 animate-pulse" />
              <span>FEED SYNCHRONIZED</span>
            </span>
            <span className="text-accent/30">|</span>
            <span className="hidden sm:inline text-accent/70">Z-HOST SATELLITE RELAY</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-accent/50">DROP RATE: 0.000%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCamFeed;
