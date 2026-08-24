"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { whyPoints } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-navy-1 fluid-px fluid-py text-navy-text">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 fluid-gap-y lg:grid-cols-2">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">Why Choose WinSphere</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">Your Success Is Our Mission</h2>
          <p className="mt-6 max-w-md text-lg text-navy-text-secondary">
            We operate as an extension of your team, not a vendor. Every
            engagement is scoped, staffed with senior practitioners, and
            measured against the business result it was built to move.
          </p>
          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-navy-border px-6 py-3 font-semibold text-navy-text transition-all hover:border-teal/50 hover:bg-white/5"
          >
            Know More About Us
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {whyPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl border border-navy-border bg-white/[0.03] p-5"
            >
              <CheckCircle2 size={20} className="text-teal" />
              <h3 className="mt-3 text-base font-bold text-navy-text">{point.title}</h3>
              <p className="mt-1.5 text-sm text-navy-text-secondary">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
