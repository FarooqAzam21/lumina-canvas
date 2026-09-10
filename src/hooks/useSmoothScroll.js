import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experienceState } from "../lib/experienceStore";

export function useSmoothScroll(rootRef) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    experienceState.reducedMotion = reduced;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = reduced ? null : new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.8 });
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      experienceState.scroll = window.scrollY / max;
      ScrollTrigger.update();
    };
    const tick = (time) => lenis?.raf(time * 1000);
    lenis?.on("scroll", update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 70, opacity: 0, filter: "blur(10px)" }, {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      });
      gsap.utils.toArray("[data-word]").forEach((word, index) => {
        gsap.fromTo(word, { opacity: 0.08, y: 60, rotateX: 18 }, {
          opacity: 1, y: 0, rotateX: 0, ease: "none",
          scrollTrigger: { trigger: word, start: "top 90%", end: "center 56%", scrub: reduced ? false : 1 },
        });
      });
      const track = document.querySelector("[data-horizontal-track]");
      if (track && !reduced) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth), ease: "none",
          scrollTrigger: { trigger: "[data-horizontal]", start: "top top", end: () => `+=${track.scrollWidth}`, scrub: 1, pin: true, invalidateOnRefresh: true },
        });
      }
      gsap.utils.toArray("[data-scene]").forEach((section) => {
        const scene = Number(section.dataset.scene || 0);
        ScrollTrigger.create({ trigger: section, start: "top 55%", end: "bottom 45%", onToggle: ({ isActive }) => { if (isActive) experienceState.scene = scene; } });
      });
    }, rootRef);
    update();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("resize", refresh);
      context.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, [rootRef]);
}