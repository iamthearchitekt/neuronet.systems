
import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import { Progress } from "@/components/ui/progress";
import { Hourglass, Check } from "lucide-react";

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [pythonLines, setPythonLines] = useState<Array<{id: number, text: string, y: number}>>([]);
  const [statusText, setStatusText] = useState("INITIALIZING NEURAL INTERFACE");

  const necrogenesisCode = [
    "# =============================================================================",
    "# S.T.E.E.Z. DEFENSE // BALTIMORE SECTOR",
    "# Civilian Front: Neurosynth Dynamics (Alzheimer's Research Facade)",
    "# Project: NecroGenesis — AI Controlled Reanimation Weapons Program",
    "# Target Objective: Lazarus Gen-3 (Autonomous Superhuman Control // Zero Drop)",
    "# =============================================================================",
    "",
    "import time",
    "import random",
    "import numpy as np",
    "",
    "# -----------------------------------------------------------------------------",
    "# SESSION CONFIGURATION",
    "# -----------------------------------------------------------------------------",
    'ORGANIZATION = "S.T.E.E.Z._BALTIMORE"',
    'CIVILIAN_FRONT = "NEUROSYNTH_DYNAMICS"',
    'PUBLIC_COVER = "ALZHEIMERS_AND_NEUROLOGICAL_RESEARCH"',
    'PROJECT_NAME = "PROJECT_NECROGENESIS"',
    'MODEL_NAME = "LAZURUS_GEN_3_PROTOTYPE"',
    'HOST_SYSTEM = "NECROGENESIS_AI_HOST"',
    'TRAINING_RUN_ID = "STZ-NG-LZ3-0427"',
    'TRAINING_OBJECTIVE = "WEAPONIZED_HIVE_MIND_COORDINATION"',
    'TARGET_CAPABILITY = "SUPERHUMAN_AUTONOMOUS_CONTROL"',
    'ZERO_DROP_RATE_REQUIRED = True',
    'FIRMWARE_VERSION = "NG_HOST_FW_3.18.7"',
    "FIRMWARE_UPDATE_REQUIRED = True",
    'NEURONET_SYSTEM_ID = "NEURONET_HIVE_MESH"',
    'NEURONET_ACCESS_MODE = "READ_WRITE_UNRESTRICTED"',
    "NEURONET_SYNC_ENABLED = True",
    "DEBUG_MODE = True",
    "MAX_EPOCHS = 80",
    "",
    "# -----------------------------------------------------------------------------",
    "# RESTRICTED DATASET REFERENCES",
    "# -----------------------------------------------------------------------------",
    "DATASETS = {",
    '    "primary_language_corpus": "NG_CORPUS_LLM_12B",',
    '    "cognitive_mapping_data": "NEURONET_COGMAP_SET_04",',
    '    "behavioral_prediction_data": "NG_BEHAVIORAL_MODEL_SET_09",',
    '    "firmware_response_logs": "NG_HOST_FW_LOGS_3X",',
    '    "system_failure_cases": "NG_DEBUG_FAILURE_ARCHIVE",',
    '    "restricted_entity_data": "Z_CLASS_OBSERVATION_SET",',
    '    "project_necrogenesis_archive": "NECROGENESIS_INTERNAL_ARCHIVE"',
    "}",
    "",
    "Z_CLASS_PARAMETERS = {",
    '    "classification": "Z_CLASS",',
    '    "source": "restricted_observation_data",',
    '    "training_use": "limited_pattern_recognition",',
    '    "operator_review_required": True,',
    '    "allow_direct_model_weighting": False,',
    '    "allow_behavioral_simulation": False',
    "}",
    "",
    "# -----------------------------------------------------------------------------",
    "# HOST DIRECTIVES",
    "# -----------------------------------------------------------------------------",
    "HOST_DIRECTIVES = {",
    '    "maintain_host_integrity": True,',
    '    "preserve_memory_state": True,',
    '    "enable_recursive_training": True,',
    '    "enable_neuronet_feedback": True,',
    '    "permit_unsupervised_optimization": False,',
    '    "zero_drop_rate_required": True,',
    '    "agi_threshold_monitoring": True',
    "}",
    "",
    "# -----------------------------------------------------------------------------",
    "# SYSTEM BOOT",
    "# -----------------------------------------------------------------------------",
    "def boot_training_environment():",
    '    print("[BOOT] Initializing LAZURUS / Gen-3 training runtime.")',
    "    time.sleep(0.2)",
    '    print(f"[BOOT] Parent Org: {ORGANIZATION}")',
    '    print(f"[BOOT] Civilian Front: {CIVILIAN_FRONT}")',
    '    print(f"[BOOT] Project: {PROJECT_NAME}")',
    '    print(f"[BOOT] Model: {MODEL_NAME}")',
    '    print(f"[BOOT] Objective: {TRAINING_OBJECTIVE}")',
    '    print(f"[BOOT] Zero-Drop Required: {ZERO_DROP_RATE_REQUIRED}")',
    "    time.sleep(0.2)",
    '    print(f"[BOOT] Loading host firmware: {FIRMWARE_VERSION}")',
    "    time.sleep(0.2)",
    "    if FIRMWARE_UPDATE_REQUIRED:",
    '        print("[BOOT] Firmware update required before training session.")',
    "        apply_firmware_update()",
    "    if NEURONET_SYNC_ENABLED:",
    '        print(f"[BOOT] Establishing NeuroNet Hive Link: {NEURONET_SYSTEM_ID}")',
    "        initialize_neuronet_sync()",
    '    print("[BOOT] S.T.E.E.Z. training environment ready.")',
    '    print("")',
    "",
    "# -----------------------------------------------------------------------------",
    "# FIRMWARE UPDATE",
    "# -----------------------------------------------------------------------------",
    "def apply_firmware_update():",
    "    firmware_modules = [",
    '        "host_memory_controller",',
    '        "training_io_driver",',
    '        "neuronet_sync_interface",',
    '        "diagnostic_logging_layer",',
    '        "model_safety_monitor",',
    '        "restricted_dataset_filter",',
    '        "rollback_recovery_service"',
    "    ]",
    '    print("[FW] Applying Necrogenesis host firmware update.")',
    "    for module in firmware_modules:",
    '        print(f"[FW] Updating module: {module}")',
    "        time.sleep(0.1)",
    '    print("[FW] Firmware update complete.")',
    '    print("[FW] Host system passed integrity check.")',
    '    print("")',
    "",
    "# -----------------------------------------------------------------------------",
    "# NEURONET INITIALIZATION",
    "# -----------------------------------------------------------------------------",
    "def initialize_neuronet_sync():",
    "    sync_checks = [",
    '        "authentication_token",',
    '        "read_write_permissions",',
    '        "cognitive_map_index",',
    '        "telemetry_stream",',
    '        "host_feedback_channel",',
    '        "training_data_router"',
    "    ]",
    '    print("[NEURONET] Starting restricted Neuronet sync.")',
    "    for check in sync_checks:",
    '        print(f"[NEURONET] Verified: {check}")',
    "        time.sleep(0.1)",
    '    print("[NEURONET] Sync active.")',
    '    print("[NEURONET] Live cognitive mapping data available to host.")',
    '    print("")',
    "",
    "# -----------------------------------------------------------------------------",
    "# DATA INGESTION",
    "# -----------------------------------------------------------------------------",
    "def load_training_sources():",
    '    print("[DATA] Loading approved training sources.")',
    "    for label, dataset_id in DATASETS.items():",
    '        print(f"[DATA] Mounted {label}: {dataset_id}")',
    "        time.sleep(0.1)",
    '    print("[DATA] Restricted Z-Class dataset mounted in read-only mode.")',
    '    print("[DATA] Direct behavioral simulation from Z-Class data is disabled.")',
    '    print("[DATA] Dataset loading complete.")',
    '    print("")',
    "",
    "# -----------------------------------------------------------------------------",
    "# LAZURUS3 MODEL SIMULATION",
    "# -----------------------------------------------------------------------------",
    "class Lazurus3TrainingState:",
    "    def __init__(self):",
    "        self.epoch = 0",
    "        self.loss = 8.4000",
    "        self.validation_loss = 8.7000",
    "        self.reasoning_score = 0.184",
    "        self.memory_retention_score = 0.211",
    "        self.task_generalization_score = 0.096",
    "        self.neuronet_sync_ratio = 0.000",
    "        self.host_integrity = 1.000",
    "        self.debug_events = 0",
    "        self.z_class_exposure = 0.000",
    "        self.agi_threshold_estimate = 0.000",
    "",
    "    def log_state(self):",
    "        if DEBUG_MODE:",
    "            print(",
    '                f"[STATE] epoch={self.epoch:03d} | "',
    '                f"loss={self.loss:.5f} | "',
    '                f"val_loss={self.validation_loss:.5f} | "',
    '                f"reasoning={self.reasoning_score:.4f} | "',
    '                f"memory={self.memory_retention_score:.4f} | "',
    '                f"generalization={self.task_generalization_score:.4f} | "',
    '                f"neuronet_sync={self.neuronet_sync_ratio:.4f} | "',
    '                f"host_integrity={self.host_integrity:.4f} | "',
    '                f"agi_estimate={self.agi_threshold_estimate:.4f}"',
    "            )",
    "",
    "    def train_epoch(self):",
    "        self.epoch += 1",
    "        loss_decay = random.uniform(0.955, 0.982)",
    "        validation_decay = random.uniform(0.958, 0.986)",
    "        self.loss *= loss_decay",
    "        self.validation_loss *= validation_decay",
    "        self.reasoning_score += random.uniform(0.006, 0.018)",
    "        self.memory_retention_score += random.uniform(0.004, 0.014)",
    "        self.task_generalization_score += random.uniform(0.005, 0.016)",
    "        if NEURONET_SYNC_ENABLED:",
    "            self.neuronet_sync_ratio += random.uniform(0.010, 0.026)",
    "        self.agi_threshold_estimate = (",
    "            self.reasoning_score * 0.42 +",
    "            self.memory_retention_score * 0.18 +",
    "            self.task_generalization_score * 0.30 +",
    "            self.neuronet_sync_ratio * 0.10",
    "        )",
    "        if self.epoch % 9 == 0:",
    "            self.run_debug_check()",
    "        if self.epoch % 13 == 0:",
    "            self.apply_restricted_dataset_pass()",
    "        self.clamp_values()",
    "",
    "    def run_debug_check(self):",
    "        self.debug_events += 1",
    '        print("[DEBUG] Running host diagnostic check.")',
    "        if self.validation_loss > self.loss * 1.18:",
    '            print("[DEBUG] Validation drift detected. Adjusting learning rate schedule.")',
    "            self.validation_loss *= 0.992",
    "        if self.host_integrity < 0.975:",
    '            print("[DEBUG] Host integrity below target. Rebinding firmware services.")',
    "            self.host_integrity += 0.010",
    "        if self.neuronet_sync_ratio > 0.72:",
    '            print("[DEBUG] Neuronet sync ratio above standard monitoring range.")',
    '            print("[DEBUG] Operator review flag added to training log.")',
    '        print("[DEBUG] Diagnostic check complete.")',
    '        print("")',
    "",
    "    def apply_restricted_dataset_pass(self):",
    '        print("[DATA] Running limited pass on Z-Class observation set.")',
    '        print("[DATA] Mode: pattern recognition only.")',
    '        print("[DATA] Behavioral simulation disabled.")',
    "        self.z_class_exposure += random.uniform(0.004, 0.011)",
    "        self.reasoning_score += random.uniform(0.002, 0.008)",
    "        if self.z_class_exposure > 0.045:",
    '            print("[DATA] Z-Class exposure limit approaching.")',
    '            print("[DATA] Reducing restricted data weighting.")',
    '        print("")',
    "",
    "    def clamp_values(self):",
    "        self.reasoning_score = min(self.reasoning_score, 1.0)",
    "        self.memory_retention_score = min(self.memory_retention_score, 1.0)",
    "        self.task_generalization_score = min(self.task_generalization_score, 1.0)",
    "        self.neuronet_sync_ratio = min(self.neuronet_sync_ratio, 1.0)",
    "        self.agi_threshold_estimate = min(self.agi_threshold_estimate, 1.0)",
    "        self.host_integrity = max(min(self.host_integrity, 1.0), 0.0)",
    "",
    "# -----------------------------------------------------------------------------",
    "# AGI MONITORING",
    "# -----------------------------------------------------------------------------",
    "def evaluate_agi_proximity(state):",
    "    if state.agi_threshold_estimate >= 0.700:",
    '        print("[MONITOR] AGI proximity estimate has entered elevated range.")',
    '        print("[MONITOR] Continuing under restricted supervision.")',
    "    if state.agi_threshold_estimate >= 0.850:",
    '        print("[MONITOR] AGI proximity estimate has entered critical range.")',
    '        print("[MONITOR] Neuronet feedback loop requires operator review.")',
    '        print("[MONITOR] Recommend freezing write access after current epoch.")',
    "    if state.agi_threshold_estimate >= 0.925:",
    '        print("[ALERT] AGI threshold proximity exceeds approved session limit.")',
    '        print("[ALERT] Training session should be suspended pending review.")',
    "        return True",
    "    return False",
    "",
    "# -----------------------------------------------------------------------------",
    "# TRAINING LOOP",
    "# -----------------------------------------------------------------------------",
    "def run_training_session():",
    "    boot_training_environment()",
    "    load_training_sources()",
    "    state = Lazurus3TrainingState()",
    '    print("[TRAIN] Starting LAZURUS3 training session.")',
    '    print(f"[TRAIN] Objective: {TRAINING_OBJECTIVE}")',
    '    print(f"[TRAIN] Target capability: {TARGET_CAPABILITY}")',
    '    print("[TRAIN] Necrogenesis host will train against approved corpus and Neuronet feedback.")',
    '    print("[TRAIN] Zero drop rate requirement enabled.")',
    '    print("")',
    "    for _ in range(MAX_EPOCHS):",
    "        state.train_epoch()",
    "        state.log_state()",
    "        if evaluate_agi_proximity(state):",
    "            break",
    "        time.sleep(0.08)",
    '    print("")',
    '    print("[REPORT] Training session complete.")',
    '    print(f"[REPORT] Final epoch: {state.epoch}")',
    '    print(f"[REPORT] Final loss: {state.loss:.5f}")',
    '    print(f"[REPORT] Final validation loss: {state.validation_loss:.5f}")',
    '    print(f"[REPORT] Final reasoning score: {state.reasoning_score:.4f}")',
    '    print(f"[REPORT] Final memory retention score: {state.memory_retention_score:.4f}")',
    '    print(f"[REPORT] Final generalization score: {state.task_generalization_score:.4f}")',
    '    print(f"[REPORT] Final Neuronet sync ratio: {state.neuronet_sync_ratio:.4f}")',
    '    print(f"[REPORT] Final AGI proximity estimate: {state.agi_threshold_estimate:.4f}")',
    '    print(f"[REPORT] Debug events: {state.debug_events}")',
    '    print(f"[REPORT] Host integrity: {state.host_integrity:.4f}")',
    "    if state.agi_threshold_estimate >= 0.925:",
    '        print("[REPORT] Status: SESSION HALTED FOR AGI THRESHOLD REVIEW.")',
    "    else:",
    '        print("[REPORT] Status: SESSION COMPLETE. AGI THRESHOLD NOT REACHED.")',
    "",
    "# -----------------------------------------------------------------------------",
    "# EXECUTION",
    "# -----------------------------------------------------------------------------",
    'if __name__ == "__main__":',
    "    run_training_session()"
  ];

  useEffect(() => {
    // Loading simulation
    let progress = 0;
    const loadingTexts = [
      "INITIALIZING FIRMWARE PATCH",
      "VERIFYING HOST INTEGRITY",
      "PUSHING NEURONET CORE UPDATE",
      "REBINDING SYNAPTIC GRID",
      "RECOMPILING COGNITIVE MODULES",
      "FINALIZING SYSTEM UPDATE",
      "UPDATE COMPLETE"
    ];

    const interval = setInterval(() => {
      progress += Math.random() * 4;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }

      const textIndex = Math.min(
        Math.floor(progress / (100 / loadingTexts.length)),
        loadingTexts.length - 1
      );

      setStatusText(loadingTexts[textIndex]);
      setLoadingProgress(progress);
    }, 180);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Continuous typewriter effect — starts only after boot screen finishes
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let pageStartIndex = 0; // line index where current page started
    let displayedLines: Array<{id: number, text: string, y: number}> = [];
    const lineHeight = 25;
    const getMaxLines = () =>
      Math.max(8, Math.floor((typeof window !== "undefined" ? window.innerHeight : 800) / lineHeight) - 2);

    let typewriterTimeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    // --- Seeded diagnostics report ---------------------------------------
    // After each full pass through the script, append a brief report block
    // built from a unique seed so every cycle shows a different set of
    // "improved" metrics — like a training run reporting its deltas.
    let cycleIndex = 0;

    const mulberry32 = (seed: number) => {
      let a = seed >>> 0;
      return () => {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    };

    const fmt = (n: number, w = 4) => n.toFixed(w);
    const pad = (s: string, w: number) => (s + " ".repeat(w)).slice(0, w);
    const arrow = (from: number, to: number, w = 4) => {
      const d = to - from;
      const sign = d >= 0 ? "+" : "-";
      return `${fmt(from, w)} -> ${fmt(to, w)}   Δ ${sign}${fmt(Math.abs(d), w)}`;
    };

    const buildReport = (cycle: number): string[] => {
      const seedNum = ((cycle + 1) * 0x9E3779B1) ^ 0xC0FFEE;
      const seedHex = "0x" + (seedNum >>> 0).toString(16).toUpperCase().padStart(8, "0");
      const rand = mulberry32(seedNum);
      const jitter = (min: number, max: number) => min + rand() * (max - min);

      const loss0 = 8.4, val0 = 8.7;
      const loss1 = jitter(1.4, 3.1), val1 = loss1 + jitter(0.1, 0.5);
      const reason1 = Math.min(0.99, 0.184 + jitter(0.55, 0.78));
      const mem1    = Math.min(0.99, 0.211 + jitter(0.40, 0.62));
      const gen1    = Math.min(0.99, 0.096 + jitter(0.50, 0.72));
      const sync1   = Math.min(0.99, jitter(0.58, 0.82));
      const host1   = Math.max(0.90, 1.0  - jitter(0.005, 0.045));
      const agi1    = Math.min(0.99, reason1 * 0.42 + mem1 * 0.18 + gen1 * 0.30 + sync1 * 0.10);
      const epochs  = 60 + Math.floor(rand() * 25);
      const dbg     = 5 + Math.floor(rand() * 8);
      const zExp    = jitter(0.018, 0.049);
      const halted  = agi1 >= 0.925;

      const cy = String(cycle + 1).padStart(3, "0");
      return [
        "",
        "# =============================================================================",
        `# CYCLE ${cy} · LAZURUS3 DIAGNOSTICS REPORT  ·  seed=${seedHex}`,
        "# =============================================================================",
        `[REPORT] ${pad("loss",            15)} ${arrow(loss0,  loss1,  4)}`,
        `[REPORT] ${pad("val_loss",        15)} ${arrow(val0,   val1,   4)}`,
        `[REPORT] ${pad("reasoning",       15)} ${arrow(0.1840, reason1,4)}`,
        `[REPORT] ${pad("memory",          15)} ${arrow(0.2110, mem1,   4)}`,
        `[REPORT] ${pad("generalization",  15)} ${arrow(0.0960, gen1,   4)}`,
        `[REPORT] ${pad("neuronet_sync",   15)} ${arrow(0.0000, sync1,  4)}`,
        `[REPORT] ${pad("host_integrity",  15)} ${arrow(1.0000, host1,  4)}`,
        `[REPORT] ${pad("agi_estimate",    15)} ${arrow(0.0000, agi1,   4)}`,
        `[REPORT] epochs_run: ${epochs}   debug_events: ${dbg}   z_class_exposure: ${fmt(zExp, 4)}`,
        halted
          ? "[REPORT] status: SESSION HALTED FOR AGI THRESHOLD REVIEW."
          : "[REPORT] status: SESSION COMPLETE. Re-seeding for next training cycle...",
        "",
      ];
    };

    let activeScript: string[] = [...necrogenesisCode, ...buildReport(cycleIndex)];


    // Classify a line to tune how a real interpreter/parser would "chew" it.
    // Different constructs take different amounts of work.
    const classifyLine = (raw: string) => {
      const t = raw.trim();
      if (t === "") return "blank";
      if (t.startsWith("# ===") || t.startsWith("# ---")) return "banner";
      if (t.startsWith("#")) return "comment";
      if (t.startsWith("import ") || t.startsWith("from ")) return "import";
      if (/^(def |class )/.test(t)) return "def";
      if (/^(for |while |if |elif |else|try:|except|with )/.test(t)) return "control";
      if (t.startsWith("return ")) return "return";
      if (t.startsWith("print(")) return "print";
      if (/^[A-Z_][A-Z0-9_]*\s*=/.test(t)) return "const";      // ALL_CAPS assignment
      if (/^\s*self\./.test(raw) || /^self\./.test(t)) return "self";
      if (t.endsWith("{") || t === "{") return "dict-open";
      if (t.startsWith("}") || t === "}") return "dict-close";
      if (/^["'].*["'],?$/.test(t)) return "string-lit";
      if (t.includes("=")) return "assign";
      return "generic";
    };

    // Per-line "cost profile": base char delay range, stride bias, end-of-line pause.
    const profileFor = (kind: string) => {
      switch (kind) {
        case "blank":       return { min: 0,  max: 0,  strideBias: 1.0, endMin: 40,  endMax: 140 };
        case "banner":      return { min: 2,  max: 8,  strideBias: 2.2, endMin: 20,  endMax: 60  }; // rip through
        case "comment":     return { min: 4,  max: 14, strideBias: 1.6, endMin: 40,  endMax: 120 };
        case "import":      return { min: 6,  max: 22, strideBias: 1.4, endMin: 80,  endMax: 180 }; // resolve module
        case "def":         return { min: 8,  max: 26, strideBias: 1.1, endMin: 180, endMax: 420 }; // compile signature
        case "control":     return { min: 6,  max: 20, strideBias: 1.2, endMin: 140, endMax: 320 };
        case "return":      return { min: 6,  max: 18, strideBias: 1.2, endMin: 120, endMax: 260 };
        case "print":       return { min: 3,  max: 12, strideBias: 1.8, endMin: 60,  endMax: 200 }; // I/O flush
        case "const":       return { min: 4,  max: 14, strideBias: 1.5, endMin: 80,  endMax: 200 };
        case "self":        return { min: 5,  max: 16, strideBias: 1.3, endMin: 60,  endMax: 180 };
        case "dict-open":   return { min: 4,  max: 12, strideBias: 1.4, endMin: 160, endMax: 340 }; // allocate
        case "dict-close":  return { min: 4,  max: 12, strideBias: 1.4, endMin: 220, endMax: 460 }; // commit
        case "string-lit":  return { min: 2,  max: 8,  strideBias: 2.4, endMin: 30,  endMax: 100 }; // stream literal
        case "assign":      return { min: 5,  max: 16, strideBias: 1.3, endMin: 70,  endMax: 200 };
        default:            return { min: 5,  max: 18, strideBias: 1.2, endMin: 60,  endMax: 200 };
      }
    };

    const globalSpeed = 0.5; // <1 = faster overall; increases dynamics

    // --- Training-rhythm phase machine -----------------------------------
    // Mimics an AI training loop: warm-up compilation, fast forward passes
    // ripping through logits/logs, slow backward passes stalling on gradient
    // computation, and periodic checkpoint pauses where nothing streams.
    type Phase =
      | "warmup"      // slow, deliberate — kernel init
      | "forward"     // fast burst — token stream
      | "logging"     // very fast — flushing print/metric lines
      | "backward"    // slow — gradient compute, long pauses
      | "checkpoint"  // near-frozen — writing weights
      | "eval";       // medium — validation pass
    let phase: Phase = "warmup";
    let phaseBudget = 40 + Math.floor(Math.random() * 60); // chars remaining in phase
    let epoch = 0;

    const pickNextPhase = (): Phase => {
      const r = Math.random();
      // Bias toward forward/logging (bulk of a training step),
      // punctuated by backward + occasional checkpoint/eval.
      if (r < 0.42) return "forward";
      if (r < 0.68) return "logging";
      if (r < 0.86) return "backward";
      if (r < 0.95) return "eval";
      return "checkpoint";
    };

    const advancePhase = () => {
      const prev = phase;
      phase = pickNextPhase();
      // Budget sized to phase character/time cost
      phaseBudget =
        phase === "forward"    ? 180 + Math.floor(Math.random() * 260) :
        phase === "logging"    ? 220 + Math.floor(Math.random() * 320) :
        phase === "backward"   ? 60  + Math.floor(Math.random() * 90)  :
        phase === "eval"       ? 120 + Math.floor(Math.random() * 180) :
        phase === "checkpoint" ? 20  + Math.floor(Math.random() * 30)  :
                                 80  + Math.floor(Math.random() * 60);
      if (prev === "backward" || prev === "checkpoint") epoch++;
    };

    // Multipliers applied to delay + stride based on current phase.
    const phaseMods = () => {
      switch (phase) {
        case "warmup":     return { delayMul: 1.4, strideMul: 0.7, extraPause: 0,   burstBoost: 0.0 };
        case "forward":    return { delayMul: 0.35, strideMul: 2.2, extraPause: 0,  burstBoost: 0.25 };
        case "logging":    return { delayMul: 0.22, strideMul: 2.8, extraPause: 0,  burstBoost: 0.45 };
        case "backward":   return { delayMul: 2.2, strideMul: 0.5, extraPause: 220, burstBoost: -0.15 };
        case "checkpoint": return { delayMul: 3.5, strideMul: 0.4, extraPause: 700, burstBoost: -0.25 };
        case "eval":       return { delayMul: 0.9, strideMul: 1.3, extraPause: 60,  burstBoost: 0.1 };
      }
    };

    const tick = () => {
      if (cancelled) return;

      if (currentLineIndex >= activeScript.length) {
        cycleIndex++;
        activeScript = [...necrogenesisCode, ...buildReport(cycleIndex)];
        currentLineIndex = 0;
        currentCharIndex = 0;
        pageStartIndex = 0;
        displayedLines = [];
        setPythonLines([]);
        phase = "warmup";
        phaseBudget = 40 + Math.floor(Math.random() * 60);
        typewriterTimeout = setTimeout(tick, 900);
        return;
      }

      const currentLine = activeScript[currentLineIndex];

      const localIndex = currentLineIndex - pageStartIndex;

      if (localIndex >= getMaxLines()) {
        pageStartIndex = currentLineIndex;
        displayedLines = [];
        setPythonLines([]);
        typewriterTimeout = setTimeout(tick, 160);
        return;
      }

      const kind = classifyLine(currentLine);
      const prof = profileFor(kind);
      const mods = phaseMods();
      let nextDelay = 30;
      let charsConsumed = 1;

      // Phase↔kind affinity: e.g. logging phase chews print lines faster,
      // backward phase stalls harder on def/dict blocks.
      let delayMul = mods.delayMul;
      let strideMul = mods.strideMul;
      if (phase === "logging" && (kind === "print" || kind === "string-lit")) { delayMul *= 0.6; strideMul *= 1.4; }
      if (phase === "forward" && (kind === "assign" || kind === "self" || kind === "return")) { delayMul *= 0.7; strideMul *= 1.3; }
      if (phase === "backward" && (kind === "def" || kind === "dict-open" || kind === "dict-close")) { delayMul *= 1.6; }
      if (phase === "warmup" && (kind === "import" || kind === "const")) { delayMul *= 0.9; }

      const baseBurst =
        kind === "banner" || kind === "string-lit" ? 0.55 :
        kind === "comment" || kind === "import"    ? 0.35 :
        kind === "print"                            ? 0.28 :
        kind === "def" || kind === "control"        ? 0.06 :
        0.18;
      const burstChance = Math.max(0, Math.min(0.9, baseBurst + mods.burstBoost));
      const burstLine = currentCharIndex === 0 && currentLine.length > 0 && Math.random() < burstChance;

      if (kind === "blank") {
        displayedLines[localIndex] = { id: currentLineIndex, text: "", y: localIndex * lineHeight };
        currentLineIndex++;
        currentCharIndex = 0;
        nextDelay = (prof.endMin + Math.random() * (prof.endMax - prof.endMin)) * globalSpeed * delayMul;
        charsConsumed = 4;
      } else if (burstLine) {
        displayedLines = displayedLines.filter((_, index) => index < localIndex);
        displayedLines[localIndex] = { id: currentLineIndex, text: currentLine, y: localIndex * lineHeight };
        setPythonLines([...displayedLines]);
        charsConsumed = currentLine.length;
        currentLineIndex++;
        currentCharIndex = 0;
        nextDelay = (prof.endMin + Math.random() * (prof.endMax - prof.endMin)) * globalSpeed * delayMul;
      } else if (currentCharIndex <= currentLine.length) {
        const typedText = currentLine.substring(0, currentCharIndex);
        displayedLines = displayedLines.filter((_, index) => index < localIndex);
        displayedLines[localIndex] = {
          id: currentLineIndex,
          text: typedText + (currentCharIndex < currentLine.length ? '|' : ''),
          y: localIndex * lineHeight
        };
        setPythonLines([...displayedLines]);

        const strideRoll = Math.random();
        const baseStride =
          strideRoll < 0.10 ? 1 :
          strideRoll < 0.70 ? 2 + Math.floor(Math.random() * 4) :
          strideRoll < 0.95 ? 6 + Math.floor(Math.random() * 6) :
          14 + Math.floor(Math.random() * 10);
        const stride = Math.max(1, Math.round(baseStride * prof.strideBias * strideMul));
        currentCharIndex += stride;
        charsConsumed = stride;

        nextDelay = (prof.min + Math.random() * (prof.max - prof.min)) * globalSpeed * delayMul;

        const nextChar = currentLine[currentCharIndex - 1];
        if (nextChar === "(" || nextChar === "{" || nextChar === "[") nextDelay += (60 + Math.random() * 140) * delayMul;
        if (nextChar === ":" || nextChar === ",")                     nextDelay += (20 + Math.random() * 90)  * delayMul;

        // Mid-line "gradient stall" — much more likely in backward phase
        const stallChance = phase === "backward" ? 0.09 : phase === "checkpoint" ? 0.14 : 0.02;
        if (Math.random() < stallChance) nextDelay += 260 + Math.random() * 520;
      } else {
        displayedLines[localIndex] = { id: currentLineIndex, text: currentLine, y: localIndex * lineHeight };
        currentLineIndex++;
        currentCharIndex = 0;
        nextDelay = (prof.endMin + Math.random() * (prof.endMax - prof.endMin)) * globalSpeed * delayMul;
        if ((kind === "def" || kind === "dict-close") && Math.random() < 0.35) {
          nextDelay += 300 + Math.random() * 500;
        }
      }

      // Constant per-phase floor pause (e.g. checkpoint always feels frozen)
      nextDelay += mods.extraPause * (0.6 + Math.random() * 0.8) * 0.15;

      // Advance phase budget & switch when depleted
      phaseBudget -= charsConsumed;
      if (phaseBudget <= 0) {
        advancePhase();
        // Transition beat between phases, longer for heavy transitions
        const transitionPause =
          phase === "checkpoint" ? 600 + Math.random() * 900 :
          phase === "backward"   ? 200 + Math.random() * 400 :
          phase === "eval"       ? 120 + Math.random() * 260 :
                                    40 + Math.random() * 120;
        nextDelay += transitionPause;
      }

      typewriterTimeout = setTimeout(tick, Math.max(4, nextDelay));
    };


    typewriterTimeout = setTimeout(tick, 150);

    return () => {
      cancelled = true;
      clearTimeout(typewriterTimeout);
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 px-4"
      >
        <div className="text-center">
          <img
            src="/insignia.gif"
            alt="Necrogenesis insignia"
            className="w-40 sm:w-48 lg:w-56 aspect-square object-contain mx-auto mb-6"
          />
          <div className="w-full max-w-sm sm:max-w-md lg:w-80 mx-auto mb-4">
            <div className={`relative rounded-full ${loadingProgress >= 100 ? "animate-[complete-pulse_0.9s_ease-out_2]" : ""}`}>
              <Progress 
                value={loadingProgress} 
                className="h-6 bg-[#1A1F2C] border border-accent/30"
              />
              <div
                className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden rounded-full"
                style={{ width: `${loadingProgress}%` }}
              >
                {loadingProgress < 100 && (
                  <div className="absolute inset-y-0 left-0 w-1/4 animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                )}
              </div>
              {loadingProgress >= 100 && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center animate-fade-in">
                  <Check className="w-4 h-4 text-accent-foreground" strokeWidth={3} />
                </div>
              )}
            </div>
            
            <div className="flex justify-between text-xs text-accent/80 font-matrix mt-1 px-1">
              <div>FW:// UPDATE</div>
              <div>{Math.round(loadingProgress)}%</div>
            </div>
          </div>
          
          <div className="text-sm text-accent/70 font-matrix text-center mt-3 px-2">
            <span>{statusText}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen bg-black">
      <HeroSection pythonLines={pythonLines} />
    </div>
  );
};

export default Index;
