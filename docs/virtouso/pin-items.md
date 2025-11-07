# Pinning Items with Virtuoso

The `Virtuoso` component supports pinning items to the top of the list using the `topItemCount` property. This keeps the first N items fixed and always visible while the rest of the list scrolls beneath them.

## Example

In the example below, the first two items remain pinned at the top. The `backgroundColor` property hides scrollable items that pass behind the pinned items.

```tsx
import { Virtuoso } from "react-virtuoso";

export default function App() {
  return (
    <Virtuoso
      style={{ height: "100%" }}
      totalCount={1000}
      topItemCount={2}
      itemContent={(index) => (
        <div style={{ height: 30, backgroundColor: "var(--background)" }}>
          Item {index + 1}
        </div>
      )}
    />
  );
}
```

## How It Works

- **`topItemCount`** - Specifies the number of items to pin at the top
- **`backgroundColor`** - Prevents scrollable content from appearing above the pinned items
