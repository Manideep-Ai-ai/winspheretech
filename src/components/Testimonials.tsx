import { Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Testimonials() {
  return (
    <section className="fluid-px fluid-py">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">What clients say</h2>
        </ScrollReveal>

        <div className="fluid-section-mt grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.name} delay={i * 0.1}>
              <div className="glass flex h-full flex-col rounded-2xl fluid-p">
                <Quote className="text-primary" size={28} />
                <p className="mt-5 flex-1 text-lg leading-relaxed text-text">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-bg">
                    {testimonial.name[0]}
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="truncate font-semibold">{testimonial.name}</p>
                    <p className="truncate text-sm text-text-secondary">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
