"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  CheckCircle,
  Mail,
  ExternalLink,
  Sparkles
} from "lucide-react";

interface CalendarDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export function CalendarDropdown({
  isOpen,
  onClose,
  onOpenContact,
}: CalendarDropdownProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const dayName = currentDate.toLocaleString("en-US", { weekday: "long" });
  const dayNumber = currentDate.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-start justify-center pt-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-[#1e1e22]/95 border border-white/10 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col md:flex-row text-zinc-200 select-none mx-3"
        >
          {/* Left Column: Notifications & Live Status */}
          <div className="w-full md:w-1/2 p-5 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between bg-black/30">
            <div>
              {/* Day and Time Header */}
              <div className="mb-4">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {dayName}, {monthName} {dayNumber}, {year}
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight mt-1 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#E95420]" />
                  <span>{timeString || "00:00:00"}</span>
                </div>
              </div>

              {/* Status Pill Card */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AVAILABLE FOR ROLES</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Open for full-time backend / full-stack engineering & complex data pipeline architecture.
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Malang, Indonesia (WIB / UTC+7)</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => {
                onOpenContact();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E95420] to-[#c23d0e] hover:from-[#f16331] hover:to-[#E95420] text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-[#E95420]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="w-4 h-4" />
              <span>Schedule Call / Dispatch Note</span>
            </button>
          </div>

          {/* Right Column: GNOME Interactive Calendar */}
          <div className="w-full md:w-1/2 p-5 bg-[#18181b]/50">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white font-mono">
                {monthName} {year}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days Grid Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono text-zinc-500 mb-2 font-semibold">
              {daysOfWeek.map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
              {/* Empty leading padding days */}
              {Array.from({ length: firstDay }).map((_, idx) => (
                <div key={`empty-${idx}`} className="py-1.5 text-zinc-700 select-none">
                  -
                </div>
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const isToday =
                  day === new Date().getDate() &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear();

                return (
                  <div
                    key={day}
                    className={`py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                      isToday
                        ? "bg-[#E95420] text-white font-bold shadow-md shadow-[#E95420]/30"
                        : "hover:bg-white/10 text-zinc-300"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
