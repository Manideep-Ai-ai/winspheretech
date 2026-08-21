"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Globe } from "@/components/ui/globe";

export interface GlobeWaypoint {
  /** 0-1 position along total page scroll */
  progress: number;
  /** vh from top of viewport */
  top: number;
  /** vw from left of viewport */
  left: number;
  scale: number;
  opacity: number;
}

// Hugs the left edge throughout, drifting between top/bottom corners as the
// page scrolls, so it never sits behind the centered text column and never
// snaps between fixed spots — position is a continuous function of scroll.
const DEFAULT_PATH: GlobeWaypoint[] = [
  { progress: 0, top: 44, left: 19, scale: 0.85, opacity: 1 },
  { progress: 0.12, top: 14, left: 6, scale: 0.55, opacity: 0.5 },
  { progress: 0.3, top: 68, left: 9, scale: 0.5, opacity: 0.4 },
  { progress: 0.48, top: 20, left: 5, scale: 0.55, opacity: 0.45 },
  { progress: 0.66, top: 74, left: 10, scale: 0.5, opacity: 0.4 },
  { progress: 0.84, top: 18, left: 6, scale: 0.55, opacity: 0.45 },
  { progress: 0.93, top: 40, left: 6, scale: 0.4, opacity: 0 },
  { progress: 1, top: 40, left: 6, scale: 0.4, opacity: 0 },
];

// Below the lg breakpoint, sections stack to a single centered column, so
// there's no text-free left column — tuck the globe into corners instead
// of behind the headline.
const MOBILE_PATH: GlobeWaypoint[] = [
  { progress: 0, top: 10, left: 88, scale: 0.4, opacity: 0.55 },
  { progress: 0.15, top: 92, left: 12, scale: 0.35, opacity: 0.4 },
  { progress: 0.35, top: 8, left: 90, scale: 0.4, opacity: 0.45 },
  { progress: 0.55, top: 94, left: 10, scale: 0.35, opacity: 0.4 },
  { progress: 0.75, top: 9, left: 88, scale: 0.4, opacity: 0.45 },
  { progress: 0.9, top: 50, left: 88, scale: 0.3, opacity: 0 },
  { progress: 1, top: 50, left: 88, scale: 0.3, opacity: 0 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface GlobeBackdropProps {
  path?: GlobeWaypoint[];
  mobilePath?: GlobeWaypoint[];
}

export function GlobeBackdrop({ path = DEFAULT_PATH, mobilePath = MOBILE_PATH }: GlobeBackdropProps) {
  const [transform, setTransform] = useState("");
  const [opacity, setOpacity] = useState(1);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const activePath = window.innerWidth < 1024 ? mobilePath : path;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;

    let i = 0;
    while (i < activePath.length - 2 && progress > activePath[i + 1].progress) i++;
    const a = activePath[i];
    const b = activePath[i + 1];
    const span = b.progress - a.progress || 1;
    const t = Math.min(Math.max((progress - a.progress) / span, 0), 1);

    const top = lerp(a.top, b.top, t);
    const left = lerp(a.left, b.left, t);
    const scale = lerp(a.scale, b.scale, t);
    const nextOpacity = lerp(a.opacity, b.opacity, t);

    setTransform(
      `translate3d(${left}vw, ${top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${scale}, ${scale}, 1)`
    );
    setOpacity(nextOpacity);
  }, [path, mobilePath]);

  useEffect(() => {
    update();
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        update();
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0"
      style={{
        transform,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      <div className="h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] lg:h-[560px] lg:w-[560px]">
        <Globe />
      </div>
    </div>
  );
}
