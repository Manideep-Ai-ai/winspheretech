import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { TrustedPartners } from "@/components/TrustedPartners";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Industries } from "@/components/Industries";
import { TechStack } from "@/components/TechStack";
import { CaseStudies } from "@/components/CaseStudies";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero />
        <Stats />
        <Services />
        <TrustedPartners />
        <WhyChooseUs />
        <Industries />
        <TechStack />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
