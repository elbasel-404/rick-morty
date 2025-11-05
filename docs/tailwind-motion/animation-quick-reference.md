# Animation System Quick Reference

[🏠 Home](../index.md) | [Tailwind Motion](./index.md)


## Visual Timeline (Default Speed - Modifier 1.0)

```
Time: 0ms
│
│ [User scrolls to viewport]
│
├─ Skeleton appears ────────────────────────────────────────────┐
│                                                                │
│  [Image starts loading in background]                         │ Min 1000ms
│                                                                │ (Fixed)
│  [Image loads at ~300ms]                                      │
│                                                                │
│  [Waits for remaining 700ms]                                  │
│                                                                │
Time: 1000ms ───────────────────────────────────────────────────┘
│
├─ Skeleton fades out ──────────────┐
│                                   │ 800ms
│  [Opacity: 1 → 0]                │ (Scales with modifier)
│                                   │
Time: 1800ms ──────────────────────┘
│
├─ Delay ──┐
│          │ 200ms (Scales with modifier)
│          │
Time: 2000ms ──┘
│
├─ Card fades in ──────────────────────────────────────┐
│                                                       │
│  [Opacity: 0 → 1, elegant entrance]                 │ 1800ms
│                                                       │ (Scales with modifier)
│                                                       │
Time: 3800ms ──────────────────────────────────────────┘
│
└─ Animation complete! ✓
```

## Algorithm Flow

```
┌─────────────────────────────────┐
│  speedModifier (default: 1.0)   │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│     calculateAnimationTimings(modifier)             │
│                                                     │
│  • minSkeletonVisibility = 1000 (fixed)            │
│  • skeletonFadeOut = 800 × modifier                │
│  • cardFadeIn = 1800 × modifier                    │
│  • cardFadeInDelay = 200 × modifier                │
│  • totalDuration = sum of all above                │
└────────────┬────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  DEFAULT_ANIMATION_TIMINGS      │
│  {                              │
│    minSkeletonVisibility: 1000  │
│    skeletonFadeOut: 800         │
│    cardFadeIn: 1800             │
│    cardFadeInDelay: 200         │
│    totalDuration: 3800          │
│  }                              │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Import in components:          │
│                                 │
│  import {                       │
│    DEFAULT_ANIMATION_TIMINGS    │
│  } from "@util"                 │
│                                 │
│  <CardContainer                 │
│    {...DEFAULT_ANIMATION_TIMINGS}│
│  />                             │
└─────────────────────────────────┘
```

## Speed Comparison Chart

```
Modifier │ Skeleton │ Fade Out │ Delay │ Fade In │ Total
─────────┼──────────┼──────────┼───────┼─────────┼──────
  0.4    │  1000ms  │  320ms   │  80ms │  720ms  │ 2120ms  ⚡ instant
  0.7    │  1000ms  │  560ms   │ 140ms │ 1260ms  │ 2960ms  🚀 fast
  1.0    │  1000ms  │  800ms   │ 200ms │ 1800ms  │ 3800ms  ✓ normal
  1.5    │  1000ms  │  1200ms  │  300ms│ 2700ms  │ 5200ms  🐢 slow
```

## Component Usage Pattern

```tsx
// 1. Import the configuration
import { DEFAULT_ANIMATION_TIMINGS } from "@util";

// 2. Use in CardContainer
export const CharacterCardI = ({ character }) => {
  return (
    <CardContainer
      imageUrl={character.image}
      imageAlt={character.name}
      
      // Apply all timings
      minSkeletonVisibility={DEFAULT_ANIMATION_TIMINGS.minSkeletonVisibility}
      skeletonFadeOutDuration={DEFAULT_ANIMATION_TIMINGS.skeletonFadeOut}
      cardFadeInDuration={DEFAULT_ANIMATION_TIMINGS.cardFadeIn}
      cardFadeInDelay={DEFAULT_ANIMATION_TIMINGS.cardFadeInDelay}
    >
      {({ isVisible, imageLoaded }) => (
        // Card content
      )}
    </CardContainer>
  );
};
```

## Timing Ratios (Always Maintained)

```
                    Skeleton Fade Out (800ms)
                    ├─────────────────┤
                                      
Card Fade In (1800ms) = 2.25 × Skeleton Fade Out
├──────────────────────────────────────────┤

Delay (200ms) = 0.25 × Skeleton Fade Out
├─────┤

Min Skeleton (1000ms) = FIXED (not scaled)
├──────────────────────┤
```

## Presets Quick Access

```typescript
import { ANIMATION_PRESETS } from "@util";

// Use presets directly
<CardContainer {...ANIMATION_PRESETS.fast} />

// Available presets:
ANIMATION_PRESETS.slow     // Modifier: 1.5
ANIMATION_PRESETS.normal   // Modifier: 1.0 (same as DEFAULT_ANIMATION_TIMINGS)
ANIMATION_PRESETS.fast     // Modifier: 0.7
ANIMATION_PRESETS.instant  // Modifier: 0.4
```

## Custom Speed Example

```typescript
import { calculateAnimationTimings } from "@util";

// Create custom timing
const myTimings = calculateAnimationTimings(0.85); // 15% faster

// Use it
<CardContainer {...myTimings} />
```

## Global Speed Adjustment

Want to change speed for ALL cards at once?

Edit `app/util/animationConfig.ts`:

```typescript
// Option 1: Change the default
export const DEFAULT_ANIMATION_TIMINGS = calculateAnimationTimings(0.8);

// Option 2: Use a preset
export const DEFAULT_ANIMATION_TIMINGS = ANIMATION_PRESETS.fast;
```

All cards update automatically! 🎉

## Key Benefits Summary

✅ **Single modifier controls everything**
✅ **Guaranteed 1-second minimum skeleton**
✅ **Proportional relationships maintained**
✅ **Easy global speed changes**
✅ **Type-safe with TypeScript**
✅ **Presets for common use cases**
✅ **Self-documenting code**

## Files to Know

| File | Purpose |
|------|---------|
| `app/util/animationConfig.ts` | Core configuration & algorithm |
| `app/util/index.ts` | Exports for easy import |
| `app/component/CardContainer.tsx` | Enforces timing & orchestrates |
| `app/component/CharacterCard*.tsx` | Consumers of the config |
| `app/component/ANIMATION_CONFIG.md` | Full documentation |
| `app/component/ANIMATION_REFACTORING.md` | Change summary |

---

**Need help?** Check `ANIMATION_CONFIG.md` for detailed documentation!
