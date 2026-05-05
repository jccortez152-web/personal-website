import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import RoboChatDemo from "@/components/RoboChatDemo";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import Background3D from "@/components/three/Background3D";

export default function Home() {
  return (
    <>
      <Background3D />
      <Navbar />
      <main>
        {/* Hero stays unwrapped — already visible on load with its own internal motion */}
        <Hero />

        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <RoboChatDemo />
        </Reveal>
        <Reveal>
          <Certifications />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
