# Rick and Morty Character Cards - Repository Instructions

## Project Overview

This is a Next.js application that displays character information from the Rick and Morty API using elegant, animated character cards with various visual styles.

## Code Style & Architecture

### Component Structure

- Use functional components with TypeScript
- Prefer composition over inheritance
- Separate concerns: logic components vs presentation components
- Use the "use client" directive for interactive components

### Effect Components Pattern

Use modular effect components for animations and lazy loading:

- `<FadeIn>` for fade-in animations
- `<FadeOut>` for fade-out animations
- `<LazyImage>` for viewport-aware image loading
- `<ViewportDetector>` for intersection observer logic
- `<CardContainer>` as the orchestrator for all card loading logic

### State Management

- Use React hooks (useState, useEffect, useRef, useCallback)
- Create custom hooks for reusable logic (prefix with `use`)
- Keep state as local as possible
- Avoid prop drilling - use composition instead

### File Organization

```
app/component/
├── effects/           # Modular animation components
├── card-parts/        # Reusable card UI pieces
├── hooks/            # Custom React hooks
├── utils/            # Pure utility functions
└── [CardName].tsx    # Main card components
```

### Naming Conventions

- Components: PascalCase (e.g., `CharacterCardI`, `FadeIn`)
- Hooks: camelCase with `use` prefix (e.g., `useCardRotation`, `useImageLoad`)
- Utilities: camelCase (e.g., `getStatusColor`, `buildFetchUrl`)
- Types/Interfaces: PascalCase (e.g., `Character`, `CardContainerProps`)

## Animation & Effects

### Timing Guidelines

- **Skeleton fade out**: 800ms (quick exit)
- **Card fade in**: 1800ms (elegant entrance)
- **Card fade delay**: 200ms (sequential timing)
- **Hover transitions**: 300ms (snappy feedback)
- **Easing**: Use `cubic-bezier(0.4, 0.0, 0.2, 1)` for smooth transitions

### Performance

- Always lazy load images (only when in viewport)
- Detect cached images to skip skeleton states
- Unmount hidden elements from DOM
- Use `will-change` sparingly and only during transitions

## Card Design Patterns

### Skeleton Variants

Each card type has a unique skeleton design:

- **card-i**: Blueprint/wireframe style (purple/violet, technical aesthetic)
- **card-ii**: Cyber style (cyan/pink, holographic aesthetic)
- **default**: Simple centered layout

### Card Container Usage

Always wrap cards with `CardContainer` for consistent loading behavior:

```tsx
<CardContainer
  imageUrl={character.image}
  imageAlt={character.name}
  skeletonVariant="card-i"
  skeletonFadeOutDuration={800}
  cardFadeInDuration={1800}
  cardFadeInDelay={200}
>
  {({ isVisible, imageLoaded }) => (
    // Card content here
  )}
</CardContainer>
```

## TypeScript Standards

### Type Definitions

- Define interfaces for all props
- Use explicit return types for functions
- Avoid `any` - use `unknown` if type is truly unknown
- Use union types for variants (e.g., `"card-i" | "card-ii" | "default"`)

### Props Documentation

Document props with JSDoc comments:

```tsx
interface ComponentProps {
  /** Image URL to preload */
  imageUrl: string;
  /** Duration in milliseconds */
  duration?: number;
}
```

## Styling

### CSS-in-JS Pattern

Use inline styles for dynamic values, Tailwind classes for static styles:

```tsx
<div
  className="relative w-full h-full rounded-xl"
  style={{
    opacity: isVisible ? 1 : 0,
    transform: `rotateX(${rotation.x}deg)`,
  }}
>
```

### Tailwind Classes

- Use Tailwind utility classes for layout and common styles
- Custom animations go in `globals.css` with `@keyframes`
- Prefer `bg-linear-to-r` over `bg-gradient-to-r` (project convention)

### Color Schemes

- **Card I**: Purple/violet theme (#8b5cf6, #a78bfa)
- **Card II**: Cyan/pink theme (#06b6d4, #ec4899)
- **Status colors**: Green (alive), red (dead), gray (unknown)

## API Integration

### Character Schema

Always validate API responses with Zod schemas:

```tsx
import { characterSchema } from "./schema";

const validated = characterSchema.parse(apiData);
```

### Error Handling

- Use try-catch for async operations
- Log errors with `logError` utility
- Provide fallback UI for failed states

## Testing & Quality

### Before Committing

- Run TypeScript compiler to check for errors
- Test all animation states (skeleton → card transition)
- Verify viewport detection works correctly
- Check both cached and uncached image scenarios

### Accessibility

- Always provide `alt` text for images
- Use `aria-hidden="true"` for decorative elements
- Ensure keyboard navigation works for interactive elements
- Test with screen readers when possible

## Common Patterns

### Creating a New Card Variant

1. Create the card component in `app/component/CharacterCard[Name].tsx`
2. Create a skeleton variant in `SkeletonLoader.tsx`
3. Wrap with `CardContainer` for loading logic
4. Export from `index.ts`

### Adding New Effect Components

1. Create in `app/component/effects/[EffectName].tsx`
2. Follow the render prop or children pattern
3. Make configurable via props (duration, delay, easing)
4. Export from `effects/index.ts`
5. Document in `effects/README.md`

## Git Workflow

### Commit Messages

Use conventional commits format:

- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code restructuring
- `docs:` for documentation
- `style:` for formatting changes

### Branch Strategy

- `main` for production-ready code
- Feature branches for new work
- Keep commits small and focused

## Performance Considerations

### Image Optimization

- Use Next.js Image component where appropriate
- Lazy load all images
- Detect and handle cached images differently

### Bundle Size

- Keep dependencies minimal
- Code-split large components
- Use dynamic imports for heavy features

## Questions to Ask When Reviewing Code

1. Does this component separate logic from presentation?
2. Are animations configurable and performant?
3. Is the loading state handled with skeleton → fade pattern?
4. Are TypeScript types properly defined?
5. Is the component accessible?
6. Does it follow the established naming conventions?
7. Could this be made more reusable?

## Resources

- Rick and Morty API: https://rickandmortyapi.com/
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React Hooks: https://react.dev/reference/react
