import { ArrowRight, BookOpen, Globe2, HeartHandshake, Puzzle, TrendingUp } from "lucide-react";
import { contactInfo } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

const benefits = [
  { icon: Globe2, label: "Remote-first opportunities" },
  { icon: TrendingUp, label: "Growth-focused environment" },
  { icon: BookOpen, label: "Learning & development" },
  { icon: HeartHandshake, label: "Health & wellness coverage" },
  { icon: Puzzle, label: "Challenging technology projects" },
];

export function Careers() {
  return (
    <section id="careers" className="bg-navy-1 fluid-px fluid-py text-navy-text">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal">Careers</p>
            <h2 className="mt-3 text-fluid-h2 font-extrabold">Build Your Career With WinSphere</h2>
            <p className="mt-6 max-w-md text-navy-text-secondary">
              We hire engineers, strategists, and specialists who want their
              work to move real business metrics. Explore open roles across
              engineering, data, and growth.
            </p>
            <a
              href={`mailto:${contactInfo.email}?subject=Careers%20Inquiry`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 font-semibold text-navy-1 transition-transform hover:scale-105"
            >
              Apply Now <ArrowRight size={18} />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {benefits.map((benefit) => (
              <div
                key={benefit.label}
                className="flex items-center gap-4 rounded-2xl border border-navy-border bg-white/[0.03] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <benefit.icon size={18} />
                </div>
                <p className="text-sm font-medium text-navy-text">{benefit.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
