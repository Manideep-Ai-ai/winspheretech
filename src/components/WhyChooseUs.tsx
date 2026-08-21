"use client";

import { motion } from "framer-motion";
import { whyPoints } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-bg-secondary/40 fluid-px fluid-py">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 fluid-gap-y lg:grid-cols-2">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why WinSphere</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            Enterprise outcomes,
            <br />
            engineered with rigor.
          </h2>
          <p className="mt-6 max-w-md text-lg text-text-secondary">
            We operate as an extension of your team, not a vendor. Every
            engagement is scoped, staffed with senior practitioners, and
            measured against the business result it was built to move.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex rounded-full border border-border px-6 py-3 font-semibold transition-all hover:border-primary/50 hover:bg-black/5"
          >
            Start a Conversation
          </a>
        </ScrollReveal>

        <div className="relative pl-8">
          <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-primary via-secondary to-transparent" />
          <div className="flex flex-col gap-10">
            {whyPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-bg text-xs font-bold text-primary shadow-[0_4px_14px_-2px_rgba(10,41,71,0.4)]">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold">{point.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
