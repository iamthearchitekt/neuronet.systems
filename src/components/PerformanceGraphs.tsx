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

const PerformanceGraphs: React.FC = () => {
  return (
    <div className="fixed z-40 pointer-events-none top-11 left-2 right-2 sm:top-12 sm:left-auto sm:right-4 sm:w-auto">
      <div className="bg-black/60 backdrop-blur-md border border-accent/25 rounded-sm px-3 py-2 shadow-[0_0_20px_-8px_hsl(190_70%_75%/0.5)] mx-auto sm:mx-0 max-w-[420px] sm:max-w-none">
        <div className="grid grid-cols-3 gap-3 sm:hidden">
          {SERIES.map((s) => (
            <Sparkline key={s.label} series={s} />
          ))}
        </div>
        <div className="hidden sm:block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-mono text-accent/60 uppercase tracking-widest">
            live telemetry
          </span>
          <span className="flex items-center gap-1 text-[9px] font-mono text-accent/60 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            rec
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {SERIES.map((s) => (
            <Sparkline key={s.label} series={s} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraphs;
