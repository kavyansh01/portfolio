'use client';
import { useState, useEffect, useRef } from 'react';

const navItems = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState(0);
  const indicatorRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current || !indicatorRef.current) return;
      const items = navRef.current.querySelectorAll('.bnav-item');
      const activeItem = items[active];
      if (!activeItem) return;
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      indicatorRef.current.style.width = `${itemRect.width}px`;
      indicatorRef.current.style.left = `${itemRect.left - navRect.left}px`;
    };
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [active]);

  useEffect(() => {
    const onScroll = () => {
      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPos) {
          setActive(i);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (i, href) => {
    setActive(i);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bnav-container">
      <div className="bnav-bar" ref={navRef}>
        <div className="bnav-indicator" ref={indicatorRef} />
        {navItems.map((item, i) => (
          <button
            key={item.href}
            className={`bnav-item ${i === active ? 'bnav-active' : ''}`}
            onClick={() => handleClick(i, item.href)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
