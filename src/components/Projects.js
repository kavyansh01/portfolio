'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const projects = [
  {
    title: 'NovaBites',
    role: 'Restaurant Website',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    description: 'A modern restaurant website with online menu, table reservations, and a seamless mobile experience.',
    screenshot: '/images/ss-novabites.png',
    liveLink: '/projects/novabites',
    githubLink: 'https://github.com/kavyansh01/portfolio',
  },
  {
    title: 'CloudSync',
    role: 'SaaS Dashboard',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Chart.js'],
    description: 'A team collaboration dashboard with real-time analytics, task management, and data visualizations.',
    screenshot: '/images/ss-cloudsync.png',
    liveLink: '/projects/cloudsync',
    githubLink: 'https://github.com/kavyansh01/portfolio',
  },
  {
    title: 'LuxeCart',
    role: 'E-Commerce Platform',
    tags: ['Next.js', 'Stripe', 'Prisma', 'CSS'],
    description: 'A premium e-commerce platform for luxury goods with secure payments and optimized checkout flow.',
    screenshot: '/images/ss-luxecart.png',
    liveLink: '/projects/luxecart',
    githubLink: 'https://github.com/kavyansh01/portfolio',
  },
  {
    title: 'GreenSpace',
    role: 'Real Estate Platform',
    tags: ['React', 'Node.js', 'Maps API', 'MongoDB'],
    description: 'A real estate listing platform with advanced search, interactive maps, and agent contact system.',
    screenshot: '/images/ss-greenspace.png',
    liveLink: '/projects/greenspace',
    githubLink: 'https://github.com/kavyansh01/portfolio',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal-text, .reveal-blur, .project-card-brutal').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-brutal" ref={sectionRef}>
      <div className="container-brutal">
        <div className="section-overline reveal-text">MY WORK</div>
        <h2 className="section-heading-brutal reveal-text">DEMO</h2>
        <h2 className="section-heading-brutal section-heading-outline reveal-text">WORKS</h2>

        <div className="projects-stack">
          {projects.map((project, i) => (
            <div key={i} className="project-card-brutal">
              <div className="project-card-header">
                <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="project-card-title-block">
                  <h3 className="project-title-brutal">{project.title}</h3>
                  <span className="project-role">{project.role}</span>
                </div>
                <div className="project-card-links">
                  <a href={project.liveLink} className="project-link-brutal">LIVE DEMO ↗</a>
                  <a href={project.githubLink || 'https://github.com/kavyansh01/portfolio'} className="project-link-brutal" target="_blank" rel="noopener noreferrer">GITHUB →</a>
                </div>
              </div>

              <div className="project-card-body">
                <div className="project-card-left">
                  <p className="project-desc-brutal">{project.description}</p>
                  <div className="project-tags-brutal">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="brutal-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="project-card-right">
                  <div className="project-ss-brutal">
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} preview`}
                      width={500}
                      height={300}
                      className="project-ss-img-brutal"
                      unoptimized
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
