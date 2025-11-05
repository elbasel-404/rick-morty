interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
  depth: number;
  isCyan: boolean;
}

interface CyberParticlesProps {
  particles: Particle[];
  isMounted: boolean;
}

export const CyberParticles = ({
  particles,
  isMounted,
}: CyberParticlesProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {isMounted &&
        particles.map((particle, i) => (
          <div
            key={i}
            className={`absolute w-0.5 sm:w-1 h-0.5 sm:h-1 ${
              particle.isCyan ? "bg-cyan-400" : "bg-pink-400"
            } rounded-full opacity-60`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `cyber-float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              transform: `translateZ(${particle.depth}px)`,
              boxShadow: `0 0 10px ${
                particle.isCyan
                  ? "rgba(6, 182, 212, 0.8)"
                  : "rgba(236, 72, 153, 0.8)"
              }`,
            }}
          />
        ))}
    </div>
  );
};
