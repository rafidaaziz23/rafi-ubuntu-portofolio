"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal as TerminalIcon,
  X,
  Minus,
  Maximize2,
  Minimize2,
  FileText,
  Rocket,
  Search,
  RotateCcw,
  Sparkles,
  MapPin,
  Cpu,
  Clock,
  CheckCircle,
  ExternalLink,
  CornerDownLeft,
} from "lucide-react";

export interface TerminalWindowProps {
  isOpen?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  className?: string;
  onExploreProjects?: () => void;
  onOpenToolbox?: () => void;
  onOpenContact?: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export function TerminalWindow({
  isOpen = true,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized: controlledMaximized,
  className = "",
  onExploreProjects,
  onOpenToolbox,
  onOpenContact,
}: TerminalWindowProps) {
  const [internalClosed, setInternalClosed] = useState(false);
  const [internalMaximized, setInternalMaximized] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isMaximized = controlledMaximized ?? internalMaximized;
  const isVisible = isOpen && !internalClosed;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalClosed(true);
    }
  };

  const handleToggleMaximize = () => {
    if (onMaximize) {
      onMaximize();
    } else {
      setInternalMaximized(!internalMaximized);
    }
  };

  const handleReopen = () => {
    setInternalClosed(false);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        output = (
          <div className="text-xs space-y-1 font-mono text-zinc-300">
            <div className="text-amber-400 font-semibold mb-1">Available System Commands:</div>
            <div><span className="text-[#E95420] font-bold">whoami</span> — Display author bio & active identity specs</div>
            <div><span className="text-[#E95420] font-bold">projects</span> — Launch & focus Nautilus Projects Window</div>
            <div><span className="text-[#E95420] font-bold">skills</span> — Launch & focus System-Toolbox Window</div>
            <div><span className="text-[#E95420] font-bold">resume</span> — Open / download Rafida Aziz CV (PDF)</div>
            <div><span className="text-[#E95420] font-bold">neofetch</span> — Print Ubuntu ASCII system hardware info</div>
            <div><span className="text-[#E95420] font-bold">contact</span> — Open Thunderbird Mailer / contact info</div>
            <div><span className="text-[#E95420] font-bold">clear</span> — Clear terminal command output</div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="text-xs font-mono text-zinc-300 space-y-1">
            <div className="text-white font-semibold">Rafida Aziz — Full-Stack System Architect</div>
            <div className="text-zinc-400">Location: Remote / Global | Experience: 3+ Years Prod</div>
            <div className="text-emerald-400">Status: Open for High-Throughput Engineering Projects</div>
          </div>
        );
        break;

      case "projects":
      case "works":
        if (onExploreProjects) {
          onExploreProjects();
          output = <div className="text-xs font-mono text-emerald-400">Launching Nautilus File Manager (~/Projects)...</div>;
        } else {
          output = <div className="text-xs font-mono text-amber-400">Projects window handler ready.</div>;
        }
        break;

      case "skills":
      case "toolbox":
        if (onOpenToolbox) {
          onOpenToolbox();
          output = <div className="text-xs font-mono text-emerald-400">Launching System-Toolbox (~/Toolbox)...</div>;
        } else {
          output = <div className="text-xs font-mono text-amber-400">Toolbox window handler ready.</div>;
        }
        break;

      case "resume":
      case "cv":
        window.open("/cv/CV_Rafida Aziz.pdf", "_blank");
        output = (
          <div className="text-xs font-mono text-emerald-400">
            Opening `/cv/CV_Rafida Aziz.pdf` in a new tab...
          </div>
        );
        break;

      case "contact":
      case "mail":
        if (onOpenContact) {
          onOpenContact();
          output = <div className="text-xs font-mono text-emerald-400">Opening Thunderbird Mailer...</div>;
        } else {
          output = (
            <div className="text-xs font-mono text-zinc-300">
              Email: <span className="text-[#E95420]">rafida.core@gmail.com</span> | LinkedIn: <span className="text-cyan-400">/in/rafida-aziz</span>
            </div>
          );
        }
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "neofetch":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono py-2">
            <pre className="text-[#E95420] text-[11px] leading-tight select-none">
{`            .-/+oossssoo+/-.
        \`:+ssssssssssssssssss+:\`
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssssdMMMNysssso.
   /ssssssssssshdmmNNmmyNMMMMhssssss/
  +ssssssssshmydMMMMMMMNddddyssssssss+
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
ossyNMMMNyMMhsssssssssssssshmmmhssssssso
+sssshhhyNMMNyssssssssssssyNMMMysssssss+
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +sssssssssdmydMMMMMMMMddddyssssssss+
   /ssssssssssshdmNNNNmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.`}
            </pre>
            <div className="space-y-1 text-zinc-300 text-xs flex flex-col justify-center">
              <div className="text-[#E95420] font-bold">rafida@universe</div>
              <div className="text-zinc-600">----------------------</div>
              <div><span className="text-zinc-500">OS:</span> Ubuntu 24.04 LTS x86_64</div>
              <div><span className="text-zinc-500">Host:</span> Portfolio Hypervisor v2.4</div>
              <div><span className="text-zinc-500">Kernel:</span> 6.8.0-generic</div>
              <div><span className="text-zinc-500">Uptime:</span> 3+ Years Prod</div>
              <div><span className="text-zinc-500">Shell:</span> zsh 5.9 (x86_64-ubuntu)</div>
              <div><span className="text-zinc-500">Terminal:</span> meet-rafida.sh</div>
              <div><span className="text-zinc-500">CPU:</span> Neural & Cloud Architect Core</div>
              <div><span className="text-zinc-500">Memory:</span> 4.8GiB / 32.0GiB</div>
              <div className="flex gap-1 pt-2">
                <span className="w-3 h-3 bg-red-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-amber-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-yellow-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-green-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-cyan-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-blue-500 rounded-sm inline-block" />
                <span className="w-3 h-3 bg-purple-500 rounded-sm inline-block" />
              </div>
            </div>
          </div>
        );
        break;

      case "sudo":
        output = (
          <div className="text-xs font-mono text-red-400">
            rafida is already in the sudoers file. Incident reported to galaxy command.
          </div>
        );
        break;

      default:
        output = (
          <div className="text-xs font-mono text-red-400">
            zsh: command not found: {trimmed}. Type <span className="text-amber-400 font-bold">help</span> to see available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  useEffect(() => {
    if (history.length > 0) {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  if (!isVisible) {
    return (
      <div className="flex items-center justify-center p-6">
        <button
          onClick={handleReopen}
          className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#2C001E] border border-[#E95420]/40 text-zinc-200 hover:text-white hover:border-[#E95420] shadow-lg shadow-[#2C001E]/50 transition-all text-sm font-mono"
        >
          <RotateCcw className="w-4 h-4 text-[#E95420] group-hover:rotate-180 transition-transform duration-500" />
          <span>Launch meet-rafida.sh (Terminal)</span>
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={`w-full font-sans select-none ${
          isMaximized
            ? "fixed inset-0 z-50 rounded-none max-w-none h-screen flex flex-col"
            : "max-w-5xl mx-auto rounded-xl shadow-2xl shadow-black/85 ring-1 ring-white/10"
        } bg-[#18181A] text-zinc-200 overflow-hidden border border-white/10 backdrop-blur-md ${className}`}
      >
        {/* 1. Terminal Window Header Bar */}
        <header className="relative flex items-center justify-between px-3 sm:px-4 py-2.5 bg-gradient-to-r from-[#2C001E] via-[#241f23] to-[#18181A] border-b border-black/50 select-none">
          {/* Traffic Light Controls */}
          <div className="flex items-center gap-2 z-10 group/traffic">
            <button
              onClick={handleClose}
              title="Close"
              aria-label="Close window"
              className="w-3.5 h-3.5 rounded-full bg-[#E95420] hover:brightness-110 active:scale-90 transition-transform flex items-center justify-center border border-red-900/30"
            >
              <X className="w-2.5 h-2.5 text-black/80 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleToggleMaximize}
              title={isMaximized ? "Restore Window" : "Expand Window"}
              aria-label="Expand window"
              className="w-3.5 h-3.5 rounded-full bg-[#38B44A] hover:brightness-110 active:scale-90 transition-transform flex items-center justify-center border border-emerald-900/30"
            >
              {isMaximized ? (
                <Minimize2 className="w-2 h-2 text-black/80 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
              ) : (
                <Maximize2 className="w-2 h-2 text-black/80 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          {/* Window Title */}
          <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none px-12">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-zinc-300">
              <TerminalIcon className="w-3.5 h-3.5 text-[#E95420]" />
              <span className="font-semibold text-white/95">rafida@universe:~ (zsh)</span>
            </div>
          </div>

          {/* Right Header Status / Search */}
          <div className="flex items-center gap-2 z-10 text-zinc-400">
            <button
              title="Search terminal buffer"
              onClick={() => inputRef.current?.focus()}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex flex-col flex-1 min-h-0 p-4 sm:p-6 overflow-y-auto max-h-[700px] custom-scrollbar bg-[#121214]">
          {/* Terminal Command: whoami */}
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-300 mb-4 select-text">
              <span className="text-[#38B44A] font-semibold">rafida@universe</span>
              <span className="text-zinc-500">:</span>
              <span className="text-[#E95420] font-semibold">~</span>
              <span className="text-zinc-400">$</span>
              <span className="text-white font-bold ml-1">whoami</span>
            </div>

            {/* Hero Profile Card */}
            <div className="rounded-xl bg-[#1A1A1D] border border-white/10 p-4 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-md select-text">
              {/* Subtle Aubergine Glow in Card Background */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#E95420]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* Profile Image with Active Badge */}
                <div className="relative shrink-0">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg group">
                    <Image
                      src="/profile/me.png"
                      alt="Rafida Aziz"
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Status Indicator Pill */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#110e11] border border-emerald-500/40 text-[10px] font-mono text-emerald-400 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold">ACTIVE</span>
                  </div>
                </div>

                {/* Identity & Bio */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Rafida Aziz
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#E95420]/20 text-[#E95420] border border-[#E95420]/40">
                      Full-Stack System Architect
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mt-2">
                    Hi there! I'm <strong className="text-white">Rafida Aziz</strong>, a full-stack engineer who loves crafting reliable backend systems and clean web experiences. Over the past 3+ years, I've spent my days untangling complex workflows—turning complicated logistics and data pipelines into smooth, seamless digital tools that people actually enjoy using. Outside of code, I'm constantly learning, experimenting, and finding simpler ways to solve tricky problems.
                  </p>

                  {/* Direct Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <a
                      href="/cv/CV_Rafida Aziz.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#E95420] to-[#c23d0e] hover:from-[#f16331] hover:to-[#E95420] text-white font-medium text-xs font-mono shadow-lg shadow-[#E95420]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Grab My Resume (PDF)</span>
                    </a>

                    <button
                      onClick={onExploreProjects}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 font-medium text-xs font-mono transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Rocket className="w-3.5 h-3.5 text-[#E95420]" />
                      <span>Explore Recent Deployments</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 High-Density Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 select-text">
              {/* Metric 1 */}
              <div className="p-3 rounded-xl bg-[#1A1A1D]/80 border border-white/10 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#E95420]" />
                  <span>System Experience</span>
                </span>
                <span className="text-sm font-semibold text-white mt-1 font-mono">
                  3+ Years Prod
                </span>
              </div>

              {/* Metric 2 */}
              <div className="p-3 rounded-xl bg-[#1A1A1D]/80 border border-white/10 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>Location</span>
                </span>
                <span className="text-sm font-semibold text-white mt-1 font-mono">
                  Remote / Global
                </span>
              </div>

              {/* Metric 3 */}
              <div className="p-3 rounded-xl bg-[#1A1A1D]/80 border border-white/10 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-amber-400" />
                  <span>Specialization</span>
                </span>
                <span className="text-sm font-semibold text-white mt-1 font-mono">
                  High-Throughput IO
                </span>
              </div>

              {/* Metric 4 */}
              <div className="p-3 rounded-xl bg-[#1A1A1D]/80 border border-white/10 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Status</span>
                </span>
                <span className="text-sm font-semibold text-emerald-400 mt-1 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>Open for Projects</span>
                </span>
              </div>
            </div>

            {/* Command Execution History Output */}
            {history.length > 0 && (
              <div className="mt-4 space-y-3 pt-3 border-t border-white/5">
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1.5 font-mono select-text">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="text-[#38B44A]">rafida@universe</span>
                      <span className="text-zinc-500">:</span>
                      <span className="text-[#E95420]">~/works</span>
                      <span className="text-zinc-400">$</span>
                      <span className="text-white font-bold">{item.command}</span>
                    </div>
                    <div className="pl-4 py-1">{item.output}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Command Prompt Line */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 font-mono text-xs sm:text-sm">
              <span className="text-[#38B44A] shrink-0 font-semibold">rafida@universe</span>
              <span className="text-zinc-500 shrink-0">:</span>
              <span className="text-[#E95420] shrink-0 font-semibold">~/works</span>
              <span className="text-zinc-400 shrink-0">$</span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type 'help', 'neofetch', or 'projects'..."
                  className="w-full bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-zinc-600 caret-[#E95420]"
                />
                <button
                  onClick={() => executeCommand(inputVal)}
                  title="Execute Command"
                  className="text-zinc-500 hover:text-[#E95420] p-1 transition-colors"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div ref={terminalBottomRef} />
          </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TerminalWindow;
