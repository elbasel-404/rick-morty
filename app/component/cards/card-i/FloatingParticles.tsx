import { useEffect, useState } from "react";

interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
  depth: number;
}

interface FloatingParticlesProps {
  particles: Particle[];
}

export const FloatingParticles = ({ particles }: FloatingParticlesProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isMounted &&
          particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
                transform: `translateZ(${particle.depth}px)`,
              }}
            />
          ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateZ(50px); }
          50% { transform: translateY(-20px) translateZ(60px); }
        }
      `}</style>
    </>
  );
};
