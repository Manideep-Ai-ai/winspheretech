"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { whyPoints } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function WhyChooseUs() {
  return (
    <section id="about" className="bg-navy-1 fluid-px fluid-py text-navy-text">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-16 fluid-gap-y lg:grid-cols-2">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal">Our Approach</p>
          <h2 className="mt-3 text-fluid-h2 font-extrabold leading-tight">Your Business Growth Is Our Mission</h2>
          <p className="mt-6 max-w-md text-lg text-navy-text-secondary">
            Your business needs more than technology or marketing in
            isolation. WinSphere Technologies brings digital growth and
            technology capabilities together to help businesses improve
            visibility, generate opportunities, modernize operations, and
            build for sustainable growth.
          </p>
          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-navy-border px-6 py-3 font-semibold text-navy-text transition-all hover:border-teal/50 hover:bg-white/5"
          >
            Know More About Us
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </ScrollReveal>

        <div className="auto-grid-sm">
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
