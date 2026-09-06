"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Maximize2,
  Minimize2,
  Mail,
  Send,
  Code,
  Briefcase,
  MessageCircle,
  CheckCircle,
  Terminal as TerminalIcon,
  Server
} from "lucide-react";

export interface ContactWindowProps {
  isOpen?: boolean;
  onClose?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  className?: string;
}

export function ContactWindow({
  isOpen = true,
  onClose,
  onMaximize,
  isMaximized: controlledMaximized,
  className = "",
}: ContactWindowProps) {
  const [internalClosed, setInternalClosed] = useState(false);
  const [internalMaximized, setInternalMaximized] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setFormState({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

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
            : "max-w-5xl mx-auto rounded-xl shadow-2xl shadow-black/85 ring-1 ring-white/10 h-[600px]"
        } bg-[#1E1E1E] text-zinc-200 overflow-hidden ${className}`}
      >
        {/* Header - Thunderbird Mailer Style */}
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
              title="Minimize (Disabled)"
              className="w-3.5 h-3.5 rounded-full bg-zinc-600 flex items-center justify-center shadow-sm border border-black/10 opacity-50 cursor-not-allowed"
            />
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
          <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-300">
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-semibold text-white/95">Thunderbird Mailer</span>
              <span className="text-zinc-500">—</span>
              <span>Compose New Message</span>
            </div>
          </div>

          {/* Right Header Status */}
          <div className="flex items-center gap-2 z-10">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-white/5 font-mono text-[10px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SMTP: rafi@nexatriv</span>
              <span className="text-emerald-400 font-semibold ml-1">CONNECTED</span>
            </div>
          </div>
        </header>

        {/* Content Body - 2 Columns */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 bg-[#121212]">
          
          {/* Left Column - Contact Info */}
          <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-white/5 bg-[#18181A] p-6 sm:p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3 tracking-tight">
              Say Hello!
            </h2>
            
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Whether you have a technical question, want to discuss low-latency architecture, or have an exciting high-throughput project in mind, my inbox is always open. Let's build something scalable together!
            </p>
            
            <div className="space-y-3">
              <a 
                href="https://linkedin.com/in/rafida-aziz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-[#0077B5]/20 border border-white/5 hover:border-[#0077B5]/50 transition-all group"
              >
                <Briefcase className="w-5 h-5 text-[#0077B5] group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white group-hover:text-[#0077B5] transition-colors">LinkedIn</span>
                  <span className="text-[11px] text-zinc-500 font-mono">/in/rafida-aziz</span>
                </div>
              </a>
              
              <a 
                href="https://github.com/rafida-core" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
              >
                <Code className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">GitHub</span>
                  <span className="text-[11px] text-zinc-500 font-mono">@rafida-core</span>
                </div>
              </a>
              
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/5 hover:border-[#25D366]/50 transition-all group relative overflow-hidden"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors">Direct WhatsApp</span>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
              </a>
            </div>
          </div>
          
          {/* Right Column - Terminal Form */}
          <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-center relative select-text bg-[#0D0D0E]">
            {/* Terminal Top Bar styling for the form */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-[#1A1A1D] border-b border-white/5 flex items-center px-4 gap-2">
              <Server className="w-3 h-3 text-zinc-500" />
              <span className="text-[10px] text-zinc-500 font-mono">SMTP Transaction Stream</span>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-4 font-mono flex flex-col gap-5 h-full pt-4 max-w-lg w-full mx-auto">
              
              {/* SENDER_NAME */}
              <div className="group">
                <label className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-1.5">
                  <span className="text-[#38B44A]">guest@nexatriv</span>
                  <span className="text-zinc-500">:</span>
                  <span className="text-[#E95420]">~$</span>
                  <span className="text-white">export SENDER_NAME=</span>
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-emerald-400 focus:outline-none focus:border-[#E95420] focus:ring-1 focus:ring-[#E95420] transition-all placeholder-zinc-700 font-mono"
                  placeholder='"Jane Doe"'
                  disabled={isSubmitting || isSent}
                />
              </div>
              
              {/* SENDER_EMAIL */}
              <div className="group">
                <label className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-1.5">
                  <span className="text-[#38B44A]">guest@nexatriv</span>
                  <span className="text-zinc-500">:</span>
                  <span className="text-[#E95420]">~$</span>
                  <span className="text-white">export SENDER_EMAIL=</span>
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-emerald-400 focus:outline-none focus:border-[#E95420] focus:ring-1 focus:ring-[#E95420] transition-all placeholder-zinc-700 font-mono"
                  placeholder='"jane@example.com"'
                  disabled={isSubmitting || isSent}
                />
              </div>
              
              {/* MESSAGE TEXTAREA */}
              <div className="group flex-1 flex flex-col min-h-[150px]">
                <label className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-1.5">
                  <span className="text-[#38B44A]">guest@nexatriv</span>
                  <span className="text-zinc-500">:</span>
                  <span className="text-[#E95420]">~$</span>
                  <span className="text-white">cat &lt;&lt; 'EOF' &gt; message.txt</span>
                </label>
                <textarea
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full flex-1 bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#E95420] focus:ring-1 focus:ring-[#E95420] transition-all placeholder-zinc-700 font-mono resize-none custom-scrollbar"
                  placeholder="> Write your message here..."
                  disabled={isSubmitting || isSent}
                />
              </div>
              
              {/* SUBMIT BUTTON */}
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                  <TerminalIcon className="w-3 h-3" />
                  <span>Execute ./send_mail.sh</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSent}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg ${
                    isSent 
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-emerald-500/10 cursor-default" 
                      : isSubmitting
                      ? "bg-[#E95420]/50 text-white/70 cursor-wait border border-[#E95420]/30"
                      : "bg-gradient-to-r from-[#E95420] to-[#c23d0e] hover:from-[#f16331] hover:to-[#E95420] text-white border border-[#E95420]/50 shadow-[#E95420]/25 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {isSent ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Message Sent! EOF.</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Note</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ContactWindow;
