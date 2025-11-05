# Adding Animations

[🏠 Home](../index.md) | [Guides](./index.md)


Learn how to add smooth, performant animations to components using Tailwind Motion and custom CSS.

---

## Overview

This guide covers:

- Using Tailwind Motion utilities
- Creating custom animations
- Animation timing and easing
- Performance best practices

**When to use**: Adding visual feedback, transitions, and delightful micro-interactions to components.

---

## Prerequisites

- Understanding of React components
- Familiarity with Tailwind CSS
- Basic CSS animation knowledge (helpful but not required)

**Recommended Reading**:

- [Tailwind Motion Guide](../tailwind-motion/tailwind-motion.md)
- [Animation Quick Reference](../tailwind-motion/animation-quick-reference.md)
- [Animation Configuration](../lib/animationConfig.ts)

---

## Animation Timing Standards

Follow these timing guidelines for consistency:

```tsx
// Standard timing values (from app/lib/animationConfig.ts)
export const ANIMATION_CONFIG = {
  // Skeleton animations
  skeletonFadeOut: 800, // Quick exit for loading state

  // Card animations
  cardFadeIn: 1800, // Elegant entrance
  cardFadeInDelay: 200, // Sequential timing

  // Hover effects
  hoverTransition: 300, // Snappy feedback

  // Easing
  easing: "cubic-bezier(0.4, 0.0, 0.2, 1)", // Smooth transitions
};
```

---

## Method 1: Tailwind Motion Utilities

### Enter Animations

Fade and slide elements in when they mount:

```tsx
<div className="motion-opacity-in-0 motion-translate-y-in-100 motion-duration-1800 motion-delay-200">
  <h1>Fades in while sliding up</h1>
</div>
```

**Common Enter Patterns**:

```tsx
// Fade in only
className = "motion-opacity-in-0 motion-duration-1800";

// Slide up + fade
className =
  "motion-opacity-in-0 motion-translate-y-in-100 motion-duration-1800";

// Scale + fade
className = "motion-opacity-in-0 motion-scale-in-75 motion-duration-1800";

// Blur + fade
className = "motion-opacity-in-0 motion-blur-in-md motion-duration-1800";

// Complex entrance
className =
  "motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md motion-duration-1800 motion-delay-200";
```

### Exit Animations

Animate elements as they unmount:

```tsx
<div className="motion-opacity-out-0 motion-scale-out-75 motion-duration-800">
  <div>Fades and shrinks on exit</div>
</div>
```

### Loop Animations

Create continuous animations:

```tsx
<div className="motion-pulse motion-loop-infinite motion-duration-2000">
  <div>Pulses forever</div>
</div>
```

**Loop Animation Types**:

- `motion-pulse` - Opacity pulse
- `motion-ping` - Scale ping
- `motion-spin` - Rotation
- `motion-bounce` - Vertical bounce

### Hover Animations

Add hover effects:

```tsx
<div className="motion-scale-in-0:hover motion-duration-300">
  Scales on hover
</div>
```

---

## Method 2: Inline Styles for Dynamic Values

Use inline styles when you need computed or dynamic values:

```tsx
function FadeIn({
  isVisible,
  children,
}: {
  isVisible: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 100}px)`,
        transition:
          "opacity 1800ms cubic-bezier(0.4, 0.0, 0.2, 1) 200ms, transform 1800ms cubic-bezier(0.4, 0.0, 0.2, 1) 200ms",
      }}
    >
      {children}
    </div>
  );
}
```

**When to use inline styles**:

- Dynamic values (calculated rotation, position, etc.)
- State-driven animations
- Complex transitions with multiple properties

---

## Method 3: Custom CSS Animations

For complex or reusable animations, use custom CSS in `app/globals.css`:

```css
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.floating-element {
  animation: float 3s ease-in-out infinite;
}
```

Then use in components:

```tsx
<div className="floating-element">I float up and down</div>
```

**Example: Glitch Effect**

```css
@keyframes glitch {
  0%,
  100% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
}

.holographic-glitch {
  animation: glitch 0.3s ease-in-out;
}

/* Trigger on hover */
.holographic-card:hover .holographic-glitch {
  animation: glitch 0.3s ease-in-out;
}
```

---

## Method 4: Using Effect Components

Use the modular effect components from `app/component/effects/`:

### FadeIn Component

```tsx
import { FadeIn } from "@/app/component/effects";

<FadeIn isVisible={isVisible} duration={1800} delay={200}>
  <div>Content fades in</div>
</FadeIn>;
```

### LazyImage Component

```tsx
import { LazyImage } from "@/app/component/effects";

<LazyImage
  src={imageUrl}
  alt="Character"
  onLoad={() => console.log("Image loaded!")}
>
  {(loaded) => <div>Image is {loaded ? "loaded" : "loading"}</div>}
</LazyImage>;
```

---

## Common Animation Patterns

### Skeleton to Card Transition

```tsx
import { CardContainer } from "@/app/component";

<CardContainer
  imageUrl={character.image}
  imageAlt={character.name}
  skeletonVariant="card-i"
  skeletonFadeOutDuration={800} // Skeleton exits quickly
  cardFadeInDuration={1800} // Card enters elegantly
  cardFadeInDelay={200} // Slight delay
>
  {({ isVisible, imageLoaded }) => (
    <div style={{ opacity: isVisible ? 1 : 0 }}>{/* Card content */}</div>
  )}
</CardContainer>;
```

### Staggered List Animation

```tsx
{
  items.map((item, index) => (
    <div
      key={item.id}
      className="motion-opacity-in-0 motion-translate-y-in-50"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {item.content}
    </div>
  ));
}
```

### Hover Lift Effect

```tsx
<div className="transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
  Lifts on hover
</div>
```

### 3D Card Rotation

```tsx
import { useCardRotation } from "@/app/hooks";

function Card3D() {
  const { rotation, handleMouseMove, handleMouseLeave } = useCardRotation();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      3D rotating card
    </div>
  );
}
```

---

## Performance Best Practices

### 1. Use `will-change` Sparingly

```tsx
// ✅ Good - only during animation
<div
  className="motion-opacity-in-0"
  style={{ willChange: isAnimating ? "opacity, transform" : "auto" }}
>
  Content
</div>

// ❌ Bad - always on
<div style={{ willChange: "opacity, transform" }}>
  Content
</div>
```

### 2. Prefer `transform` and `opacity`

```tsx
// ✅ Good - GPU accelerated
transform: "translateY(20px) scale(1.05)";
opacity: 0.5;

// ❌ Bad - causes reflows
top: "20px";
width: "105%";
```

### 3. Use CSS Instead of JS When Possible

```tsx
// ✅ Good - CSS handles it
<div className="motion-opacity-in-0 motion-duration-1800">CSS animation</div>;

// ❌ Overkill - JS for simple fade
const [opacity, setOpacity] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setOpacity((o) => Math.min(o + 0.01, 1));
  }, 10);
}, []);
```

### 4. Debounce Expensive Animations

```tsx
import { useDeferredValue } from "react";

function ExpensiveAnimation({ value }) {
  const deferredValue = useDeferredValue(value);

  return <div>{deferredValue}</div>;
}
```

---

## Animation Easing Reference

```css
/* Standard easing functions */
ease-linear: "linear"
ease-in: "cubic-bezier(0.4, 0.0, 1, 1)"
ease-out: "cubic-bezier(0.0, 0.0, 0.2, 1)"
ease-in-out: "cubic-bezier(0.4, 0.0, 0.2, 1)"  /* ← Recommended */

/* Custom spring */
ease-spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"

/* Bounce */
ease-bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
```

**Use with Tailwind Motion**:

```tsx
<div className="motion-opacity-in-0 motion-ease-spring-smooth">
  Spring animation
</div>
```

---

## Common Pitfalls

### 1. Animation Doesn't Play

**Problem**: Animation class added but nothing happens  
**Solution**: Ensure the element starts in a different state than the animation end state

### 2. Janky Performance

**Problem**: Animation stutters or drops frames  
**Solution**: Use `transform` and `opacity` only, check for other expensive operations

### 3. Animation Plays on Every Render

**Problem**: Animation restarts unexpectedly  
**Solution**: Use stable keys and proper state management

### 4. Exit Animation Not Showing

**Problem**: Element disappears immediately  
**Solution**: Use exit animation utilities or unmount after animation completes

---

## Next Steps

1. **Experiment** - Try different combinations of animations
2. **Study Examples** - Look at existing cards for patterns
3. **Optimize** - Use the performance best practices
4. **Create Reusable Components** - Extract common patterns

---

## Related Documentation

- [Tailwind Motion Guide](../tailwind-motion/tailwind-motion.md) - Complete animation reference
- [Animation Quick Reference](../tailwind-motion/animation-quick-reference.md) - Quick lookup
- [Animation Config](../lib/animationConfig.ts) - Timing constants
- [Performance Optimization](./performance-optimization.md) - Making animations smooth

---

## Examples in the Project

- `CharacterCardI.tsx` - 3D rotation + fade
- `CharacterCardII.tsx` - Particles + holographic effects
- `SkeletonLoader.tsx` - Pulse and scan line animations
- `CardContainer.tsx` - Orchestrated fade sequences

---

**Questions or improvements?** Update this guide or check the animation docs!
