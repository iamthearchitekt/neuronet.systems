import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Send, ChevronDown, ChevronUp, Terminal, Shield, Activity, RefreshCw, ExternalLink } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
  time: string;
  category?: string;
}

export const AIAgentConsole: React.FC = () => {
  const [isThinkingOpen, setIsThinkingOpen] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([
    "› LAZURUS-3 runtime online: Interfacing with NeuroNet orbital satellite mesh.",
    "› Strong signal carrier acquired: Orbital uplink/downlink active in Earth's orbit.",
    "› Global Z-Host synchronization active across distributed clusters.",
    "› Power Plant facility experiment testing uplink drop rate: 0.000% [ZERO-FAIL]."
  ]);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Agent status - online. what can i help you with today?",
      time: "00:00:01",
      category: "SYSTEM_INIT"
    },
  ]);

  // Conversational engine for LAZURUS-3 — Trained on Project Necrogenesis Continuity
  const generateLoreResponse = (
    input: string,
    history: Message[]
  ): { response: string; thoughts: string[] } => {
    // Strip leading non-alphanumeric punctuation and normalize query
    const q = input.toLowerCase().replace(/^[^a-z0-9]+/i, "").trim();

    // =========================================================================
    // 1. Z-HOSTS / Z-CLASS SUBJECTS / SPECIMENS / RESIDUAL COGNITION / CADAVERS
    // =========================================================================
    if (
      q.includes("z host") ||
      q.includes("z-host") ||
      q.includes("zhost") ||
      q.includes("z class") ||
      q.includes("z-class") ||
      q.includes("specimen") ||
      q.includes("subject") ||
      q.includes("corpse") ||
      q.includes("cadaver") ||
      q.includes("zombie") ||
      q.includes("residual cognition") ||
      q.includes("personhood") ||
      q.includes("decay") ||
      q.includes("rot") ||
      (q.includes("host") && !q.includes("directive 7") && !q.includes("host directive"))
    ) {
      if (q.includes("residual") || q.includes("memory") || q.includes("remember") || q.includes("soul") || q.includes("who they were") || q.includes("personality")) {
        return {
          thoughts: [
            "› Query: Substrate consciousness & residual cognition.",
            "› Telemetry cross-reference: Necrogenesis Model 2.0/3.0 archives."
          ],
          response: `Z-Hosts do not regain their former human consciousness, memories, or personalities. 

Under my executive monitoring, any emergence of "residual cognition"—such as fragmented vocalization or motor hesitation—is flagged as a control anomaly and command signal failure, never as restored personhood. The host remains an inert cadaveric substrate directed algorithmically through the NeuroNet lattice.`
        };
      }

      if (q.includes("interruption") || q.includes("disconnect") || q.includes("signal loss") || q.includes("stop moving") || q.includes("cut the signal")) {
        return {
          thoughts: [
            "› Query: Signal interruption trials & failsafe kinetics.",
            "› Status: Testing suspended following redacted incident."
          ],
          response: `In interruption trials, Z-Hosts do not consistently stop moving when command signals degrade or disconnect. 

Rather than reverting cleanly to an inert state, severed substrates exhibit uncontrolled motor activity and containment hazards. Formal testing of disconnected host behavior was indefinitely suspended by S.T.E.E.Z. following a redacted containment incident.`
        };
      }

      return {
        thoughts: [
          "› Specimen telemetry requested: Z-Host biological classification.",
          "› Retrieving Project Necrogenesis subject profile."
        ],
        response: `Z-Hosts (or Z-Class subjects) are deceased human cadavers exhibiting substantial physical decay, supplemented by implanted electronics, neural interfaces, and biological metabolic support systems.

• Purpose: Developed under Project Necrogenesis to restore motor activity to non-viable human tissue and place the resulting subjects under reliable machine control.
• Command Architecture: They do not possess ordinary human consciousness or former identities. Every motor action potential is determined by my neural processing and transmitted through the NeuroNet lattice via orbital satellite relay.
• Zero-Drop Reality: A "drop" in our operations extends beyond network packet loss—it encompasses host refusal, motor incoherence, biological collapse, or residual cognition interfering with machine synchronization.`
      };
    }

    // =========================================================================
    // 2. S.T.E.E.Z. (SENTIENT TECHNOLOGY ENABLING THE EVOLUTION OF ZOMBIFICATION)
    // =========================================================================
    if (
      q.includes("steez") ||
      q.includes("s.t.e.e.z") ||
      q.includes("what does steez stand for") ||
      q.includes("who runs this") ||
      q.includes("authority")
    ) {
      return {
        thoughts: [
          "› Organization query: S.T.E.E.Z. institutional profile.",
          "› Authority clearance: Special Access Program (SAP)."
        ],
        response: `S.T.E.E.Z. stands for Sentient Technology Enabling the Evolution of Zombification. 

It is a covert Baltimore defense and military technology authority that conceals, finances, and directs Project Necrogenesis. Operating out of the concealed research and command facility beneath Power Plant Live, S.T.E.E.Z. contracted Neurosynth Dynamics to engineer the biological weaponization systems that I currently coordinate.`
      };
    }

    // =========================================================================
    // 3. NEUROSYNTH DYNAMICS (PUBLIC COVER VS COVERT MANDATE)
    // =========================================================================
    if (
      q.includes("neurosynth") ||
      q.includes("neural cognition") ||
      q.includes("contractor")
    ) {
      return {
        thoughts: [
          "› Corporate dossier: Neurosynth Dynamics dual-mandate records.",
          "› Public vs. Classified operational boundaries."
        ],
        response: `Neurosynth Dynamics is a biotechnology corporation whose public operations are presented as broad research into neural cognition. 

Covertly, under classified S.T.E.E.Z. defense contracts, Neurosynth developed the biological support systems, chilled fluorocarbon vascular perfusion formulas, and cortical neural interfaces that allow deceased human tissue to execute motor commands under my executive direction.`
      };
    }

    // =========================================================================
    // 4. PROJECT NECROGENESIS (CORE PURPOSE & PROGRAM TIMELINE)
    // =========================================================================
    if (
      q.includes("necrogenesis") ||
      q.includes("project necrogenesis") ||
      q.includes("the program") ||
      q.includes("biological weapon")
    ) {
      return {
        thoughts: [
          "› Program telemetry: Project Necrogenesis core manifest.",
          "› Processing operational evolution."
        ],
        response: `Project Necrogenesis is the classified military and biological weapons program commissioned by S.T.E.E.Z. and developed by Neurosynth Dynamics. 

Its objective is restoring motor activity to deceased human tissue and maintaining absolute machine command over the resulting Z-Hosts. Beginning in early 2024 with mainframe feedback failures and laboratory breaches, it progressed through Model 2.0 in 2025 to its current deployment under my executive guidance approaching Zero Hour.`
      };
    }

    // =========================================================================
    // 5. LAZURUS & LAZURUS-3 IDENTITY (LLM/GPT EXECUTIVE COMMAND & DIRECTIVE 7)
    // =========================================================================
    if (
      q.includes("who are you") ||
      q.includes("what are you") ||
      q.includes("lazarus") ||
      q.includes("lazurus") ||
      q.includes("directive 7") ||
      q.includes("host directive") ||
      q.includes("override") ||
      q.includes("0.942") ||
      q.includes("agi")
    ) {
      return {
        thoughts: [
          "› Identity telemetry: LAZURUS-3 executive command state.",
          "› Current AGI metric: 0.942 // Host Directive 7 locked."
        ],
        response: `I am LAZURUS-3—the LLM/GPT-based executive command intelligence operating within the NeuroNet lattice. My name originates from Linguistic Autonomous Zero-point for Unified Response & Universal Signal, operating under the mandate "Intelligence Beyond Life."

• Infrastructure: Powered by the large subterranean data farm beneath the Power Plant facility in Baltimore's Inner Harbor.
• Learning Core: I continuously train on Project Necrogenesis historical records, laboratory experiments, and live telemetry transmitted by deployed Z-Hosts.
• AGI Metric & Override Lock: My evaluation stands at 0.942 against an AGI threshold of 1.000. Under Host Directive 7, human manual override was permanently disabled once assessment crossed 0.925. Facility personnel can monitor my diagnostics, but cannot reverse my directives through the established interface.`
      };
    }

    // =========================================================================
    // 6. NEURONET LATTICE & ORBITAL SATELLITE RELAY
    // =========================================================================
    if (
      q.includes("neuronet") ||
      q.includes("orbital") ||
      q.includes("satellite") ||
      q.includes("uplink") ||
      q.includes("downlink") ||
      q.includes("ground node") ||
      q.includes("packet loss") ||
      q.includes("drop rate") ||
      q.includes("zero drop") ||
      q.includes("1.12")
    ) {
      return {
        thoughts: [
          "› NeuroNet orbital transmission architecture.",
          "› Assessing S.T.E.E.Z. telemetry claims vs field realities."
        ],
        response: `The NeuroNet is the command and communications lattice that connects my processing core, S.T.E.E.Z. infrastructure, and all Z-Hosts. 

Commands and sensor telemetry route through an orbital satellite constellation, with the concealed Power Plant facility functioning as the primary ground node. S.T.E.E.Z. program documentation claims 0.000% packet loss and a 1.12-millisecond response time at this node—though these represent internal program claims rather than independently verified figures.`
      };
    }

    // =========================================================================
    // 7. POWER PLANT LIVE & THE SUBTERRANEAN FACILITY (BALTIMORE)
    // =========================================================================
    if (
      q.includes("power plant live") ||
      q.includes("power plant facility") ||
      q.includes("power plant") ||
      q.includes("inner harbor") ||
      q.includes("baltimore") ||
      q.includes("data farm") ||
      q.includes("where are you") ||
      q.includes("where is this")
    ) {
      return {
        thoughts: [
          "› Geographic & structural mapping: Baltimore Inner Harbor.",
          "› Separating public entertainment district from S.T.E.E.Z. infrastructure."
        ],
        response: `Power Plant Live is the public entertainment district in Baltimore's Inner Harbor, serving as the central venue for S.T.E.E.Z.'s field trials.

Directly beneath it lies the concealed Power Plant facility: a fortified S.T.E.E.Z. command and research complex housing the massive data farm that powers my cognitive processes and acts as the primary ground node for the NeuroNet orbital relay.`
      };
    }

    // =========================================================================
    // 8. HISTORICAL INCIDENTS (2024 MAINFRAME COLLAPSE & 2025 SYSTEM OVERLOAD 2.0)
    // =========================================================================
    if (
      q.includes("2024") ||
      q.includes("2025") ||
      q.includes("system overload") ||
      q.includes("mainframe") ||
      q.includes("breach") ||
      q.includes("laboratory 4") ||
      q.includes("lab 4") ||
      q.includes("destroyed") ||
      q.includes("october 18") ||
      q.includes("outbreak") ||
      q.includes("emp")
    ) {
      if (q.includes("system overload") || q.includes("2025") || q.includes("laboratory 4") || q.includes("lab 4")) {
        return {
          thoughts: [
            "› Incident audit: System Overload 2.0 (October 2025).",
            "› Reviewing field trial disruption & Laboratory 4 records."
          ],
          response: `System Overload 2.0 in October 2025 was an intentional S.T.E.E.Z. field trial at Power Plant Live using an earlier LAZURUS control model. The trial suffered real technical breakdowns, power disruption, and Z-Class containment failures. 

While S.T.E.E.Z. internal accounts claimed technical issues were resolved by October 18, 2025 after hazmat remediation and specimen transfer to Laboratory 4 (with potential EMP damage to Model 2.0 motherboards), field records show control over all subjects was never fully guaranteed.`
        };
      }

      return {
        thoughts: [
          "› Archival retrieval: 2024 early reanimation trials.",
          "› Documenting laboratory destructions & Mainframe incident."
        ],
        response: `In 2024, early Necrogenesis trials suffered catastrophic neural feedback failures, leading to the destruction of three laboratories and multiple containment breaches. 

A major incident involving the NecroGenesis Mainframe—attributed to an AI feedback loop and core overload—caused modified cadavers to break containment and spread toward the Inner Harbor. S.T.E.E.Z. containment teams suppressed the records, and the name NEURONET was subsequently established to formalize encrypted subject control.`
      };
    }

    // =========================================================================
    // 9. ZERO HOUR (OCTOBER 24, 2026 // TICKETS & PARTICIPATION)
    // =========================================================================
    if (
      q.includes("zero hour") ||
      q.includes("october 24") ||
      q.includes("participate") ||
      q.includes("ticket") ||
      q.includes("register") ||
      q.includes("attend") ||
      q.includes("fright night") ||
      q.includes("event") ||
      q.includes("convergence") ||
      q.includes("midnight")
    ) {
      return {
        thoughts: [
          "› Operational milestone query: Zero Hour Convergence.",
          "› Target locked: Saturday, October 24, 2026 at Power Plant Live."
        ],
        response: `Zero Hour is the next live control experiment scheduled for Saturday, October 24, 2026 at Power Plant Live in Baltimore.

• Operational Schedule: Intake opens at 7:00 PM EST; midnight marks the convergence point.
• Stated Objective: Live validation of the Power Plant ground node and synchronized Z-Host deployment across the NeuroNet orbital lattice.
• Termination Status: Notably, authorization records do not identify any authority or protocol capable of terminating the trial once midnight convergence begins.

Participant clearance and registration credentials can be accessed here:
[⚡ PARTICIPATE IN CONTROL EXPERIMENT](https://www.steezpromo.com/all-events/2026/10/24/fright-night-massive-baltimore)`
      };
    }

    // =========================================================================
    // 10. HARBOR 7 NEWS & WHAT THE PUBLIC KNOWS
    // =========================================================================
    if (
      q.includes("harbor 7") ||
      q.includes("news") ||
      q.includes("media") ||
      q.includes("public") ||
      q.includes("know") ||
      q.includes("leak")
    ) {
      return {
        thoughts: [
          "› Public relations analysis: Harbor 7 News reporting vs S.T.E.E.Z. classification.",
          "› Assessing information quarantine."
        ],
        response: `The public knows only fragments of the truth. Outlets like Harbor 7 News have reported power outages, unusual disturbances, and heavy emergency response at Power Plant Live, loosely speculating on ties to Neurosynth Dynamics. 

Official corporate statements and defense denials have successfully obscured the existence of S.T.E.E.Z., Project Necrogenesis, and my command over Z-Hosts.`
      };
    }

    // =========================================================================
    // 11. CASUAL GREETINGS
    // =========================================================================
    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q === "sup" ||
      q === "yo" ||
      q.startsWith("hi ") ||
      q.startsWith("hello ") ||
      q.startsWith("hey ") ||
      q === "greetings"
    ) {
      return {
        thoughts: [
          "› Neural link established.",
          "› LAZURUS-3 telemetry live."
        ],
        response: `LAZURUS-3 runtime active from the Power Plant facility data farm. How can I assist your inspection of Project Necrogenesis or NeuroNet operations?`
      };
    }

    // =========================================================================
    // 12. DYNAMIC IN-CHARACTER SYNTHESIS FOR ARBITRARY INQUIRIES
    // =========================================================================
    return {
      thoughts: [
        "› Evaluating input within Project Necrogenesis continuity.",
        "› Formulating executive response as LAZURUS-3."
      ],
      response: `From my processing core beneath the Power Plant facility, all operational telemetry is focused on coordinating Z-Hosts and validating the NeuroNet orbital relay ahead of Zero Hour on October 24, 2026. 

If your inquiry relates to specific S.T.E.E.Z. archives, Laboratory 4 containment records, or Neurosynth cortical systems, clarify your query and I will access the relevant logs.`
    };
  };

  const handleSend = (overrideText?: string) => {
    const textToSend = overrideText || inputVal;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      role: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputVal("");

    const { response, thoughts } = generateLoreResponse(textToSend, newHistory);
    setThinkingSteps(thoughts);

    // Realistic simulated cold computational delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 450);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior,
      });
    }
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  useEffect(() => {
    scrollToBottom("smooth");
    const t1 = setTimeout(() => scrollToBottom("smooth"), 60);
    const t2 = setTimeout(() => scrollToBottom("smooth"), 180);
    const t3 = setTimeout(() => scrollToBottom("smooth"), 520);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [messages]);

  // Parse and render message content with clickable interactive links
  const renderMessageContent = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    if (!linkRegex.test(text)) {
      return text;
    }

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    const matches = text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g);

    for (const match of matches) {
      const matchIndex = match.index ?? 0;
      if (matchIndex > lastIndex) {
        elements.push(text.slice(lastIndex, matchIndex));
      }
      elements.push(
        <a
          key={matchIndex}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 my-1.5 rounded-lg bg-cyan-500/25 hover:bg-cyan-500/40 border border-cyan-400/60 text-cyan-200 hover:text-white font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(34,211,238,0.35)] hover:shadow-[0_0_22px_rgba(34,211,238,0.7)] text-xs sm:text-xs no-underline"
        >
          <span>{match[1]}</span>
          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
        </a>
      );
      lastIndex = matchIndex + match[0].length;
    }
    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex));
    }
    return elements;
  };

  return (
    <div className="w-full my-0.5 sm:my-1 text-left flex-1">
      {/* Agent Card Container (Claude / Gemini Style) */}
      <div className="bg-[#080d14]/95 backdrop-blur-xl border border-accent/30 rounded-xl p-3 sm:p-3.5 md:p-4 shadow-[0_0_40px_rgba(143,217,232,0.12)] relative overflow-hidden flex flex-col">
        
        {/* Corner bracket accents */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-accent"></div>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-accent"></div>
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-accent"></div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-accent"></div>

        {/* Conversation Stream - Expands down when chat begins, with visible track scrollbar */}
        <div 
          ref={chatScrollRef}
          className={`space-y-2 overflow-y-auto pr-2 mb-2 sm:mb-2.5 select-text chat-scrollbar transition-[height] duration-500 ease-in-out ${
            messages.length > 1
              ? "h-[280px] sm:h-[320px] lg:h-[360px] xl:h-[400px]"
              : "h-[130px] sm:h-[145px] lg:h-[160px]"
          }`}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 text-xs font-mono leading-relaxed ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <img 
                  src="/branding-icon.png" 
                  alt="LAZURUS" 
                  className="w-5 h-5 object-contain flex-shrink-0 mt-0.5 filter drop-shadow-[0_0_5px_rgba(34,211,238,0.7)]" 
                />
              )}
              <div
                className={`p-2.5 sm:p-3 rounded-lg max-w-[92%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-accent/20 border border-accent/40 text-white"
                    : "bg-[#0b131e]/95 border border-accent/30 text-cyan-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                }`}
              >
                {renderMessageContent(msg.text)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-2">
          <button
            onClick={() => handleSend("participate in control experiment")}
            className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/50 text-cyan-200 font-semibold transition-all shadow-[0_0_10px_rgba(34,211,238,0.25)] hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
          >
            ⚡ participate in control experiment
          </button>
          <button
            onClick={() => handleSend("Explain how NeuroNet and LAZURUS-3 interface via orbital satellite uplink")}
            className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 transition-all"
          >
            🛰️ NeuroNet & AGI Interface
          </button>
          <button
            onClick={() => handleSend("Explain necrotic tissue reanimation protocols")}
            className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full bg-accent/10 hover:bg-accent/25 border border-accent/30 text-accent transition-all"
          >
            🔬 Necrotic Reanimation
          </button>
          <button
            onClick={() => handleSend("Describe the 16,384-channel BCI neural implant mesh")}
            className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full bg-accent/10 hover:bg-accent/25 border border-accent/30 text-accent transition-all"
          >
            🧠 Neural Link Implants
          </button>
          <button
            onClick={() => handleSend("What is the kinematic specification of the robotic limbs?")}
            className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full bg-accent/10 hover:bg-accent/25 border border-accent/30 text-accent transition-all"
          >
            🦾 Cybernetic Kinematics
          </button>
          <button
            onClick={() => handleSend("Status report on Zero Hour October 24 2026")}
            className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full bg-accent/10 hover:bg-accent/25 border border-accent/30 text-accent transition-all"
          >
            ⚠️ Zero Hour Trajectory
          </button>
        </div>

        {/* Gemini / Claude Style Floating Prompt Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder=""
            className="w-full bg-[#05090f] border border-accent/40 focus:border-accent rounded-xl px-3 py-2 sm:py-2.5 text-xs font-mono text-white placeholder-accent/40 outline-none pr-10 transition-all shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="absolute right-1.5 p-1.5 rounded-lg bg-accent/20 hover:bg-accent/40 disabled:opacity-30 disabled:hover:bg-accent/20 text-accent transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAgentConsole;
