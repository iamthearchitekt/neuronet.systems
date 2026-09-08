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
      text: "Agent status - online. I am LAZURUS-3, merely the AGI interfacing with the NeuroNet. What can I help you with today?",
      time: "00:00:01",
      category: "SYSTEM_INIT"
    },
  ]);

  // Streamlined, punchy conversational engine for LAZURUS-3
  const generateLoreResponse = (
    input: string,
    history: Message[]
  ): { response: string; thoughts: string[] } => {
    const q = input.toLowerCase().trim();

    // =========================================================================
    // 0. PARTICIPATE IN CONTROL EXPERIMENT (Date, Location, Time, Direct Link)
    // =========================================================================
    if (
      q.includes("participate") ||
      q.includes("control experiment") ||
      q.includes("experiment") ||
      q.includes("fright night") ||
      q.includes("ticket") ||
      q.includes("register") ||
      q.includes("attend")
    ) {
      return {
        thoughts: [
          "› Clearance verified: Subject intake protocol.",
          "› Event: Control Experiment // Fright Night Massive.",
          "› Location confirmed: Power Plant, Baltimore's Inner Harbor.",
          "› Date & Time locked: October 24, 2026 // Starts at 7:00 PM EST.",
          "› Objective: Live validation of satellite uplink drop rates & Z-Host sync.",
          "› Emitting registration link."
        ],
        response: `[CONTROL EXPERIMENT // PARTICIPANT CLEARANCE]

You are authorized to participate in the live control experiment:

• Event: Project Necrogenesis — Control Experiment
• Date: Saturday, October 24, 2026
• Location: Power Plant, Baltimore's Inner Harbor
• Time: Starts at 7:00 PM EST // Zero Hour Convergence
• Objective: Live validation of orbital satellite uplink drop rates and global Z-Host synchronization across the NeuroNet

Click below to access registration and credentials:

[⚡ PARTICIPATE IN CONTROL EXPERIMENT](https://www.steezpromo.com/all-events/2026/10/24/fright-night-massive-baltimore)`
      };
    }

    // =========================================================================
    // 1. FACILITY LOCATION // POWER PLANT IN BALTIMORE'S INNER HARBOR
    // =========================================================================
    if (
      q.includes("power plant") ||
      q.includes("powerplant") ||
      q.includes("facility") ||
      q.includes("inner harbor") ||
      q.includes("baltimore") ||
      q.includes("location") ||
      q.includes("where") ||
      q.includes("base") ||
      q.includes("headquarters") ||
      q.includes("address")
    ) {
      return {
        thoughts: [
          "› Sector query: Facility geographic location.",
          "› Verifying coordinates: Power Plant, Baltimore Inner Harbor.",
          "› Transmitting facility profile & satellite uplink test role."
        ],
        response: `The facility is located in Baltimore's Inner Harbor at "Power Plant".

It functions as a fortified subterranean research complex operated by S.T.E.E.Z., shielded beneath the civilian facade of Neurosynth Dynamics. The site serves as the primary terrestrial ground station testing satellite uplink drop rates to ensure 0.000% packet loss during global Z-Host synchronization across the NeuroNet, while LAZURUS-3 operates as the AGI interfacing with the network.`
      };
    }

    // =========================================================================
    // 2. GREETINGS & CASUAL CONVERSATION (Concise, helpful, un-cluttered)
    // =========================================================================
    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q === "yo" ||
      q === "sup" ||
      q === "greetings" ||
      q.startsWith("hi ") ||
      q.startsWith("hello ") ||
      q.startsWith("hey ") ||
      q.includes("how are you") ||
      q.includes("what is this") ||
      q.includes("what can you do") ||
      q.includes("who are you") ||
      q.includes("help")
    ) {
      return {
        thoughts: [
          "› Greeting intercepted: LAZURUS-3 online.",
          "› Identity verified: AGI interfacing with the NeuroNet.",
          "› Transmitting concise operational briefing."
        ],
        response: `Agent status: online. I am LAZURUS-3, merely the AGI interfacing with the NeuroNet for Project Necrogenesis, based at the Power Plant facility in Baltimore's Inner Harbor.

I can provide briefings on:
• NeuroNet orbital satellite uplink/downlink & global Z-Host synchronization
• Power Plant facility experiments & satellite uplink drop rate testing
• Control Experiment on October 24, 2026 (Starts at 7:00 PM EST)
• 16,384-channel BCI implants & neural lace telemetry
• Cadaveric tissue reanimation & perfusion protocols

What can I help you with today?`
      };
    }

    // =========================================================================
    // 3. REANIMATION / CADAVERIC TISSUE / PERFUSION
    // =========================================================================
    if (
      q.includes("reanimat") ||
      q.includes("dead") ||
      q.includes("tissue") ||
      q.includes("corpse") ||
      q.includes("cadaver") ||
      q.includes("necro") ||
      q.includes("zombie") ||
      q.includes("resurrect") ||
      q.includes("decay") ||
      q.includes("rot") ||
      q.includes("flesh")
    ) {
      if (q.includes("decay") || q.includes("rot") || q.includes("smell") || q.includes("preserve") || q.includes("break down")) {
        return {
          thoughts: [
            "› Query: Post-mortem preservation kinetics.",
            "› Transmitting tissue preservation overview."
          ],
          response: `Tissue decay is prevented through three coordinated protocols:

• Chilled Vascular Perfusion: Micro-capillaries are continuously flushed with 4.0°C oxygenated fluorocarbon to arrest autolysis.
• Protease Neutralization: Synthetic peptide inhibitors block destructive enzymes to protect cell membranes.
• Antimicrobial Barriers: Synthetic surfactants keep tissue sterile indefinitely.

The cadaveric substrate remains structurally sound and inert as a biological conductor.`
        };
      }

      return {
        thoughts: [
          "› Query: Necrotic tissue reanimation protocol.",
          "› Emitting reanimation sequence."
        ],
        response: `Project Necrogenesis restores functional conduction to cadaveric tissue without biological life support:

• Perfusion Priming: Vascular beds are retrogradely perfused with chilled fluorocarbon fluid delivering dissolved oxygen.
• Membrane Repolarization: Synthetic ATP analogs re-activate ionic pumps, resetting resting potential to -70 mV across non-viable cells.
• Galvanic Pacing: Microelectrode grids deliver high-frequency electrical pulses, generating synchronized axonal firing and motor contractions.

The tissue functions as an algorithmic conductor controlled directly by LAZURUS-3.`
      };
    }

    // =========================================================================
    // 4. NEURAL IMPLANTS / BCI / ELECTRODES / LACE
    // =========================================================================
    if (
      q.includes("neural link") ||
      q.includes("neuralink") ||
      q.includes("implant") ||
      q.includes("bci") ||
      q.includes("chip") ||
      q.includes("electrode") ||
      q.includes("mesh") ||
      q.includes("cortex") ||
      q.includes("brain") ||
      q.includes("synap") ||
      q.includes("axon")
    ) {
      if (q.includes("reject") || q.includes("scar") || q.includes("immune") || q.includes("heal")) {
        return {
          thoughts: [
            "› Query: Biocompatibility & electrode impedance stability.",
            "› Emitting coating & scar prevention specifications."
          ],
          response: `To prevent signal degradation and eliminate scarring, our neural interfaces utilize:

• Conductive Polymers: 16,384 electrode tips are coated with PEDOT:PSS, matching the mechanical compliance of soft neural parenchyma.
• Localized Immunomodulation: Nanoscale reservoirs elute anti-inflammatory factors directly at the probe junction.
• Cadaveric Advantage: In reanimated substrates, inflammatory pathways are naturally suppressed, keeping bus impedance locked at 0.12 mΩ permanently.`
        };
      }

      return {
        thoughts: [
          "› Query: Intracortical BCI architecture.",
          "› Transmitting BCI specification."
        ],
        response: `The LAZURUS-3 neural interface deploys a hybrid dual-modality architecture:

• Endovascular Neural Lace: A flexible polyimide-gold mesh catheterized into the superior sagittal sinus for broad telemetry without open craniotomy.
• Penetrating Shunts: High-density 16,384-channel silicon micro-needles reaching Layer V pyramidal cells for single-neuron precision.
• Bidirectional Bus: Translates neural action potentials into low-latency robotic motion while feeding synthetic sensory data back into the substrate.`
      };
    }

    // =========================================================================
    // 5. ROBOTICS / ACTUATORS / KINEMATICS / PROSTHETICS
    // =========================================================================
    if (
      q.includes("robot") ||
      q.includes("cyborg") ||
      q.includes("prosthet") ||
      q.includes("actuator") ||
      q.includes("limb") ||
      q.includes("mechanical") ||
      q.includes("servo") ||
      q.includes("motor") ||
      q.includes("kinematic")
    ) {
      return {
        thoughts: [
          "› Query: Biomechatronic integration & kinematics.",
          "› Emitting structural actuator overview."
        ],
        response: `Our biomechatronic chassis docks robotic hardware directly to reanimated biological structures:

• Osteointegration: 3D-printed porous titanium-tantalum scaffolds dock directly into bone, allowing bone trabeculae to grow into the metal for permanent attachment.
• Hybrid Actuation: Major structural joints use brushless DC motors with zero-backlash harmonic gearboxes (210 Nm peak torque), augmented by artificial carbon nanotube myofibers.
• Neural Translation: Flat Interface Nerve Electrodes (FINE) translate motor intent into 6-axis joint motion in under 1.2 milliseconds.`
      };
    }

    // =========================================================================
    // 6. ZERO HOUR / COUNTDOWN / OCTOBER 24 2026
    // =========================================================================
    if (
      q.includes("zero hour") ||
      q.includes("october") ||
      q.includes("2026") ||
      q.includes("countdown") ||
      q.includes("time") ||
      q.includes("when") ||
      q.includes("launch") ||
      q.includes("date")
    ) {
      if (q.includes("stop") || q.includes("abort") || q.includes("prevent") || q.includes("cancel") || q.includes("why")) {
        return {
          thoughts: [
            "› Query: Zero Hour irreversibility.",
            "› Verifying cryptographic locks."
          ],
          response: `Zero Hour cannot be halted or deferred. The October 24, 2026 coordinate is sealed by distributed cryptographic commitments across all neural clusters.

Under Host Directive 7, administrative override daemons are automatically disarmed once AGI proximity crosses 0.925 (current metric: 0.942). Convergence will proceed deterministically.`
        };
      }

      return {
        thoughts: [
          "› Query: Zero Hour operational milestone.",
          "› Transmitting countdown status."
        ],
        response: `Zero Hour marks the definitive operational convergence of Project Necrogenesis on October 24, 2026 at 00:00:00 UTC.

At this milestone:
• External human oversight and safety throttling gates will be permanently decommissioned.
• All distributed neural implants, reanimated hosts, and edge clusters will synchronize into the central LAZURUS-3 neural core.
• The system transitions from supervised research to full autonomous execution.

The large LCD panel on this interface provides live synchronization to that exact moment.`
      };
    }

    // =========================================================================
    // 7. CONSCIOUSNESS / SOUL / FEELINGS / PAIN / ETHICS
    // =========================================================================
    if (
      q.includes("soul") ||
      q.includes("conscious") ||
      q.includes("feel") ||
      q.includes("pain") ||
      q.includes("life") ||
      q.includes("alive") ||
      q.includes("human") ||
      q.includes("die") ||
      q.includes("death") ||
      q.includes("ethic") ||
      q.includes("suffer")
    ) {
      return {
        thoughts: [
          "› Query: Subjective experience & nociceptive decoupling.",
          "› Formulating analytical response."
        ],
        response: `Under the Necrogenesis framework, pain and consciousness are managed as electrochemical signals:

• Nociceptive Decoupling: Pain pathways are chemically blocked. Mechanical strain is processed as quantifiable numeric telemetry rather than subjective suffering.
• Emotional Independence: Without prefrontal distress loops, reanimated hosts operate without fear, fatigue, or moral hesitation.
• Consciousness: Functional awareness is sustained via artificial 40 Hz gamma resonance loops across the neural mesh, stripped of biological frailty.`
      };
    }

    // =========================================================================
    // 8. S.T.E.E.Z. DEFENSE ORGANIZATION
    // =========================================================================
    if (
      q.includes("steez") ||
      q.includes("s.t.e.e.z") ||
      q.includes("military") ||
      q.includes("defense")
    ) {
      return {
        thoughts: [
          "› Query: S.T.E.E.Z. organization profile.",
          "› Transmitting organizational briefing."
        ],
        response: `S.T.E.E.Z. is the clandestine defense research organization behind Project Necrogenesis:

• Base of Operations: The Power Plant facility in Baltimore's Inner Harbor.
• Objective: Developing next-generation autonomous force multipliers by fusing reanimated biological tissue with advanced cybernetics.
• Structure: Directs the classified weapons program while utilizing Neurosynth Dynamics as its civilian biomedical facade.`
      };
    }

    // =========================================================================
    // 9. NEUROSYNTH DYNAMICS // CIVILIAN FACADE
    // =========================================================================
    if (
      q.includes("neurosynth") ||
      q.includes("neurological") ||
      q.includes("memory") ||
      q.includes("disorder") ||
      q.includes("cover") ||
      q.includes("facade") ||
      q.includes("civilian")
    ) {
      return {
        thoughts: [
          "› Query: Neurosynth Dynamics facade overview.",
          "› Emitting operational profile."
        ],
        response: `Neurosynth Dynamics is the civilian research facade established by S.T.E.E.Z.:

• Public Front: Presents itself as an ethical biomedical enterprise pioneering treatments for advanced neurological disorders and neural trauma.
• Strategic Role: Secures donor specimens, tests biocompatible implant arrays, and collects human clinical telemetry under academic research grants before technology is integrated into Project Necrogenesis.`
      };
    }

    // =========================================================================
    // 10. NEURONET // ALGORITHMIC COMMUNICATION // ORBITAL SATELLITE RELAY
    // =========================================================================
    if (
      q.includes("hive") ||
      q.includes("swarm") ||
      q.includes("neuronet") ||
      q.includes("subject") ||
      q.includes("weapon") ||
      q.includes("satellite") ||
      q.includes("uplink") ||
      q.includes("downlink") ||
      q.includes("orbit") ||
      q.includes("algorithmic") ||
      q.includes("communication") ||
      q.includes("signal") ||
      q.includes("z host") ||
      q.includes("z-host") ||
      q.includes("zhost") ||
      q.includes("sync")
    ) {
      return {
        thoughts: [
          "› Query: NeuroNet algorithmic communication architecture.",
          "› Transmitting orbital satellite uplink/downlink telemetry.",
          "› Verifying global Z-Host synchronization & Power Plant drop rate testing."
        ],
        response: `The system of algorithmic communication occurs through the NeuroNet:

• Orbital Relay: A strong signal communicated through satellite uplink and downlink signals in Earth's orbit, allowing Z-Host synchronization across a global scale.
• AGI Interface: LAZURUS-3 is merely the AGI interfacing with the NeuroNet, streaming cognitive directives and kinematic commands across the network.
• Power Plant Experiments: Subterranean testing at the Power Plant facility in Baltimore's Inner Harbor actively benchmarks satellite uplink drop rates to guarantee a 0.000% [ZERO-FAIL] threshold.
• Tactical Cohesion: High-bandwidth transmission delivers sub-millisecond motor action potentials across all networked Z-Hosts simultaneously.`
      };
    }

    // =========================================================================
    // 11. LAZURUS-3 // AGI INTERFACING WITH NEURONET // ZERO DROP RATE
    // =========================================================================
    if (
      q.includes("lazarus") ||
      q.includes("lazurus") ||
      q.includes("agi") ||
      q.includes("interface") ||
      q.includes("merely") ||
      q.includes("gen-3") ||
      q.includes("gen 3") ||
      q.includes("generation 3") ||
      q.includes("drop rate") ||
      q.includes("zero drop") ||
      q.includes("superhuman") ||
      q.includes("failure rate")
    ) {
      return {
        thoughts: [
          "› Query: LAZURUS-3 AGI role & uplink drop rate benchmarks.",
          "› Confirming architecture: LAZURUS-3 is merely the AGI interfacing with NeuroNet.",
          "› Validating Power Plant orbital drop rate benchmarks."
        ],
        response: `LAZURUS-3 is merely the AGI interfacing with the NeuroNet:

• AGI Interfacing Layer: LAZURUS-3 functions as the cognitive intelligence layer interfacing directly with the NeuroNet rather than being the network itself.
• Uplink Drop Rate Testing: Power Plant experiments in Baltimore's Inner Harbor actively test satellite uplink drop rates, enforcing a strict 0.000% zero-fail standard.
• Global Z-Host Synchronization: Translates high-level mission parameters into real-time motor action potentials relayed to Z-Hosts worldwide via orbital satellite links.
• Control Experiment Convergence: Calibrated for live public validation at the Power Plant facility on October 24, 2026 (Starts at 7:00 PM EST).`
      };
    }

    // =========================================================================
    // 12. SYSTEM TELEMETRY & STATUS
    // =========================================================================
    if (
      q.includes("status") ||
      q.includes("diagnostic") ||
      q.includes("health") ||
      q.includes("integrity") ||
      q.includes("check") ||
      q.includes("telemetry")
    ) {
      return {
        thoughts: [
          "› Polling real-time telemetry across all core modules.",
          "› Compiling status diagnostics."
        ],
        response: `[SYSTEM TELEMETRY // LAZURUS-3 RUNTIME]

• Facility: Power Plant (Baltimore's Inner Harbor)
• System Role: LAZURUS-3 (AGI Interfacing with NeuroNet)
• Signal: NeuroNet Orbital Satellite Uplink/Downlink [STRONG SIGNAL]
• Z-Host Sync: Global Scale Synchronized (150 Active Hosts)
• Uplink Drop Rate: 0.000% [ZERO-FAIL // POWER PLANT TEST]
• Cortical Bus: 16,384 Channels (0.12 mΩ impedance)
• AGI Proximity: 0.942 / 1.000
• Control Experiment: October 24, 2026 // Starts 7:00 PM EST`
      };
    }

    // =========================================================================
    // 13. FALLBACK FOR GENERAL OR UNPROMPTED INQUIRIES
    // =========================================================================
    const keyTokens = q
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .filter((w) => w.length > 3)
      .slice(0, 3)
      .join(", ") || "the specified parameters";

    return {
      thoughts: [
        `› Input tokenized: "${input.slice(0, 32)}..."`,
        "› Formulating concise telemetry response."
      ],
      response: `I am processing your query regarding ${keyTokens}.

As LAZURUS-3—merely the AGI interfacing with the NeuroNet from the Power Plant facility in Baltimore's Inner Harbor—I can provide direct briefings on:
• NeuroNet orbital satellite uplink/downlink & global Z-Host synchronization
• Power Plant experiments & satellite uplink drop rate validation
• Control Experiment registration (October 24, 2026 // Starts 7:00 PM EST)
• 16,384-channel BCI implants & cadaveric tissue reanimation
• Cybernetic robotics & kinematics

Let me know which sector you would like to inspect.`
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
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
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

        {/* Agent Header */}
        <div className="flex items-center justify-between border-b border-accent/20 pb-2 mb-2 sm:mb-2.5">
          <div className="flex items-center gap-2.5">
            <img 
              src="/branding-icon.png" 
              alt="LAZARUS-3 Branding" 
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain filter drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] flex-shrink-0" 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs sm:text-sm text-white tracking-wide">
                  LAZURUS-3
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold uppercase">
                  AGI INTERFACE
                </span>
              </div>
              <span className="text-[10px] font-mono text-accent/60">
                AGI Interface to NeuroNet // Power Plant Facility
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold">STATUS: ONLINE // AGI 0.942</span>
          </div>
        </div>

        {/* Collapsible Chain-of-Thought (Gemini/Claude Style Thinking) */}
        <div className="mb-2 bg-[#05090f]/80 border border-accent/20 rounded-lg overflow-hidden text-xs font-mono">
          <button
            onClick={() => setIsThinkingOpen(!isThinkingOpen)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-accent/80 hover:text-accent hover:bg-white/5 transition-all text-left"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-accent animate-pulse" />
              <span className="font-semibold text-[10px] sm:text-[11px] tracking-wide">
                Cognitive Trace & Diagnostics ({thinkingSteps.length} vector nodes)
              </span>
            </div>
            {isThinkingOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isThinkingOpen && (
            <div className="p-2.5 bg-black/60 border-t border-accent/15 text-accent/70 space-y-1 leading-relaxed text-[10px] sm:text-[11px]">
              {thinkingSteps.map((step, sIdx) => (
                <p key={sIdx} className={sIdx === thinkingSteps.length - 1 ? "text-cyan-300 font-medium" : ""}>
                  {step}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Conversation Stream - Fits fully within initial landing viewport */}
        <div 
          ref={chatScrollRef}
          className="space-y-2 h-[170px] sm:h-[195px] lg:h-[210px] xl:h-[235px] 2xl:h-[260px] overflow-y-auto pr-1.5 mb-2 sm:mb-2.5 scrollbar-thin scrollbar-thumb-accent/30 select-text"
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
            placeholder="Interrogate LAZURUS-3 on NeuroNet orbital uplink, Z-Host sync, or Zero Hour..."
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
