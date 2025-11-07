# Custom Scroller

The React Virtuoso component accepts standard HTML attributes and passes them to the root scrollable DOM div. Use this to customize styling and bind to DOM events like `onScroll`. For deeper customization, pass a custom component via `components.Scroller`.

## Basic Example

```tsx
import { Virtuoso } from "react-virtuoso";

export default function App() {
  return (
    <Virtuoso
      onScroll={(e) => console.log((e.target as HTMLElement).scrollTop)}
      totalCount={1000}
      itemContent={(idx) => `Item ${idx}`}
      style={{
        border: "5px dashed gray",
        borderRadius: "4px",
        height: "100%",
      }}
    />
  );
}
```

## Custom Scroller Component

For advanced customization, create a custom scroller component:

```tsx
import { Virtuoso, VirtuosoProps } from "react-virtuoso";
import React from "react";

// Avoid inlining the component to prevent fresh instances on re-render
// Use Virtuoso's context prop for conditional logic instead
const Scroller: VirtuosoProps<unknown, unknown>["components"]["Scroller"] =
  React.forwardRef(({ style, ...props }, ref) => (
    <div style={{ ...style, border: "5px solid gray" }} ref={ref} {...props} />
  ));

export default function App() {
  return (
    <Virtuoso
      style={{ height: "100%" }}
      onScroll={(e) => console.log((e.target as HTMLElement).scrollTop)}
      totalCount={1000}
      itemContent={(idx) => `Item ${idx}`}
      components={{ Scroller }}
    />
  );
}
```

**Note:** Don't inline the component—doing so creates a fresh instance on each render. Use Virtuoso's `context` prop for conditional logic instead.
