import { stats } from "@/lib/content";
import { Counter } from "@/components/Counter";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Stats() {
  return (
    <section className="relative z-10 -mt-16 px-6 sm:-mt-20">
      <ScrollReveal className="mx-auto max-w-5xl">
        <div className="glass grid grid-cols-2 gap-6 rounded-2xl fluid-p sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-border lg:gap-0">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:px-4">
              <p className="text-2xl font-extrabold text-gradient sm:text-3xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm font-semibold text-text">{stat.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
