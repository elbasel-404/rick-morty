# Quick Reference: New Utilities & Libraries

[🏠 Home](../index.md) | [Project](./index.md)


## 🎨 cn() - Class Name Utility

### Import

```tsx
import { cn } from "@util";
```

### Basic Usage

```tsx
// Simple merge
<div className={cn("base-class", "another-class")} />

// Conditional classes
<div className={cn(
  "always-applied",
  isActive && "active-class",
  !isDisabled && "enabled-class"
)} />

// Ternary conditions
<div className={cn(
  "base",
  size === "large" ? "text-lg" : "text-sm"
)} />

// Multiple conditions
<div className={cn(
  "button",
  variant === "primary" && "bg-blue-500",
  variant === "secondary" && "bg-gray-500",
  disabled && "opacity-50 cursor-not-allowed"
)} />

// Override with props
<div className={cn("default-styles", className)} />
```

### Benefits

- ✅ Merges Tailwind classes intelligently (last class wins)
- ✅ Handles conditional logic cleanly
- ✅ Type-safe with TypeScript
- ✅ Prevents class conflicts

---

## 🎬 Tailwind Motion - Animations

### Loop Animations (Continuous)

```tsx
// Floating effect
<div className="motion-preset-float" />

// Pulse effect
<div className="motion-preset-pulse" />

// Spin
<div className="motion-preset-spin" />

// Wobble
<div className="motion-preset-wobble" />

// Oscillate (horizontal shake)
<div className="motion-preset-oscillate" />

// Custom loop animation
<div className="motion-translate-y-loop-[20px]/mirror motion-duration-2000" />
```

### Enter Animations (On Mount)

```tsx
// Fade in
<div className="motion-opacity-in-0" />

// Slide in from bottom
<div className="motion-translate-y-in-100" />

// Slide in from right
<div className="motion-translate-x-in-100" />

// Scale in
<div className="motion-scale-in-75" />

// Rotate in
<div className="motion-rotate-in-90" />

// Blur in
<div className="motion-blur-in-md" />

// Combined effects
<div className="motion-opacity-in-0 motion-translate-y-in-100 motion-rotate-in-45" />
```

### Exit Animations (On Unmount)

```tsx
// Fade out
<div className="motion-opacity-out-0" />

// Slide out down
<div className="motion-translate-y-out-100" />

// Scale out
<div className="motion-scale-out-50" />

// Combined exit
<div className="motion-opacity-out-0 motion-translate-y-out-100 motion-blur-out-sm" />
```

### Animation Modifiers

```tsx
// Duration (in milliseconds)
<div className="motion-preset-float motion-duration-2000" />
<div className="motion-preset-float motion-duration-[3500ms]" />

// Delay
<div className="motion-opacity-in-0 motion-delay-500" />
<div className="motion-opacity-in-0 motion-delay-[750ms]" />

// Easing
<div className="motion-preset-float motion-ease-linear" />
<div className="motion-preset-float motion-ease-in-out" />
<div className="motion-preset-float motion-ease-spring-smooth" />

// Delay specific property
<div className="motion-delay-500/rotate motion-rotate-in-180" />

// Play state control
<div className="motion-preset-oscillate motion-paused hover:motion-running" />
```

### Loop Modifiers

```tsx
// Mirror (back and forth)
<div className="motion-translate-y-loop-50/mirror" />

// Reset (instant return)
<div className="motion-translate-y-loop-50/reset" />
```

---

## 📜 Scroll Animations (tailwindcss-intersect)

### Setup Required

1. Observer must be initialized (add to root layout):

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

### Usage

```tsx
// Animate on scroll into view
<div className="intersect:motion-preset-slide-up">
  Slides up when visible
</div>

// One-time animation
<div className="intersect-once intersect:motion-preset-fade">
  Fades in once
</div>

// Combined with delays (stagger effect)
<div className="intersect:motion-preset-slide-up motion-delay-0">First</div>
<div className="intersect:motion-preset-slide-up motion-delay-100">Second</div>
<div className="intersect:motion-preset-slide-up motion-delay-200">Third</div>
```

---

## 🎯 CVA - Class Variance Authority (Optional)

### When to Use

- Multiple component variants
- Complex variant combinations
- Compound variants (variant + size combinations)

### Basic Example

```tsx
import { cva } from "class-variance-authority";
import { cn } from "@util";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-900",
        success: "bg-green-100 text-green-900",
        warning: "bg-yellow-100 text-yellow-900",
        error: "bg-red-100 text-red-900",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
        lg: "px-3 py-1 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Usage
interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export const Badge = ({ variant, size, className, children }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </div>
  );
};

// Component usage
<Badge variant="success" size="lg">
  Active
</Badge>;
```

### Compound Variants

```tsx
const buttonVariants = cva("button-base", {
  variants: {
    intent: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500",
    },
    size: {
      small: "text-sm px-3 py-1",
      large: "text-lg px-6 py-3",
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      size: "large",
      class: "uppercase font-bold",
    },
  ],
});
```

---

## 🔧 Pure Functions vs Hooks

### When to Use Pure Functions

```tsx
// ✅ Deterministic calculations
const particles = generateParticles(seed, count);

// ✅ Data transformations
const filteredData = filterData(data, criteria);

// ✅ Formatting
const formattedDate = formatDate(date);
```

### When to Use Hooks

```tsx
// ✅ State management
const [count, setCount] = useState(0);

// ✅ Side effects
useEffect(() => {
  // side effects
}, [deps]);

// ✅ DOM interactions
const ref = useRef<HTMLDivElement>(null);

// ✅ Custom stateful logic
const { rotation, handleMouseMove } = useCardRotation();
```

---

## 📝 Common Patterns

### Card with Hover Animation

```tsx
import { cn } from "@util";

<div
  className={cn(
    "card transition-all duration-300",
    isHovered && "scale-105 shadow-xl"
  )}
>
  Content
</div>;
```

### Floating Particles

```tsx
{
  particles.map((particle, i) => (
    <div
      key={i}
      className="motion-preset-float motion-ease-in-out"
      style={{
        left: `${particle.left}%`,
        top: `${particle.top}%`,
        animationDuration: `${particle.duration}s`,
        animationDelay: `${particle.delay}s`,
      }}
    />
  ));
}
```

### Conditional Status Badge

```tsx
const statusColors = {
  Alive: "bg-green-400",
  Dead: "bg-red-400",
  unknown: "bg-gray-400",
};

<div
  className={cn(
    "w-2 h-2 rounded-full animate-pulse",
    statusColors[status] || statusColors.unknown
  )}
/>;
```

### Staggered List Animation

```tsx
{
  items.map((item, i) => (
    <div
      key={item.id}
      className="motion-opacity-in-0 motion-translate-y-in-100"
      style={{ animationDelay: `${i * 100}ms` }}
    >
      {item.content}
    </div>
  ));
}
```

---

## 🚫 Anti-Patterns (Don't Do This)

### ❌ Template Literal Concatenation

```tsx
// BAD
className={`base ${condition ? 'active' : 'inactive'}`}

// GOOD
className={cn("base", condition ? "active" : "inactive")}
```

### ❌ Unnecessary Memoization

```tsx
// BAD (React Compiler handles this)
const handleClick = useCallback(() => {
  onClick();
}, [onClick]);

// GOOD
const handleClick = () => {
  onClick();
};
```

### ❌ Custom CSS Animations

```tsx
// BAD
<style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`}</style>
<div style={{ animation: "float 2s infinite" }} />

// GOOD
<div className="motion-preset-float motion-duration-2000" />
```

### ❌ Over-using useMemo

```tsx
// BAD (for deterministic calculations)
const particles = useMemo(() => generateParticles(seed, count), [seed, count]);

// GOOD (pure function is fast enough)
const particles = generateParticles(seed, count);
```

---

## 📚 Resources

- [Tailwind Motion Docs](https://rombo.co/tailwind/)
- [CVA Documentation](https://cva.style/docs)
- [clsx GitHub](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
