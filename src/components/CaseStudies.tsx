import { caseStudies } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function CaseStudies() {
  return (
    <section className="fluid-px fluid-py">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Case Studies</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Technology That Delivers Results</h2>
        </ScrollReveal>

        <div className="fluid-section-mt grid grid-cols-1 gap-6 sm:grid-cols-3">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.industry} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-border bg-card p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{study.industry}</p>
                  <h3 className="mt-3 text-lg font-bold text-muted">{study.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary">
                    Published case studies will appear here once results are finalized and client-approved.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
