import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Agents from "@/components/Agents";
import Projects from "@/components/Projects";
import RoboChatDemo from "@/components/RoboChatDemo";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:rounded-card focus:bg-signal focus:text-ink focus:font-bold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        {/* Hero stays unwrapped — visible on load with its own entrance */}
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
          <Agents />
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
