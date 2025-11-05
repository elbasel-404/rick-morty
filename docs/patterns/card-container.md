# CardContainer Component

A high-level container component that handles all lazy loading, skeleton states, fade transitions, and viewport detection. Card components can now focus purely on presentation.

## Architecture

```
CardContainer (handles logic)
    ├── Viewport detection
    ├── Image preloading
    ├── Skeleton fade management
    └── Children (presentation only)
```

## Benefits

✅ **Separation of Concerns**: Logic separated from presentation  
✅ **Reusability**: Same container for all card types  
✅ **Consistency**: Unified loading behavior  
✅ **Simplicity**: Cards only handle UI rendering  
✅ **Flexibility**: Customizable skeleton variants

## Usage

### Basic Example

```tsx
import { CardContainer } from "./CardContainer";

export const MyCard = ({ data }) => {
  return (
    <CardContainer
      imageUrl={data.image}
      imageAlt={data.name}
      skeletonVariant="default"
      className="w-full h-96"
    >
      {({ cardOpacity, imageLoaded }) => (
        <div style={{ opacity: cardOpacity }}>
          {/* Your card UI here */}
          <img src={data.image} alt={data.name} />
          <h2>{data.name}</h2>
        </div>
      )}
    </CardContainer>
  );
};
```

### Advanced Example (CharacterCardI)

```tsx
export const CharacterCardI = ({ character }: CharacterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { rotation, handleMouseMove, resetRotation } = useCardRotation();

  return (
    <CardContainer
      imageUrl={character.image}
      imageAlt={character.name}
      skeletonVariant="card-i"
      skeletonClassName="border-4 border-purple-500/30"
      className="relative w-full h-full min-h-[400px]"
      fadeOutDuration={800}
    >
      {({ cardOpacity, imageLoaded }) => (
        <div
          style={{ perspective: "1000px" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
        >
          <div style={{ opacity: cardOpacity }}>
            {/* Card presentation UI */}
          </div>
        </div>
      )}
    </CardContainer>
  );
};
```

## API Reference

### Props

| Prop                 | Type                                 | Default      | Description                     |
| -------------------- | ------------------------------------ | ------------ | ------------------------------- |
| `imageUrl`           | `string`                             | **required** | URL of the image to preload     |
| `imageAlt`           | `string`                             | **required** | Alt text for accessibility      |
| `skeletonVariant`    | `"card-i" \| "card-ii" \| "default"` | `"default"`  | Skeleton layout variant         |
| `skeletonClassName`  | `string`                             | `""`         | Additional classes for skeleton |
| `className`          | `string`                             | `""`         | Container wrapper classes       |
| `fadeOutDuration`    | `number`                             | `800`        | Skeleton fade duration (ms)     |
| `viewportThreshold`  | `number`                             | `0.1`        | Intersection observer threshold |
| `viewportRootMargin` | `string`                             | `"400px"`    | Intersection observer margin    |
| `children`           | `function`                           | **required** | Render prop function            |

### Render Prop Arguments

The `children` function receives an object with:

```typescript
{
  cardOpacity: number; // 0-1, for fade-in effect
  imageLoaded: boolean; // true when image loaded
}
```

## Skeleton Variants

### `card-i` - Holographic Style

- Purple/violet gradient theme
- Animated scan lines
- Floating particles
- Circular center placeholder
- Glowing progress bars

**Best for**: Futuristic, holographic card designs

### `card-ii` - Cyber Style

- Cyan/pink gradient theme
- Centered circular image
- Minimal badges layout
- Clean geometric shapes

**Best for**: Cyberpunk, flip cards

### `default` - Generic

- Simple centered layout
- Circular avatar placeholder
- Text bars

**Best for**: Simple cards, prototypes

## Creating Custom Skeleton Variants

### 1. Add variant to SkeletonLoader

Edit `card-parts/SkeletonLoader.tsx`:

```tsx
// Add to variant type
variant?: "card-i" | "card-ii" | "my-variant" | "default"

// Create content component
const MyVariantSkeletonContent = () => (
  <div className="relative h-full p-6">
    {/* Your skeleton layout */}
  </div>
);

// Add to SkeletonLoader render
{variant === "my-variant" && <MyVariantSkeletonContent />}
```

### 2. Use in CardContainer

```tsx
<CardContainer
  skeletonVariant="my-variant"
  skeletonClassName="border-2 border-blue-500"
  // ... other props
>
```

## How It Works

### Loading Flow

```
1. Component mounts
   └─> CardContainer ref attached

2. Element enters viewport
   └─> Trigger image preload
   └─> Show skeleton (opacity: 1)

3. Image loads
   └─> Start skeleton fade (opacity: 1 → 0)
   └─> Duration: fadeOutDuration

4. Skeleton fades complete
   └─> Start card fade (opacity: 0 → 1)
   └─> Duration: 1200ms
   └─> Card fully visible
```

### State Management

Internally uses three hooks:

- `useInViewport`: Detects when card enters viewport
- `useImageLoad`: Tracks image load state
- `useSkeletonFade`: Manages fade timing and opacity

## Migration Guide

### Before (Without CardContainer)

```tsx
export const MyCard = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
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
      {isInViewport && (
        <img src={data.image} onLoad={handleImageLoad} className="hidden" />
      )}
      {showSkeleton && (
        <SkeletonLoader opacity={skeletonOpacity} variant="default" />
      )}
      <div style={{ opacity: cardOpacity }}>{/* UI */}</div>
    </div>
  );
};
```

### After (With CardContainer)

```tsx
export const MyCard = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CardContainer
      imageUrl={data.image}
      imageAlt={data.name}
      skeletonVariant="default"
    >
      {({ cardOpacity }) => (
        <div style={{ opacity: cardOpacity }}>{/* UI */}</div>
      )}
    </CardContainer>
  );
};
```

**Lines of code reduced**: ~15 → ~3 (80% reduction)

## Performance Considerations

### Viewport Detection

- Only loads images when card is near viewport
- Configurable `rootMargin` for preloading distance
- Reduces initial bundle impact

### Fade Timing

- Skeleton fade: 800ms (configurable)
- Card fade: 1200ms (smooth entrance)
- Non-blocking, uses CSS transitions

### Image Preloading

- Hidden `<img>` element triggers browser cache
- Actual image render uses cached version
- Zero flicker on reveal

## Examples in Codebase

1. **CharacterCardI** - Holographic 3D card with particles
2. **CharacterCardII** - Cyber flip card with dual sides

Both now use `CardContainer` with custom skeleton variants.

## Troubleshooting

### Card not fading in

- Ensure `opacity: cardOpacity` is set in child
- Check `fadeOutDuration` isn't too short

### Skeleton showing indefinitely

- Verify `imageUrl` is valid
- Check network tab for image load errors
- Ensure `imageLoaded` is being used

### Wrong skeleton variant showing

- Check `skeletonVariant` prop spelling
- Verify variant exists in `SkeletonLoader.tsx`

### Performance issues

- Reduce `rootMargin` if loading too many
- Increase `threshold` for later loading
- Check for too many simultaneous cards
