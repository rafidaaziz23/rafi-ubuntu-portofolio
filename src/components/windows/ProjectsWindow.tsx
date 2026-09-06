"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  FolderOpen,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  X,
  Minus,
  Maximize2,
  Minimize2,
  ExternalLink,
  ChevronLeft,
  CheckCircle,
  Calendar,
  UserCheck,
  Briefcase,
  Layers,
  Sparkles,
  HardDrive,
  RotateCcw,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";

export interface ProjectsWindowProps {
  isOpen?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  className?: string;
  onOpenToolbox?: () => void;
}

export function ProjectsWindow({
  isOpen = true,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized: controlledMaximized,
  className = "",
  onOpenToolbox,
}: ProjectsWindowProps) {
  const [internalClosed, setInternalClosed] = useState(false);
  const [internalMaximized, setInternalMaximized] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState<number>(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

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

  // Filter projects
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchTech = project.techStack.some((t) => t.toLowerCase().includes(q));
      const matchFeatures = project.features.some((f) => f.toLowerCase().includes(q));

      return matchTitle || matchDesc || matchTech || matchFeatures;
    });
  }, [selectedCategory, searchQuery]);

  if (!isVisible) {
    return (
      <div className="flex items-center justify-center p-6">
        <button
          onClick={handleReopen}
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2C001E] border border-[#E95420]/40 text-zinc-200 hover:text-white hover:border-[#E95420] shadow-lg shadow-[#2C001E]/50 transition-all text-sm font-mono"
        >
          <RotateCcw className="w-4 h-4 text-[#E95420] group-hover:rotate-180 transition-transform duration-500" />
          <span>Launch Projects (Files / Nautilus)</span>
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
        className={`w-full font-sans select-none flex flex-col ${
          isMaximized
            ? "fixed inset-0 z-50 rounded-none max-w-none h-screen"
            : "max-w-6xl mx-auto rounded-xl shadow-2xl shadow-black/85 ring-1 ring-white/10 max-h-[85vh] md:max-h-[750px]"
        } bg-[#1E1E1E] text-zinc-200 overflow-hidden border border-white/10 backdrop-blur-md ${className}`}
      >
        {/* 1. Header Bar (Ubuntu Nautilus Style) */}
        <header className="relative flex items-center justify-between px-3 sm:px-4 py-2.5 bg-gradient-to-r from-[#2C001E] via-[#241f23] to-[#1E1E1E] border-b border-black/50 select-none">
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

          {/* Breadcrumb Path Bar */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/40 border border-white/5 font-mono text-xs text-zinc-300">
            <button
              onClick={() => setActiveProject(null)}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Folder className="w-3 h-3 text-[#E95420]" />
              <span>Projects</span>
            </button>
            {activeProject && (
              <>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
                <span className="text-[#E95420] truncate max-w-[200px]">
                  {activeProject.title}
                </span>
              </>
            )}
          </div>

          {/* Right Toolbar: View Toggle & Search */}
          <div className="flex items-center gap-2 z-10">
            <div className="flex items-center bg-black/40 p-0.5 rounded-lg border border-white/5">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#E95420] text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="List View"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-[#E95420] text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
          <div className="flex flex-1 min-h-0 bg-[#1E1E1E]">
            {/* Left Sidebar (Nautilus Sidebar) */}
            <aside className="hidden md:flex w-52 flex-col bg-[#18181A] border-r border-white/5 p-3 text-xs font-medium text-zinc-400">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2 px-2">
                Categories
              </div>
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setActiveProject(null);
                  }}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    selectedCategory === "all" && !activeProject
                      ? "bg-[#E95420]/20 text-[#E95420] font-semibold"
                      : "hover:bg-white/5 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-3.5 h-3.5 text-[#E95420]" />
                    <span>All Projects</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {PROJECTS_DATA.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory("logistics");
                    setActiveProject(null);
                  }}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    selectedCategory === "logistics" && !activeProject
                      ? "bg-[#E95420]/20 text-[#E95420] font-semibold"
                      : "hover:bg-white/5 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-3.5 h-3.5 text-amber-400" />
                    <span>Logistics & Fleet</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">1</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory("enterprise");
                    setActiveProject(null);
                  }}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    selectedCategory === "enterprise" && !activeProject
                      ? "bg-[#E95420]/20 text-[#E95420] font-semibold"
                      : "hover:bg-white/5 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-3.5 h-3.5 text-blue-400" />
                    <span>Mining & Materials</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">1</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory("operations");
                    setActiveProject(null);
                  }}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    selectedCategory === "operations" && !activeProject
                      ? "bg-[#E95420]/20 text-[#E95420] font-semibold"
                      : "hover:bg-white/5 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Operations Hub</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">1</span>
                </button>
              </div>

              {/* Quick Links Section */}
              <div className="mt-6 text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2 px-2">
                System Places
              </div>
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={onOpenToolbox}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-zinc-200 transition-colors text-left"
                >
                  <Layers className="w-3.5 h-3.5 text-[#E95420]" />
                  <span>~/Toolbox (Skills)</span>
                </button>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-zinc-500 text-left">
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Root Drive (SSD)</span>
                </div>
              </div>

              {/* Sidebar Footer Info */}
              <div className="mt-auto pt-3 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                <span>GNOME Files 46.0</span>
              </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#1E1E1E]">
              {/* Search Bar & Action Strip */}
              <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between gap-3 bg-[#222225]/40">
                {activeProject ? (
                  <button
                    onClick={() => setActiveProject(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-200 border border-white/10 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#E95420]" />
                    <span>Back to Projects</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <FolderOpen className="w-4 h-4 text-[#E95420]" />
                    <span>
                      {selectedCategory === "all"
                        ? "All Projects"
                        : selectedCategory.toUpperCase()}{" "}
                      ({filteredProjects.length} items)
                    </span>
                  </div>
                )}

                <div className="relative w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in projects..."
                    className="w-full pl-8 pr-7 py-1 rounded-md bg-[#141414] border border-white/10 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#E95420] font-mono"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* View: Project Details OR Project Explorer */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar">
                {activeProject ? (
                  /* ─── PROJECT DETAIL VIEW ─── */
                  <div className="flex flex-col gap-6">
                    {/* Header & Tagline */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[#E95420]/15 text-[#E95420] border border-[#E95420]/30">
                          {activeProject.categoryLabel}
                        </span>
                        {activeProject.year && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] bg-white/5 text-zinc-400 border border-white/10">
                            <Calendar className="w-2.5 h-2.5" />
                            <span>{activeProject.year}</span>
                          </span>
                        )}
                        {activeProject.clientOrContext && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <UserCheck className="w-2.5 h-2.5" />
                            <span>{activeProject.clientOrContext}</span>
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {activeProject.title}
                      </h2>
                      <p className="text-sm text-zinc-400 mt-1 font-sans">
                        {activeProject.tagline}
                      </p>
                    </div>

                    {/* Screenshot Viewer & Strip */}
                    <div className="flex flex-col gap-2 rounded-xl bg-[#141416] p-3 border border-white/10">
                      {/* Main Featured Screenshot */}
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black/40 group/shot">
                        <Image
                          src={activeProject.screenshots[activeScreenshotIdx]?.src || activeProject.thumbnail}
                          alt={activeProject.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover/shot:scale-[1.02]"
                        />
                        <button
                          onClick={() =>
                            setFullscreenImage(
                              activeProject.screenshots[activeScreenshotIdx]?.src || activeProject.thumbnail
                            )
                          }
                          title="View Full Size"
                          className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/70 text-white hover:bg-[#E95420] border border-white/20 transition-colors shadow-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Screenshot Caption */}
                      <div className="text-xs font-mono text-zinc-400 px-1">
                        <span className="text-[#E95420] font-semibold">
                          [Screenshot {activeScreenshotIdx + 1}/{activeProject.screenshots.length}]:{" "}
                        </span>
                        {activeProject.screenshots[activeScreenshotIdx]?.caption}
                      </div>

                      {/* Thumbnails Carousel Strip */}
                      {activeProject.screenshots.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pt-1">
                          {activeProject.screenshots.map((shot, idx) => (
                            <button
                              key={shot.src}
                              onClick={() => setActiveScreenshotIdx(idx)}
                              className={`relative w-24 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                                idx === activeScreenshotIdx
                                  ? "border-[#E95420] ring-2 ring-[#E95420]/40"
                                  : "border-white/10 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={shot.src}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Description & Engineering Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                      {/* Left 2 Cols: Description & Key Features */}
                      <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="rounded-xl bg-[#242426]/70 border border-white/10 p-4">
                          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-[#E95420]" />
                            <span>Architecture & Overview</span>
                          </h4>
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            {activeProject.description}
                          </p>
                        </div>

                        {/* Key Features */}
                        <div className="rounded-xl bg-[#242426]/70 border border-white/10 p-4">
                          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Key Implemented Capabilities</span>
                          </h4>
                          <ul className="space-y-2">
                            {activeProject.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E95420] mt-1.5 shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right 1 Col: Tech Stack & Meta */}
                      <div className="flex flex-col gap-4">
                        {/* Tech Stack */}
                        <div className="rounded-xl bg-[#242426]/70 border border-white/10 p-4">
                          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Stack Components</span>
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProject.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-md bg-[#161618] border border-white/10 text-xs font-mono text-zinc-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Engineering Role & Highlights */}
                        <div className="rounded-xl bg-[#242426]/70 border border-white/10 p-4">
                          <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Role & Impact</span>
                          </h4>
                          <div className="text-xs font-mono text-white mb-2">
                            {activeProject.role}
                          </div>
                          {activeProject.highlights && (
                            <ul className="space-y-1.5 text-xs text-zinc-400">
                              {activeProject.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-[#E95420]">›</span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : filteredProjects.length === 0 ? (
                  /* ─── EMPTY STATE ─── */
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Folder className="w-12 h-12 text-zinc-600 mb-3" />
                    <h4 className="text-sm font-medium text-zinc-200 font-mono">
                      No matching projects found
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                      Try searching with different keywords or switch categories.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="mt-4 px-3.5 py-1.5 rounded-md bg-[#E95420]/20 border border-[#E95420]/40 text-[#E95420] hover:bg-[#E95420] hover:text-white transition-colors text-xs font-mono"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : viewMode === "grid" ? (
                  /* ─── GRID VIEW ─── */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        whileHover={{ y: -3 }}
                        onClick={() => {
                          setActiveProject(project);
                          setActiveScreenshotIdx(0);
                        }}
                        className="group cursor-pointer rounded-xl bg-[#242427]/80 hover:bg-[#2A2A2E] border border-white/10 hover:border-[#E95420]/60 hover:shadow-[0_0_20px_rgba(233,84,32,0.18)] transition-all duration-200 overflow-hidden flex flex-col"
                      >
                        {/* Thumbnail image */}
                        <div className="relative aspect-[16/10] w-full bg-black/50 overflow-hidden border-b border-white/10">
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[#E95420] text-white font-semibold shadow-md">
                              {project.categoryLabel}
                            </span>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-[#E95420] transition-colors text-base tracking-tight">
                              {project.title}
                            </h3>
                            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                              {project.tagline}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-2">
                            <div className="flex flex-wrap gap-1">
                              {project.techStack.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#161618] border border-white/10 text-zinc-300"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.techStack.length > 4 && (
                                <span className="px-1 py-0.5 rounded text-[10px] font-mono text-zinc-500">
                                  +{project.techStack.length - 4}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                              <span>{project.year}</span>
                              <span className="text-[#E95420] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold">
                                Inspect <ChevronRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* ─── LIST VIEW ─── */
                  <div className="rounded-xl border border-white/10 overflow-hidden bg-[#242426]/50">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#18181A] border-b border-white/10 text-zinc-400 uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-4">Project Name</th>
                          <th className="py-2.5 px-4 hidden sm:table-cell">Category</th>
                          <th className="py-2.5 px-4 hidden md:table-cell">Tech Stack</th>
                          <th className="py-2.5 px-4 hidden lg:table-cell">Year</th>
                          <th className="py-2.5 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredProjects.map((project) => (
                          <tr
                            key={project.id}
                            onClick={() => {
                              setActiveProject(project);
                              setActiveScreenshotIdx(0);
                            }}
                            className="hover:bg-white/5 cursor-pointer transition-colors group"
                          >
                            <td className="py-3 px-4 font-semibold text-white group-hover:text-[#E95420] flex items-center gap-2.5">
                              <Folder className="w-4 h-4 text-[#E95420] shrink-0" />
                              <span>{project.title}</span>
                            </td>
                            <td className="py-3 px-4 text-zinc-300 hidden sm:table-cell">
                              {project.categoryLabel}
                            </td>
                            <td className="py-3 px-4 text-zinc-400 hidden md:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {project.techStack.slice(0, 3).map((t) => (
                                  <span
                                    key={t}
                                    className="px-1.5 py-0.2 rounded text-[10px] bg-white/5 border border-white/10 text-zinc-300"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-zinc-400 hidden lg:table-cell">
                              {project.year}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className="text-[#E95420] font-semibold flex items-center justify-end gap-1">
                                Open <ChevronRight className="w-3 h-3" />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 4. Nautilus Bottom Status Bar */}
              <footer className="px-4 py-1.5 bg-[#171717] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 select-none">
                <div className="flex items-center gap-2">
                  <span>
                    {activeProject ? `1 project selected` : `${filteredProjects.length} items`}
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-zinc-500">42.8 GB free on Ubuntu root</span>
                </div>
                <div className="text-[#E95420] font-medium">
                  {activeProject ? activeProject.title : "Nautilus File Manager"}
                </div>
              </footer>
            </main>
          </div>

        {/* Fullscreen Image Modal */}
        {fullscreenImage && (
          <div
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
              <Image
                src={fullscreenImage}
                alt="Full preview"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-[#E95420] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default ProjectsWindow;
