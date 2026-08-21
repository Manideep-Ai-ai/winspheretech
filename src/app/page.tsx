import { Navbar } from "@/components/Navbar";
import { GlobeBackdrop } from "@/components/GlobeBackdrop";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Industries } from "@/components/Industries";
import { TechStack } from "@/components/TechStack";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

function Divider() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl fluid-px">
      <div className="section-divider" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <GlobeBackdrop />
      <main className="relative z-10 flex-1">
        <Hero />
        <Stats />
        <Divider />
        <Services />
        <Divider />
        <WhyChooseUs />
        <Divider />
        <Industries />
        <TechStack />
        <Divider />
        <Process />
        <Divider />
        <Testimonials />
        <Divider />
        <Careers />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
