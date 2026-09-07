
import React, { useState } from "react";
import { Skull } from "lucide-react";

interface ArtistCardProps {
  name: string;
  imageSrc: string;
  genre: string;
  index: number;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ name, imageSrc, genre, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div 
      className="artist-card overflow-hidden h-80 relative group border border-accent/20"
      style={{ 
        opacity: 0,
        animation: "appearFromBottom 0.6s ease forwards",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90 z-10"></div>
      
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <Skull size={40} className="text-accent animate-pulse" />
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        onLoad={() => setImageLoaded(true)}
        style={{ opacity: imageLoaded ? 1 : 0, transition: "opacity 0.5s" }}
      />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-1 bg-accent/50 animate-scan-line"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <span className="text-accent/80 text-sm tracking-wider block mb-1 font-matrix">
          {genre.toUpperCase()}
        </span>
        <h3 className="text-white text-2xl font-semibold tracking-tight font-matrix">
          {name.toUpperCase()}
        </h3>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button className="bg-accent/20 backdrop-blur-sm hover:bg-accent/30 text-white px-4 py-2 border border-accent/50 font-matrix">
          ACCESS DATA
        </button>
      </div>
    </div>
  );
};

export default ArtistCard;
