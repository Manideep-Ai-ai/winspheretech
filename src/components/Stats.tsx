import { stats } from "@/lib/content";
import { Counter } from "@/components/Counter";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Stats() {
  return (
    <section className="relative -mt-8 fluid-px">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.08}>
            <div className="glass group rounded-2xl fluid-p text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:glow-primary">
              <div className="text-3xl font-extrabold text-gradient sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
