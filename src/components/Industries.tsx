"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { industries } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Industries() {
  const [active, setActive] = useState(0);

  return (
    <section id="industries" className="fluid-px fluid-py">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Industries</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Domain depth that shows up in delivery</h2>
        </ScrollReveal>

        <div className="fluid-section-mt grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((industry, i) => (
            <button
              key={industry.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-all ${
                active === i
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-text-secondary hover:border-primary/30 hover:text-text"
              }`}
            >
              {industry.name}
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
          <h3 className="text-xl font-bold">{industries[active].name}</h3>
          <p className="mt-3 max-w-2xl text-text-secondary">{industries[active].description}</p>
        </motion.div>
      </div>
    </section>
  );
}
