import React, { useEffect, useRef, useState } from "react";

type Series = {
  label: string;
  unit?: string;
  color: string;
  trend: "down" | "up" | "osc";
  min: number;
  max: number;
  start: number;
  format?: (v: number) => string;
};

const SERIES: Series[] = [
  { label: "loss",      color: "hsl(0 80% 65%)",   trend: "down", min: 0.4, max: 8.4, start: 8.4, format: (v) => v.toFixed(3) },
  { label: "reasoning", color: "hsl(190 70% 75%)", trend: "up",   min: 0.18, max: 0.97, start: 0.184, format: (v) => v.toFixed(3) },
  { label: "sync",      color: "hsl(140 70% 65%)", trend: "osc",  min: 0.0, max: 1.0, start: 0.0, format: (v) => (v * 100).toFixed(1) + "%" },
];

const POINTS = 48;
const W = 168;
const H = 42;

const Sparkline: React.FC<{ series: Series }> = ({ series }) => {
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: POINTS }, () => series.start)
  );
  const valueRef = useRef(series.start);
  const tRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      tRef.current += 1;
      let v = valueRef.current;
      const range = series.max - series.min;
      if (series.trend === "down") {
        const target = series.min + range * 0.06;
        v += (target - v) * 0.015 + (Math.random() - 0.5) * range * 0.04;
      } else if (series.trend === "up") {
        const target = series.max - range * 0.05;
        v += (target - v) * 0.012 + (Math.random() - 0.5) * range * 0.03;
      } else {
        const base = series.min + range * (0.55 + 0.35 * Math.sin(tRef.current / 18));
        v += (base - v) * 0.15 + (Math.random() - 0.5) * range * 0.05;
      }
      v = Math.max(series.min, Math.min(series.max, v));
      valueRef.current = v;
      setData((prev) => [...prev.slice(1), v]);
    }, 220);
    return () => clearInterval(id);
  }, [series]);

  const range = series.max - series.min || 1;
  const step = W / (POINTS - 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = H - ((v - series.min) / range) * (H - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const areaPoints = `0,${H} ${points} ${W},${H}`;
  const current = data[data.length - 1];
  const uid = `spark-${series.label}`;

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between text-[9px] font-mono tracking-wider uppercase">
        <span className="text-accent/70">{series.label}</span>
        <span style={{ color: series.color }} className="tabular-nums">
          {series.format ? series.format(current) : current.toFixed(3)}
        </span>
      </div>
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full h-[34px] sm:h-[42px]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={uid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={series.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={series.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* baseline grid */}
        <line x1="0" x2={W} y1={H / 2} y2={H / 2} stroke="hsl(190 70% 75% / 0.12)" strokeDasharray="2 3" />
        <polyline points={areaPoints} fill={`url(#${uid})`} stroke="none" />
        <polyline
          points={points}
          fill="none"
          stroke={series.color}
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 3px ${series.color})` }}
        />
        {/* head dot */}
        <circle
          cx={W}
          cy={H - ((current - series.min) / range) * (H - 6) - 3}
          r="1.8"
          fill={series.color}
          style={{ filter: `drop-shadow(0 0 4px ${series.color})` }}
        />
      </svg>
    </div>
  );
};

interface PerformanceGraphsProps {
  className?: string;
}

const PerformanceGraphs: React.FC<PerformanceGraphsProps> = ({ className = "" }) => {
  return (
    <div className={`w-full bg-[#080d14]/90 backdrop-blur-xl border border-accent/30 rounded-xl p-3 sm:p-4 shadow-[0_0_30px_rgba(143,217,232,0.1)] relative overflow-hidden ${className}`}>
      {/* Corner bracket accents */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent"></div>
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent"></div>
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-accent"></div>
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent"></div>

      <div className="flex items-center justify-between mb-2.5 border-b border-accent/15 pb-1.5">
        <span className="text-[10px] sm:text-xs font-mono text-accent/80 uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>NEURAL PERFORMANCE METRICS</span>
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE STREAM
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SERIES.map((s) => (
          <div key={s.label} className="bg-black/40 border border-accent/15 rounded-lg p-2 flex flex-col items-center">
            <Sparkline series={s} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceGraphs;
