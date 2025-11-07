# Virtuoso Resize Handling

The Virtuoso component automatically handles changes in item heights caused by content resizing, image loading, and other dynamic updates. No additional configuration is required.

## Example: Resizable Container

The list below is wrapped in a resizable container. Try resizing it to observe how the list responds dynamically.

```tsx
import { Virtuoso } from "react-virtuoso";
import { useMemo } from "react";

export default function App() {
  const users = useMemo(() => {
    return Array.from({ length: 100000 }, (_, index) => ({
      name: `User ${index}`,
      description: `Description for user ${index}`,
    }));
  }, []);

  return (
    <div
      style={{
        height: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        resize: "both",
        padding: "1em",
        border: "1px solid #ccc",
      }}
    >
      <Virtuoso
        style={{ height: "100%" }}
        data={users}
        itemContent={(index, user) => (
          <div
            style={{
              padding: "1rem 0.5rem",
              borderBottom: `1px solid var(--border)`,
            }}
          >
            <h4>{user.name}</h4>
            <div style={{ marginTop: "1rem" }}>{user.description}</div>
          </div>
        )}
      />
    </div>
  );
}
```
