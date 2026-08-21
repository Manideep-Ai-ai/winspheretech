import { ArrowRight, Globe2, HeartHandshake, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const benefits = [
  { icon: Globe2, label: "Remote-first, global team" },
  { icon: TrendingUp, label: "Growth-focused career paths" },
  { icon: HeartHandshake, label: "Health & wellness coverage" },
];

export function Careers() {
  return (
    <section id="careers" className="fluid-px fluid-py">
      <div className="mx-auto max-w-7xl">
        <div className="glass grid grid-cols-1 items-center gap-10 rounded-3xl fluid-p lg:grid-cols-2">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Careers</p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Build the future with us</h2>
            <p className="mt-6 max-w-md text-text-secondary">
              We hire engineers, strategists, and specialists who want their
              work to move real business metrics. Explore open roles across
              engineering, data, and growth.
            </p>
            <a
              href={`mailto:ITsupport@winspheretech.com?subject=Careers%20Inquiry`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 font-semibold text-bg transition-transform hover:scale-105"
            >
              Apply Now <ArrowRight size={18} />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {benefits.map((benefit) => (
              <div
                key={benefit.label}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <benefit.icon size={18} />
                </div>
                <p className="text-sm font-medium">{benefit.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
