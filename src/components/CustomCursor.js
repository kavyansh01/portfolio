'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      requestAnimationFrame(animate);
    };

    const onEnterHover = () => {
      follower.style.width = '60px';
      follower.style.height = '60px';
      follower.style.borderColor = 'var(--accent)';
    };

    const onLeaveHover = () => {
      follower.style.width = '40px';
      follower.style.height = '40px';
      follower.style.borderColor = 'var(--navy)';
    };

    document.addEventListener('mousemove', onMouseMove);
    animate();

    const addHoverListeners = () => {
      const hoverEls = document.querySelectorAll('a, button, [role="button"], .cursor-hover');
      hoverEls.forEach(el => {
        el.addEventListener('mouseenter', onEnterHover);
        el.addEventListener('mouseleave', onLeaveHover);
      });
    };
    addHoverListeners();
    const hoverInterval = setInterval(addHoverListeners, 2000);

    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      follower.style.display = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      clearInterval(hoverInterval);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="custom-cursor-follower" />
    </>
  );
}
