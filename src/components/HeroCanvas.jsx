import { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion.js';

const LINES = 34;

/**
 * Generative "line field" for the hero: layered sine waves with a soft cursor lens.
 * Optimised: DPR capped at 2, paused when off-screen or when the tab is hidden,
 * a single static frame when the user prefers reduced motion.
 */
export default function HeroCanvas({ className = '' }) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let w = 1;
    let h = 1;
    let raf = 0;
    let running = false;
    let intersecting = true;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      const step = w < 640 ? 16 : 8;

      for (let i = 0; i < LINES; i += 1) {
        const p = i / (LINES - 1);
        const baseY = h * (0.1 + 0.82 * p);
        const amp = h * 0.05 * (0.35 + Math.sin(p * Math.PI));
        const isAccent = i % 11 === 5;
        const lensY = Math.exp(-Math.pow((p - pointer.y) * 3.4, 2));

        ctx.beginPath();
        for (let x = 0; x <= w + step; x += step) {
          const nx = x / w;
          const wave =
            Math.sin(nx * 5.2 + t * 0.00035 + p * 3.1) * amp + Math.sin(nx * 11 - t * 0.00028 + p * 6.4) * amp * 0.38;
          const dx = nx - pointer.x;
          const lens = lensY * Math.exp(-dx * dx * 14) * h * 0.06;
          const y = baseY + wave - lens;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = isAccent ? 1.4 : 1;
        ctx.strokeStyle = isAccent ? 'rgba(53,224,138,0.75)' : `rgba(242,242,238,${0.06 + 0.12 * Math.sin(p * Math.PI)})`;
        ctx.stroke();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const loop = (t) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || !intersecting || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointer.ty = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      if (intersecting) start();
      else stop();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true });

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
