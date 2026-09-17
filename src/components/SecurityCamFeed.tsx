import React, { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const SecurityCamFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div className="w-full relative rounded-lg border border-accent/30 overflow-hidden bg-black">
      <video
        ref={videoRef}
        src="/lab-cam-feed-web.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-auto block pointer-events-none"
      />
      <button
        onClick={toggleSound}
        type="button"
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="absolute bottom-1.5 right-1.5 p-1 rounded bg-black/60 hover:bg-black/80 text-white/70 hover:text-white"
      >
        {isMuted ? (
          <VolumeX className="w-3 h-3" />
        ) : (
          <Volume2 className="w-3 h-3" />
        )}
      </button>
    </div>
  );
};

export default SecurityCamFeed;
