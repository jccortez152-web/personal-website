import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Agents from "@/components/Agents";
import Apps from "@/components/Apps";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Apple product-page rhythm: light gray hero → black highlights → white
// agents → gray apps → white experience → gray about → white skills → gray
// credentials → black contact.
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:rounded-full focus:bg-blue focus:text-white focus:font-medium"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Highlights />
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
