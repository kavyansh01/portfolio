'use client';

export default function Marquee({ text = 'KAVYANSH', separator = '\u2726', count = 12, reverse = false, speed = 40 }) {
  const items = Array(count).fill(null);
  const animStyle = {
    animation: `${reverse ? 'marquee-right' : 'marquee-left'} ${speed}s linear infinite`,
  };

  return (
    <div className="marquee-wrap">
      <div className="marquee-track" style={animStyle}>
        {items.map((_, i) => (
          <span key={i} className="marquee-item">
            {text} <span className="marquee-sep">{separator}</span>
          </span>
        ))}
        {items.map((_, i) => (
          <span key={`d-${i}`} className="marquee-item">
            {text} <span className="marquee-sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
