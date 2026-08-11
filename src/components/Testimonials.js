'use client';
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    text: 'Kavyansh delivered an exceptional website that exceeded our expectations. The attention to detail and design quality was outstanding. Our conversions increased by 40% within the first month!',
    author: 'Sarah Mitchell',
    role: 'Founder, NovaBites Restaurant',
    stampColor: 'stamp-blue',
  },
  {
    text: 'Working with Kavyansh was a fantastic experience. He understood our vision perfectly and built a dashboard that our entire team loves using. Highly recommended for any web project!',
    author: 'David Chen',
    role: 'CTO, CloudSync Technologies',
    stampColor: 'stamp-red',
  },
  {
    text: 'The e-commerce site Kavyansh built for us is absolutely beautiful. It loads incredibly fast, the checkout flow is seamless, and our customers constantly compliment the design.',
    author: 'Priya Sharma',
    role: 'Owner, LuxeCart Boutique',
    stampColor: 'stamp-yellow',
  },
];

export default function Testimonials() {
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
      sectionRef.current.querySelectorAll('.reveal-text, .reveal-blur, .testimonial-card-brutal').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="testimonials-brutal" ref={sectionRef}>
      <div className="container-brutal">
        <div className="section-overline reveal-text">TESTIMONIALS</div>
        <h2 className="section-heading-brutal reveal-text">CLIENT REVIEWS</h2>

        <div className="testimonials-brutal-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card-brutal">
              <div className="testimonial-stars-brutal">{"\u2605\u2605\u2605\u2605\u2605"}</div>
              <p className="testimonial-text-brutal">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-author-brutal">
                <div className={`testimonial-stamp-brutal ${t.stampColor}`}>
                  {t.author[0]}
                </div>
                <div>
                  <h4 className="testimonial-author-name">{t.author}</h4>
                  <p className="testimonial-author-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
