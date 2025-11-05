# CVA Architecture Overview

## Import Flow

```
Component
    ↓
    imports from @/app/styles
    ↓
app/styles/index.ts (Main Export Hub)
    ↓
    ├─→ glassCard.variants.ts
    │   ├─→ glassCardVariants
    │   ├─→ glassContainerVariants
    │   ├─→ ambientGlowVariants
    │   ├─→ cardShineVariants
    │   ├─→ cardImageSectionVariants
    │   ├─→ cardMainImageVariants
    │   └─→ holographicShimmerVariants
    │
    ├─→ cardContent.variants.ts
    │   ├─→ cardContentVariants
    │   ├─→ cardTitleSectionVariants
    │   ├─→ characterNameVariants
    │   ├─→ statusBadgeVariants
    │   ├─→ statusDotVariants
    │   ├─→ statusTextVariants
    │   ├─→ infoGridVariants
    │   ├─→ infoItemVariants
    │   ├─→ infoIconVariants
    │   ├─→ infoContentVariants
    │   ├─→ infoLabelVariants
    │   ├─→ infoTextVariants
    │   ├─→ cardIdBadgeVariants
    │   └─→ imageGradientOverlayVariants
    │
    ├─→ hoverableCard.variants.ts
    │   └─→ hoverableCardVariants
    │
    ├─→ cardStyles.ts
    │   ├─→ statusColorVariants
    │   ├─→ textShadowVariants
    │   ├─→ gradientVariants
    │   ├─→ getStatusColor() [deprecated]
    │   ├─→ textShadow [deprecated]
    │   └─→ gradients [deprecated]
    │
    └─→ cyberStyles.ts
        ├─→ cyberStatusBgVariants
        ├─→ cyberStatusGlowVariants
        ├─→ cyberStatusTextVariants
        ├─→ cyberStatusVariants
        └─→ getCyberStatusConfig() [deprecated]
```

## Variant Categories

```
┌─────────────────────────────────────────┐
│           CVA Variants (22)             │
├─────────────────────────────────────────┤
│                                         │
│  🎴 Glass Card Variants (7)            │
│  ├─ Layout & Container                 │
│  ├─ Visual Effects                     │
│  └─ Image Handling                     │
│                                         │
│  📝 Card Content Variants (14)         │
│  ├─ Text & Typography                  │
│  ├─ Status Indicators                  │
│  ├─ Info Grid Components               │
│  └─ Badges                             │
│                                         │
│  🎯 Utility Variants (7)               │
│  ├─ Status Colors                      │
│  ├─ Text Shadows                       │
│  ├─ Gradients                          │
│  └─ Cyber Styles                       │
│                                         │
│  🎨 Hover Effects (1)                  │
│  └─ Grid Card Hovers                   │
│                                         │
└─────────────────────────────────────────┘
```

## Component Usage Pattern

```tsx
┌──────────────────────────────────────────────┐
│  Component (e.g., CharacterCard.tsx)         │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Import variants from @/app/styles           │
│  import {                                    │
│    glassCardVariants,                        │
│    statusBadgeVariants,                      │
│    characterNameVariants                     │
│  } from "@/app/styles";                      │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Manage hover state                          │
│  const [isHovering, setIsHovering] = ...     │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Apply variants with props                   │
│  className={glassCardVariants({              │
│    size: "lg",                               │
│    animated: true                            │
│  })}                                         │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Compose with cn() if needed                 │
│  className={cn(                              │
│    glassCardVariants({ size: "lg" }),        │
│    "custom-class"                            │
│  )}                                          │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Rendered with optimized classes             │
└──────────────────────────────────────────────┘
```

## File Dependency Graph

```
app/styles/index.ts
    │
    ├─ Exports all variants
    ├─ Exports all TypeScript types
    └─ Exports legacy helpers
        │
        ├──────────┬──────────┬──────────┬──────────┐
        │          │          │          │          │
        v          v          v          v          v
    glassCard  cardContent hoverable cardStyles cyberStyles
    .variants   .variants  Card      .ts        .ts
    .ts         .ts        .variants
                           .ts
        │          │          │          │          │
        └──────────┴──────────┴──────────┴──────────┘
                           │
                           v
                  Used by Components
                           │
                           v
              ┌────────────┴────────────┐
              │                         │
              v                         v
        Card Components         Page Components
```

## Animation Flow

```
globals.css
    │
    ├─ @keyframes ambient-glow
    ├─ @keyframes shimmer-wave
    ├─ @keyframes float-gentle
    ├─ @keyframes pulse-glow
    ├─ @keyframes scan
    ├─ @keyframes float
    └─ @keyframes shimmer
        │
        └─→ Referenced by CVA variants
            │
            ├─→ ambientGlowVariants
            │   └─ motion-safe:animate-[ambient-glow_6s...]
            │
            ├─→ cardShineVariants
            │   └─ motion-safe:animate-[shimmer-wave_2s...]
            │
            ├─→ glassCardVariants
            │   └─ motion-safe:animate-[float-gentle_4s...]
            │
            ├─→ cardMainImageVariants
            │   └─ motion-safe:animate-[pulse-glow_4s...]
            │
            └─→ statusDotVariants
                └─ motion-safe:animate-[pulse-glow_2s...]
```

## Type Flow

```tsx
┌─────────────────────────────────────┐
│  CVA Variant Definition             │
│  export const myVariant = cva(...)  │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│  Type Export                        │
│  export type MyVariant =            │
│    VariantProps<typeof myVariant>   │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│  Component Props                    │
│  interface Props {                  │
│    variant?: MyVariant["variant"]   │
│  }                                  │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│  TypeScript Autocomplete ✨         │
│  - Size options                     │
│  - Hover states                     │
│  - Status types                     │
└─────────────────────────────────────┘
```

## Comparison: Before vs After

### Before (CSS Classes)

```
globals.css (445 lines)
    ├─ .glass-card { ... }
    ├─ .glass-card:hover { ... }
    ├─ .card-glass-container { ... }
    ├─ .status-badge { ... }
    ├─ .character-name { ... }
    ├─ .info-grid { ... }
    ├─ .info-item { ... }
    ├─ .info-item:hover { ... }
    └─ ... 30+ more classes
        │
        └─→ Component uses string classes
            <div className="glass-card">
              <div className="status-badge">
              </div>
            </div>
```

### After (CVA Variants)

```
globals.css (118 lines)
    └─ Only keyframes & base styles

app/styles/ (5 variant files)
    ├─ glassCard.variants.ts
    ├─ cardContent.variants.ts
    ├─ hoverableCard.variants.ts
    ├─ cardStyles.ts (updated)
    └─ cyberStyles.ts (updated)
        │
        └─→ Component uses typed variants
            import { glassCardVariants, statusBadgeVariants }

            <div className={glassCardVariants({ size: "lg" })}>
              <div className={statusBadgeVariants({
                status: "alive",
                hover: isHovering
              })}>
              </div>
            </div>
```

## Benefits Summary

```
┌────────────────────────────────────────┐
│  Type Safety                           │
│  ✓ Autocomplete for all options        │
│  ✓ Compile-time error checking         │
│  ✓ IntelliSense support                │
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│  Composability                         │
│  ✓ Mix variants with cn()              │
│  ✓ Conditional styling                 │
│  ✓ Compound variants                   │
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│  Maintainability                       │
│  ✓ Single source of truth              │
│  ✓ Easy to update globally             │
│  ✓ Clear variant structure             │
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│  Performance                           │
│  ✓ Better tree-shaking                 │
│  ✓ Smaller CSS bundle                  │
│  ✓ Optimized class generation          │
└────────────────────────────────────────┘
```

## Quick Reference

### Most Common Imports

```tsx
import {
  glassCardVariants,
  glassContainerVariants,
  characterNameVariants,
  statusBadgeVariants,
  statusDotVariants,
  statusTextVariants,
  infoGridVariants,
  infoItemVariants,
} from "@/app/styles";

import { cn } from "@/app/util";
```

### Most Common Pattern

```tsx
const [isHovering, setIsHovering] = useState(false);

<div
  className={glassCardVariants({ size: "default", animated: true })}
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
  <div className={glassContainerVariants({ hover: isHovering })}>
    {/* content */}
  </div>
</div>;
```
