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
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40 motion-preset-float motion-ease-in-out"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            transform: `translateZ(${particle.depth}px)`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
