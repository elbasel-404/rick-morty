interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
  depth: number;
  isCyan: boolean;
}

const DEFAULT_PARTICLE_COUNT = 8;
const DURATION_BASE = 3;
const DURATION_RANDOM_FACTOR = 4;
const DELAY_RANDOM_FACTOR = 2;
const DEPTH_BASE = 50;
const DEPTH_RANDOM_FACTOR = 50;

/**
 * Generate deterministic particles based on a seed value
 * This is a pure function that returns the same particles for the same seed
 */
export const generateParticles = (
  seed: number,
  count: number = DEFAULT_PARTICLE_COUNT,
): Particle[] => {
  const seededRandom = (index: number) => {
    const x = Math.sin(seed * index * 12.9898 + index * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  return Array.from({ length: count }, (_, i) => ({
    left: seededRandom(i * 2) * 100,
    top: seededRandom(i * 2 + 1) * 100,
    duration: DURATION_BASE + seededRandom(i * 3) * DURATION_RANDOM_FACTOR,
    delay: seededRandom(i * 4) * DELAY_RANDOM_FACTOR,
    depth: DEPTH_BASE + seededRandom(i * 5) * DEPTH_RANDOM_FACTOR,
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
