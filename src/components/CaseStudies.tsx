import { outcomes } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function CaseStudies() {
  return (
    <section className="fluid-px fluid-py">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Business Outcomes</p>
          <h2 className="mt-3 text-fluid-h2 font-extrabold">Business Outcomes That Matter</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Our goal is not simply to deliver marketing campaigns or
            technology projects. We focus on solving business challenges and
            creating measurable value.
          </p>
        </ScrollReveal>

        <div className="fluid-section-mt auto-grid-lg">
          {outcomes.map((outcome, i) => (
            <ScrollReveal key={outcome.title} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-8">
                <div>
                  <h3 className="text-lg font-bold">{outcome.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary">{outcome.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
