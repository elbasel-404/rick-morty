interface Particle {
  id: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
  depth: number;
  isCyan: boolean;
}

/**
 * Generate deterministic particles based on a seed value
 * This is a pure function that returns the same particles for the same seed
 */
export const generateParticles = (
  seed: number,
  count: number = 8,
): Particle[] => {
  const seededRandom = (index: number) => {
    const x = Math.sin(seed * index * 12.9898 + index * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  return Array.from({ length: count }, (_, i) => ({
    id: `particle-${seed}-${i}`,
    left: seededRandom(i * 2) * 100,
    top: seededRandom(i * 2 + 1) * 100,
    duration: 3 + seededRandom(i * 3) * 4,
    delay: seededRandom(i * 4) * 2,
    depth: 50 + seededRandom(i * 5) * 50,
    isCyan: i % 2 === 0,
  }));
};

/**
 * Hook wrapper for backward compatibility
 * Since particles are deterministic based on seed, no memoization needed
 */
export const useParticles = (seed: number, count: number = 8): Particle[] => {
  return generateParticles(seed, count);
};
