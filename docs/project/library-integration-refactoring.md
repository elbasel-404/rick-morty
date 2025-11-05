# Library Integration & Hook Optimization Refactoring

[🏠 Home](../index.md) | [Project](./index.md)


## Overview

This refactoring removes all `useCallback` and `useMemo` usage from the project and integrates four new libraries to improve code quality, maintainability, and performance:

- **clsx** - Conditional className construction
- **tailwind-merge** - Intelligent Tailwind class merging
- **tailwind-motion** - Declarative animation utilities
- **tailwindcss-intersect** - Scroll-triggered animations

## Libraries Added

### 1. clsx (2.1.1)

A tiny utility for constructing className strings conditionally.

### 2. tailwind-merge (3.3.1)

Merge Tailwind CSS classes without style conflicts. Properly handles class precedence.

### 3. tailwindcss-motion (1.1.1)

Modern animation utilities for Tailwind CSS with presets for common animations.

### 4. tailwindcss-intersect (2.2.0)

Intersection Observer utilities for scroll-triggered animations.

## New Utilities Created

### `cn()` - Class Name Utility

**Location:** `app/util/cn.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Benefits:**

- Merges Tailwind classes intelligently
- Handles conditional classes elegantly
- Prevents class conflicts
- Type-safe with TypeScript

**Usage:**

```tsx
// Before
className={`base-class ${condition ? 'active' : 'inactive'}`}

// After
className={cn("base-class", condition ? "active" : "inactive")}
```

## Hook Optimizations

### 1. `useImageLoad` Hook

**File:** `app/hooks/useImageLoad.ts`

**Changes:**

- ✅ Removed `useCallback` from `handleImageLoad`
- ✅ Removed `useCallback` from `checkIfImageCached`

**Rationale:**

- Functions are stable across renders due to `setImageLoaded` being stable
- React Compiler (enabled in project) handles optimization automatically
- No performance impact from removing memoization

### 2. `useParticles` Hook

**File:** `app/hooks/useParticles.ts`

**Changes:**

- ✅ Removed `useMemo` wrapper
- ✅ Created `generateParticles()` pure function
- ✅ Kept `useParticles()` as a convenience wrapper

**Rationale:**

- Particle generation is deterministic (same seed → same result)
- Pure function can be called directly where needed
- No need to memoize deterministic computations
- Hook wrapper maintains backward compatibility

**New API:**

```typescript
// Direct function call (preferred for new code)
const particles = generateParticles(characterId, 8);

// Hook (for backward compatibility)
const particles = useParticles(characterId, 8);
```

### 3. `useCardRotation` Hook

**File:** `app/hooks/useCardRotation.ts`

**Status:** ✅ Already optimized - no `useCallback` or `useMemo` usage

## Component Refactoring

### Animation Components

#### FloatingParticles (Card I)

**File:** `app/component/cards/card-i/FloatingParticles.tsx`

**Changes:**

- ✅ Removed custom CSS `@keyframes float` animation
- ✅ Replaced with `motion-preset-float` from tailwind-motion
- ✅ Removed `isMounted` state check (unnecessary)
- ✅ Removed `useEffect` for mount detection

**Before:**

```tsx
className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40"
style={{ animation: `float ${duration}s ease-in-out infinite` }}
```

**After:**

```tsx
className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-40 motion-preset-float motion-ease-in-out"
style={{ animationDuration: `${particle.duration}s` }}
```

#### CyberParticles (Card II)

**File:** `app/component/cards/card-ii/CyberParticles.tsx`

**Changes:**

- ✅ Removed `isMounted` prop and state check
- ✅ Replaced custom animation with `motion-preset-float`
- ✅ Integrated `cn()` utility for conditional classes

**Before:**

```tsx
interface CyberParticlesProps {
  particles: Particle[];
  isMounted: boolean; // ❌ Removed
}

className={`absolute ... ${particle.isCyan ? "bg-cyan-400" : "bg-pink-400"}`}
```

**After:**

```tsx
interface CyberParticlesProps {
  particles: Particle[];
  // isMounted removed - no longer needed
}

className={cn(
  "absolute ... motion-preset-float",
  particle.isCyan ? "bg-cyan-400" : "bg-pink-400"
)}
```

#### ScanLine (Card II)

**File:** `app/component/cards/card-ii/ScanLine.tsx`

**Changes:**

- ✅ Removed custom CSS `@keyframes scan` animation
- ✅ Replaced with tailwind-motion loop animation
- ✅ Used `/reset` modifier for instant reset behavior

**Before:**

```tsx
<div style={{ animation: "scan 3s linear infinite" }} />
```

**After:**

```tsx
<div className="motion-translate-y-loop-[200%]/reset motion-ease-linear motion-duration-[3s]" />
```

### Class Name Refactoring

All components updated to use `cn()` utility instead of template literal concatenation:

#### ✅ SkeletonLoader

```tsx
// Before
className={`absolute inset-0 bg-black rounded-xl overflow-hidden z-10 ${className}`}

// After
className={cn("absolute inset-0 bg-black rounded-xl overflow-hidden z-10", className)}
```

#### ✅ CardImage (Card I)

```tsx
// Before
className={`w-full h-full object-cover transition-all duration-700 ${
  imageLoaded ? "blur-0 scale-100" : "blur-2xl scale-110"
}`}

// After
className={cn(
  "w-full h-full object-cover transition-all duration-700",
  imageLoaded ? "blur-0 scale-100" : "blur-2xl scale-110"
)}
```

#### ✅ StatusBadge (Card I)

```tsx
// Before
className={`w-2.5 h-2.5 rounded-full ${statusColor} animate-pulse shadow-lg`}

// After
className={cn("w-2.5 h-2.5 rounded-full animate-pulse shadow-lg", statusColor)}
```

#### ✅ CyberStatusBadge (Card II)

```tsx
// Before
className={`w-2.5 ... ${statusConfig.bg} ${statusConfig.glow} animate-pulse`}
className={`${statusConfig.text} font-bold ...`}

// After
className={cn(
  "w-2.5 ... animate-pulse",
  statusConfig.bg,
  statusConfig.glow
)}
className={cn("font-bold ...", statusConfig.text)}
```

#### ✅ CyberCardBack (Card II)

Multiple template literals replaced with `cn()`.

#### ✅ CharacterCardIII

**Changes:**

- ✅ Replaced inline rotation logic with `useCardRotation()` hook
- ✅ Updated all template literal classNames to use `cn()`
- ✅ Fixed gradient class: `bg-gradient-to-t` → `bg-linear-to-t`

**Before:**

```tsx
const [rotation, setRotation] = useState({ x: 0, y: 0 });
const handleMouseMove = (e) => {
  /* manual rotation logic */
};
```

**After:**

```tsx
const { rotation, handleMouseMove, resetRotation } = useCardRotation();
```

#### ✅ CharacterCardIV

**Changes:**

- ✅ Replaced conditional status color logic with object lookup
- ✅ Integrated `cn()` utility
- ✅ Fixed height class: `h-[320px]` → `h-80`

**Before:**

```tsx
className={`w-2 h-2 rounded-full ${
  status === "Alive" ? "bg-green-400" :
  status === "Dead" ? "bg-red-400" :
  "bg-gray-400"
} shadow-lg`}
```

**After:**

```tsx
const statusColors = {
  Alive: "bg-green-400",
  Dead: "bg-red-400",
  unknown: "bg-gray-400",
};

className={cn(
  "w-2 h-2 rounded-full shadow-lg",
  statusColors[status as keyof typeof statusColors] || statusColors.unknown
)}
```

## Files Modified

### New Files

- ✅ `app/util/cn.ts` - Class name utility

### Modified Files

1. ✅ `app/util/index.ts` - Export `cn()`
2. ✅ `app/hooks/useImageLoad.ts` - Removed `useCallback`
3. ✅ `app/hooks/useParticles.ts` - Removed `useMemo`, added pure function
4. ✅ `app/hooks/index.ts` - Export `generateParticles`
5. ✅ `app/component/SkeletonLoader.tsx` - Use `cn()`
6. ✅ `app/component/cards/card-i/FloatingParticles.tsx` - tailwind-motion
7. ✅ `app/component/cards/card-i/CardImage.tsx` - Use `cn()`
8. ✅ `app/component/cards/card-i/StatusBadge.tsx` - Use `cn()`
9. ✅ `app/component/cards/card-ii/CyberParticles.tsx` - tailwind-motion + `cn()`
10. ✅ `app/component/cards/card-ii/ScanLine.tsx` - tailwind-motion
11. ✅ `app/component/cards/card-ii/CyberStatusBadge.tsx` - Use `cn()`
12. ✅ `app/component/cards/card-ii/CyberCardBack.tsx` - Use `cn()`
13. ✅ `app/component/cards/card-iii/CharacterCardIII.tsx` - Use hooks + `cn()`
14. ✅ `app/component/cards/card-iv/CharacterCardIV.tsx` - Use `cn()`

## Benefits

### Performance

- **No over-optimization**: Removed unnecessary memoization that React Compiler handles
- **Smaller bundle**: Tailwind-motion uses built-in CSS animations (no JS overhead)
- **Better caching**: Deterministic functions can be called directly

### Developer Experience

- **Type safety**: `cn()` utility is fully typed
- **Readability**: Cleaner conditional className logic
- **Maintainability**: Consistent patterns across components
- **Discoverability**: Tailwind-motion classes are self-documenting

### Code Quality

- **Reduced complexity**: Less custom animation CSS
- **Consistent patterns**: All components use `cn()` for classNames
- **Better separation**: Pure functions vs hooks clearly defined
- **React best practices**: Let React Compiler handle optimization

## Migration Guide

### For New Components

**Use `cn()` for classNames:**

```tsx
import { cn } from "@util";

<div
  className={cn(
    "base classes",
    condition && "conditional-class",
    anotherCondition ? "class-a" : "class-b"
  )}
/>;
```

**Use tailwind-motion for animations:**

```tsx
// Loop animations
<div className="motion-preset-float motion-duration-2000" />

// Enter animations
<div className="motion-opacity-in-0 motion-translate-y-in-100" />

// Exit animations
<div className="motion-opacity-out-0 motion-scale-out-75" />
```

**Use pure functions when possible:**

```tsx
// Instead of useMemo for deterministic calculations
const particles = generateParticles(seed, count);

// Only use hooks for stateful logic
const { rotation, handleMouseMove } = useCardRotation();
```

### Don't Use

❌ **Template literal concatenation:**

```tsx
className={`base ${condition ? 'a' : 'b'}`}
```

❌ **useCallback/useMemo (unless profiling shows need):**

```tsx
const callback = useCallback(() => { ... }, []);
const value = useMemo(() => calculate(), [deps]);
```

❌ **Custom CSS animations (use tailwind-motion):**

```css
@keyframes myAnimation {
  ...;
}
```

## Testing Checklist

- [x] All imports resolve correctly
- [x] TypeScript compiles without errors
- [x] `cn()` utility handles edge cases
- [x] Animations work as expected
- [x] No visual regressions
- [x] Performance is maintained or improved

## React Compiler Compatibility

All changes are fully compatible with React Compiler (enabled in project):

- ✅ No manual memoization needed
- ✅ Pure functions are compiler-friendly
- ✅ Stable event handlers don't need `useCallback`
- ✅ Deterministic computations don't need `useMemo`

The React Compiler automatically optimizes:

- Component re-renders
- Event handler stability
- Expression memoization
- Effect dependency arrays

## Future Improvements

### Potential CVA Integration

**class-variance-authority** is installed but not yet utilized. Consider creating variant components:

```typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva("base-button", {
  variants: {
    intent: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500",
    },
    size: {
      small: "text-sm",
      large: "text-lg",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "small",
  },
});

// Usage
<button className={buttonVariants({ intent: "primary", size: "large" })} />;
```

**Ideal for:**

- Badge components (status, ID, etc.)
- Button variants
- Card layout variants
- Typography components

### Scroll Animations with tailwindcss-intersect

**tailwindcss-intersect** is installed. To enable scroll-triggered animations:

1. **Configure in globals.css** (already done):

```css
@plugin "tailwindcss-intersect";
```

2. **Set up Observer** (React):

```tsx
"use client";
import { Observer } from "tailwindcss-intersect";
import { useEffect } from "react";

export default function ObserverProvider({ children }) {
  useEffect(() => {
    Observer.start();
  }, []);
  return <>{children}</>;
}
```

3. **Use in components:**

```tsx
<div className="intersect:motion-preset-slide-up intersect-once">
  Animates when scrolled into view
</div>
```

## Conclusion

This refactoring successfully:

✅ Removed all `useCallback` and `useMemo` from the codebase
✅ Integrated 4 modern libraries for better DX
✅ Created reusable `cn()` utility
✅ Migrated custom animations to tailwind-motion
✅ Improved code consistency and maintainability
✅ Maintained full React Compiler compatibility
✅ Set foundation for future CVA and scroll animation usage

The codebase is now cleaner, more maintainable, and follows modern React best practices with React Compiler doing the heavy lifting for performance optimization.
