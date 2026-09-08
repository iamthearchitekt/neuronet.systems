import React, { useEffect, useRef, useState } from "react";
import { Terminal, FileCode, Play, Sparkles, Circle, CheckCircle2, Pause, Play as PlayIcon, Filter, ArrowDown } from "lucide-react";

interface CodeIDEWindowProps {
  lines: Array<{ id: number; text: string }>;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "SYNAPSE" | "REANIM" | "KINEMATIC" | "WARN" | "CRIT" | "SUCCESS";
  subsystem: string;
  message: string;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "00:01:04.112",
    level: "INFO",
    subsystem: "BOOT:KERNEL",
    message: "Mounting micro-electrode kernel v4.19-necro... [SUBSYSTEM_OK]"
  },
  {
    id: "log-2",
    timestamp: "00:01:04.348",
    level: "REANIM",
    subsystem: "PERFUSION:0",
    message: "Sub-zero fluorocarbon emulsifier loop primed at 4.20 mL/min (4.0°C)."
  },
  {
    id: "log-3",
    timestamp: "00:01:04.819",
    level: "INFO",
    subsystem: "MEM:ALLOC",
    message: "Binding synaptic DMA buffer 0x7FFF9E37 (16,384 channels mapped)."
  },
  {
    id: "log-4",
    timestamp: "00:01:05.105",
    level: "SYNAPSE",
    subsystem: "DBS:GRID",
    message: "Platinum-iridium shunt array impedance test: mean 41.8 kΩ [NOMINAL]."
  },
  {
    id: "log-5",
    timestamp: "00:01:05.620",
    level: "REANIM",
    subsystem: "ION:BALANCE",
    message: "Extracellular Na+/K+ ratio normalized across tissue block C-4 (-69.8 mV)."
  },
  {
    id: "log-6",
    timestamp: "00:01:06.014",
    level: "REANIM",
    subsystem: "ATP:SYNTH",
    message: "Synthetic ATP analog infused into cadaveric layer IV pyramidal neurons."
  },
  {
    id: "log-7",
    timestamp: "00:01:06.741",
    level: "WARN",
    subsystem: "AUTOLYSIS",
    message: "Excitotoxic glutamate accumulation detected. Releasing NMDA antagonists."
  },
  {
    id: "log-8",
    timestamp: "00:01:07.218",
    level: "SUCCESS",
    subsystem: "AUTOLYSIS",
    message: "Enzymatic tissue decay halted. Viability coefficient: 0.984 [STABLE]."
  },
  {
    id: "log-9",
    timestamp: "00:01:07.994",
    level: "SYNAPSE",
    subsystem: "DEPOLARIZE",
    message: "Biphasic galvanic pulse train engaged: 40 Hz, 1.8 mA, 200 µs pulse-width."
  },
  {
    id: "log-10",
    timestamp: "00:01:08.512",
    level: "SUCCESS",
    subsystem: "ACTION_POT",
    message: "Coherent axonal propagation detected. Velocity: 94.8 m/s."
  },
  {
    id: "log-11",
    timestamp: "00:01:09.120",
    level: "KINEMATIC",
    subsystem: "SERVO:BYPASS",
    message: "Cortical-spinal motor vector bridged to titanium cervical collar servo."
  },
  {
    id: "log-12",
    timestamp: "00:01:09.845",
    level: "INFO",
    subsystem: "NEURONET:CORE",
    message: "Model weight sync with central cluster: epoch NG-LZ3-TRAIN-0427."
  },
  {
    id: "log-13",
    timestamp: "00:01:10.420",
    level: "CRIT",
    subsystem: "Z-CLASS:SENS",
    message: "Spontaneous 40.2 Hz gamma spike in non-living specimen #7. Resonance flicker."
  },
  {
    id: "log-14",
    timestamp: "00:01:11.002",
    level: "WARN",
    subsystem: "SUPERVISOR",
    message: "Operator override bypassed. Lazarus-3 executing autonomous telemetry."
  },
  {
    id: "log-15",
    timestamp: "00:01:11.890",
    level: "SUCCESS",
    subsystem: "ZERO_HOUR",
    message: "Target convergence locked: 2026-10-04T00:00:00Z. Countdown synchronized."
  },
];

const DYNAMIC_LOG_POOL = [
  {
    level: "REANIM" as const,
    subsystem: "PERFUSION:0",
    message: "Micro-vascular pressure: 18.2 mmHg. Flow rate: 4.15 mL/min. Oxygenation: 98.4%."
  },
  {
    level: "SYNAPSE" as const,
    subsystem: "NEURAL_LINK",
    message: "Cortical layer V firing rate: 128 Hz across 2,048 micro-electrodes. Zero signal drop."
  },
  {
    level: "REANIM" as const,
    subsystem: "MITOCHONDRIA",
    message: "Synthetic ATP phosphorylation rate: 91.2%. Aerobic glycolysis maintained in non-viable cell beds."
  },
  {
    level: "KINEMATIC" as const,
    subsystem: "ACTUATOR:FINE",
    message: "Peripheral nerve cuff translation latency: 1.12 ms. Harmonic gear torque: 184 Nm."
  },
  {
    level: "INFO" as const,
    subsystem: "NEURONET:SYNC",
    message: "Loss decay delta: -0.0142. Generalization factor: 0.8924. Zero drop rate verified."
  },
  {
    level: "SYNAPSE" as const,
    subsystem: "DBS:SHUNT",
    message: "Parylene-C dielectric barrier intact. Current leakage < 0.02 nA. Impedance stable."
  },
  {
    level: "SUCCESS" as const,
    subsystem: "ZERO_HOUR",
    message: "Temporal drift: 0.0000 ms. Phase 3 trajectory aligned with 2026.10.04 coordinate."
  },
  {
    level: "WARN" as const,
    subsystem: "THERMAL:GRID",
    message: "Core probe bank 0x3F registered +0.3°C excursion. Chilled fluorocarbon loop compensated."
  },
  {
    level: "CRIT" as const,
    subsystem: "Z-CLASS:CORPUS",
    message: "Cognitive feedback loop entered recursive depth 8. AGI proximity threshold: 0.942."
  },
  {
    level: "INFO" as const,
    subsystem: "FIRMWARE:3X",
    message: "NG_HOST_FW_3.18.7 heartbeat verified. All 7 host directives enforcement active."
  }
];

export const CodeIDEWindow: React.FC<CodeIDEWindowProps> = ({ lines }) => {
  const codeScrollRef = useRef<HTMLDivElement>(null);
  const logScrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"code" | "log">("code");
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [logFilter, setLogFilter] = useState<"ALL" | "INFO" | "SYNAPSE" | "REANIM" | "WARN_CRIT">("ALL");
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll to bottom of code execution
  useEffect(() => {
    if (activeTab === "code" && codeScrollRef.current) {
      codeScrollRef.current.scrollTop = codeScrollRef.current.scrollHeight;
    }
  }, [lines, activeTab]);

  // Auto-scroll to bottom of log execution
  useEffect(() => {
    if (activeTab === "log" && isAutoScroll && logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [logs, activeTab, isAutoScroll]);

  // Dynamic live streaming logs every ~2.4 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const template = DYNAMIC_LOG_POOL[Math.floor(Math.random() * DYNAMIC_LOG_POOL.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(now.getMilliseconds()).padStart(3, "0")}`;

      const newLog: LogEntry = {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: timeStr,
        level: template.level,
        subsystem: template.subsystem,
        message: template.message
      };

      setLogs((prev) => {
        // Keep last 150 entries
        const updated = [...prev, newLog];
        return updated.length > 150 ? updated.slice(updated.length - 150) : updated;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Filtered log records
  const filteredLogs = logs.filter((l) => {
    if (logFilter === "ALL") return true;
    if (logFilter === "INFO") return l.level === "INFO" || l.level === "SUCCESS";
    if (logFilter === "SYNAPSE") return l.level === "SYNAPSE";
    if (logFilter === "REANIM") return l.level === "REANIM" || l.level === "KINEMATIC";
    if (logFilter === "WARN_CRIT") return l.level === "WARN" || l.level === "CRIT";
    return true;
  });

  // Level Badge Styler
  const renderLevelBadge = (level: LogEntry["level"]) => {
    switch (level) {
      case "INFO":
        return (
          <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-bold">
            INFO
          </span>
        );
      case "SYNAPSE":
        return (
          <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 font-bold">
            SYNAPSE
          </span>
        );
      case "REANIM":
        return (
          <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-bold">
            REANIM
          </span>
        );
      case "KINEMATIC":
        return (
          <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold">
            KINEMATIC
          </span>
        );
      case "WARN":
        return (
          <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-yellow-950/60 text-yellow-300 border border-yellow-500/30 font-bold">
            WARN
          </span>
        );
      case "CRIT":
        return (
          <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-red-950/60 text-red-300 border border-red-500/30 font-bold animate-pulse">
            CRIT
          </span>
        );
      case "SUCCESS":
        return (
          <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-teal-950/60 text-teal-300 border border-teal-500/30 font-bold">
            SUCCESS
          </span>
        );
    }
  };

  // Syntax colorizer for Necrogenesis Python code
  const renderFormattedLine = (text: string) => {
    if (text.startsWith("#")) {
      return <span className="text-cyan-400/50 italic text-left">{text}</span>;
    }
    if (text.startsWith("[BOOT]") || text.startsWith("[FW]")) {
      return (
        <span className="text-left">
          <span className="text-emerald-400 font-bold">{text.slice(0, 6)}</span>
          <span className="text-cyan-200/90">{text.slice(6)}</span>
        </span>
      );
    }
    if (text.startsWith("[REPORT]")) {
      return (
        <span className="text-left">
          <span className="text-amber-400 font-bold">{text.slice(0, 8)}</span>
          <span className="text-cyan-100">{text.slice(8)}</span>
        </span>
      );
    }

    // Basic Python token highlighting
    const parts = text.split(/(\b(?:import|def|return|if|True|False|while|for|in|time|random|print)\b|"[^"]*"|'[^']*')/g);

    return parts.map((part, idx) => {
      if (["import", "def", "return", "if", "True", "False", "while", "for", "in"].includes(part)) {
        return (
          <span key={idx} className="text-purple-400 font-semibold text-left">
            {part}
          </span>
        );
      }
      if (["print", "time", "random"].includes(part)) {
        return (
          <span key={idx} className="text-cyan-300 font-medium text-left">
            {part}
          </span>
        );
      }
      if (part.startsWith('"') || part.startsWith("'")) {
        return (
          <span key={idx} className="text-emerald-300 text-left">
            {part}
          </span>
        );
      }
      return (
        <span key={idx} className="text-slate-200 text-left">
          {part}
        </span>
      );
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#080d14]/95 border border-accent/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(143,217,232,0.1)] backdrop-blur-xl text-left">
      {/* IDE Window Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#05090f] border-b border-accent/20 select-none text-left">
        {/* macOS / Unix Window Buttons */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80"></div>
          <span className="ml-2 text-[10px] font-mono text-accent/50 hidden sm:inline">
            NEURONET_IDE // v3.8.4
          </span>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-t transition-all ${
              activeTab === "code"
                ? "bg-[#0b131e] text-accent border-t border-accent/50 shadow-sm"
                : "text-accent/50 hover:text-accent/80 hover:bg-white/5"
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>lazarus3_phase3.py</span>
            {activeTab === "code" && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("log")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-t transition-all ${
              activeTab === "log"
                ? "bg-[#0b131e] text-accent border-t border-accent/50 shadow-sm"
                : "text-accent/50 hover:text-accent/80 hover:bg-white/5"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>necrogenesis.log</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </button>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{activeTab === "code" ? "EXEC // RUNNING" : "DAEMON // LIVE"}</span>
        </div>
      </div>

      {/* Editor Breadcrumbs */}
      <div className="px-3 sm:px-4 py-1.5 bg-[#070c14] border-b border-accent/10 text-[11px] font-mono text-accent/60 flex items-center justify-between text-left">
        <div className="flex items-center gap-1.5 truncate text-left">
          <span>project-necrogenesis</span>
          <span>&gt;</span>
          {activeTab === "code" ? (
            <>
              <span>phase_3</span>
              <span>&gt;</span>
              <span className="text-accent font-medium">train_lazarus3.py</span>
            </>
          ) : (
            <>
              <span>var</span>
              <span>&gt;</span>
              <span>log</span>
              <span>&gt;</span>
              <span className="text-emerald-400 font-medium">necrogenesis.log</span>
            </>
          )}
        </div>
        <div className="text-[10px] text-accent/60 flex items-center gap-2">
          <span>{activeTab === "code" ? "Python 3.12" : "ANSI Log Stream"}</span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* Log Filter & Control Toolbar (Visible when necrogenesis.log tab is selected) */}
      {activeTab === "log" && (
        <div className="px-3 py-1.5 bg-[#05090f] border-b border-accent/15 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
          {/* Filter Chips */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-accent/50 mr-1 flex items-center gap-1">
              <Filter className="w-2.5 h-2.5" /> FILTER:
            </span>
            {(["ALL", "INFO", "SYNAPSE", "REANIM", "WARN_CRIT"] as const).map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setLogFilter(filterKey)}
                className={`px-2 py-0.5 rounded transition-all ${
                  logFilter === filterKey
                    ? "bg-accent/20 text-accent border border-accent/40 font-bold"
                    : "text-accent/50 hover:text-accent hover:bg-white/5"
                }`}
              >
                {filterKey === "WARN_CRIT" ? "WARN/CRIT" : filterKey}
              </button>
            ))}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-accent/80 border border-accent/20 transition-all"
            >
              {isPaused ? <PlayIcon className="w-2.5 h-2.5 text-emerald-400" /> : <Pause className="w-2.5 h-2.5 text-amber-400" />}
              <span>{isPaused ? "RESUME" : "PAUSE"}</span>
            </button>

            <button
              onClick={() => setIsAutoScroll(!isAutoScroll)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-all ${
                isAutoScroll
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
                  : "bg-black border-accent/20 text-accent/50"
              }`}
            >
              <ArrowDown className="w-2.5 h-2.5" />
              <span>SCROLL: {isAutoScroll ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 1 CONTENT: Python Code Editor Body with strict Left-Justification */}
      {activeTab === "code" && (
        <div
          ref={codeScrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden p-3 font-mono text-[11px] sm:text-xs leading-relaxed bg-[#060a10]/90 select-text scrollbar-thin scrollbar-thumb-accent/20 text-left"
          style={{ minHeight: "360px", maxHeight: "680px" }}
        >
          <div className="flex text-left items-start">
            {/* Line Numbers Gutter */}
            <div className="select-none pr-3 mr-3 text-right text-accent/25 border-r border-accent/15 flex flex-col font-mono text-[10px] sm:text-[11px] w-8 flex-shrink-0">
              {lines.map((_, index) => (
                <span key={index} className="leading-relaxed">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              ))}
            </div>

            {/* Code Text Content - STRICT LEFT JUSTIFIED */}
            <div className="flex-1 flex flex-col overflow-x-auto whitespace-pre font-mono text-left items-start">
              {lines.map((line) => (
                <div key={line.id} className="leading-relaxed hover:bg-accent/5 px-1 rounded text-left w-full">
                  {renderFormattedLine(line.text)}
                </div>
              ))}
              {/* Live Typing Indicator Cursor */}
              <div className="flex items-center gap-1 text-accent animate-pulse mt-1 text-left">
                <span className="inline-block w-2 h-3.5 bg-accent shadow-[0_0_8px_hsl(var(--accent))]"></span>
                <span className="text-[10px] text-accent/50 font-mono italic text-left">
                  executing Lazarus-3 training cycle...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 CONTENT: Live Necrogenesis System Log Stream */}
      {activeTab === "log" && (
        <div
          ref={logScrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden p-3 font-mono text-[11px] sm:text-xs leading-relaxed bg-[#05080e]/95 select-text scrollbar-thin scrollbar-thumb-accent/20 text-left"
          style={{ minHeight: "360px", maxHeight: "680px" }}
        >
          <div className="flex flex-col gap-1.5 text-left">
            {filteredLogs.map((log, index) => (
              <div
                key={log.id}
                className="flex items-start gap-2 hover:bg-white/5 px-1.5 py-0.5 rounded transition-colors text-left font-mono"
              >
                {/* Log Line Number */}
                <span className="select-none text-accent/25 text-[10px] w-6 text-right flex-shrink-0">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                {/* Timestamp */}
                <span className="text-accent/50 text-[10px] flex-shrink-0 font-mono">
                  [{log.timestamp}]
                </span>

                {/* Level Badge */}
                <div className="flex-shrink-0">
                  {renderLevelBadge(log.level)}
                </div>

                {/* Subsystem */}
                <span className="text-cyan-300/80 font-semibold text-[10px] sm:text-[11px] flex-shrink-0">
                  [{log.subsystem}]
                </span>

                {/* Log Message */}
                <span className="text-slate-200 text-left break-all flex-1 text-[11px] sm:text-xs">
                  {log.message}
                </span>
              </div>
            ))}

            {/* Daemon Live Prompt at bottom */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-accent/50 mt-2 pt-2 border-t border-accent/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-400 font-mono">› [DAEMON_ACTIVE]</span>
              <span className="italic">/var/log/necrogenesis.log streaming from Lazarus-3 neural kernel...</span>
            </div>
          </div>
        </div>
      )}

      {/* IDE Bottom Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#05090f] border-t border-accent/20 text-[10px] font-mono text-accent/60 text-left">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-accent/80">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>{activeTab === "code" ? "Integrity: 100%" : `Records: ${logs.length}`}</span>
          </span>
          <span className="hidden sm:inline text-accent/40">|</span>
          <span className="hidden sm:inline text-accent/70">
            {activeTab === "code" ? "Directive: Necrogenesis Phase 3" : "Telemetry: 16,384 CH"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-semibold">
            {activeTab === "code" ? "Zero Hour Sync: ACTIVE" : "Zero Hour Convergence: LOCKED"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CodeIDEWindow;
