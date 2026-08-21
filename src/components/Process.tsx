"use client";

import { useEffect, useRef } from "react";
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

        <div ref={sectionRef} className="relative fluid-section-mt overflow-x-auto pb-4">
          <div className="relative min-w-[900px] px-2">
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
      </div>
    </section>
  );
}
