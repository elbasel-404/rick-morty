# Performance Optimization

Learn how to make components faster and more efficient.

---

## Overview

Key optimization techniques:
- Lazy loading and code splitting
- Memoization
- Virtual scrolling
- Image optimization

---

## Lazy Loading Components

```tsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

export function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## Viewport-Based Lazy Loading

Use the CardContainer pattern:

```tsx
<CardContainer imageUrl={character.image} imageAlt={character.name}>
  {({ isVisible, imageLoaded }) => (
    // Only renders when in viewport
    <Card isVisible={isVisible} />
  )}
</CardContainer>
```

---

## Memoization

### useMemo for Expensive Calculations

```tsx
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price);
}, [items]);
```

### useCallback for Stable References

```tsx
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

---

## Image Optimization

### Use Next.js Image Component

```tsx
import Image from "next/image";

<Image
  src={character.image}
  alt={character.name}
  width={300}
  height={300}
  loading="lazy"
/>
```

### Preload Critical Images

```tsx
<link rel="preload" as="image" href="/hero.jpg" />
```

---

## Debouncing and Throttling

```tsx
import { useDeferredValue } from "react";

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  const results = useMemo(() => {
    return search(deferredQuery);
  }, [deferredQuery]);
  
  return <div>{results}</div>;
}
```

---

## Related Documentation

- [React Performance](../react/performance/profiling.md)
- [Lazy Loading](../react/concepts/lazy.md)
- [Next.js Image](../next/image.md)

