
import React, { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";

const artistsData = [
  {
    name: "Neural Echo",
    imageSrc: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    genre: "Techno Horror",
  },
  {
    name: "Biohazard X",
    imageSrc: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    genre: "Cyber Metal",
  },
  {
    name: "Glitch Soul",
    imageSrc: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    genre: "AI Core",
  },
  {
    name: "Midnight Protocol",
    imageSrc: "https://images.unsplash.com/photo-1571367533839-c1ad8b16e481?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    genre: "Dystopian Wave",
  },
  {
    name: "Binary Dreams",
    imageSrc: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    genre: "Zombie Trance",
  },
  {
    name: "System Failure",
    imageSrc: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    genre: "Nano Core",
  },
];

const LineupSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("lineup");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="lineup" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-black text-accent px-4 py-1 border border-accent text-sm font-matrix tracking-wide mb-4">
            THE SYSTEM
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-matrix font-bold text-white mb-4">
            PRINCIPAL TARGETS
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Identify and observe these high-value targets during the neural interface session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {artistsData.map((artist, index) => (
            <ArtistCard
              key={artist.name}
              name={artist.name}
              imageSrc={artist.imageSrc}
              genre={artist.genre}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block bg-transparent hover:bg-accent/10 text-accent px-8 py-3 border border-accent transition-all duration-300 font-matrix tracking-wide"
          >
            ACCESS FULL DATABASE
          </a>
        </div>
      </div>
    </section>
  );
};

export default LineupSection;
