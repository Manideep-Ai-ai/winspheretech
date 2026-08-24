"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Process() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!lineRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="fluid-px fluid-py">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Process</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">From discovery to sustained support</h2>
        </ScrollReveal>

        {/* Desktop: horizontal timeline with a scroll-drawn connecting line. */}
        <div ref={sectionRef} className="fluid-section-mt hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 top-6 h-px w-full bg-border" />
            <div ref={lineRef} className="absolute left-0 top-6 h-px w-full bg-gradient-to-r from-primary to-secondary" />

            <div className="grid grid-cols-6 gap-4">
              {processSteps.map((step) => (
                <div key={step.step} className="relative pt-14">
                  <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-bg text-sm font-bold text-primary">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/tablet: vertical timeline. */}
        <div className="fluid-section-mt relative pl-8 lg:hidden">
          <div className="absolute left-[15px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-primary via-secondary to-transparent" />
          <div className="flex flex-col gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative"
              >
                <span className="absolute -left-8 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-bg text-xs font-bold text-primary">
                  {step.step}
                </span>
                <h3 className="text-base font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-text-secondary">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
