"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Maximize2,
  Minimize2,
  Award,
  Search,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Cloud,
  TerminalSquare,
  Code2
} from "lucide-react";
import { CREDENTIALS_DATA } from "../../data/credentials";

export interface CredentialsWindowProps {
  isOpen?: boolean;
  onClose?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  className?: string;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "gemini": return <Cloud className="w-8 h-8 text-blue-400" />;
    case "aws": return <Cloud className="w-8 h-8 text-[#FF9900]" />;
    case "cisco": return <TerminalSquare className="w-8 h-8 text-cyan-400" />;
    case "leetcode": return <Code2 className="w-8 h-8 text-amber-500" />;
    default: return <Award className="w-8 h-8 text-zinc-400" />;
  }
};

export function CredentialsWindow({
  isOpen = true,
  onClose,
  onMaximize,
  isMaximized: controlledMaximized,
  className = "",
}: CredentialsWindowProps) {
  const [internalClosed, setInternalClosed] = useState(false);
  const [internalMaximized, setInternalMaximized] = useState(false);
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

  const filteredCredentials = CREDENTIALS_DATA.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={`w-full font-sans select-none flex flex-col ${
          isMaximized
            ? "fixed inset-0 z-50 rounded-none max-w-none h-screen"
            : "max-w-5xl mx-auto rounded-xl shadow-2xl shadow-black/85 ring-1 ring-white/10 h-[650px]"
        } bg-[#1E1E1E] text-zinc-200 overflow-hidden ${className}`}
      >
        {/* Header - Software Center Style */}
        <header className="relative flex items-center justify-between px-3 sm:px-4 py-2.5 bg-gradient-to-r from-[#2C001E] via-[#241f23] to-[#1E1E1E] border-b border-black/50 select-none">
          {/* Traffic Light Controls */}
          <div className="flex items-center gap-2 z-10 group/traffic">
            <button
              onClick={handleClose}
              title="Close"
              className="w-3.5 h-3.5 rounded-full bg-[#E95420] flex items-center justify-center shadow-sm border border-red-900/30"
            >
              <X className="w-2.5 h-2.5 text-black/80 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleToggleMaximize}
              title={isMaximized ? "Restore Window" : "Expand Window"}
              className="w-3.5 h-3.5 rounded-full bg-[#38B44A] flex items-center justify-center shadow-sm border border-emerald-900/30"
            >
              {isMaximized ? (
                <Minimize2 className="w-2 h-2 text-black/80 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
              ) : (
                <Maximize2 className="w-2 h-2 text-black/80 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          {/* Window Title */}
          <div className="absolute inset-x-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-semibold text-sm text-zinc-200">Software Center</span>
            <span className="text-[10px] text-zinc-400">Verified Credentials</span>
          </div>

          {/* Right Header Status / Search */}
          <div className="flex items-center gap-2 z-10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 bg-black/40 border border-white/10 rounded-full py-1 pl-8 pr-3 text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-[#E95420]/50 transition-colors shadow-inner"
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#121212] p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  Installed Credentials
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Verified certifications and achievements from official issuers.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/20">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{filteredCredentials.length} Active Licenses</span>
              </div>
            </div>

            {/* Grid Layout for Credentials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCredentials.map((cred) => (
                <div 
                  key={cred.id}
                  className="bg-[#18181A] rounded-xl p-5 border border-white/5 shadow-sm hover:shadow-lg hover:border-white/10 transition-all flex gap-4 items-start group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#E95420]/10 group-hover:border-[#E95420]/20 transition-colors">
                    {getIcon(cred.icon)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-base leading-tight mb-1 truncate">
                      {cred.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-2">{cred.issuer}</p>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-auto">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                      <span className="text-[11px] text-zinc-500 font-medium">
                        {cred.date}
                      </span>
                    </div>
                  </div>

                  <a 
                    href={cred.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-zinc-500 hover:text-[#E95420] hover:bg-white/5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
              
              {filteredCredentials.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 border border-white/10">
                    <Search className="w-6 h-6 text-zinc-500" />
                  </div>
                  <h3 className="text-sm font-medium text-white">No credentials found</h3>
                  <p className="text-xs text-zinc-400 mt-1">Try adjusting your search criteria</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-[#2C001E] via-[#241f23] to-[#1E1E1E] border-t border-black/50 py-2.5 px-4 text-[11px] text-zinc-400 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-zinc-500" />
            <span>Ubuntu Software Center • Portfolio Edition</span>
          </div>
          <span>Updated: Just now</span>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

export default CredentialsWindow;
