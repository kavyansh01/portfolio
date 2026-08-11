'use client';
import { useEffect, useRef } from 'react';

const services = [
  {
    num: '01',
    title: 'WEB DEVELOPMENT',
    description: 'Custom-built, responsive websites that load fast, look stunning, and are optimized to convert visitors into customers.',
    features: ['Responsive & Mobile-First', 'SEO Optimized', 'Lightning-Fast Performance', 'Custom Animations'],
  },
  {
    num: '02',
    title: 'FULL-STACK APPS',
    description: 'End-to-end web applications with robust back-ends, databases, authentication, and APIs \u2014 everything your business needs.',
    features: ['Custom APIs & Back-End', 'Database Design', 'User Authentication', 'Admin Dashboards'],
  },
  {
    num: '03',
    title: 'E-COMMERCE',
    description: 'Beautiful online stores with secure payment integration, inventory management, and optimized checkout flows.',
    features: ['Secure Payments', 'Inventory Management', 'Cart Optimization', 'Order Analytics'],
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal-text, .reveal-blur, .service-card-brutal').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services-brutal" ref={sectionRef}>
      <div className="container-brutal">
        <div className="section-overline reveal-text">WHAT I DO</div>
        <h2 className="section-heading-brutal reveal-text">SERVICES</h2>

        <div className="services-stack">
          {services.map((service, i) => (
            <div key={i} className="service-card-brutal">
              <div className="service-header">
                <span className="service-num">{service.num}</span>
                <h3 className="service-title-brutal">{service.title}</h3>
              </div>
              <p className="service-desc-brutal">{service.description}</p>
              <div className="service-features-brutal">
                {service.features.map((f, j) => (
                  <span key={j} className="brutal-tag">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
