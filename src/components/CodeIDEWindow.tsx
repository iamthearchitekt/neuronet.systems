import React, { useEffect, useRef, useState } from "react";
import { Terminal, FileCode, Play, Sparkles, Circle, CheckCircle2 } from "lucide-react";

interface CodeLine {
  id: number;
  text: string;
  isDiagnostic?: boolean;
  isComment?: boolean;
  isKeyword?: boolean;
}

interface CodeIDEWindowProps {
  lines: Array<{ id: number; text: string }>;
}

export const CodeIDEWindow: React.FC<CodeIDEWindowProps> = ({ lines }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"code" | "telemetry">("code");

  // Auto-scroll to bottom of code execution
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Syntax colorizer for Necrogenesis Python code
  const renderFormattedLine = (text: string) => {
    if (text.startsWith("#")) {
      return <span className="text-cyan-400/50 italic">{text}</span>;
    }
    if (text.startsWith("[BOOT]") || text.startsWith("[FW]")) {
      return (
        <span>
          <span className="text-emerald-400 font-bold">{text.slice(0, 6)}</span>
          <span className="text-cyan-200/90">{text.slice(6)}</span>
        </span>
      );
    }
    if (text.startsWith("[REPORT]")) {
      return (
        <span>
          <span className="text-amber-400 font-bold">{text.slice(0, 8)}</span>
          <span className="text-cyan-100">{text.slice(8)}</span>
        </span>
      );
    }

    // Basic Python token highlighting
    const parts = text.split(/(\b(?:import|def|return|if|True|False|while|for|in|time|random|print)\b|"[^"]*"|'[^']*')/g);

    return parts.map((part, idx) => {
      if (
        ["import", "def", "return", "if", "True", "False", "while", "for", "in"].includes(part)
      ) {
        return (
          <span key={idx} className="text-purple-400 font-semibold">
            {part}
          </span>
        );
      }
      if (["print", "time", "random"].includes(part)) {
        return (
          <span key={idx} className="text-cyan-300 font-medium">
            {part}
          </span>
        );
      }
      if (part.startsWith('"') || part.startsWith("'")) {
        return (
          <span key={idx} className="text-emerald-300">
            {part}
          </span>
        );
      }
      return (
        <span key={idx} className="text-slate-200">
          {part}
        </span>
      );
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#080d14]/95 border border-accent/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(143,217,232,0.1)] backdrop-blur-xl">
      {/* IDE Window Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#05090f] border-b border-accent/20 select-none">
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
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab("telemetry")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-t transition-all ${
              activeTab === "telemetry"
                ? "bg-[#0b131e] text-accent border-t border-accent/50 shadow-sm"
                : "text-accent/50 hover:text-accent/80 hover:bg-white/5"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">necrogenesis.log</span>
          </button>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>EXEC // RUNNING</span>
        </div>
      </div>

      {/* Editor Breadcrumbs */}
      <div className="px-4 py-1.5 bg-[#070c14] border-b border-accent/10 text-[11px] font-mono text-accent/40 flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <span>project-necrogenesis</span>
          <span>&gt;</span>
          <span>phase_3</span>
          <span>&gt;</span>
          <span className="text-accent/80 font-medium">train_lazarus3.py</span>
        </div>
        <div className="text-[10px] text-accent/60 flex items-center gap-2">
          <span>Python 3.12</span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* Code Editor Body with Line Numbers */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-3 font-mono text-[11px] sm:text-xs leading-relaxed bg-[#060a10]/80 select-text scrollbar-thin scrollbar-thumb-accent/20"
        style={{ minHeight: "340px", maxHeight: "680px" }}
      >
        <div className="flex">
          {/* Line Numbers Gutter */}
          <div className="select-none pr-3 mr-3 text-right text-accent/25 border-r border-accent/15 flex flex-col font-mono text-[10px] sm:text-[11px] w-7 flex-shrink-0">
            {lines.map((_, index) => (
              <span key={index} className="leading-relaxed">
                {(index + 1).toString().padStart(2, "0")}
              </span>
            ))}
          </div>

          {/* Code Text Content */}
          <div className="flex-1 flex flex-col overflow-x-auto whitespace-pre font-mono">
            {lines.map((line) => (
              <div key={line.id} className="leading-relaxed hover:bg-accent/5 px-1 rounded">
                {renderFormattedLine(line.text)}
              </div>
            ))}
            {/* Live Typing Indicator Cursor */}
            <div className="flex items-center gap-1 text-accent animate-pulse mt-0.5">
              <span className="inline-block w-2 h-3.5 bg-accent shadow-[0_0_8px_hsl(var(--accent))]"></span>
              <span className="text-[10px] text-accent/50 font-mono italic">
                executing Lazarus-3 training cycle...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* IDE Bottom Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#05090f] border-t border-accent/20 text-[10px] font-mono text-accent/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-accent/80">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Integrity: 100%</span>
          </span>
          <span className="hidden sm:inline text-accent/40">|</span>
          <span className="hidden sm:inline text-accent/70">
            Directive: Necrogenesis Phase 3
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-semibold">Zero Hour Sync: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default CodeIDEWindow;
