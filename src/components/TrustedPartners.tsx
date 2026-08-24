import Image from "next/image";
import { partners } from "@/lib/content";
import { ScrollReveal } from "@/components/ScrollReveal";

export function TrustedPartners() {
  return (
    <section className="fluid-px py-16">
      <ScrollReveal className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted">
          Trusted Partners &amp; Clients
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="relative h-12 w-32 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14 sm:w-36"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                sizes="150px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
