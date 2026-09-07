
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Home, AlertCircle } from "lucide-react";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      <div className="scan-line"></div>
      
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="text-center px-6 max-w-md mx-auto glass p-8 border border-accent/30">
          <div className="flex justify-center mb-6">
            <AlertCircle size={60} className="text-accent animate-pulse" />
          </div>
          <h1 className="text-7xl font-matrix font-bold mb-4 text-accent glitch-text" data-text="404">404</h1>
          <p className="text-xl text-white/70 mb-8 font-matrix">
            SYSTEM ERROR: NEURAL CONNECTION SEVERED. SECTOR NOT FOUND.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-black px-6 py-3 transition-all duration-300 font-matrix"
          >
            <Home size={18} />
            RETURN TO CENTRAL CORE
          </a>
          <p className="mt-6 text-xs text-white/40 font-matrix">POWERED BY NUEROSYNTH DYNAMICS</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
