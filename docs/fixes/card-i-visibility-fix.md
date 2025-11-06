# Card I Visibility Fix

## Problem

Card I was not visible due to custom CSS utilities not being properly defined according to Tailwind CSS v4 requirements.

## Root Cause

In Tailwind CSS v4, custom utility classes must be defined using the `@utility` directive rather than plain CSS class definitions. The previous implementation in `globals.css` used plain CSS classes like `.translate-z-5`, which are not recognized by Tailwind v4's compiler.

## Solution

### 1. Created Dedicated Utilities File

Created `/app/styles/card-i-utilities.css` containing all Card I custom utilities using the `@utility` directive:

```css
/* 3D Transform utilities for Card I */
@utility translate-z-5 {
  transform: translateZ(5px);
}

@utility translate-z-20 {
  transform: translateZ(20px);
}

/* ... and more */

@utility perspective-1000 {
  perspective: 1000px;
}

@utility preserve-3d {
  transform-style: preserve-3d;
}

@utility backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Blueprint grid background for Card I skeleton */
@utility blueprint-grid {
  background-image: linear-gradient(
      rgba(139, 92, 246, 0.3) 1px,
      transparent 1px
    ), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Diagonal lines for Card I skeleton */
@utility blueprint-diagonal {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(168, 85, 247, 0.4) 10px,
    rgba(168, 85, 247, 0.4) 11px
  );
}
```

### 2. Updated globals.css

Modified `app/globals.css` to import the new utilities file:

```css
@import "tailwindcss";
@plugin "tailwindcss-motion";
@plugin "tailwindcss-intersect";

/* Import Card I custom utilities */
@import "./styles/card-i-utilities.css";

/* ... rest of global styles */
```

## Files Modified

1. **Created**: `/app/styles/card-i-utilities.css`
   - Contains all Card I custom utilities using `@utility` directive
2. **Modified**: `/app/globals.css`
   - Removed plain CSS class definitions
   - Added import for new utilities file
   - Kept base styles and theme configuration

## Components Using These Utilities

- `Card3DEffects.tsx` - Uses `translate-z-*` utilities for 3D layering
- `SkeletonLoader.tsx` - Uses `blueprint-grid` and `blueprint-diagonal` for Card I skeleton variant
- `CharacterCardI.tsx` - Uses `perspective-1000` and `preserve-3d` for 3D transforms

## Tailwind v4 Reference

According to [docs/tailwind/custom-styles.md](../docs/tailwind/custom-styles.md):

> Use the `@utility` directive to add a custom utility to your project:
>
> ```css
> @utility content-auto {
>   content-visibility: auto;
> }
> ```
>
> You can now use this utility in your HTML:
>
> ```html
> <div class="content-auto">
>   <!-- ... -->
> </div>
> ```
>
> It will also work with variants like hover, focus and lg:
>
> ```html
> <div class="hover:content-auto">
>   <!-- ... -->
> </div>
> ```

## Testing

To verify the fix:

1. **Build the project**: `pnpm build`
2. **Run dev server**: `pnpm dev`
3. **Navigate to**: `http://localhost:3000/?cardNumber=1`
4. **Verify**: Card I should now be visible with all 3D effects and blueprint skeleton

## Expected Linter Warnings

The CSS linter may show warnings about unknown at-rules (`@utility`, `@theme`, `@plugin`). These are **expected and can be ignored** - they are valid Tailwind v4 directives that the CSS linter doesn't recognize.

## Benefits of This Approach

1. ✅ **Proper Tailwind v4 compliance** - Uses official `@utility` directive
2. ✅ **Organized structure** - Card-specific utilities in dedicated file
3. ✅ **Variant support** - Utilities work with `hover:`, `lg:`, etc.
4. ✅ **Maintainable** - Clear separation between global styles and card utilities
5. ✅ **Follows project conventions** - Keeps styles in `/app/styles` folder

## Related Documentation

- [Tailwind v4 Custom Styles](../docs/tailwind/custom-styles.md)
- [Tailwind v4 Functions and Directives](../docs/tailwind/functions-and-directives.md)
- [Project CVA Architecture](../docs/project/cva-architecture.md)
