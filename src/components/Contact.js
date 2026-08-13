'use client';
import { useEffect, useRef } from 'react';

export default function Contact() {
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
    <section id="contact" className="contact-brutal" ref={sectionRef}>
      <div className="container-brutal">
        <div className="section-overline reveal-text">GET IN TOUCH</div>
        <h2 className="contact-heading reveal-text">CONTACT</h2>
        <h2 className="contact-heading contact-heading-2 reveal-text">ME</h2>

        <p className="contact-tagline reveal-blur">
          Ready to build something amazing? Let&apos;s talk.
        </p>

        <div className="contact-email-block reveal-blur">
          <a href="mailto:kavyanshworks@gmail.com" className="contact-email">
            say hi before overthinking it &rarr;
          </a>
          <span className="contact-email-actual">kavyanshworks@gmail.com</span>
        </div>

        <div className="contact-process reveal-blur">
          <div className="process-step">
            <span className="process-num">01</span>
            <span className="process-label">DISCOVER</span>
          </div>
          <div className="process-arrow">&rarr;</div>
          <div className="process-step">
            <span className="process-num">02</span>
            <span className="process-label">DESIGN</span>
          </div>
          <div className="process-arrow">&rarr;</div>
          <div className="process-step">
            <span className="process-num">03</span>
            <span className="process-label">DEVELOP</span>
          </div>
          <div className="process-arrow">&rarr;</div>
          <div className="process-step">
            <span className="process-num">04</span>
            <span className="process-label">DEPLOY</span>
          </div>
        </div>

        <div className="contact-socials reveal-blur">
          <a href="https://github.com/kavyansh01" className="social-brutal" target="_blank" rel="noopener noreferrer">GITHUB</a>
          <a href="#" className="social-brutal" onClick={(e) => { e.preventDefault(); alert('LinkedIn link coming soon!'); }}>LINKEDIN</a>
          <a href="#" className="social-brutal" onClick={(e) => { e.preventDefault(); alert('X.com link coming soon!'); }}>X.COM</a>
          <a href="https://www.fiverr.com/s/bd4AR71" className="social-brutal" target="_blank" rel="noopener noreferrer">FIVERR</a>
        </div>
      </div>
    </section>
  );
}
