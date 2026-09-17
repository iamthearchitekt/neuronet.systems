import React, { useRef, useState } from "react";
import { Volume2, VolumeX, ChevronDown, ChevronUp } from "lucide-react";

export const SecurityCamFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div className="w-full rounded-lg border border-accent/30 overflow-hidden bg-black">
      {/* Window Header Bar with Collapse Toggle */}
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between px-3 py-1.5 bg-[#05090f] hover:bg-[#070e18] cursor-pointer transition-colors border-b border-accent/20 select-none"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span className="text-[10px] font-mono text-accent/80 font-medium tracking-wider">
            LAB FEED
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {!isCollapsed && (
            <button
              onClick={toggleSound}
              type="button"
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-3 h-3" />
              ) : (
                <Volume2 className="w-3 h-3" />
              )}
            </button>
          )}

          <button
            type="button"
            aria-label={isCollapsed ? "Expand Feed" : "Collapse Feed"}
            className="p-1 rounded hover:bg-white/10 text-accent/70 hover:text-white transition-colors"
          >
            {isCollapsed ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Video Frame */}
      {!isCollapsed && (
        <div className="w-full bg-black">
          <video
            ref={videoRef}
            src="/lab-cam-feed-web.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-auto block pointer-events-none"
          />
        </div>
      )}
    </div>
  );
};

export default SecurityCamFeed;
