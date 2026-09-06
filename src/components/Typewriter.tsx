"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface TypewriterProps {
  text: string;
  speed?: number;
  onCharacterTyped?: () => void;
}

export function Typewriter({ text, speed = 15, onCharacterTyped }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const { playKeystroke } = useSoundEffects();
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    indexRef.current = 0;
    
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(prev => prev + text.charAt(indexRef.current));
        indexRef.current++;
        
        // Play sound every few characters to avoid audio overlap distortion
        if (indexRef.current % 4 === 0) playKeystroke(); 
        
        if (onCharacterTyped) onCharacterTyped();
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, playKeystroke, onCharacterTyped]);

  return <span>{displayed}</span>;
}
