# Using Window Scroll with Virtuoso

The Virtuoso component can use the document scroller by setting the `useWindowScroll` property to `true`.

## Example

```tsx
import { Virtuoso } from "react-virtuoso";

export default function App() {
  return (
    <Virtuoso
      useWindowScroll
      totalCount={200}
      itemContent={(index) => (
        <div style={{ padding: "1rem 0.5rem" }}>Item {index}</div>
      )}
    />
  );
}
```
