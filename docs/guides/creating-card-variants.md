# Creating New Card Variants

Learn how to create new character card designs with unique styles and animations.

---

## Overview

This guide walks you through creating a new card variant from scratch, including:
- Setting up the card component structure
- Creating a skeleton variant
- Implementing animations
- Adding unique styling

**When to use**: Creating new character card designs with different visual styles.

---

## Prerequisites

- Understanding of React components and TypeScript
- Familiarity with Tailwind CSS
- Basic knowledge of the CardContainer pattern

**Recommended Reading**:
- [Card Container Pattern](../patterns/card-container.md)
- [Skeleton Pattern](../patterns/skeleton-pattern.md)
- [Tailwind Quick Reference](../tailwind/QUICK-REFERENCE.md)

---

## Step 1: Plan Your Card Design

Before coding, decide on:

1. **Visual Style** - What makes this card unique?
   - Color scheme (e.g., purple/violet for Card I, cyan/pink for Card II)
   - Layout approach (centered, grid, asymmetric)
   - Special effects (glow, particles, 3D rotation)

2. **Animation Strategy** - How should it animate?
   - Entrance animation (fade, slide, scale)
   - Hover effects (rotation, lift, glow)
   - Loading skeleton style

3. **Information Display** - What to show?
   - Name, status, species, location
   - Additional details (episode count, origin)
   - Visual indicators (status dots, badges)

**Example**: Card III - Holographic Design
- **Style**: Blue/cyan hologram effect with scan lines
- **Animation**: Matrix-style fade-in with glitch effect
- **Layout**: Asymmetric with floating elements

---

## Step 2: Create the Card Component

Create a new file: `app/component/CharacterCardIII.tsx`

```tsx
"use client";

import type { Character } from "@/app/schema";
import { CardContainer } from "./CardContainer";
import { SkeletonLoader } from "./SkeletonLoader";

interface CharacterCardIIIProps {
  character: Character;
}

export function CharacterCardIII({ character }: CharacterCardIIIProps) {
  return (
    <CardContainer
      imageUrl={character.image}
      imageAlt={character.name}
      skeletonVariant="card-iii"
      skeletonFadeOutDuration={800}
      cardFadeInDuration={1800}
      cardFadeInDelay={200}
    >
      {({ isVisible, imageLoaded }) => (
        <div
          className="relative w-full h-full"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1800ms cubic-bezier(0.4, 0.0, 0.2, 1) 200ms",
          }}
        >
          {/* Card content goes here */}
          <div className="relative w-full h-full bg-linear-to-br from-cyan-500/10 to-blue-600/10 rounded-xl border border-cyan-400/20 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,rgba(6,182,212,0.05)_1px)] bg-size-[100%_4px]" />
            
            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Character image */}
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-cyan-400/50">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Character info */}
              <h2 className="text-2xl font-bold text-cyan-300 mb-2 text-center">
                {character.name}
              </h2>

              <div className="space-y-2 text-sm">
                <InfoRow label="Status" value={character.status} />
                <InfoRow label="Species" value={character.species} />
                <InfoRow label="Location" value={character.location.name} />
              </div>
            </div>
          </div>
        </div>
      )}
    </CardContainer>
  );
}

// Helper component for info rows
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-cyan-400/60">{label}:</span>
      <span className="text-cyan-200">{value}</span>
    </div>
  );
}
```

---

## Step 3: Create the Skeleton Variant

Add your skeleton design to `app/component/SkeletonLoader.tsx`:

```tsx
// Add to the getSkeletonContent function

if (variant === "card-iii") {
  return (
    <div className="relative w-full h-full bg-linear-to-br from-cyan-500/5 to-blue-600/5 rounded-xl border border-cyan-400/10 overflow-hidden">
      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-full h-1 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent -motion-translate-y-in-100 motion-duration-2000 motion-loop-infinite"
        />
      </div>

      {/* Skeleton content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Avatar skeleton */}
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-cyan-400/10 motion-pulse" />

        {/* Text skeletons */}
        <div className="h-8 w-3/4 mx-auto bg-cyan-400/10 rounded mb-4 motion-pulse" />
        
        <div className="space-y-2">
          <div className="h-4 w-full bg-cyan-400/10 rounded motion-pulse motion-delay-100" />
          <div className="h-4 w-full bg-cyan-400/10 rounded motion-pulse motion-delay-200" />
          <div className="h-4 w-5/6 bg-cyan-400/10 rounded motion-pulse motion-delay-300" />
        </div>
      </div>
    </div>
  );
}
```

---

## Step 4: Add Custom Styles (Optional)

If you need custom animations or effects, add them to `app/globals.css`:

```css
/* Holographic glitch effect */
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

.holographic-glitch {
  animation: glitch 0.3s ease-in-out;
}
```

---

## Step 5: Export the Component

Add your new card to `app/component/index.ts`:

```tsx
export { CharacterCardIII } from "./CharacterCardIII";
```

---

## Step 6: Test Your Card

Create a test page or use it in your app:

```tsx
import { CharacterCardIII } from "@/app/component";
import { getCharactersList } from "@/app/server/getCharactersList";

export default async function TestPage() {
  const data = await getCharactersList({ page: 1 });
  const character = data.results[0];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-sm mx-auto">
        <CharacterCardIII character={character} />
      </div>
    </div>
  );
}
```

---

## Common Pitfalls

### 1. Skeleton Not Appearing
**Problem**: Skeleton variant not showing  
**Solution**: Ensure the variant name matches exactly in both `CardContainer` and `SkeletonLoader`

### 2. Animation Timing Issues
**Problem**: Card appears before image loads  
**Solution**: Check that `imageLoaded` is being used correctly and timing values are appropriate

### 3. Styles Not Applying
**Problem**: Tailwind classes not working  
**Solution**: Verify classes are valid and not purged. Custom classes need to be in `globals.css`

### 4. Type Errors
**Problem**: TypeScript complaining about Character type  
**Solution**: Import the type from `@/app/schema` and ensure all required fields are accessed correctly

---

## Customization Ideas

### Color Schemes
- **Warm**: Orange/red for fire theme
- **Cool**: Blue/purple for ice theme
- **Nature**: Green/brown for earth theme
- **Cosmic**: Purple/pink for space theme

### Layout Variations
- **Split**: Image on one side, info on the other
- **Overlay**: Info overlaid on image
- **Grid**: Multiple sections in a grid
- **Minimalist**: Centered, clean design

### Animation Effects
- **3D Rotation**: On hover (using `useCardRotation` hook)
- **Particle Effects**: Using `useParticles` hook
- **Morphing Borders**: Animated border gradients
- **Floating Elements**: CSS transforms and animations

---

## Next Steps

1. **Add Interactivity** - Implement hover effects
   - See: [Adding Animations Guide](./adding-animations.md)
   
2. **Optimize Performance** - Lazy load and memoize
   - See: [Performance Optimization Guide](./performance-optimization.md)

3. **Add More Variants** - Create a family of related designs
   - Follow this guide for each variant

4. **Enhance with State** - Add interactive elements
   - See: [State Management Guide](./state-management.md)

---

## Related Documentation

- [Card Container Pattern](../patterns/card-container.md) - Understanding the container
- [Skeleton Pattern](../patterns/skeleton-pattern.md) - Loading states
- [Tailwind Motion](../tailwind-motion/tailwind-motion.md) - Animation utilities
- [CVA Variants](../cva/varients.md) - Variant management

---

## Examples in the Project

Study these existing cards for inspiration:
- `CharacterCardI.tsx` - Purple blueprint theme with rotation
- `CharacterCardII.tsx` - Cyber theme with particles
- `SimpleCard.tsx` - Minimal design for reference

---

**Questions or improvements?** Update this guide or ask for help!
