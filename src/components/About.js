'use client';
import { useEffect, useRef } from 'react';

const techStack = [
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#fff' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'MongoDB', color: '#4db33d' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'HTML/CSS', color: '#e34f26' },
  { name: 'Git', color: '#f05032' },
];

const stats = [
  { number: '10+', label: 'PROJECTS DELIVERED', color: 'stamp-blue' },
  { number: '8+', label: 'HAPPY CLIENTS', color: 'stamp-red' },
  { number: '99%', label: 'SATISFACTION RATE', color: 'stamp-yellow' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal-text, .reveal-blur').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-brutal" ref={sectionRef}>
      <div className="container-brutal">
        <div className="section-overline reveal-text">ABOUT ME</div>
        <h2 className="section-heading-brutal reveal-text">WHO I AM</h2>

        <div className="about-split">
          <div className="about-left">
            <div className="about-left-inner">
              <h3 className="split-title reveal-text">THE STORY</h3>
              <p className="about-body reveal-blur">
                I&apos;m a passionate full-stack developer who turns ideas into
                reality through clean code and thoughtful design. I specialize in
                building modern, responsive websites and web applications that not
                only look stunning but drive real results.
              </p>
              <p className="about-body reveal-blur">
                Whether it&apos;s a sleek landing page, a complex e-commerce platform,
                or a custom web app &mdash; I approach every project with dedication to
                quality, performance, and attention to detail.
              </p>

              <div className="stamps-row reveal-blur">
                {stats.map((stat, i) => (
                  <div key={i} className={`evidence-stamp ${stat.color}`}>
                    <span className="stamp-number">{stat.number}</span>
                    <span className="stamp-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="about-right-inner">
              <h3 className="split-title reveal-text">TECH STACK</h3>
              <div className="tech-brutal-grid reveal-blur">
                {techStack.map((tech, i) => (
                  <div key={i} className="tech-brutal-item">
                    <span className="tech-dot" style={{ background: tech.color }} />
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
