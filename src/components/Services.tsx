"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  FileText,
  Globe as GlobeIcon,
  MousePointerClick,
  Search,
  Share2,
  Target,
  Users,
} from "lucide-react";
import { digitalMarketingServices, itSolutionsServices, type Service } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

const icons: Record<Service["icon"], typeof BrainCircuit> = {
  seo: Search,
  social: Share2,
  content: FileText,
  leads: Target,
  ppc: MousePointerClick,
  code: Code2,
  web: GlobeIcon,
  ai: BrainCircuit,
  data: Database,
  cloud: Cloud,
  staffing: Users,
};

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const Icon = icons[service.icon];
  return (
    <ScrollReveal delay={delay}>
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
          <h4 className="mt-6 text-xl font-bold">{service.title}</h4>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{service.description}</p>
          <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
            Explore <ArrowUpRight size={16} />
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export function Services() {
  return (
    <section id="services" className="fluid-px fluid-py">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Services</p>
          <h2 className="mt-3 text-fluid-h2 font-extrabold">Digital Marketing &amp; IT Solutions for Business Growth</h2>
          <p className="mt-4 text-lg text-text-secondary">
            From building your online visibility to solving complex technology
            challenges, WinSphere Technologies combines digital marketing and
            technology expertise to help businesses grow, modernize, and
            compete in a digital-first market.
          </p>
        </ScrollReveal>

        <div id="digital-marketing" className="fluid-section-mt scroll-mt-24">
          <ScrollReveal className="max-w-2xl">
            <h3 className="text-2xl font-bold sm:text-3xl">Digital Marketing Services for Business Growth</h3>
            <p className="mt-3 text-text-secondary">
              Build visibility, attract the right audience, generate qualified
              leads, and turn digital channels into measurable business
              opportunities.
            </p>
          </ScrollReveal>

          <div className="mt-8 auto-grid-lg">
            {digitalMarketingServices.map((service, i) => (
              <ServiceCard key={service.title} service={service} delay={i * 0.08} />
            ))}
          </div>

          <a
            href="#contact"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Explore Digital Marketing Services
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div id="it-solutions" className="fluid-section-mt scroll-mt-24">
          <ScrollReveal className="max-w-2xl">
            <h3 className="text-2xl font-bold sm:text-3xl">IT Solutions Built Around Your Business</h3>
            <p className="mt-3 text-text-secondary">
              Practical technology solutions that help businesses modernize,
              automate, scale, and operate more efficiently.
            </p>
          </ScrollReveal>

          <div className="mt-8 auto-grid-lg">
            {itSolutionsServices.map((service, i) => (
              <ServiceCard key={service.title} service={service} delay={i * 0.08} />
            ))}
          </div>

          <a
            href="#contact"
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Explore IT Solutions
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
