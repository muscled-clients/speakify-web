"use client";

import { useEffect, useRef } from "react";

const BAR_COUNT = 64;
const BAR_WIDTH = 4;
const BAR_GAP = 3;
const CANVAS_HEIGHT = 120;

function getBarColor(index: number, total: number): string {
  const t = index / total;
  // Gradient: teal/green -> blue -> purple
  if (t < 0.33) {
    // Teal to cyan
    const r = Math.round(40 + t * 3 * 20);
    const g = Math.round(200 - t * 3 * 40);
    const b = Math.round(180 + t * 3 * 40);
    return `rgb(${r}, ${g}, ${b})`;
  } else if (t < 0.66) {
    // Cyan to blue/purple
    const lt = (t - 0.33) * 3;
    const r = Math.round(60 + lt * 80);
    const g = Math.round(160 - lt * 100);
    const b = Math.round(220 - lt * 10);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Purple to teal (loop back)
    const lt = (t - 0.66) * 3;
    const r = Math.round(140 - lt * 100);
    const g = Math.round(60 + lt * 140);
    const b = Math.round(210 - lt * 30);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

export function WaveformVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalWidth = BAR_COUNT * (BAR_WIDTH + BAR_GAP);
    canvas.width = totalWidth;
    canvas.height = CANVAS_HEIGHT;

    let time = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < BAR_COUNT; i++) {
        const x = i * (BAR_WIDTH + BAR_GAP);

        // Create a wave pattern similar to the screenshot
        const wave1 = Math.sin((i / BAR_COUNT) * Math.PI * 2.5 + time * 2) * 0.4;
        const wave2 = Math.sin((i / BAR_COUNT) * Math.PI * 4 + time * 1.3) * 0.25;
        const wave3 = Math.sin((i / BAR_COUNT) * Math.PI * 1.2 + time * 0.7) * 0.35;
        const envelope = Math.sin((i / BAR_COUNT) * Math.PI) * 0.8 + 0.2;

        const amplitude = Math.abs(wave1 + wave2 + wave3) * envelope;
        const barHeight = Math.max(8, amplitude * CANVAS_HEIGHT * 0.85);

        const color = getBarColor(i, BAR_COUNT);
        ctx.fillStyle = color;

        const y = (CANVAS_HEIGHT - barHeight) / 2;
        ctx.beginPath();
        ctx.roundRect(x, y, BAR_WIDTH, barHeight, 2);
        ctx.fill();
      }

      time += 0.015;
      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto"
      style={{
        maxWidth: `${BAR_COUNT * (BAR_WIDTH + BAR_GAP)}px`,
        imageRendering: "auto",
      }}
    />
  );
}
