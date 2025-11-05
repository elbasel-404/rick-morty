---
applyTo: "app/component/**/*.tsx,app/component/**/*.ts"
---

# Component Development Instructions

## Component Creation Guidelines

When creating new components in this directory:

1. **Always use TypeScript** with explicit type definitions
2. **Use "use client" directive** for components with interactivity (hooks, event handlers)
3. **Prefer functional components** over class components
4. **Follow the composition pattern** - break complex components into smaller, reusable pieces

## Effect Components

When working with animation or viewport effects:

- Check `app/component/effects/` directory first for existing effect components
- Use `<FadeIn>`, `<FadeOut>`, `<LazyImage>`, and `<ViewportDetector>` for common patterns
- All effect components should:
  - Accept configurable duration, delay, and easing props
  - Use render props or children functions for flexibility
  - Handle edge cases (unmounting, cleanup)

## Custom Hooks

When creating custom hooks in `app/component/hooks/`:

- Prefix hook names with `use` (e.g., `useCardRotation`)
- Include cleanup logic in `useEffect` return functions
- Use `useCallback` and `useMemo` to prevent unnecessary re-renders
- Document complex hooks with JSDoc comments

## Card Components

When creating new character card variants:

1. Wrap the card with `<CardContainer>` for lazy loading and fade behavior
2. Create a corresponding skeleton variant in `SkeletonLoader.tsx`
3. Use these standard timings unless there's a specific reason to deviate:
   - `skeletonFadeOutDuration={800}`
   - `cardFadeInDuration={1800}`
   - `cardFadeInDelay={200}`
4. Export from `app/component/index.ts`

## Styling

- Use Tailwind utility classes for static styles
- Use inline styles for dynamic/animated values
- Custom animations go in `app/globals.css`
- Follow the existing color schemes:
  - Card I: Purple/violet theme
  - Card II: Cyan/pink theme

## Performance

- Always lazy load images using `<LazyImage>` or the pattern in `<CardContainer>`
- Detect cached images to skip skeleton loading states
- Use `will-change` only during active transitions
- Unmount hidden elements from the DOM when possible

## Accessibility

- Provide `alt` text for all images
- Use `aria-hidden="true"` for decorative elements
- Ensure components work with keyboard navigation
- Test color contrast ratios for text

## Example Pattern

```tsx
"use client";

import { CardContainer } from "./CardContainer";
import type { Character } from "@/app/schema";

interface MyCardProps {
  character: Character;
}

export function MyCard({ character }: MyCardProps) {
  return (
    <CardContainer
      imageUrl={character.image}
      imageAlt={character.name}
      skeletonVariant="default"
      skeletonFadeOutDuration={800}
      cardFadeInDuration={1800}
      cardFadeInDelay={200}
    >
      {({ isVisible, imageLoaded }) => (
        <div className="relative w-full h-full">{/* Card content */}</div>
      )}
    </CardContainer>
  );
}
```
