import { useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export default function MagneticButton({ children, href = "#contact", variant = "signal", className, cursor = "EXPLORE" }) {
  const ref = useRef(null);
  const move = (event) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .18}px, ${(event.clientY - rect.top - rect.height / 2) * .18}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <Button asChild ref={ref} variant={variant} size="signal" className={cn("transition-[transform,box-shadow,background-color] duration-300", className)} onMouseMove={move} onMouseLeave={reset}>
      <a href={href} data-cursor={cursor}>{children}</a>
    </Button>
  );
}