# Modular Effect Components

A collection of composable, reusable effect components for animations and lazy loading.

## Philosophy

Instead of monolithic components with hardcoded animations, these modular effects can be **composed together** to create custom loading experiences. Each component does one thing well.

## Components

### `<FadeIn />`

Fades content in with configurable timing.

**Props:**

```typescript
interface FadeInProps {
  isVisible: boolean; // Trigger visibility
  duration?: number; // Default: 1200ms
  delay?: number; // Default: 0ms
  easing?: string; // Default: cubic-bezier(0.4, 0.0, 0.2, 1)
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}
```

**Example:**

```tsx
<FadeIn isVisible={isLoaded} duration={1800} delay={200}>
  <MyCard />
</FadeIn>
```

---

### `<FadeOut />`

Fades content out and optionally unmounts when hidden.

**Props:**

```typescript
interface FadeOutProps {
  isHidden: boolean; // Trigger hide
  duration?: number; // Default: 800ms
  delay?: number; // Default: 0ms
  easing?: string; // Default: cubic-bezier(0.4, 0.0, 0.2, 1)
  unmountOnHide?: boolean; // Default: true (remove from DOM)
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}
```

**Example:**

```tsx
<FadeOut isHidden={shouldHide} duration={600} unmountOnHide={true}>
  <LoadingSkeleton />
</FadeOut>
```

---

### `<LazyImage />`

Lazy loads images only when in viewport with cache detection.

**Props:**

```typescript
interface LazyImageProps {
  src: string;
  alt: string;
  isInViewport: boolean; // Triggers loading
  onLoad?: (loaded: boolean, isCached: boolean) => void;
  mode?: "inline" | "preload"; // Default: "preload"
  className?: string;
  // ... other img attributes
}
```

**Features:**

- ✅ Cache detection (instant load if cached)
- ✅ Only loads when in viewport
- ✅ Preload mode (hidden img) or inline mode
- ✅ Callback with cache status

**Example:**

```tsx
<LazyImage
  src={imageUrl}
  alt="Character"
  isInViewport={isVisible}
  onLoad={(loaded, cached) => {
    console.log(cached ? "From cache!" : "Downloaded");
  }}
  mode="preload"
/>
```

---

### `<ViewportDetector />`

Detects when content enters viewport using Intersection Observer.

**Props:**

```typescript
interface ViewportDetectorProps {
  threshold?: number; // Default: 0.1
  rootMargin?: string; // Default: "400px"
  className?: string;
  children: (isInViewport: boolean) => ReactNode;
}
```

**Example:**

```tsx
<ViewportDetector threshold={0.2} rootMargin="200px">
  {(isInViewport) => <div>{isInViewport ? "Visible!" : "Not visible"}</div>}
</ViewportDetector>
```

---

## Composition Patterns

### Pattern 1: Skeleton → Card Transition

```tsx
<ViewportDetector>
  {(isInViewport) => (
    <>
      <LazyImage
        src={img}
        isInViewport={isInViewport}
        onLoad={(loaded) => setImageLoaded(loaded)}
      />

      <FadeOut isHidden={imageLoaded} duration={800}>
        <Skeleton />
      </FadeOut>

      <FadeIn isVisible={imageLoaded} duration={1800} delay={200}>
        <Card />
      </FadeIn>
    </>
  )}
</ViewportDetector>
```

### Pattern 2: Staggered Fade In

```tsx
<FadeIn isVisible={show} duration={600} delay={0}>
  <Header />
</FadeIn>

<FadeIn isVisible={show} duration={600} delay={100}>
  <Content />
</FadeIn>

<FadeIn isVisible={show} duration={600} delay={200}>
  <Footer />
</FadeIn>
```

### Pattern 3: Crossfade

```tsx
<div style={{ position: "relative" }}>
  <FadeOut isHidden={!showA}>
    <ComponentA />
  </FadeOut>

  <FadeIn isVisible={showB} style={{ position: "absolute", inset: 0 }}>
    <ComponentB />
  </FadeIn>
</div>
```

---

## CardContainer Integration

The `CardContainer` uses these modular components internally:

```tsx
<CardContainer
  imageUrl={url}
  imageAlt="Character"
  skeletonFadeOutDuration={800} // FadeOut duration
  cardFadeInDuration={1800} // FadeIn duration
  cardFadeInDelay={200} // FadeIn delay
>
  {({ isVisible }) => <Card />}
</CardContainer>
```

**Defaults:**

- Skeleton fade out: `800ms`
- Card fade in: `1800ms` (slower, more elegant)
- Card fade in delay: `0ms` (starts immediately after skeleton fades)

---

## Benefits

### ✅ Modular & Composable

Mix and match effects for custom animations

### ✅ Declarative API

Clear, prop-based control

### ✅ Performance Optimized

- Unmounts hidden components
- Cache detection
- Viewport-aware loading

### ✅ Flexible Timing

Full control over duration, delay, easing

### ✅ Reusable

Use across any component, not just cards

---

## Examples in Project

**CharacterCardI:**

```tsx
<CardContainer cardFadeInDuration={1800} cardFadeInDelay={200}>
  {({ isVisible }) => <Card opacity controlled by FadeIn />}
</CardContainer>
```

**CharacterCardII:**

```tsx
<CardContainer cardFadeInDuration={1800} cardFadeInDelay={200}>
  {({ isVisible }) => <FlipCard opacity controlled by FadeIn />}
</CardContainer>
```

---

## Customization

### Slow, Luxurious Fade

```tsx
<FadeIn
  isVisible={show}
  duration={2400}
  delay={400}
  easing="cubic-bezier(0.16, 1, 0.3, 1)" // Smooth ease-out
>
```

### Quick, Snappy Fade

```tsx
<FadeIn
  isVisible={show}
  duration={400}
  delay={0}
  easing="cubic-bezier(0.4, 0, 0.2, 1)"
>
```

### Custom Easing Presets

```typescript
const EASING = {
  smooth: "cubic-bezier(0.4, 0.0, 0.2, 1)",
  elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
} as const;

<FadeIn easing={EASING.elastic} />;
```

---

## Migration from Old API

### Before:

```tsx
<CardContainer fadeOutDuration={800}>
  {({ cardOpacity }) => <div style={{ opacity: cardOpacity }}>Card</div>}
</CardContainer>
```

### After:

```tsx
<CardContainer
  skeletonFadeOutDuration={800}
  cardFadeInDuration={1800}
  cardFadeInDelay={200}
>
  {({ isVisible }) => (
    <Card /> {/* Opacity handled by FadeIn wrapper */}
  )}
</CardContainer>
```

**Key Changes:**

- `cardOpacity` → `isVisible` (boolean, cleaner)
- Opacity controlled by `<FadeIn>` wrapper internally
- Separate control for skeleton and card timing
- No manual opacity styles needed

---

## Performance Notes

- `FadeOut` with `unmountOnHide={true}` removes elements from DOM (better performance)
- `LazyImage` only triggers network request when in viewport
- Cache detection prevents unnecessary skeleton flash
- Viewport detection uses Intersection Observer (hardware accelerated)
