"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { industries } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Industries() {
  const [active, setActive] = useState(0);
  const industry = industries[active];

  return (
    <section id="industries" className="fluid-px fluid-py">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Industries</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Domain depth that shows up in delivery</h2>
        </ScrollReveal>

        <div className="fluid-section-mt grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-all ${
                active === i
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-text-secondary hover:border-primary/30 hover:text-text"
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass mt-8 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold">{industry.name}</h3>
          <p className="mt-3 max-w-2xl text-text-secondary">{industry.description}</p>
          <ul className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
            {industry.capabilities.map((cap) => (
              <li key={cap} className="flex items-center gap-2 text-sm text-text-secondary">
                <Check size={14} className="shrink-0 text-primary" />
                {cap}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Explore {industry.name} Solutions
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
