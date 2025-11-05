# Rick and Morty Character Cards - Agent Instructions

## Project Context

This is a Next.js 14+ application showcasing animated character cards from the Rick and Morty API. The project emphasizes:

- Modular, composable React components
- Smooth animations and elegant loading states
- Type-safe API integration with Zod validation
- Performance-optimized lazy loading

## Agent Capabilities

### Code Generation

When generating code for this project:

1. **Always use TypeScript** with strict type checking
2. **Use "use client" directive** for components with hooks or interactivity
3. **Follow the composition pattern** - prefer small, reusable components
4. **Use existing utilities** - check `app/component/effects/`, `app/component/hooks/`, and `app/util/` before creating new utilities

### Refactoring

When refactoring code:

1. Maintain the modular architecture (effects, hooks, card-parts, utils)
2. Preserve existing timing values for animations unless explicitly asked to change
3. Keep backward compatibility with existing card components
4. Update exports in `index.ts` files

### Debugging

Common issues and solutions:

- **Card not visible**: Check import paths and ensure wrapper components have explicit dimensions
- **Skeleton re-rendering**: Use `hasLoadedOnce` pattern from `useSkeletonFade`
- **Flicker on load**: Implement cache detection via `img.complete` check
- **Animation too fast/slow**: Adjust duration props (standard: 1800ms fade in, 800ms fade out)

### Animation Guidelines

Standard timing configuration:

```tsx
skeletonFadeOutDuration={800}    // Quick skeleton exit
cardFadeInDuration={1800}        // Elegant card entrance
cardFadeInDelay={200}            // Sequential timing
```

Use `cubic-bezier(0.4, 0.0, 0.2, 1)` for smooth easing.

### Architecture Decisions

- **Effect components** (`FadeIn`, `FadeOut`, `LazyImage`, `ViewportDetector`) handle all animation and viewport logic
- **CardContainer** orchestrates lazy loading and fade sequences
- **SkeletonLoader** provides variant-specific loading states
- **Custom hooks** encapsulate complex stateful logic
- **Card components** focus purely on presentation

### File Structure Awareness

When creating files:

- Components → `app/component/[Name].tsx`
- Effect components → `app/component/effects/[Name].tsx`
- Hooks → `app/component/hooks/use[Name].ts`
- Card parts → `app/component/card-parts/[Name].tsx`
- Utilities → `app/util/[name].ts`
- Schemas → `app/schema/[name]Schema.ts`

### API Integration Pattern

Always follow this pattern for API calls:

```tsx
import { get } from "@/app/http";
import { mySchema } from "@/app/schema";
import { validateJson, logError } from "@/app/util";

try {
  const response = await get(url);
  const data = await validateJson(response, mySchema);
  return data;
} catch (error) {
  logError("Description", error);
  throw error;
}
```

### Testing Checklist

Before completing any task:

- [ ] TypeScript compiles without errors
- [ ] Animation timing follows standards
- [ ] Viewport detection works correctly
- [ ] Both cached and uncached images work
- [ ] Component is accessible (alt text, keyboard nav)
- [ ] Files are exported from appropriate `index.ts`

### Dependencies

Current stack:

- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Zod for validation

Avoid adding new dependencies unless absolutely necessary.

### Communication

When explaining changes:

- Reference specific files with backticks: `CharacterCardI.tsx`
- Explain the "why" behind architectural decisions
- Provide code examples for complex patterns
- Link to existing files as references
