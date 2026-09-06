"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  Server,
  Database,
  Layers,
  Code2,
  Cpu,
  Search,
  Activity,
  Terminal,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  SlidersHorizontal,
  FolderGit2
} from "lucide-react";
import { SKILLS_DATA, SkillItem } from "@/data/skills";

export type SkillCategoryFilter =
  | "all"
  | "backend"
  | "data"
  | "frontend"
  | "languages"
  | "devops_ai";

interface FilterTab {
  id: SkillCategoryFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FILTER_TABS: FilterTab[] = [
  { id: "all", label: "All Systems", icon: Activity },
  { id: "backend", label: "Backend & Services", icon: Server },
  { id: "data", label: "Data & Streams", icon: Database },
  { id: "frontend", label: "Frontend & Mobile", icon: Layers },
  { id: "languages", label: "Languages", icon: Code2 },
  { id: "devops_ai", label: "DevOps & AI", icon: Cpu },
];

export interface ToolboxWindowProps {
  isOpen?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  className?: string;
}

export function ToolboxWindow({
  isOpen = true,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized: controlledMaximized,
  className = "",
}: ToolboxWindowProps) {
  const [internalClosed, setInternalClosed] = useState(false);
  const [internalMaximized, setInternalMaximized] = useState(false);
  const dragControls = useDragControls();
  const [activeCategory, setActiveCategory] = useState<SkillCategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter skills based on category and search query
  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory =
        activeCategory === "all" || skill.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const matchName = skill.name.toLowerCase().includes(query);
      const matchTag = skill.tag?.toLowerCase().includes(query) ?? false;
      const matchExp = skill.experience?.toLowerCase().includes(query) ?? false;
      const matchProjects =
        skill.appliedIn?.some((p) => p.toLowerCase().includes(query)) ?? false;

      return matchName || matchTag || matchExp || matchProjects;
    });
  }, [activeCategory, searchQuery]);

  // Count helper for tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<SkillCategoryFilter, number> = {
      all: SKILLS_DATA.length,
      backend: 0,
      data: 0,
      frontend: 0,
      languages: 0,
      devops_ai: 0,
    };
    SKILLS_DATA.forEach((s) => {
      if (counts[s.category] !== undefined) {
        counts[s.category]++;
      }
    });
    return counts;
  }, []);

  const getCategoryMeta = (category: SkillItem["category"]) => {
    switch (category) {
      case "backend":
        return { label: "Backend", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10" };
      case "data":
        return { label: "Data & Streams", color: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/10" };
      case "frontend":
        return { label: "Frontend", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10" };
      case "languages":
        return { label: "Language", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10" };
      case "devops_ai":
        return { label: "DevOps / AI", color: "text-[#E95420]", border: "border-[#E95420]/20", bg: "bg-[#E95420]/10" };
      default:
        return { label: "System", color: "text-zinc-400", border: "border-zinc-500/20", bg: "bg-zinc-500/10" };
    }
  };

  if (!isVisible) {
    return (
      <div className="flex items-center justify-center p-6">
        <button
          onClick={handleReopen}
          className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#2C001E] border border-[#E95420]/40 text-zinc-200 hover:text-white hover:border-[#E95420] shadow-lg shadow-[#2C001E]/50 transition-all text-sm font-mono"
        >
          <RotateCcw className="w-4 h-4 text-[#E95420] group-hover:rotate-180 transition-transform duration-500" />
          <span>Launch Toolbox (system-monitor)</span>
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        drag={!isMaximized}
        dragMomentum={false}
        dragListener={false}
        dragControls={dragControls}
        layout
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={`w-full font-sans select-none flex flex-col ${
          isMaximized
            ? "fixed inset-0 z-50 rounded-none max-w-none h-screen"
            : "max-w-6xl mx-auto rounded-xl shadow-2xl shadow-black/85 ring-1 ring-white/10 max-h-[85vh] md:max-h-[750px]"
        } bg-[#1E1E1E] text-zinc-200 overflow-hidden border border-white/10 backdrop-blur-md ${className}`}
      >
        {/* 1. Ubuntu Window Header Bar */}
        <header onPointerDown={(e) => dragControls.start(e)} className="relative cursor-grab active:cursor-grabbing flex items-center justify-between px-3 sm:px-4 py-2.5 bg-gradient-to-r from-[#2C001E] via-[#241f23] to-[#1E1E1E] border-b border-black/50 select-none">
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

          {/* Window Title: system-monitor — ~/Toolbox/System-Specs & Capabilities */}
          <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none px-12">
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-zinc-300 truncate">
              <Activity className="w-3.5 h-3.5 text-[#E95420] shrink-0 animate-pulse" />
              <span className="font-semibold text-white/95">system-monitor</span>
              <span className="text-zinc-500">—</span>
              <span className="text-zinc-300 truncate">~/Toolbox/System-Specs &amp; Capabilities</span>
            </div>
          </div>

          {/* Right Header Status Pill */}
          <div className="flex items-center gap-2 z-10">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-white/5 font-mono text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">{filteredSkills.length}/{SKILLS_DATA.length} specs</span>
            </div>
          </div>
        </header>

        {/* Content body (collapse when minimized) */}
        <div className="flex flex-col flex-1 min-h-0 bg-[#1E1E1E]">
            {/* 2. Tab Filter & Search Bar */}
            <div className="px-3 sm:px-6 pt-3 sm:pt-4 pb-2 border-b border-white/5 bg-[#232325]/50 flex flex-col gap-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Filter Tabs */}
                <div
                  role="tablist"
                  aria-label="Filter capabilities by system category"
                  className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none"
                >
                  {FILTER_TABS.map((tab) => {
                    const isActive = activeCategory === tab.id;
                    const Icon = tab.icon;
                    const count = categoryCounts[tab.id];

                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveCategory(tab.id)}
                        className={`relative group shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border ${
                          isActive
                            ? "text-white border-[#E95420] bg-[#E95420]/15 shadow-[0_0_12px_rgba(233,84,32,0.25)]"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border-transparent"
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 transition-colors ${
                            isActive ? "text-[#E95420]" : "text-zinc-500 group-hover:text-zinc-300"
                          }`}
                        />
                        <span>{tab.label}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded font-mono text-[10px] transition-colors ${
                            isActive
                              ? "bg-[#E95420] text-white font-semibold"
                              : "bg-white/10 text-zinc-400 group-hover:text-zinc-200"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Search / Filter Input */}
                <div className="relative w-full lg:w-64 shrink-0">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search capabilities..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-[#141414] border border-white/10 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#E95420] focus:ring-1 focus:ring-[#E95420] transition-all font-mono"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5"
                      title="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filter Sub-Indicator */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3 h-3 text-[#E95420]" />
                  <span>
                    FILTER:{" "}
                    <span className="text-[#E95420] font-semibold uppercase">
                      {FILTER_TABS.find((t) => t.id === activeCategory)?.label}
                    </span>
                  </span>
                  {searchQuery && (
                    <span className="text-zinc-300">
                      matching <span className="text-amber-400">"{searchQuery}"</span>
                    </span>
                  )}
                </div>
                <div className="text-zinc-500">
                  Showing <span className="text-zinc-200 font-semibold">{filteredSkills.length}</span> items
                </div>
              </div>
            </div>

            {/* 3. Grid Container (High-Density Cards) */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar bg-gradient-to-b from-[#1E1E1E] via-[#1A1A1A] to-[#161616]">
              {filteredSkills.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                    <Terminal className="w-6 h-6 text-zinc-500" />
                  </div>
                  <h4 className="text-sm font-medium text-zinc-200 font-mono">
                    No matching capabilities found
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                    No tools match "{searchQuery}" under the selected category.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="mt-4 px-3.5 py-1.5 rounded-md bg-[#E95420]/20 border border-[#E95420]/40 text-[#E95420] hover:bg-[#E95420] hover:text-white transition-colors text-xs font-mono"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredSkills.map((skill) => {
                      const meta = getCategoryMeta(skill.category);
                      const hasProjects =
                        Boolean(skill.appliedIn && skill.appliedIn.length > 0);

                      return (
                        <motion.div
                          key={skill.name}
                          layout
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.92, y: -8 }}
                          transition={{ duration: 0.18 }}
                          whileHover={{ y: -2 }}
                          className="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-[#252528]/80 hover:bg-[#2A2A2E] border border-white/10 hover:border-[#E95420]/60 hover:shadow-[0_0_20px_rgba(233,84,32,0.18)] transition-all duration-200 backdrop-blur-sm"
                        >
                          {/* Card Top Row: Skill Name & Badges */}
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-white group-hover:text-[#E95420] transition-colors text-sm sm:text-[15px] tracking-tight flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E95420]/70 group-hover:bg-[#E95420] group-hover:scale-125 transition-all" />
                                <span>{skill.name}</span>
                              </h3>

                              {/* Experience badge if available */}
                              {skill.experience && (
                                <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                                  <span>{skill.experience}</span>
                                </span>
                              )}
                            </div>

                            {/* Category & Custom Tag */}
                            <div className="flex flex-wrap items-center gap-1.5 mt-2">
                              {/* Category tag */}
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] ${meta.bg} ${meta.border} ${meta.color} border`}
                              >
                                {meta.label}
                              </span>

                              {/* Specific Skill Tag (e.g. Core Backend, Daily Driver) */}
                              {skill.tag && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] bg-white/[0.04] text-zinc-300 border border-white/10 group-hover:border-[#E95420]/40 transition-colors">
                                  <span className="w-1 h-1 rounded-full bg-zinc-400 group-hover:bg-[#E95420]" />
                                  <span>{skill.tag}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card Bottom: Applied In Projects */}
                          <div className="mt-3.5 pt-2.5 border-t border-white/[0.06]">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                              <FolderGit2 className="w-3 h-3 text-zinc-500 group-hover:text-[#E95420] transition-colors" />
                              <span>Applied in:</span>
                            </div>

                            {hasProjects ? (
                              <div className="flex flex-wrap gap-1.5">
                                {skill.appliedIn?.map((project) => (
                                  <span
                                    key={project}
                                    className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-[#18181A] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-[#E95420]/50 hover:bg-[#E95420]/10 transition-colors group-hover:border-white/15"
                                  >
                                    {project}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="inline-flex items-center text-[10px] italic font-mono text-zinc-500">
                                System / Stack Core Tooling
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* 4. Ubuntu System Monitor Footer Status Bar */}
            <footer className="px-3 sm:px-4 py-1.5 bg-[#171717] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>UBUNTU 24.04 LTS (x86_64)</span>
                </div>
                <span className="text-zinc-600 hidden sm:inline">|</span>
                <span className="text-zinc-400 hidden sm:inline">
                  KERNEL: <span className="text-zinc-300">6.8.0-generic</span>
                </span>
                <span className="text-zinc-600 hidden md:inline">|</span>
                <span className="text-zinc-400 hidden md:inline">
                  LOAD: <span className="text-emerald-400">0.08, 0.12, 0.09</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-zinc-500">
                  CATEGORY: <span className="text-zinc-200">{activeCategory}</span>
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-[#E95420] font-semibold">
                  {filteredSkills.length} ACTIVE MODULES
                </span>
              </div>
            </footer>
          </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ToolboxWindow;
