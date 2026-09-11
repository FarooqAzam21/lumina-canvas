import { useEffect, useRef } from "react";

/**
 * Cinematic hero backdrop: mouse-reactive particle field rendered on canvas.
 * Degrades to a static field with prefers-reduced-motion, and reduces
 * particle count on small screens.
 */
export default function HeroBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let particles = [];
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = width < 720 ? 14000 : 8200;
      const count = Math.min(160, Math.round((width * height) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.25 + Math.random() * 0.75,
        r: 0.4 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.16,
      }));
    };

    const move = (event) => {
      pointer.tx = event.clientX / window.innerWidth;
      pointer.ty = event.clientY / window.innerHeight;
    };

    const draw = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      ctx.clearRect(0, 0, width, height);
      const ox = (pointer.x - 0.5) * 46;
      const oy = (pointer.y - 0.5) * 30;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        if (!reduced) {
          p.x += p.vx * p.z;
          p.y += p.vy * p.z;
          if (p.y < -12) { p.y = height + 12; p.x = Math.random() * width; }
          if (p.x < -12) p.x = width + 12;
          if (p.x > width + 12) p.x = -12;
        }
        const px = p.x + ox * p.z;
        const py = p.y + oy * p.z;
        ctx.beginPath();
        ctx.arc(px, py, p.r * p.z + 0.2, 0, Math.PI * 2);
        ctx.fillStyle = i % 7 === 0
          ? `rgba(150, 190, 255, ${0.16 + p.z * 0.42})`
          : `rgba(226, 232, 244, ${0.06 + p.z * 0.22})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!window.matchMedia("(pointer: coarse)").matches) {
      window.addEventListener("mousemove", move, { passive: true });
    }
    if (reduced) { draw(); cancelAnimationFrame(raf); ctx.clearRect(0, 0, width, height); particles.forEach((p) => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(226,232,244,.18)"; ctx.fill(); }); }
    else raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="hero-aurora" />
      <div className="hero-mesh" />
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-vignette" />
    </div>
  );
}
