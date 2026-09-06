"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TerminalWindow } from "@/components/windows/TerminalWindow";
import { ProjectsWindow } from "@/components/windows/ProjectsWindow";
import { ToolboxWindow } from "@/components/windows/ToolboxWindow";
import { CredentialsWindow } from "@/components/windows/CredentialsWindow";
import { ContactWindow } from "@/components/windows/ContactWindow";
import {
  Terminal as TerminalIcon,
  Folder,
  Cpu,
  Award,
  Mail,
  Grid,
  Wifi,
  Volume2,
  Power,
  Activity,
  User,
  Sparkles,
  Layers,
} from "lucide-react";

type ActiveWindow = "terminal" | "projects" | "toolbox" | "credentials" | "contact" | null;

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);
  const [isCredentialsOpen, setIsCredentialsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [focusedWindow, setFocusedWindow] = useState<ActiveWindow>("terminal");

  // Format current date like Ubuntu GNOME top bar
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleOpenTerminal = () => {
    setIsTerminalOpen(true);
    setFocusedWindow("terminal");
  };

  const handleOpenProjects = () => {
    setIsProjectsOpen(true);
    setFocusedWindow("projects");
  };

  const handleOpenToolbox = () => {
    setIsToolboxOpen(true);
    setFocusedWindow("toolbox");
  };

  const handleOpenCredentials = () => {
    setIsCredentialsOpen(true);
    setFocusedWindow("credentials");
  };

  const handleOpenContact = () => {
    setIsContactOpen(true);
    setFocusedWindow("contact");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col bg-[#110e11] text-zinc-100 font-sans select-none">
      {/* 1. Ubuntu GNOME Desktop Wallpaper */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#2C001E] via-[#1c0a18] to-[#0c090c]">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#E95420]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#77216F]/15 rounded-full blur-3xl" />
      </div>

      {/* 2. Ubuntu Top Bar */}
      <header className="relative z-40 h-7 w-full bg-[#110e11]/90 backdrop-blur-md border-b border-black/40 flex items-center justify-between px-3 text-xs font-medium text-zinc-300">
        {/* Left: Activities & Guest Status */}
        <div className="flex items-center gap-3">
          <button className="px-2.5 py-0.5 rounded-full hover:bg-white/10 text-white font-semibold transition-colors">
            Activities
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-zinc-300 font-mono text-[11px]">
            <span className="text-[#38B44A]">●</span>
            <span className="text-zinc-400">Welcome, guest! Logged in as</span>
            <span className="text-white font-semibold">Friend</span>
          </div>
        </div>

        {/* Center: Clock */}
        <div className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] text-zinc-200">
          {dateFormatted}
        </div>

        {/* Right: Quick Settings & User Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-2 py-0.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
            <Wifi className="w-3.5 h-3.5 text-zinc-300" />
            <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
            <div className="relative w-4 h-4 rounded-full overflow-hidden border border-white/20">
              <Image src="/profile/me.png" alt="Rafida" fill className="object-cover" />
            </div>
            <Power className="w-3.5 h-3.5 text-[#E95420]" />
          </div>
        </div>
      </header>

      {/* 3. Sub-header Navigation Strip & System Metrics */}
      <div className="relative z-30 px-3 sm:px-6 py-2 bg-[#171417]/80 backdrop-blur-md border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
        {/* Quick Navigation Pills */}
        <nav
          aria-label="Ubuntu desktop applications"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
        >
          {/* meet-rafida.sh */}
          <button
            onClick={handleOpenTerminal}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all text-xs font-mono border ${
              isTerminalOpen && focusedWindow === "terminal"
                ? "bg-[#E95420]/20 text-white border-[#E95420] shadow-[0_0_10px_rgba(233,84,32,0.25)] font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-white/5"
            }`}
          >
            <TerminalIcon className="w-3 h-3 text-[#E95420]" />
            <span>meet-rafida.sh</span>
          </button>

          {/* My-Works */}
          <button
            onClick={handleOpenProjects}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all text-xs font-mono border ${
              isProjectsOpen && focusedWindow === "projects"
                ? "bg-[#E95420]/20 text-white border-[#E95420] shadow-[0_0_10px_rgba(233,84,32,0.25)] font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-white/5"
            }`}
          >
            <Folder className="w-3 h-3 text-amber-400" />
            <span>My-Works</span>
          </button>

          {/* System-Toolbox */}
          <button
            onClick={handleOpenToolbox}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all text-xs font-mono border ${
              isToolboxOpen && focusedWindow === "toolbox"
                ? "bg-[#E95420]/20 text-white border-[#E95420] shadow-[0_0_10px_rgba(233,84,32,0.25)] font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-white/5"
            }`}
          >
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>System-Toolbox</span>
          </button>

          {/* Credentials */}
          <button
            onClick={handleOpenCredentials}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all text-xs font-mono border ${
              isCredentialsOpen && focusedWindow === "credentials"
                ? "bg-[#E95420]/20 text-white border-[#E95420] shadow-[0_0_10px_rgba(233,84,32,0.25)] font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-white/5"
            }`}
          >
            <Award className="w-3 h-3 text-emerald-400" />
            <span>Credentials</span>
          </button>

          {/* Say-Hello */}
          <button
            onClick={handleOpenContact}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all text-xs font-mono border ${
              isContactOpen && focusedWindow === "contact"
                ? "bg-[#E95420]/20 text-white border-[#E95420] shadow-[0_0_10px_rgba(233,84,32,0.25)] font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-white/5"
            }`}
          >
            <Mail className="w-3 h-3 text-purple-400" />
            <span>Say-Hello</span>
          </button>
        </nav>

        {/* System Specs Status Strip */}
        <div className="flex items-center gap-2 text-[11px] text-zinc-400 shrink-0 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300">KERNEL 6.8.0-GENERIC</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">MEMORY: 4.8GB / 32GB</span>
          <span className="text-zinc-600 hidden md:inline">|</span>
          <span className="text-emerald-400 hidden md:inline">LOAD: 0.18</span>
        </div>
      </div>

      {/* 4. Main Desktop Workspace with Left Ubuntu Dock */}
      <div className="relative z-20 flex-1 flex overflow-hidden">
        {/* Left Dock (Ubuntu Dash to Dock) */}
        <aside className="hidden md:flex w-14 bg-[#110e11]/80 backdrop-blur-lg border-r border-white/5 flex-col items-center py-3 gap-3">
          {/* Terminal / meet-rafida.sh launcher */}
          <button
            onClick={handleOpenTerminal}
            title="Terminal: meet-rafida.sh"
            className={`relative p-2.5 rounded-xl transition-all ${
              isTerminalOpen && focusedWindow === "terminal"
                ? "bg-[#E95420]/20 text-[#E95420] shadow-[0_0_15px_rgba(233,84,32,0.3)] ring-1 ring-[#E95420]"
                : isTerminalOpen
                ? "bg-white/5 text-zinc-300"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <TerminalIcon className="w-5 h-5" />
            {isTerminalOpen && (
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r-full bg-[#E95420]" />
            )}
          </button>

          {/* Files / Projects launcher */}
          <button
            onClick={handleOpenProjects}
            title="Projects (Files / Nautilus)"
            className={`relative p-2.5 rounded-xl transition-all ${
              isProjectsOpen && focusedWindow === "projects"
                ? "bg-[#E95420]/20 text-[#E95420] shadow-[0_0_15px_rgba(233,84,32,0.3)] ring-1 ring-[#E95420]"
                : isProjectsOpen
                ? "bg-white/5 text-zinc-300"
                : "text-amber-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Folder className="w-5 h-5 text-amber-400" />
            {isProjectsOpen && (
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r-full bg-[#E95420]" />
            )}
          </button>

          {/* System Monitor / Toolbox launcher */}
          <button
            onClick={handleOpenToolbox}
            title="Toolbox: System Specs & Capabilities"
            className={`relative p-2.5 rounded-xl transition-all ${
              isToolboxOpen && focusedWindow === "toolbox"
                ? "bg-[#E95420]/20 text-[#E95420] shadow-[0_0_15px_rgba(233,84,32,0.3)] ring-1 ring-[#E95420]"
                : isToolboxOpen
                ? "bg-white/5 text-zinc-300"
                : "text-cyan-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Cpu className="w-5 h-5 text-cyan-400" />
            {isToolboxOpen && (
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r-full bg-[#E95420]" />
            )}
          </button>

          {/* Credentials launcher */}
          <button
            onClick={handleOpenCredentials}
            title="Credentials (Software Center)"
            className={`relative p-2.5 rounded-xl transition-all ${
              isCredentialsOpen && focusedWindow === "credentials"
                ? "bg-[#E95420]/20 text-[#E95420] shadow-[0_0_15px_rgba(233,84,32,0.3)] ring-1 ring-[#E95420]"
                : isCredentialsOpen
                ? "bg-white/5 text-zinc-300"
                : "text-emerald-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Award className="w-5 h-5 text-emerald-400" />
            {isCredentialsOpen && (
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r-full bg-[#E95420]" />
            )}
          </button>

          {/* Mail launcher */}
          <button
            onClick={handleOpenContact}
            title="Contact (Thunderbird Mailer)"
            className={`relative p-2.5 rounded-xl transition-all ${
              isContactOpen && focusedWindow === "contact"
                ? "bg-[#E95420]/20 text-[#E95420] shadow-[0_0_15px_rgba(233,84,32,0.3)] ring-1 ring-[#E95420]"
                : isContactOpen
                ? "bg-white/5 text-zinc-300"
                : "text-purple-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Mail className="w-5 h-5 text-purple-400" />
            {isContactOpen && (
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r-full bg-[#E95420]" />
            )}
          </button>

          {/* App grid */}
          <button
            title="Show Applications"
            className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors mt-auto"
          >
            <Grid className="w-5 h-5" />
          </button>
        </aside>

        {/* Desktop Area: Window Manager Container */}
        <main className="relative flex-1 p-2 pt-8 sm:p-4 sm:pt-10 md:p-6 md:pt-12 overflow-y-auto flex items-start justify-center">
          {/* Terminal Window (meet-rafida.sh) */}
          {isTerminalOpen && (
            <div
              onClick={() => setFocusedWindow("terminal")}
              className={`w-full max-w-5xl transition-all duration-150 ${
                focusedWindow === "terminal"
                  ? "relative z-30 scale-100"
                  : "absolute z-10 scale-[0.98] opacity-75 pointer-events-auto"
              }`}
            >
              <TerminalWindow
                isOpen={isTerminalOpen}
                onClose={() => {
                  setIsTerminalOpen(false);
                  if (focusedWindow === "terminal") {
                    setFocusedWindow(isProjectsOpen ? "projects" : isToolboxOpen ? "toolbox" : null);
                  }
                }}
                onExploreProjects={handleOpenProjects}
                onOpenToolbox={handleOpenToolbox}
              />
            </div>
          )}

          {/* Projects Window (Nautilus) */}
          {isProjectsOpen && (
            <div
              onClick={() => setFocusedWindow("projects")}
              className={`w-full max-w-5xl transition-all duration-150 ${
                focusedWindow === "projects"
                  ? "relative z-30 scale-100"
                  : "absolute z-10 scale-[0.98] opacity-75 pointer-events-auto"
              }`}
            >
              <ProjectsWindow
                isOpen={isProjectsOpen}
                onClose={() => {
                  setIsProjectsOpen(false);
                  if (focusedWindow === "projects") {
                    setFocusedWindow(isTerminalOpen ? "terminal" : isToolboxOpen ? "toolbox" : null);
                  }
                }}
                onOpenToolbox={handleOpenToolbox}
              />
            </div>
          )}

          {/* Toolbox Window (System Monitor) */}
          {isToolboxOpen && (
            <div
              onClick={() => setFocusedWindow("toolbox")}
              className={`w-full max-w-5xl transition-all duration-150 ${
                focusedWindow === "toolbox"
                  ? "relative z-30 scale-100"
                  : "absolute z-10 scale-[0.98] opacity-75 pointer-events-auto"
              }`}
            >
              <ToolboxWindow
                isOpen={isToolboxOpen}
                onClose={() => {
                  setIsToolboxOpen(false);
                  if (focusedWindow === "toolbox") {
                    setFocusedWindow(isTerminalOpen ? "terminal" : isProjectsOpen ? "projects" : null);
                  }
                }}
              />
            </div>
          )}

          {/* Credentials Window (Software Center) */}
          {isCredentialsOpen && (
            <div
              onClick={() => setFocusedWindow("credentials")}
              className={`w-full max-w-5xl transition-all duration-150 ${
                focusedWindow === "credentials"
                  ? "relative z-30 scale-100"
                  : "absolute z-10 scale-[0.98] opacity-75 pointer-events-auto"
              }`}
            >
              <CredentialsWindow
                isOpen={isCredentialsOpen}
                onClose={() => {
                  setIsCredentialsOpen(false);
                  if (focusedWindow === "credentials") {
                    setFocusedWindow(isTerminalOpen ? "terminal" : isProjectsOpen ? "projects" : isToolboxOpen ? "toolbox" : null);
                  }
                }}
              />
            </div>
          )}

          {/* Contact Window (Thunderbird Mailer) */}
          {isContactOpen && (
            <div
              onClick={() => setFocusedWindow("contact")}
              className={`w-full max-w-5xl transition-all duration-150 ${
                focusedWindow === "contact"
                  ? "relative z-30 scale-100"
                  : "absolute z-10 scale-[0.98] opacity-75 pointer-events-auto"
              }`}
            >
              <ContactWindow
                isOpen={isContactOpen}
                onClose={() => {
                  setIsContactOpen(false);
                  if (focusedWindow === "contact") {
                    setFocusedWindow(isTerminalOpen ? "terminal" : isProjectsOpen ? "projects" : isToolboxOpen ? "toolbox" : isCredentialsOpen ? "credentials" : null);
                  }
                }}
              />
            </div>
          )}

          {/* Empty Desktop State if all windows closed */}
          {!isTerminalOpen && !isProjectsOpen && !isToolboxOpen && !isCredentialsOpen && !isContactOpen && (
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#2C001E]/60 border border-[#E95420]/30 flex items-center justify-center shadow-xl">
                <Grid className="w-8 h-8 text-[#E95420]" />
              </div>
              <h3 className="text-base font-semibold text-white">Ubuntu Desktop</h3>
              <p className="text-xs text-zinc-400 font-mono max-w-xs">
                All applications are minimized or closed. Click an icon on the dock or select below:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <button
                  onClick={handleOpenTerminal}
                  className="px-4 py-2 rounded-lg bg-[#E95420] text-white text-xs font-mono font-medium hover:bg-[#E95420]/90 transition-colors flex items-center gap-2 shadow-lg shadow-[#E95420]/20"
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>Launch meet-rafida.sh</span>
                </button>
                <button
                  onClick={handleOpenProjects}
                  className="px-4 py-2 rounded-lg bg-white/10 text-zinc-200 hover:text-white hover:bg-white/15 text-xs font-mono font-medium transition-colors flex items-center gap-2"
                >
                  <Folder className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open Projects</span>
                </button>
                <button
                  onClick={handleOpenToolbox}
                  className="px-4 py-2 rounded-lg bg-white/10 text-zinc-200 hover:text-white hover:bg-white/15 text-xs font-mono font-medium transition-colors flex items-center gap-2"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open Toolbox</span>
                </button>
                <button
                  onClick={handleOpenCredentials}
                  className="px-4 py-2 rounded-lg bg-white/10 text-zinc-200 hover:text-white hover:bg-white/15 text-xs font-mono font-medium transition-colors flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open Credentials</span>
                </button>
                <button
                  onClick={handleOpenContact}
                  className="px-4 py-2 rounded-lg bg-white/10 text-zinc-200 hover:text-white hover:bg-white/15 text-xs font-mono font-medium transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  <span>Say Hello</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
