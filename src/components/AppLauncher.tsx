"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Terminal as TerminalIcon,
  Folder,
  Cpu,
  Award,
  Activity,
  Mail,
  X,
  Sparkles
} from "lucide-react";

interface AppItem {
  id: string;
  name: string;
  desc: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  action: () => void;
}

interface AppLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenProjects: () => void;
  onOpenToolbox: () => void;
  onOpenCredentials: () => void;
  onOpenExperience: () => void;
  onOpenContact: () => void;
}

export function AppLauncher({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenProjects,
  onOpenToolbox,
  onOpenCredentials,
  onOpenExperience,
  onOpenContact,
}: AppLauncherProps) {
  const [search, setSearch] = useState("");

  const apps: AppItem[] = [
    {
      id: "terminal",
      name: "Terminal",
      desc: "meet-rafida.sh & AI Assistant",
      category: "System Utilities",
      icon: TerminalIcon,
      color: "text-[#E95420]",
      bg: "bg-[#E95420]/10 border-[#E95420]/30 hover:border-[#E95420]",
      action: () => {
        onOpenTerminal();
        onClose();
      },
    },
    {
      id: "projects",
      name: "Projects (Files)",
      desc: "Nautilus Project Explorer",
      category: "Development",
      icon: Folder,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30 hover:border-amber-500",
      action: () => {
        onOpenProjects();
        onClose();
      },
    },
    {
      id: "toolbox",
      name: "System-Toolbox",
      desc: "Technical Skills & Architecture",
      category: "System Utilities",
      icon: Cpu,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500",
      action: () => {
        onOpenToolbox();
        onClose();
      },
    },
    {
      id: "credentials",
      name: "Credentials",
      desc: "Software Center & Certifications",
      category: "Credentials",
      icon: Award,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500",
      action: () => {
        onOpenCredentials();
        onClose();
      },
    },
    {
      id: "experience",
      name: "System Logs (Career)",
      desc: "Work & Education Timeline",
      category: "Career History",
      icon: Activity,
      color: "text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/30 hover:border-pink-500",
      action: () => {
        onOpenExperience();
        onClose();
      },
    },
    {
      id: "contact",
      name: "Say-Hello",
      desc: "Thunderbird SMTP Mailer",
      category: "Communications",
      icon: Mail,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/30 hover:border-purple-500",
      action: () => {
        onOpenContact();
        onClose();
      },
    },
  ];

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.desc.toLowerCase().includes(search.toLowerCase()) ||
      app.category.toLowerCase().includes(search.toLowerCase())
  );

  // Close with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 select-none"
      >
        {/* Search Header Container */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl flex flex-col items-center gap-4 mb-8 sm:mb-12"
        >
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search applications..."
              className="w-full bg-[#242427]/90 border border-white/15 focus:border-[#E95420] focus:ring-2 focus:ring-[#E95420]/30 rounded-full py-3.5 pl-12 pr-12 text-sm sm:text-base text-white placeholder-zinc-500 outline-none shadow-2xl transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10 text-[10px]">
              Esc
            </kbd>
            <span>or click anywhere to close</span>
          </div>
        </div>

        {/* Application Grid */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6 overflow-y-auto max-h-[60vh] p-2"
        >
          {filteredApps.map((app) => {
            const Icon = app.icon;
            return (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={app.action}
                className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl border backdrop-blur-md transition-all text-center group ${app.bg}`}
              >
                <div className="p-3.5 rounded-2xl bg-black/40 mb-3 group-hover:scale-110 transition-transform shadow-inner">
                  <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${app.color}`} />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-white">
                  {app.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 font-sans line-clamp-1">
                  {app.desc}
                </p>
                <span className="mt-2 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                  {app.category}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
