import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SideRail } from "@/components/layout/SideRail";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { WorldBackdrop } from "@/components/visuals/WorldBackdrop";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Intelligence } from "@/components/sections/Intelligence";
import { Experience } from "@/components/sections/Experience";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";
import { StructuredData } from "@/components/seo/StructuredData";

export default function HomePage() {
  return (
    <>
      <StructuredData />

      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />

      {/* The living world: constellation field, drifting butterflies, light. */}
      <WorldBackdrop />

      <Navbar />
      <SideRail />

      <main id="main">
        <Hero />
        <Journey />
        <Skills />
        <Projects />
        <Intelligence />
        <Experience />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
