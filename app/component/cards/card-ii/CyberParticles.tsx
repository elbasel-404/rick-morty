import { cn } from "@util";

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
}

export const CyberParticles = ({ particles }: CyberParticlesProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className={cn(
            "absolute w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full opacity-60",
            "motion-preset-float motion-ease-in-out",
            particle.isCyan ? "bg-cyan-400" : "bg-pink-400"
          )}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            transform: `translateZ(${particle.depth}px)`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
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
