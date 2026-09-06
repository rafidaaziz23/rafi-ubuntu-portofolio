"use client";
import React, { useEffect, useRef } from "react";

interface MatrixRainProps {
  onExit?: () => void;
}

export function MatrixRain({ onExit }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 280;

    const characters = "0123456789ABCDEFRAFIZARCHITECTKAFKAPOSTGRES";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -20);
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 12, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative my-2 rounded-lg overflow-hidden border border-emerald-500/40 bg-black/90 shadow-[0_0_20px_rgba(0,255,102,0.15)]">
      <div className="flex items-center justify-between px-3 py-1 bg-zinc-900/80 border-b border-white/5 text-[11px] font-mono text-zinc-400">
        <span className="text-emerald-400 font-bold">cmatrix.bin [ACTIVE PROCESS]</span>
        {onExit && (
          <button
            onClick={onExit}
            className="text-zinc-500 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
          >
            [Close Process]
          </button>
        )}
      </div>
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}
