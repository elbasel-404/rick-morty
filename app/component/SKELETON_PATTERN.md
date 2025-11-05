# Skeleton Fade Pattern

A reusable fade in/out skeleton loading pattern for smooth image loading transitions.

## Components

### `useSkeletonFade` Hook

A custom hook that manages the skeleton fade-out and card fade-in timing.

**Usage:**
```tsx
const { showSkeleton, skeletonOpacity, cardOpacity, showCard } = useSkeletonFade({
  imageLoaded,
  isInViewport,
  fadeOutDuration: 800, // optional, defaults to 800ms
});
```

**Parameters:**
- `imageLoaded` (boolean): Whether the image has finished loading
- `isInViewport` (boolean): Whether the element is currently in viewport
- `fadeOutDuration` (number, optional): Duration in ms for skeleton fade out (default: 800)

**Returns:**
- `showSkeleton` (boolean): Whether to render the skeleton
- `skeletonOpacity` (number): Opacity value for skeleton (0-1)
- `cardOpacity` (number): Opacity value for card content (0-1)
- `showCard` (boolean): Whether the card should be visible

### `SkeletonLoader` Component

A reusable skeleton loading component with multiple variants.

**Usage:**
```tsx
{showSkeleton && (
  <SkeletonLoader
    opacity={skeletonOpacity}
    variant="card-i"
    className="border-4 border-purple-500/30"
  />
)}
```

**Props:**
- `opacity` (number): Opacity value (0-1)
- `variant` ("card-i" | "card-ii" | "default", optional): Skeleton content layout
- `className` (string, optional): Additional CSS classes

**Variants:**
- `card-i`: Skeleton for CharacterCardI layout (badges, character info, stats)
- `card-ii`: Skeleton for CharacterCardII layout (centered image, flip card)
- `default`: Generic skeleton with centered content

## Implementation Example

```tsx
import { useSkeletonFade } from "./hooks/useSkeletonFade";
import { SkeletonLoader } from "./card-parts/SkeletonLoader";
import { useImageLoad } from "./hooks/useImageLoad";
import { useInViewport } from "./useInViewport";

export const MyCard = ({ data }) => {
  const { imageLoaded, handleImageLoad } = useImageLoad();
  const { elementRef, isInViewport } = useInViewport({
    threshold: 0.1,
    rootMargin: "400px",
  });
  const { showSkeleton, skeletonOpacity, cardOpacity } = useSkeletonFade({
    imageLoaded,
    isInViewport,
  });

  return (
    <div ref={elementRef}>
      {/* Preload image */}
      {isInViewport && (
        <img
          src={data.image}
          alt={data.name}
          onLoad={handleImageLoad}
          className="hidden"
        />
      )}

      {/* Skeleton */}
      {showSkeleton && (
        <SkeletonLoader
          opacity={skeletonOpacity}
          variant="default"
        />
      )}

      {/* Your card content */}
      <div style={{ opacity: cardOpacity }}>
        {/* ... */}
      </div>
    </div>
  );
};
```

## Animation Flow

1. **Not in viewport**: Skeleton shown at full opacity (1)
2. **Enter viewport**: Image starts loading, skeleton visible
3. **Image loaded**: 
   - Skeleton fades out over 800ms (opacity: 1 → 0)
   - After 800ms, card fades in over 1200ms (opacity: 0 → 1)

## Customization

### Creating New Skeleton Variants

Add new skeleton content variants in `SkeletonLoader.tsx`:

```tsx
// Add variant type
variant?: "card-i" | "card-ii" | "my-custom-variant" | "default"

// Add variant content component
const MyCustomSkeletonContent = () => (
  <div className="relative h-full p-6">
    {/* Your custom skeleton layout */}
  </div>
);

// Use in SkeletonLoader
{variant === "my-custom-variant" && <MyCustomSkeletonContent />}
```

### Adjusting Timing

Control fade durations:

```tsx
// Hook: skeleton fade out duration
useSkeletonFade({
  imageLoaded,
  isInViewport,
  fadeOutDuration: 1000, // slower fade out
});

// Component: card fade in duration
<div style={{
  opacity: cardOpacity,
  transition: "opacity 1500ms cubic-bezier(0.4, 0.0, 0.2, 1)", // slower fade in
}}>
```

## Features

- ✅ Viewport-aware loading (only loads when in view)
- ✅ Smooth fade transitions
- ✅ Reusable across multiple card types
- ✅ Customizable timing and variants
- ✅ Shimmer effect for better UX
- ✅ Corner accents for visual polish
