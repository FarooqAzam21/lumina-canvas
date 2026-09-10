import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const dot = useRef(null);
  const label = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;
    document.body.classList.add("has-custom-cursor");
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, raf;
    const move = (event) => { tx = event.clientX; ty = event.clientY; };
    const over = (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
      const text = target?.dataset.cursor || "";
      dot.current?.classList.toggle("scale-[4]", Boolean(text));
      label.current.textContent = text;
      label.current.style.opacity = text ? "1" : "0";
    };
    const tick = () => {
      x += (tx - x) * .16; y += (ty - y) * .16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (label.current) label.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move); document.addEventListener("mouseover", over); tick();
    return () => { document.body.classList.remove("has-custom-cursor"); window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); cancelAnimationFrame(raf); };
  }, []);
  return <><div ref={dot} className="pointer-events-none fixed left-0 top-0 z-100 hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-blend-difference transition-transform duration-300 md:block" /><div ref={label} className="pointer-events-none fixed left-0 top-0 z-101 hidden -translate-x-1/2 -translate-y-1/2 font-mono text-[2px] font-medium text-background opacity-0 md:block" /></>;
}