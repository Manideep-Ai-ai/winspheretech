"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Cloud, Code2, Database, Megaphone, Users } from "lucide-react";
import { services, type Service } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

const icons: Record<Service["icon"], typeof BrainCircuit> = {
  ai: BrainCircuit,
  cloud: Cloud,
  code: Code2,
  staffing: Users,
  data: Database,
  growth: Megaphone,
};

export function Services() {
  return (
    <section id="services" className="fluid-px fluid-py">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Do</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">End-to-End Technology Solutions</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Technology solutions designed to help organizations build, modernize, scale, and grow.
          </p>
        </ScrollReveal>

        <div className="fluid-section-mt grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card fluid-p transition-colors hover:border-primary/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/5 group-hover:to-secondary/5 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                        <Icon size={22} />
                      </div>
                      <span className="font-heading text-sm text-muted">{service.index}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{service.description}</p>
                    <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      Explore <ArrowUpRight size={16} />
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
