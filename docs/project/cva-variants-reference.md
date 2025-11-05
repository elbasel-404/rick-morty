# CVA Variants Reference

## Overview

This project uses **Class Variance Authority (CVA)** for type-safe, composable styling. All styling variants are organized in the `app/styles/` directory and exported through the main index.

## Quick Start

```tsx
import { glassCardVariants, statusBadgeVariants } from "@/app/styles";
import { cn } from "@/app/util";

// Basic usage
<div className={glassCardVariants({ size: "lg" })}>
  <div className={statusBadgeVariants({ status: "alive", hover: true })}>
    Alive
  </div>
</div>

// With composition
<div className={cn(
  glassCardVariants({ size: "default", animated: true }),
  "my-custom-class"
)}>
  {/* ... */}
</div>
```

## File Structure

```
app/styles/
├── index.ts                      # Main exports
├── glassCard.variants.ts         # Glass card component variants
├── cardContent.variants.ts       # Card content & text variants
├── hoverableCard.variants.ts     # Grid hover effects
├── cardStyles.ts                 # Status, shadows, gradients
└── cyberStyles.ts                # Cyber-themed variants
```

## Variant Categories

### 🎴 Glass Card Variants

**File:** `glassCard.variants.ts`

Handles the main glass card container and visual effects.

#### `glassCardVariants`
The main card wrapper with size and animation options.

```tsx
glassCardVariants({ 
  size: "default" | "sm" | "lg",
  animated: true | false 
})
```

**Default:** `{ size: "default", animated: true }`

#### `glassContainerVariants`
The inner glass container with backdrop effects.

```tsx
glassContainerVariants({ hover: true | false })
```

#### `ambientGlowVariants`
Animated glow effect around the card.

```tsx
ambientGlowVariants({ hover: true | false })
```

#### `cardShineVariants`
Shimmer shine effect on hover.

```tsx
cardShineVariants({ hover: true | false })
```

#### `holographicShimmerVariants`
Holographic overlay effect.

```tsx
holographicShimmerVariants({ hover: true | false })
```

---

### 📝 Card Content Variants

**File:** `cardContent.variants.ts`

Variants for card content, text, badges, and info sections.

#### `characterNameVariants`
Character name title styling with gradient.

```tsx
characterNameVariants({ 
  size: "sm" | "default" | "lg",
  hover: true | false 
})
```

#### `statusBadgeVariants`
Status badge container.

```tsx
statusBadgeVariants({ 
  status: "alive" | "dead" | "unknown",
  hover: true | false 
})
```

#### `statusDotVariants`
Animated status indicator dot.

```tsx
statusDotVariants({ status: "alive" | "dead" | "unknown" })
```

#### `statusTextVariants`
Status text label.

```tsx
statusTextVariants({ status: "alive" | "dead" | "unknown" })
```

#### `infoGridVariants`
Grid layout for info items.

```tsx
infoGridVariants({ 
  columns: 1 | 2 | 3,
  spacing: "default" | "compact" | "spacious" 
})
```

#### `infoItemVariants`
Individual info item container.

```tsx
infoItemVariants({ hover: true | false })
```

#### `cardIdBadgeVariants`
Card ID badge at bottom.

```tsx
cardIdBadgeVariants({ hover: true | false })
```

---

### 🌐 Utility Variants

#### Status Colors

```tsx
statusColorVariants({ status: "alive" | "dead" | "unknown" })
```

#### Text Shadows

```tsx
textShadowVariants({ 
  intensity: "strong" | "medium" | "light" | "subtle" | "base" 
})
```

#### Gradients

```tsx
gradientVariants({ type: "bottomDark" | "scanLine" })
```

---

### 🎯 Cyber Variants

**File:** `cyberStyles.ts`

Cyber-themed styling for futuristic card designs.

```tsx
cyberStatusBgVariants({ status: "alive" | "dead" | "unknown" })
cyberStatusGlowVariants({ status: "alive" | "dead" | "unknown" })
cyberStatusTextVariants({ status: "alive" | "dead" | "unknown" })
```

---

### 🎨 Hoverable Card Variants

**File:** `hoverableCard.variants.ts`

Grid card hover effects.

```tsx
hoverableCardVariants({ hover: true | false })
```

---

## Complete Example

Here's a full example of building a card with CVA variants:

```tsx
"use client";

import { useState } from "react";
import {
  glassCardVariants,
  glassContainerVariants,
  ambientGlowVariants,
  cardShineVariants,
  characterNameVariants,
  statusBadgeVariants,
  statusDotVariants,
  statusTextVariants,
  infoGridVariants,
  infoItemVariants,
  infoIconVariants,
  infoContentVariants,
  infoLabelVariants,
  infoTextVariants,
  cardIdBadgeVariants,
} from "@/app/styles";
import { cn } from "@/app/util";
import type { Character } from "@/app/schema";

interface GlassCardProps {
  character: Character;
}

export const GlassCard = ({ character }: GlassCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState<number | null>(null);
  
  const status = character.status.toLowerCase() as "alive" | "dead" | "unknown";

  return (
    <div 
      className={glassCardVariants({ size: "default", animated: true })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Ambient glow */}
      <div className={ambientGlowVariants({ hover: isHovering })} />
      
      {/* Main container */}
      <div className={glassContainerVariants({ hover: isHovering })}>
        {/* Shine effect */}
        <div className={cardShineVariants({ hover: isHovering })} />
        
        {/* Content */}
        <div className="p-6">
          {/* Character name */}
          <h2 className={characterNameVariants({ size: "default", hover: isHovering })}>
            {character.name}
          </h2>
          
          {/* Status badge */}
          <div className={statusBadgeVariants({ status, hover: isHovering })}>
            <div className={statusDotVariants({ status })} />
            <span className={statusTextVariants({ status })}>
              {character.status}
            </span>
          </div>
          
          {/* Info grid */}
          <div className={infoGridVariants({ columns: 2, spacing: "default" })}>
            {[
              { icon: "🌍", label: "Origin", value: character.origin.name },
              { icon: "📍", label: "Location", value: character.location.name },
            ].map((item, idx) => (
              <div
                key={idx}
                className={infoItemVariants({ hover: hoveredInfo === idx })}
                onMouseEnter={() => setHoveredInfo(idx)}
                onMouseLeave={() => setHoveredInfo(null)}
              >
                <div className={infoIconVariants()}>{item.icon}</div>
                <div className={infoContentVariants()}>
                  <span className={infoLabelVariants()}>{item.label}</span>
                  <span className={infoTextVariants()}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* ID badge */}
          <div className={cardIdBadgeVariants({ hover: isHovering })}>
            ID: {character.id}
          </div>
        </div>
      </div>
    </div>
  );
};
```

## TypeScript Integration

### Using Exported Types

```tsx
import type { 
  GlassCardVariants, 
  StatusBadgeVariants,
  CharacterNameVariants 
} from "@/app/styles";

interface MyComponentProps {
  cardSize?: GlassCardVariants["size"];
  status?: StatusBadgeVariants["status"];
  nameSize?: CharacterNameVariants["size"];
}
```

### Using VariantProps

```tsx
import { type VariantProps } from "class-variance-authority";
import { glassCardVariants } from "@/app/styles";

type GlassCardProps = VariantProps<typeof glassCardVariants> & {
  children: React.ReactNode;
};
```

## Compound Variants

Some variants use compound variants for complex combinations:

```tsx
// Example from cyberStatusVariants
cyberStatusVariants({ 
  status: "alive", 
  element: "glow" 
})
// Returns specific glow for alive status
```

## Best Practices

### 1. Always Use `cn()` for Composition

```tsx
// ✅ Good
import { cn } from "@/app/util";
className={cn(glassCardVariants({ size: "lg" }), "custom-class")}

// ❌ Bad
className={`${glassCardVariants({ size: "lg" })} custom-class`}
```

### 2. Extract Hover State

```tsx
// ✅ Good - Single state, multiple uses
const [isHovering, setIsHovering] = useState(false);

<div onMouseEnter={() => setIsHovering(true)}>
  <div className={glassCardVariants({ hover: isHovering })} />
  <div className={ambientGlowVariants({ hover: isHovering })} />
</div>

// ❌ Bad - Duplicate handlers
<div className={glassCardVariants()} onMouseEnter={...} />
<div className={ambientGlowVariants()} onMouseEnter={...} />
```

### 3. Type Your Status Values

```tsx
// ✅ Good - Type-safe
const status = character.status.toLowerCase() as "alive" | "dead" | "unknown";
className={statusBadgeVariants({ status })}

// ❌ Bad - No type checking
className={statusBadgeVariants({ status: character.status })}
```

### 4. Use Default Variants

```tsx
// ✅ Good - Explicit when needed
glassCardVariants({ size: "lg" }) // Override default

// ✅ Also good - Use defaults
glassCardVariants() // Uses size: "default", animated: true
```

## Animations

All variants use keyframes defined in `globals.css`:

- `@keyframes ambient-glow` - Pulsing glow effect
- `@keyframes shimmer-wave` - Shimmer animation
- `@keyframes float-gentle` - Floating animation
- `@keyframes pulse-glow` - Pulse effect
- `@keyframes scan` - Scanning line
- `@keyframes float` - Complex float
- `@keyframes shimmer` - Horizontal shimmer

Access via Tailwind's `animate-[]` syntax in variant classes.

## Migration from CSS Classes

See [CVA Migration Guide](../guides/cva-migration.md) for detailed migration instructions.

## Related Documentation

- [CVA Basics](/docs/cva/README.md)
- [CVA Variants](/docs/cva/varients.md)
- [CVA Composition](/docs/cva/compose.md)
- [Migration Guide](/docs/guides/cva-migration.md)
