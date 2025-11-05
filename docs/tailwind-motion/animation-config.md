# Animation Configuration System

## Overview

This document describes the centralized animation timing system for Rick and Morty character cards. All animation durations are calculated from a single speed modifier to ensure consistent, proportional timing relationships across all cards.

## Core Concept

Instead of hardcoding animation timings in multiple places, we use an algorithm-based approach:

1. **Single Source of Truth**: All timings are defined in `app/util/animationConfig.ts`
2. **Proportional Relationships**: All durations scale together using a speed modifier
3. **Guaranteed Minimum**: Skeleton stays visible for at least 1 second
4. **Automatic Calculation**: Timings are computed algorithmically, not manually set

## Animation Timing Configuration

### File: `app/util/animationConfig.ts`

```typescript
export interface AnimationTimings {
  minSkeletonVisibility: number; // Fixed at 1000ms
  skeletonFadeOut: number; // 800ms * modifier
  cardFadeIn: number; // 1800ms * modifier
  cardFadeInDelay: number; // 200ms * modifier
  totalDuration: number; // Calculated sum
}
```

### Algorithm

```typescript
function calculateAnimationTimings(speedModifier = 1.0): AnimationTimings {
  const modifier = Math.max(0.1, speedModifier);

  // Fixed minimum skeleton visibility (1 second guarantee)
  const minSkeletonVisibility = 1000;

  // Proportional durations
  const skeletonFadeOut = Math.round(800 * modifier);
  const cardFadeIn = Math.round(1800 * modifier);
  const cardFadeInDelay = Math.round(200 * modifier);

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
```

### Timing Ratios (at modifier = 1.0)

- **Skeleton fade out**: 800ms (quick exit)
- **Card fade in**: 1800ms (elegant entrance, 2.25x skeleton fade)
- **Card fade delay**: 200ms (sequential timing gap)
- **Minimum skeleton**: 1000ms (fixed, not affected by modifier)

These ratios remain constant regardless of speed modifier.

## Usage in Components

### Standard Usage (Default Timings)

```tsx
import { DEFAULT_ANIMATION_TIMINGS } from "@util";

<CardContainer
  imageUrl={character.image}
  imageAlt={character.name}
  minSkeletonVisibility={DEFAULT_ANIMATION_TIMINGS.minSkeletonVisibility}
  skeletonFadeOutDuration={DEFAULT_ANIMATION_TIMINGS.skeletonFadeOut}
  cardFadeInDuration={DEFAULT_ANIMATION_TIMINGS.cardFadeIn}
  cardFadeInDelay={DEFAULT_ANIMATION_TIMINGS.cardFadeInDelay}
>
  {/* Card content */}
</CardContainer>;
```

### Custom Speed

```tsx
import { calculateAnimationTimings } from "@util";

const customTimings = calculateAnimationTimings(0.7); // 30% faster

<CardContainer
  minSkeletonVisibility={customTimings.minSkeletonVisibility}
  skeletonFadeOutDuration={customTimings.skeletonFadeOut}
  cardFadeInDuration={customTimings.cardFadeIn}
  cardFadeInDelay={customTimings.cardFadeInDelay}
>
  {/* Card content */}
</CardContainer>;
```

### Presets

```tsx
import { ANIMATION_PRESETS } from "@util";

// Available presets
ANIMATION_PRESETS.slow; // modifier: 1.5 (slower)
ANIMATION_PRESETS.normal; // modifier: 1.0 (default)
ANIMATION_PRESETS.fast; // modifier: 0.7 (faster)
ANIMATION_PRESETS.instant; // modifier: 0.4 (very quick)
```

## Animation Sequence Flow

```
User enters viewport
       ↓
Skeleton appears (1000ms minimum)
       ↓
Image loads
       ↓
[Wait for remaining minimum time if needed]
       ↓
Skeleton fades out (800ms)
       ↓
Delay (200ms)
       ↓
Card fades in (1800ms)
       ↓
Animation complete
```

### Total Duration Examples

- **Normal speed (modifier = 1.0)**: 1000 + 800 + 200 + 1800 = **3800ms**
- **Fast speed (modifier = 0.7)**: 1000 + 560 + 140 + 1260 = **2960ms**
- **Slow speed (modifier = 1.5)**: 1000 + 1200 + 300 + 2700 = **5200ms**

## Implementation Details

### CardContainer Changes

The `CardContainer` component now:

1. **Tracks skeleton start time** using `skeletonStartTimeRef`
2. **Enforces minimum visibility** by calculating remaining time
3. **Waits before fading** to ensure skeleton shows for at least 1 second

```typescript
// Calculate how long skeleton has been visible
const skeletonVisibleTime = skeletonStartTimeRef.current
  ? Date.now() - skeletonStartTimeRef.current
  : 0;

// Calculate remaining time to reach minimum visibility
const remainingTime = Math.max(0, minSkeletonVisibility - skeletonVisibleTime);

// Wait for minimum visibility time, then start skeleton fade out
setTimeout(() => {
  setHideSkeleton(true);
  // Show card after skeleton finishes fading
  setTimeout(() => setShowCard(true), skeletonFadeOutDuration);
}, remainingTime);
```

### Cached Image Handling

If an image is cached and loads instantly:

- Skeleton is **skipped entirely** (no 1-second wait)
- Card appears immediately
- This provides a snappy experience for returning users

## Benefits

### 1. Consistency

All cards use the same timing relationships, ensuring a cohesive UX.

### 2. Maintainability

Change one modifier to adjust all animation speeds proportionally.

### 3. Experimentation

Easy to test different speeds without touching component code:

```typescript
// Try different speeds globally
export const DEFAULT_ANIMATION_TIMINGS = calculateAnimationTimings(0.8);
```

### 4. Type Safety

TypeScript ensures all timing values are used correctly.

### 5. Self-Documenting

The algorithm makes timing relationships explicit and clear.

## Customization Examples

### Per-Card Custom Speed

```tsx
// Faster animations for Card III
const cardIIITimings = calculateAnimationTimings(0.6);

export const CharacterCardIII = ({ character }) => (
  <CardContainer
    minSkeletonVisibility={cardIIITimings.minSkeletonVisibility}
    skeletonFadeOutDuration={cardIIITimings.skeletonFadeOut}
    cardFadeInDuration={cardIIITimings.cardFadeIn}
    cardFadeInDelay={cardIIITimings.cardFadeInDelay}
  >
    {/* ... */}
  </CardContainer>
);
```

### User Preference

```tsx
// Future: User-configurable animation speed
const getUserPreference = () => {
  const speed = localStorage.getItem("animationSpeed") || "1.0";
  return calculateAnimationTimings(parseFloat(speed));
};

const userTimings = getUserPreference();
```

### Responsive Speed

```tsx
// Future: Faster on mobile, slower on desktop
const responsiveTimings = isMobile
  ? calculateAnimationTimings(0.6)
  : calculateAnimationTimings(1.0);
```

## Testing Different Speeds

To test different animation speeds across the entire app:

1. Open `app/util/animationConfig.ts`
2. Modify the default export:

```typescript
// Make all animations 30% faster
export const DEFAULT_ANIMATION_TIMINGS = calculateAnimationTimings(0.7);
```

3. All cards update automatically!

## Migration Notes

### Before (Hardcoded)

```tsx
<CardContainer
  skeletonFadeOutDuration={800}
  cardFadeInDuration={1800}
  cardFadeInDelay={200}
>
```

**Problems:**

- Values duplicated across components
- No relationship between timings
- Hard to experiment with different speeds
- No minimum skeleton visibility guarantee

### After (Centralized)

```tsx
import { DEFAULT_ANIMATION_TIMINGS } from "@util";

<CardContainer
  minSkeletonVisibility={DEFAULT_ANIMATION_TIMINGS.minSkeletonVisibility}
  skeletonFadeOutDuration={DEFAULT_ANIMATION_TIMINGS.skeletonFadeOut}
  cardFadeInDuration={DEFAULT_ANIMATION_TIMINGS.cardFadeIn}
  cardFadeInDelay={DEFAULT_ANIMATION_TIMINGS.cardFadeInDelay}
>
```

**Benefits:**

- Single source of truth
- Proportional relationships maintained
- Easy global adjustments
- Guaranteed 1-second minimum visibility
- Type-safe

## Future Enhancements

1. **Animation Curve Customization**: Add easing function parameters
2. **Per-Card Overrides**: Allow individual cards to tweak specific timings
3. **Performance Monitoring**: Track actual vs. expected timing
4. **Accessibility**: Respect `prefers-reduced-motion` media query
5. **Analytics**: Measure user engagement with different speeds

## Related Files

- `app/util/animationConfig.ts` - Core animation configuration
- `app/component/CardContainer.tsx` - Animation orchestration
- `app/component/CharacterCardI.tsx` - Example usage (Card I)
- `app/component/CharacterCardII.tsx` - Example usage (Card II)
- `app/component/effects/FadeIn.tsx` - Fade in effect component
- `app/component/effects/FadeOut.tsx` - Fade out effect component
