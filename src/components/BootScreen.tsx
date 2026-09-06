"use client";
import React, { useState, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const BOOT_LOGS = [
  "Initializing Rafida OS v2.4...",
  "Loading kernel modules [OK]",
  "Mounting virtual file systems [OK]",
  "Starting network manager [OK]",
  "Bringing up loopback interface [OK]",
  "Starting Docker daemon [OK]",
  "Loading Gemini AI neural pathways... [OK]",
  "Starting PostgreSQL database service [OK]",
  "Starting Redis in-memory datastore [OK]",
  "Connecting to Elasticsearch node... [OK]",
  "Initializing X11 window system [OK]",
  "Welcome to Rafida-AI Portfolio Environment.",
];

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const { playBootSound } = useSoundEffects();

  useEffect(() => {
    let currentLogIndex = 0;
    
    const printLog = () => {
      if (currentLogIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentLogIndex]]);
        currentLogIndex++;
        
        // Randomize delay slightly for realistic feel
        const delay = Math.random() * 150 + 50; 
        setTimeout(printLog, delay);
      } else {
        setTimeout(() => {
          playBootSound();
          onComplete();
        }, 800);
      }
    };

    const initialTimeout = setTimeout(printLog, 500);
    return () => clearTimeout(initialTimeout);
  }, [onComplete, playBootSound]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-green-500 font-mono text-sm sm:text-base p-6 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex flex-col gap-1">
        {logs.map((log, idx) => (
          <div key={idx} className="animate-fade-in">
            <span className="text-zinc-500">[{ (idx * 0.432).toFixed(3) }]</span> {log}
          </div>
        ))}
        {logs.length < BOOT_LOGS.length && (
          <div className="w-2 h-4 bg-green-500 animate-pulse mt-1" />
        )}
      </div>
    </div>
  );
}
