"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Globe = dynamic(() => import("@/components/ui/globe").then((m) => m.Globe), { ssr: false });

const lines = ["Technology.", "Talent.", "Digital Growth."];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const globeOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.4, 0]);
  const globeY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative isolate flex min-h-[90dvh] flex-col justify-center overflow-hidden bg-navy-1 pt-24 pb-40 text-navy-text"
    >
      {/* Signature hero element: the globe emerges from the bottom, cropped
          by the viewport, and belongs only to this section — it fades out
          on its own scroll progress rather than roaming the whole page. */}
      <motion.div
        aria-hidden
        style={{ opacity: globeOpacity, y: globeY }}
        className="pointer-events-none absolute bottom-[-38%] left-1/2 z-0 w-[560px] max-w-[140vw] -translate-x-1/2 sm:w-[720px] lg:w-[860px]"
      >
        <Globe />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-1 via-transparent to-navy-1/60" />

      <div className="relative z-10 mx-auto w-full max-w-4xl fluid-px text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-teal"
        >
          Technology &middot; Talent &middot; Digital Transformation
        </motion.p>

        <h1 className="mt-5 text-fluid-h1 leading-[1.05] tracking-tight">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`block ${i === 2 ? "text-gradient" : "text-navy-text"}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-lg text-navy-text-secondary"
        >
          WinSphere Technologies helps businesses accelerate growth through AI,
          cloud, software engineering, data, and technology talent.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 font-semibold text-navy-1 shadow-[0_10px_28px_-10px_rgba(25,199,163,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(25,199,163,0.7)]"
          >
            Talk to Our Experts
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="rounded-full border border-navy-border px-7 py-3.5 font-semibold text-navy-text transition-all hover:border-teal/50 hover:bg-white/5"
          >
            Explore Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
