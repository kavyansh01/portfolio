import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      
      <div className="hero-badge-brutal" style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 999,
        background: 'var(--beige)',
        margin: 0,
        pointerEvents: 'auto'
      }}>
        <span className="badge-dot" />
        KAVYANSH &mdash; PORTFOLIO
      </div>

      <Navbar />

      <main>
        <Hero />
        <Marquee text="FULL-STACK WEB EXPERT" count={6} />
        <About />
        <Marquee text="SERVICES THAT DELIVER RESULTS" count={6} reverse={true} />
        <Services />
        <Marquee text="FEATURED DIGITAL EXPERIENCES" count={6} />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
