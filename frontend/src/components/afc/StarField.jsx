import React, { useMemo } from "react";

// Pure-CSS star field background. Deep space aesthetic.
export const StarField = ({ density = 110 }) => {
  const stars = useMemo(() => {
    const out = [];
    for (let i = 0; i < density; i++) {
      out.push({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.3,
        opacity: Math.random() * 0.7 + 0.2,
        twinkle: Math.random() * 4 + 2,
        delay: Math.random() * 3,
      });
    }
    return out;
  }, [density]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(ellipse at 85% 90%, rgba(251,191,36,0.08), transparent 55%), linear-gradient(180deg, #04060f 0%, #060a1f 50%, #050816 100%)",
        }}
      />
      {/* subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 4}px rgba(255,255,255,${s.opacity * 0.6})`,
            animation: `afcTwinkle ${s.twinkle}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
