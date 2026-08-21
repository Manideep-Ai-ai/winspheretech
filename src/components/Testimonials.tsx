"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="fluid-px fluid-py">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">What clients say</h2>
        </ScrollReveal>

        <div className="relative fluid-section-mt">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl fluid-p"
            >
              <Quote className="mx-auto text-primary" size={32} />
              <p className="mt-6 text-xl leading-relaxed text-text">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center justify-center gap-3 sm:flex">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-bg">
                  {testimonial.name[0]}
                </div>
                <div className="min-w-0 text-left">
                  <p className="truncate font-semibold">{testimonial.name}</p>
                  <p className="truncate text-sm text-text-secondary">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-primary/40 hover:text-primary sm:-translate-x-12"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-primary/40 hover:text-primary sm:translate-x-12"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
