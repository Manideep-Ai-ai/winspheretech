import { techStack } from "@/lib/content";

export function TechStack() {
  const looped = [...techStack, ...techStack];

  return (
    <section className="overflow-hidden border-y border-border bg-bg-secondary py-10">
      <div className="mx-auto max-w-7xl fluid-px">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-text-secondary">
          Built with technology enterprises trust
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] gap-16 pr-16">
          {looped.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="whitespace-nowrap text-2xl font-bold text-text-secondary transition-colors hover:text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
