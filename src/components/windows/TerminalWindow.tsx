"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Typewriter } from "@/components/Typewriter";
import { AnimatedHelp } from "@/components/AnimatedHelp";
import { MatrixRain } from "@/components/MatrixRain";
import { useSoundEffects } from "@/hooks/useSoundEffects";
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
  onOpenExperience?: () => void;
  onThemeChange?: (theme: string) => void;
}

interface CommandHistoryItem {
  command: string;
  path?: string;
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
  onOpenExperience,
  onThemeChange,
}: TerminalWindowProps) {
  const [internalClosed, setInternalClosed] = useState(false);
  const [internalMaximized, setInternalMaximized] = useState(false);
  const dragControls = useDragControls();
  const { playKeystroke } = useSoundEffects();
  const [inputVal, setInputVal] = useState("");
  const [currentPath, setCurrentPath] = useState<string>("~");
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isProcessingAI, setIsProcessingAI] = useState(false);

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

  const executeCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    setCommandHistoryList((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let output: React.ReactNode = null;
    let isAICommand = false;

    switch (trimmed) {
            case "help":
        output = (
          <AnimatedHelp
            onLinePrinted={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({
                  top: scrollContainerRef.current.scrollHeight,
                  behavior: "smooth",
                });
              }
            }}
          />
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
        window.open("/cv/CV_Rafida%20Aziz.pdf", "_blank");
        output = <div className="text-xs font-mono text-emerald-400">Downloading resume (PDF)...</div>;
        break;

      case "contact":
        if (onOpenContact) {
          onOpenContact();
          output = <div className="text-xs font-mono text-emerald-400">Opening Thunderbird Mailer...</div>;
        } else {
          output = <div className="text-xs font-mono text-amber-400">Contact handler ready.</div>;
        }
        break;

      case "experience":
      case "education":
        if (onOpenExperience) {
          onOpenExperience();
          output = <div className="text-xs font-mono text-emerald-400">Opening System Logs Viewer (Experience)...</div>;
        } else {
          output = <div className="text-xs font-mono text-amber-400">Experience handler ready.</div>;
        }
        break;

      case "neofetch":
        output = (
          <div className="text-xs font-mono text-zinc-300 flex items-start gap-4">
            <div className="text-[#E95420] whitespace-pre hidden sm:block">
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
 \sssssssshNMMMyhhyyyyhdNMMMNhssssssss/
  +sssssssssdmydMMMMMMMMddddyssssssss+
   \ssssssssssshdmmNNmmyNMMMMhssssss/
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.`}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[#E95420] font-bold">rafi@nexatriv</div>
              <div className="text-zinc-600">----------------------</div>
              <div><span className="text-zinc-500">OS:</span> Ubuntu 24.04 LTS x86_64</div>
              <div><span className="text-zinc-500">Host:</span> Portfolio Hypervisor v2.4</div>
              <div><span className="text-zinc-500">Kernel:</span> 6.8.0-generic</div>
              <div><span className="text-zinc-500">Uptime:</span> 3+ Years Prod</div>
              <div><span className="text-zinc-500">Shell:</span> zsh 5.9 (x86_64-ubuntu)</div>
              <div><span className="text-zinc-500">Terminal:</span> meet-rafida.sh</div>
              <div><span className="text-zinc-500">CPU:</span> Neural & Cloud Architect Core</div>
              <div><span className="text-zinc-500">Memory:</span> 4.8GiB / 32.0GiB</div>
            </div>
          </div>
        );
        break;

      case "theme":
      case trimmed.startsWith("theme ") ? trimmed : "": {
        const args = trimmed.split(" ").filter(Boolean);
        if (args.length < 2) {
          output = <div className="text-xs font-mono text-amber-400">Usage: theme [ubuntu | matrix | cyberpunk]</div>;
        } else {
          const t = args[1];
          if (["ubuntu", "matrix", "cyberpunk"].includes(t)) {
            if (onThemeChange) onThemeChange(t);
            output = <div className="text-xs font-mono text-emerald-400">Theme updated to: {t}</div>;
          } else {
            output = <div className="text-xs font-mono text-amber-400">Available themes: ubuntu, matrix, cyberpunk</div>;
          }
        }
        break;
      }

      case "matrix":
      case "cmatrix":
        output = <MatrixRain />;
        break;

      case "sudo rm -rf /":
      case "rm -rf /":
      case "sudo rm -rf /*":
        output = (
          <div className="text-xs font-mono text-red-400 space-y-1">
            <div className="font-bold">[SECURITY ALERT] Hypervisor integrity shield triggered!</div>
            <div>Nice try! You cannot delete Rafida's production system kernel. Incident reported to dev.rafidaaziz@gmail.com.</div>
          </div>
        );
        break;

      case "pwd":
        output = (
          <div className="text-xs font-mono text-zinc-300">
            {currentPath === "~" ? "/home/rafi" : `/home/rafi/${currentPath.replace("~/", "")}`}
          </div>
        );
        break;

      case "ls":
      case "dir":
      case trimmed.startsWith("ls ") ? trimmed : "": {
        if (currentPath === "~") {
          output = (
            <div className="text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-2 py-1 select-text">
              <span className="text-blue-400 font-bold flex items-center gap-1">📁 projects/</span>
              <span className="text-blue-400 font-bold flex items-center gap-1">📁 skills/</span>
              <span className="text-blue-400 font-bold flex items-center gap-1">📁 credentials/</span>
              <span className="text-blue-400 font-bold flex items-center gap-1">📁 experience/</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">⚡ contact.sh*</span>
              <span className="text-amber-300 flex items-center gap-1">📄 resume.pdf</span>
              <span className="text-zinc-300 flex items-center gap-1">📝 bio.txt</span>
            </div>
          );
        } else if (currentPath === "~/projects") {
          output = (
            <div className="text-xs font-mono flex flex-wrap gap-4 py-1 text-emerald-400">
              <span>fleet-management/</span>
              <span>chemical-blending/</span>
              <span>pre-trip-inspection/</span>
              <span>README.md</span>
            </div>
          );
        } else if (currentPath === "~/skills") {
          output = (
            <div className="text-xs font-mono flex flex-wrap gap-4 py-1 text-cyan-400">
              <span>backend-stack.json</span>
              <span>database-pipelines.yaml</span>
              <span>cloud-devops.env</span>
            </div>
          );
        } else {
          output = (
            <div className="text-xs font-mono text-zinc-400">
              <span>total 2</span>
              <div className="text-zinc-300">README.txt</div>
            </div>
          );
        }
        break;
      }

      case "cd":
      case trimmed.startsWith("cd ") ? trimmed : "": {
        const parts = trimmed.split(" ").filter(Boolean);
        const target = parts[1] || "~";

        if (target === ".." || target === "~" || target === "/") {
          setCurrentPath("~");
          output = null;
        } else if (target === "projects" || target === "projects/") {
          setCurrentPath("~/projects");
          if (onExploreProjects) onExploreProjects();
          output = <div className="text-xs font-mono text-emerald-400">Changed directory to ~/projects. Launching Nautilus...</div>;
        } else if (target === "skills" || target === "skills/" || target === "toolbox") {
          setCurrentPath("~/skills");
          if (onOpenToolbox) onOpenToolbox();
          output = <div className="text-xs font-mono text-emerald-400">Changed directory to ~/skills. Launching Toolbox...</div>;
        } else if (target === "credentials" || target === "credentials/") {
          setCurrentPath("~/credentials");
          output = <div className="text-xs font-mono text-emerald-400">Changed directory to ~/credentials.</div>;
        } else if (target === "experience" || target === "experience/") {
          setCurrentPath("~/experience");
          if (onOpenExperience) onOpenExperience();
          output = <div className="text-xs font-mono text-emerald-400">Changed directory to ~/experience. Launching System Logs...</div>;
        } else {
          output = <div className="text-xs font-mono text-red-400">cd: no such file or directory: {target}</div>;
        }
        break;
      }

      case trimmed.startsWith("cat ") ? trimmed : "": {
        const fileTarget = trimmed.replace("cat ", "").trim();
        if (fileTarget === "bio.txt") {
          output = (
            <div className="text-xs font-mono text-zinc-300 space-y-1.5 p-2 bg-black/40 rounded border border-white/5">
              <div className="text-emerald-400 font-bold">Rafida Aziz — Full-Stack Engineer & System Architect</div>
              <p>Based in Malang, Indonesia. 3+ years production experience building high-throughput logistics data pipelines, NestJS microservices, Kafka stream synchronizers, and modern React/Remix user interfaces.</p>
              <div className="text-zinc-500">Contact: dev.rafidaaziz@gmail.com | rafi@nexatriv.com</div>
            </div>
          );
        } else if (fileTarget === "resume.pdf" || fileTarget === "cv.pdf") {
          window.open("/cv/CV_Rafida%20Aziz.pdf", "_blank");
          output = <div className="text-xs font-mono text-emerald-400">Opening CV_Rafida Aziz.pdf in new tab...</div>;
        } else if (fileTarget === "contact.sh") {
          if (onOpenContact) onOpenContact();
          output = (
            <div className="text-xs font-mono text-emerald-400">
              <div>#!/bin/bash</div>
              <div># Executing Thunderbird SMTP dispatch daemon...</div>
            </div>
          );
        } else {
          output = <div className="text-xs font-mono text-red-400">cat: {fileTarget}: No such file or directory</div>;
        }
        break;
      }

      default:
        isAICommand = true;
        break;
    }

    if (!isAICommand) {
      setHistory((prev) => [...prev, { command: cmd, path: currentPath, output }]);
      setInputVal("");
      return;
    }

    // AI Command handling
    setIsProcessingAI(true);
    setInputVal("");
    
    // add loading placeholder
    setHistory((prev) => [...prev, { 
      command: cmd, 
      output: (
        <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
           <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
           Processing via Rafida-AI (Gemini)...
        </div>
      ) 
    }]);

    try {
      const res = await fetch("/api/terminal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });
      const data = await res.json();
      
      let aiOutputText = data.text;
      if (data.error) aiOutputText = "Error: " + data.error;

      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].output = (
           <div className="text-xs font-mono text-cyan-300 whitespace-pre-wrap leading-relaxed">
             <Typewriter text={aiOutputText} onCharacterTyped={() => { if(scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: scrollContainerRef.current.scrollHeight }); }} />
           </div>
        );
        return newHistory;
      });
    } catch (e) {
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].output = (
           <div className="text-xs font-mono text-red-400">
             [System Error]: Gemini AI connection failed.
           </div>
        );
        return newHistory;
      });
    } finally {
      setIsProcessingAI(false);
    }
  };

      const AVAILABLE_COMMANDS = [
    "help",
    "whoami",
    "pwd",
    "ls",
    "cd projects",
    "cd skills",
    "cd credentials",
    "cd experience",
    "cd ..",
    "cat bio.txt",
    "cat resume.pdf",
    "cat contact.sh",
    "projects",
    "skills",
    "experience",
    "resume",
    "neofetch",
    "theme ubuntu",
    "theme matrix",
    "theme cyberpunk",
    "matrix",
    "contact",
    "clear",
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistoryList.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, commandHistoryList.length - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistoryList[nextIndex]);
        playKeystroke();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistoryList[nextIndex]);
        playKeystroke();
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
        playKeystroke();
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (current) {
        const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(current));
        if (match) {
          setInputVal(match);
          playKeystroke();
        }
      }
    } else if (e.key.length === 1 || e.key === "Backspace") {
      playKeystroke();
    }
  };

  useEffect(() => {
    if (history.length > 0 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
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
        drag={!isMaximized}
        dragMomentum={false}
        dragListener={false}
        dragControls={dragControls}
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={
          isMaximized
            ? { opacity: 1, scale: 1, x: 0, y: 0 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={`w-full font-sans select-none flex flex-col ${
          isMaximized
            ? "w-full h-full rounded-none max-w-none max-h-none border-0 shadow-none"
            : "max-w-5xl mx-auto rounded-xl shadow-2xl shadow-black/85 ring-1 ring-white/10 max-h-[85vh] md:max-h-[700px] border border-white/10"
        } bg-[#18181A] text-zinc-200 overflow-hidden backdrop-blur-md ${className}`}
      >
        {/* 1. Terminal Window Header Bar */}
        <header onPointerDown={(e) => !isMaximized && dragControls.start(e)} className={`relative ${isMaximized ? "" : "cursor-grab active:cursor-grabbing"} flex items-center justify-between px-3 sm:px-4 py-2.5 bg-gradient-to-r from-[#2C001E] via-[#241f23] to-[#18181A] border-b border-black/50 select-none`}>
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
              <span className="font-semibold text-white/95">rafi@nexatriv:~ (zsh)</span>
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

        {/* Static Hero Section - always visible, never scrolled away */}
        <div className="flex-shrink-0 p-4 sm:p-6 pb-0 bg-[#121214]">
          {/* Terminal Command: whoami */}
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-300 mb-4 select-text">
            <span className="text-[#38B44A] font-semibold">rafi@nexatriv</span>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pb-4 select-text">
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
          </div>

          {/* Scrollable History + Input Section */}
          <div ref={scrollContainerRef} className="flex flex-col flex-1 min-h-0 px-4 sm:px-6 pb-4 overflow-y-auto custom-scrollbar bg-[#121214]">
            {/* Command Execution History Output */}
            {history.length > 0 && (
              <div className="mt-3 space-y-3 pt-3 border-t border-white/5">
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1.5 font-mono select-text">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="text-[#38B44A]">rafi@nexatriv</span>
                      <span className="text-zinc-500">:</span>
                      <span className="text-[#E95420]">{item.path || "~"}</span>
                      <span className="text-zinc-400">$</span>
                      <span className="text-white font-bold">{item.command}</span>
                    </div>
                    <div className="pl-4 py-1">{item.output}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Command Prompt Line */}
            <div className="mt-auto pt-3 border-t border-white/5 flex items-center gap-2 font-mono text-xs sm:text-sm">
              <span className="text-[#38B44A] shrink-0 font-semibold">rafi@nexatriv</span>
              <span className="text-zinc-500 shrink-0">:</span>
              <span className="text-[#E95420] shrink-0 font-semibold">{currentPath}</span>
              <span className="text-zinc-400 shrink-0">$</span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isProcessingAI}
                  placeholder={isProcessingAI ? "AI is processing..." : "type 'help' or ask Rafida-AI anything..."}
                  className="w-full bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-zinc-600 caret-[#E95420] disabled:opacity-50"
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
          </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TerminalWindow;
