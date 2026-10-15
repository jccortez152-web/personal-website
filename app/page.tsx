import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Agents from "@/components/Agents";
import Apps from "@/components/Apps";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Proof first for recruiters: the struck tasks (hero) → the agents that took
// them over → apps → experience → about → skills → credentials → contact.
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:rounded-md focus:bg-card focus:text-ink focus:font-bold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Agents />
        <Apps />
        <Experience />
        <About />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
