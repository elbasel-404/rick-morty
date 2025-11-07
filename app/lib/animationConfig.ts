/**
 * Centralized animation timing configuration for card loading animations.
 *
 * All animation durations are calculated from a single speed modifier to ensure
 * consistent, proportional timing relationships across all cards.
 */

export interface AnimationTimings {
  /** Minimum time skeleton stays visible (ms) */
  minSkeletonVisibility: number;
  /** Duration of skeleton fade out animation (ms) */
  skeletonFadeOut: number;
  /** Duration of card fade in animation (ms) */
  cardFadeIn: number;
  /** Delay before card fade in starts (ms) */
  cardFadeInDelay: number;
  /** Total animation sequence duration (ms) */
  totalDuration: number;
}

/**
 * Calculate animation timings based on a speed modifier.
 *
 * @param speedModifier - Multiplier for animation speed (0.5 = slower, 2 = faster)
 *                        Default is 1.0 for standard timing
 * @returns Calculated animation timings with guaranteed relationships
 *
 * Timing Algorithm:
 * - Minimum skeleton visibility: Fixed at 1000ms (1 second) as requested
 * - Skeleton fade out: 800ms * modifier (quick exit)
 * - Card fade in: 1800ms * modifier (elegant entrance, 2.25x skeleton fade)
 * - Card fade delay: 200ms * modifier (sequential timing gap)
 * - Total: minVisibility + fadeOut + delay + fadeIn
 */
export function calculateAnimationTimings(
  speedModifier = 1.0
): AnimationTimings {
  // Ensure modifier is positive
  const modifier = Math.max(0.1, speedModifier);

  // Fixed minimum skeleton visibility (1 second as requested)
  const minSkeletonVisibility = 2000;

  // Calculate proportional durations based on modifier
  const skeletonFadeOut = Math.round(800 * modifier) + 3;
  const cardFadeIn = Math.round(1800 * modifier) + 3;
  const cardFadeInDelay = Math.round(200 * modifier) + 3;

  // Total sequence duration
  const totalDuration =
    minSkeletonVisibility + skeletonFadeOut + cardFadeInDelay + cardFadeIn;

  return {
    minSkeletonVisibility,
    skeletonFadeOut,
    cardFadeIn,
    cardFadeInDelay,
    totalDuration,
  };
}

/**
 * Default animation timings (speed modifier = 1.0)
 */
export const DEFAULT_ANIMATION_TIMINGS = calculateAnimationTimings(1.0);

/**
 * Preset speed configurations for common use cases
 */
export const ANIMATION_PRESETS = {
  /** Slower, more dramatic animations (modifier: 1.5) */
  slow: calculateAnimationTimings(1.5),

  /** Standard timing (modifier: 1.0) */
  normal: calculateAnimationTimings(1.0),

  /** Faster, snappier animations (modifier: 0.7) */
  fast: calculateAnimationTimings(0.7),

  /** Very quick animations for power users (modifier: 0.4) */
  instant: calculateAnimationTimings(0.4),
} as const;

/**
 * Easing function for smooth animations
 * Using cubic-bezier(0.4, 0.0, 0.2, 1) - standard material design easing
 */
export const ANIMATION_EASING = "cubic-bezier(0.4, 0.0, 0.2, 1)";

/**
 * Example usage:
 *
 * ```tsx
 * import { DEFAULT_ANIMATION_TIMINGS, calculateAnimationTimings } from '@/app/util/animationConfig';
 *
 * // Use default timings
 * <CardContainer
 *   minSkeletonVisibility={DEFAULT_ANIMATION_TIMINGS.minSkeletonVisibility}
 *   skeletonFadeOutDuration={DEFAULT_ANIMATION_TIMINGS.skeletonFadeOut}
 *   cardFadeInDuration={DEFAULT_ANIMATION_TIMINGS.cardFadeIn}
 *   cardFadeInDelay={DEFAULT_ANIMATION_TIMINGS.cardFadeInDelay}
 * />
 *
 * // Or use custom speed
 * const customTimings = calculateAnimationTimings(0.8); // 20% faster
 * ```
 */
