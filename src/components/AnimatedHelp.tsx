"use client";
import React, { useState, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const HELP_LINES = [
  { isHeader: true, text: "Available System Commands:" },
  { cmd: "whoami", desc: "Display author bio & active identity specs" },
  { cmd: "projects", desc: "Launch & focus Nautilus Projects Window" },
  { cmd: "skills", desc: "Launch & focus System-Toolbox Window" },
  { cmd: "experience", desc: "View timeline of work & education logs" },
  { cmd: "resume", desc: "Open / download Rafida Aziz CV (PDF)" },
  { cmd: "neofetch", desc: "Print Ubuntu ASCII system hardware info" },
  { cmd: "theme <name>", desc: "Switch theme (ubuntu | matrix | cyberpunk)" },
  { cmd: "matrix", desc: "Digital rain canvas screen (cmatrix)" },
  { cmd: "contact", desc: "Open Thunderbird Mailer / contact info" },
  { cmd: "clear", desc: "Clear terminal command output" },
  { isFooter: true, text: "Note: Any other command will be processed by Rafida-AI (Gemini)" },
];

interface AnimatedHelpProps {
  onLinePrinted?: () => void;
}

export function AnimatedHelp({ onLinePrinted }: AnimatedHelpProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const { playKeystroke } = useSoundEffects();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setVisibleCount(index);
      playKeystroke();
      if (onLinePrinted) onLinePrinted();

      if (index >= HELP_LINES.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [onLinePrinted, playKeystroke]);

  return (
    <div className="text-xs space-y-1 font-mono text-zinc-300">
      {HELP_LINES.slice(0, visibleCount).map((line, idx) => {
        if (line.isHeader) {
          return (
            <div key={idx} className="text-amber-400 font-semibold mb-1">
              {line.text}
            </div>
          );
        }
        if (line.isFooter) {
          return (
            <div key={idx} className="text-cyan-400 mt-2 italic">
              {line.text}
            </div>
          );
        }
        return (
          <div key={idx}>
            <span className="text-[#E95420] font-bold">{line.cmd}</span> — {line.desc}
          </div>
        );
      })}
    </div>
  );
}
