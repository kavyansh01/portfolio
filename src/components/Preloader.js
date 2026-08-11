'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 50);
    const t2 = setTimeout(() => setPhase(2), 450);
    const t3 = setTimeout(() => setPhase(3), 850);
    const t4 = setTimeout(() => setHidden(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (hidden) return null;

  return (
    <div className={`preloader ${phase >= 3 ? 'preloader-exit' : ''}`}>
      <div className="preloader-inner">
        <div className={`preloader-name ${phase >= 1 ? 'preloader-name-visible' : ''}`}>
          KAVYANSH
        </div>
        <div className={`preloader-role ${phase >= 2 ? 'preloader-role-visible' : ''}`}>
          Full-Stack Developer
        </div>
      </div>
    </div>
  );
}
