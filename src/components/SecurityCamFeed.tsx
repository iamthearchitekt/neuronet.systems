import React from "react";

export const SecurityCamFeed: React.FC = () => {
  return (
    <div className="w-full my-1 sm:my-2 rounded-xl overflow-hidden border border-accent/30 bg-black shadow-[0_0_30px_rgba(143,217,232,0.08)]">
      <video
        src="/lab-cam-feed-web.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls
        className="w-full h-auto object-cover rounded-xl"
      >
        Your browser does not support HTML5 video streaming.
      </video>
    </div>
  );
};

export default SecurityCamFeed;
