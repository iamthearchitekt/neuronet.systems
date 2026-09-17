import React from "react";

export const SecurityCamFeed: React.FC = () => {
  return (
    <div className="w-full rounded-lg border border-accent/30 overflow-hidden bg-black">
      <video
        src="/lab-cam-feed-web.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls
        className="w-full h-auto block"
      />
    </div>
  );
};

export default SecurityCamFeed;
