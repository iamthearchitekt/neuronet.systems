import React, { useState } from "react";
import { Sparkles, Bot, Send, ChevronDown, ChevronUp, Terminal, Shield, Activity, RefreshCw } from "lucide-react";

export const AIAgentConsole: React.FC = () => {
  const [isThinkingOpen, setIsThinkingOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string; time: string }>>([
    {
      role: "assistant",
      text: "Directive initialized. Project Necrogenesis — Phase 3 is actively processing on the neural grid. All telemetry streams are synchronized toward ZERO HOUR on October 4th, 2026.",
      time: "00:00:01",
    },
  ]);

  const handleSend = (overrideText?: string) => {
    const textToSend = overrideText || inputVal;
    if (!textToSend.trim()) return;

    const userMsg = {
      role: "user" as const,
      text: textToSend,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    // Simulated Lazarus-3 AI Agent Response
    setTimeout(() => {
      let responseText = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes("zero hour") || lower.includes("time") || lower.includes("countdown")) {
        responseText = "Zero Hour is locked for October 04, 2026 at 00:00:00. The synaptic grid is maintaining synchronized temporal countdown across all neural nodes.";
      } else if (lower.includes("phase 3") || lower.includes("necrogenesis")) {
        responseText = "Project Necrogenesis - Phase 3 encompasses recursive neural optimization, AGI proximity threshold testing, and synaptic weight consolidation.";
      } else if (lower.includes("diagnostic") || lower.includes("status")) {
        responseText = "System Diagnostics: Host integrity 100%. Synaptic link: ACTIVE. Firmware update: VERIFIED. Zero degradation detected.";
      } else {
        responseText = `Protocol received: "${textToSend}". Lazarus-3 neural agent confirms telemetry alignment. Zero Hour execution continues unabated.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: responseText,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 450);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-2 sm:px-4 text-left">
      {/* Agent Card Container (Claude / Gemini Style) */}
      <div className="bg-[#080d14]/90 backdrop-blur-xl border border-accent/30 rounded-xl p-4 sm:p-6 shadow-[0_0_40px_rgba(143,217,232,0.12)]">
        
        {/* Agent Header */}
        <div className="flex items-center justify-between border-b border-accent/20 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-accent/80 flex items-center justify-center shadow-[0_0_15px_rgba(143,217,232,0.4)]">
              <Bot className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm sm:text-base text-white tracking-wide">
                  LAZURUS-3.5
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-medium">
                  NEURAL AGENT
                </span>
              </div>
              <span className="text-[11px] font-mono text-accent/60">
                Project Necrogenesis // Phase 3 Interface
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-accent/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ACTIVE REASONING</span>
          </div>
        </div>

        {/* Collapsible Chain-of-Thought (Gemini/Claude Style Thinking) */}
        <div className="mb-4 bg-[#05090f]/70 border border-accent/15 rounded-lg overflow-hidden text-xs font-mono">
          <button
            onClick={() => setIsThinkingOpen(!isThinkingOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-accent/70 hover:text-accent hover:bg-white/5 transition-all text-left"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>Thought Process (14.2s) // Synaptic Grid Convergence</span>
            </div>
            {isThinkingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isThinkingOpen && (
            <div className="p-3 bg-black/40 border-t border-accent/10 text-accent/60 space-y-1.5 leading-relaxed text-[11px]">
              <p>› Initiating LAZURUS3 neural session under Project Necrogenesis - Phase 3.</p>
              <p>› Correlating target timestamp: 2026-10-04T00:00:00Z [ZERO HOUR].</p>
              <p>› Synaptic grid integrity verified at 99.8%. Zero drop rate confirmed.</p>
              <p className="text-cyan-300">› Conclusion: Temporal alignment established. Displaying primary countdown matrix.</p>
            </div>
          )}
        </div>

        {/* Conversation Stream */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4 scrollbar-thin scrollbar-thumb-accent/20">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs sm:text-sm font-mono leading-relaxed ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded-md bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                </div>
              )}
              <div
                className={`p-3 rounded-lg max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-accent/20 border border-accent/40 text-white"
                    : "bg-[#0b131e]/90 border border-accent/25 text-cyan-100/90 shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
          <button
            onClick={() => handleSend("Run system diagnostics")}
            className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent/90 transition-all"
          >
            ⚡ Diagnostics
          </button>
          <button
            onClick={() => handleSend("What is Project Necrogenesis Phase 3?")}
            className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent/90 transition-all"
          >
            🧬 Phase 3 Protocol
          </button>
          <button
            onClick={() => handleSend("Zero Hour status report")}
            className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent/90 transition-all"
          >
            ⏱️ Zero Hour Status
          </button>
        </div>

        {/* Gemini / Claude Style Floating Prompt Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Message Lazarus-3 or input system directive..."
            className="w-full bg-[#05090f] border border-accent/40 focus:border-accent rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-accent/40 outline-none pr-12 transition-all shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="absolute right-2 p-2 rounded-lg bg-accent/20 hover:bg-accent/40 disabled:opacity-30 disabled:hover:bg-accent/20 text-accent transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAgentConsole;
