import { techCategories, techStack } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function TechStack() {
  const looped = [...techStack, ...techStack];

  return (
    <section className="overflow-hidden bg-bg-secondary fluid-py">
      <div className="mx-auto max-w-7xl fluid-px">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Technology</p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Technology We Build With</h2>
        </ScrollReveal>

        <div className="fluid-section-mt grid grid-cols-2 gap-6 sm:grid-cols-4">
          {techCategories.map((cat) => (
            <div key={cat.category}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">{cat.category}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm font-medium text-text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="edge-fade-x relative mt-12 flex overflow-hidden border-y border-border py-6">
        <div className="marquee-track flex shrink-0 gap-16 pr-16">
          {looped.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="whitespace-nowrap text-lg font-semibold text-muted transition-colors hover:text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
