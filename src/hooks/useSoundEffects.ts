"use client";
import { useCallback, useRef, useEffect } from "react";

export function useSoundEffects() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playKeystroke = useCallback(() => {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore audio errors on un-interacted pages
    }
  }, []);

  const playBootSound = useCallback(() => {
    try {
      const ctx = getCtx();
      if (!ctx) return;
      // Simple synth chord resembling a classic startup sound
      [261.63, 329.63, 392.00].forEach((freq, i) => { // C4, E4, G4
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1 + (i * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + (i * 0.1));
        osc.stop(ctx.currentTime + 3);
      });
    } catch (e) {}
  }, []);

  return { playKeystroke, playBootSound };
}
