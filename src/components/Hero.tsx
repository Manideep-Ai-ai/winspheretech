"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const lines = ["Technology.", "Talent.", "Digital Growth."];

export function Hero() {
  return (
    <section id="home" className="relative z-10 flex min-h-screen items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-12 fluid-gap-y fluid-px lg:grid-cols-5">
        {/* Left column is reserved space; the globe itself is a fixed,
            scroll-reactive backdrop hugging the left edge (GlobeBackdrop). */}
        <div className="hidden lg:col-span-2 lg:block" aria-hidden />

        <div className="lg:col-span-3">
          <h1 className="text-6xl leading-[1.05] tracking-tight sm:text-7xl">
            {lines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`block ${i === 2 ? "text-gradient" : "text-text"}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 max-w-md text-lg text-text-secondary"
          >
            WinSphere Technologies engineers AI, cloud, and software platforms
            for enterprises that measure growth in outcomes, not output.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-bg shadow-[0_10px_28px_-10px_rgba(10,41,71,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(10,41,71,0.65)]"
            >
              Talk to Our Experts
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="rounded-full border border-border px-7 py-3.5 font-semibold text-text transition-all hover:border-primary/50 hover:bg-black/5"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
