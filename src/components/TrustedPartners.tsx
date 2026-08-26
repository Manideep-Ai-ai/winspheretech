import Image from "next/image";
import { partners } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

// Duplicated enough times that the loop reads as a continuous strip rather
// than "the same 3 logos flashing by" — then doubled again below so the
// two marquee tracks tile seamlessly.
const REPEATS = 4;
const looped = Array.from({ length: REPEATS }, () => partners).flat();

export function TrustedPartners() {
  return (
    <section className="fluid-px py-16">
      <ScrollReveal className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted">
          Trusted Partners &amp; Clients
        </p>

        <div className="edge-fade-x relative mt-10 flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-6 pr-6">
            {[...looped, ...looped].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="glass flex h-32 w-64 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                <div
                  className={
                    partner.onDark
                      ? "flex h-20 w-52 items-center justify-center rounded-xl bg-navy-1 p-3"
                      : "flex h-20 w-52 items-center justify-center"
                  }
                >
                  <div className="relative h-14 w-44">
                    <Image src={partner.logo} alt={partner.name} fill sizes="220px" className="object-contain" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
