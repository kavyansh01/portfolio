'use client';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal-text, .reveal-blur').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero-brutal" ref={sectionRef}>
      <div className="hero-grid-bg" />
      <div className="hero-noise" />

      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-content-brutal">
        <div className="hero-two-col">
          <div className="hero-left">
            <div className="hero-badge-brutal">
              <span className="badge-dot" />
              AVAILABLE FOR FREELANCE WORK
            </div>

            <div className="hero-name-block">
              <div className="hero-line reveal-text">
                <span className="hero-hello">Hi, I&apos;m</span>
              </div>
              <h1 className="hero-massive reveal-text reveal-delay-1">KAVYANSH</h1>
              <h2 className="hero-subtitle reveal-text reveal-delay-2">FULL-STACK DEVELOPER</h2>
            </div>

            <p className="hero-desc reveal-blur reveal-delay-3">
              I build fast, beautiful, and conversion-focused websites and web
              applications that help businesses grow and stand out online.
            </p>

            <div className="hero-ctas reveal-blur reveal-delay-4">
              <a href="#projects" className="btn-brutal-primary">VIEW MY WORK &rarr;</a>
              <a href="#contact" className="btn-brutal-secondary">GET IN TOUCH</a>
            </div>
          </div>

          <div className="hero-right reveal-blur reveal-delay-3">
            <div className="code-mockup">
              <div className="code-mockup-header">
                <span className="code-dot code-dot-red" />
                <span className="code-dot code-dot-yellow" />
                <span className="code-dot code-dot-green" />
                <span className="code-mockup-title">index.js</span>
              </div>
              <div className="code-mockup-body">
                <pre><code>{`const developer = {
  name: "Kavyansh",
  skills: [
    "React", "Next.js",
    "Node.js", "MongoDB"
  ],
  passion: "Building things
    that matter",
  available: true
};

export default developer;`}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
