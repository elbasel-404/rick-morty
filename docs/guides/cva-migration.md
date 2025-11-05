# CVA Migration Guide

## Overview

The project has been refactored to use **Class Variance Authority (CVA)** for managing component styling variants. This provides better type safety, composability, and developer experience compared to traditional CSS classes.

## What Changed

### Before (globals.css)

```css
.glass-card {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 550px;
  /* ... many more properties */
}

.glass-card:hover {
  transform: translateY(-12px) scale(1.03);
  /* ... */
}
```

### After (CVA Variants)

```tsx
import { glassCardVariants } from "@/app/styles";

const className = glassCardVariants({ size: "default", animated: true });
```

## New Variant Files

All CVA variants are located in `app/styles/`:

1. **`glassCard.variants.ts`** - Glass card components
2. **`cardContent.variants.ts`** - Card content and text elements
3. **`hoverableCard.variants.ts`** - Grid card hover effects
4. **`cardStyles.ts`** - Status colors, text shadows, gradients (updated with CVA)
5. **`cyberStyles.ts`** - Cyber-themed status styles (updated with CVA)

## Migration Examples

### Example 1: Glass Card Component

**Before:**

```tsx
<div className="glass-card">
  <div className="card-glass-container">{/* content */}</div>
</div>
```

**After:**

```tsx
import { glassCardVariants, glassContainerVariants } from "@/app/styles";

<div className={glassCardVariants({ size: "default" })}>
  <div className={glassContainerVariants()}>{/* content */}</div>
</div>;
```

### Example 2: Status Badge with Hover

**Before:**

```tsx
<div className="status-badge">
  <div
    className="status-dot"
    style={{ backgroundColor: getStatusColor(status) }}
  />
  <span className="status-text">{status}</span>
</div>
```

**After:**

```tsx
import {
  statusBadgeVariants,
  statusDotVariants,
  statusTextVariants,
} from "@/app/styles";

const [isHovering, setIsHovering] = useState(false);

<div
  className={statusBadgeVariants({
    status: status.toLowerCase(),
    hover: isHovering,
  })}
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
  <div className={statusDotVariants({ status: status.toLowerCase() })} />
  <span className={statusTextVariants({ status: status.toLowerCase() })}>
    {status}
  </span>
</div>;
```

### Example 3: Character Name with Dynamic Hover

**Before:**

```tsx
<h2 className="character-name">{name}</h2>
```

**After:**

```tsx
import { characterNameVariants } from "@/app/styles";

const [isHovering, setIsHovering] = useState(false);

<h2
  className={characterNameVariants({ size: "default", hover: isHovering })}
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
  {name}
</h2>;
```

### Example 4: Info Grid Items

**Before:**

```tsx
<div className="info-grid">
  <div className="info-item">
    <div className="info-icon">🌍</div>
    <div className="info-content">
      <span className="info-label">Origin</span>
      <span className="info-text">{origin}</span>
    </div>
  </div>
</div>
```

**After:**

```tsx
import {
  infoGridVariants,
  infoItemVariants,
  infoIconVariants,
  infoContentVariants,
  infoLabelVariants,
  infoTextVariants,
} from "@/app/styles";

const [hoveredItem, setHoveredItem] = useState<number | null>(null);

<div className={infoGridVariants({ columns: 2 })}>
  <div
    className={infoItemVariants({ hover: hoveredItem === 0 })}
    onMouseEnter={() => setHoveredItem(0)}
    onMouseLeave={() => setHoveredItem(null)}
  >
    <div className={infoIconVariants()}>🌍</div>
    <div className={infoContentVariants()}>
      <span className={infoLabelVariants()}>Origin</span>
      <span className={infoTextVariants()}>{origin}</span>
    </div>
  </div>
</div>;
```

## Available Variants

### Glass Card Variants

```tsx
import {
  glassCardVariants,
  glassContainerVariants,
  ambientGlowVariants,
  cardShineVariants,
  cardImageSectionVariants,
  cardMainImageVariants,
  holographicShimmerVariants,
} from "@/app/styles";

// Usage
glassCardVariants({ size: "default" | "sm" | "lg", animated: true | false });
glassContainerVariants({ hover: true | false });
ambientGlowVariants({ hover: true | false });
cardShineVariants({ hover: true | false });
cardImageSectionVariants({ size: "default" | "sm" | "lg" });
cardMainImageVariants({ hover: true | false });
holographicShimmerVariants({ hover: true | false });
```

### Card Content Variants

```tsx
import {
  cardContentVariants,
  cardTitleSectionVariants,
  characterNameVariants,
  statusBadgeVariants,
  statusDotVariants,
  statusTextVariants,
  infoGridVariants,
  infoItemVariants,
  cardIdBadgeVariants,
  imageGradientOverlayVariants,
} from "@/app/styles";

// Usage
cardContentVariants({ padding: "default" | "compact" | "spacious" });
characterNameVariants({ size: "sm" | "default" | "lg", hover: true | false });
statusBadgeVariants({
  status: "alive" | "dead" | "unknown",
  hover: true | false,
});
infoGridVariants({
  columns: 1 | 2 | 3,
  spacing: "default" | "compact" | "spacious",
});
infoItemVariants({ hover: true | false });
cardIdBadgeVariants({ hover: true | false });
```

### Status & Cyber Variants

```tsx
import {
  statusColorVariants,
  cyberStatusBgVariants,
  cyberStatusGlowVariants,
  cyberStatusTextVariants,
} from "@/app/styles";

// Usage
statusColorVariants({ status: "alive" | "dead" | "unknown" });
cyberStatusBgVariants({ status: "alive" | "dead" | "unknown" });
cyberStatusGlowVariants({ status: "alive" | "dead" | "unknown" });
cyberStatusTextVariants({ status: "alive" | "dead" | "unknown" });
```

### Utility Variants

```tsx
import {
  textShadowVariants,
  gradientVariants,
  hoverableCardVariants,
} from "@/app/styles";

// Usage
textShadowVariants({
  intensity: "strong" | "medium" | "light" | "subtle" | "base",
});
gradientVariants({ type: "bottomDark" | "scanLine" });
hoverableCardVariants({ hover: true | false });
```

## Composing Variants with cn()

The `cn()` utility from `@/app/util` combines CVA variants with additional classes:

```tsx
import { cn } from "@/app/util";
import { glassCardVariants } from "@/app/styles";

<div
  className={cn(
    glassCardVariants({ size: "lg" }),
    "custom-class",
    condition && "conditional-class"
  )}
>
  {/* content */}
</div>;
```

## TypeScript Support

All variants export TypeScript types:

```tsx
import type { GlassCardVariants, StatusBadgeVariants } from "@/app/styles";

// Use in props
interface CardProps {
  size?: GlassCardVariants["size"];
  status?: StatusBadgeVariants["status"];
}

// Or use VariantProps directly
import { type VariantProps } from "class-variance-authority";
import { glassCardVariants } from "@/app/styles";

type CardProps = VariantProps<typeof glassCardVariants>;
```

## Backward Compatibility

Legacy helper functions are still available but marked as deprecated:

```tsx
// ⚠️ Deprecated - Still works but will be removed
import { getStatusColor, getCyberStatusConfig } from "@/app/styles";

// ✅ Recommended - Use CVA variants instead
import { statusColorVariants, cyberStatusBgVariants } from "@/app/styles";
```

## Animation Keyframes

All animation keyframes remain in `globals.css` and are used by CVA variants:

- `ambient-glow`
- `shimmer-wave`
- `float-gentle`
- `pulse-glow`
- `scan`
- `float`
- `shimmer`

These are referenced in variant classes using Tailwind's `animate-[]` syntax.

## Benefits of CVA

1. **Type Safety** - TypeScript autocomplete for variant options
2. **Composability** - Combine variants with compound variants
3. **Maintainability** - Centralized style definitions
4. **Consistency** - Enforced design system patterns
5. **Performance** - Better tree-shaking and optimization

## Next Steps

1. Replace CSS class strings with CVA variant calls
2. Add hover state management where needed
3. Leverage TypeScript types for props
4. Remove deprecated helper functions over time

## Resources

- [CVA Documentation](https://cva.style/docs)
- [Project CVA Docs](/docs/cva/README.md)
- [Variant Examples](/docs/cva/example.md)
