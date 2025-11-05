import { useMemo } from "react";

interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
  depth: number;
  isCyan: boolean;
}

export const useParticles = (seed: number, count: number = 8): Particle[] => {
  return useMemo(() => {
    const seededRandom = (index: number) => {
      const x = Math.sin(seed * index * 12.9898 + index * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: count }, (_, i) => ({
      left: seededRandom(i * 2) * 100,
      top: seededRandom(i * 2 + 1) * 100,
      duration: 3 + seededRandom(i * 3) * 4,
      delay: seededRandom(i * 4) * 2,
      depth: 50 + seededRandom(i * 5) * 50,
      isCyan: i % 2 === 0,
    }));
  }, [seed, count]);
};
