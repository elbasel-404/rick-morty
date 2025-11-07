# Scroll Seek Configuration

The `scrollSeekConfiguration` property enables rendering placeholder elements instead of actual items during fast scrolling. This improves performance by deferring server data loading.

## Example Implementation

```tsx
import { Virtuoso } from "react-virtuoso";
import { useMemo, useState } from "react";

export default function App() {
  const randomHeights = useMemo(
    () =>
      Array(10)
        .fill(true)
        .map(() => Math.round(Math.random() * 14) + 1),
    []
  );

  const [visibleRange, setVisibleRange] = useState(["-", "-"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div>
        Current visible range:{" "}
        <strong>
          {visibleRange[0]} - {visibleRange[1]}
        </strong>
      </div>

      <div style={{ flex: 1 }}>
        <Virtuoso
          context={{ randomHeights }}
          style={{ height: "100%" }}
          totalCount={1000}
          itemContent={(index) => <div>Item {index}</div>}
          components={{ ScrollSeekPlaceholder }}
          scrollSeekConfiguration={{
            enter: (velocity) => Math.abs(velocity) > 50,
            exit: (velocity) => {
              const shouldExit = Math.abs(velocity) < 10;
              if (shouldExit) setVisibleRange(["-", "-"]);
              return shouldExit;
            },
            change: (_velocity, { startIndex, endIndex }) =>
              setVisibleRange([startIndex.toString(), endIndex.toString()]),
          }}
        />
      </div>
    </div>
  );
}
```

## Placeholder Component

```tsx
const ScrollSeekPlaceholder = ({
  height,
  index,
  context: { randomHeights },
}) => (
  <div
    style={{
      height,
      padding: "8px",
      boxSizing: "border-box",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        background: index % 2 ? "#ccc" : "#eee",
        height: randomHeights[index % 10],
      }}
    />
  </div>
);
```

**Note:** Use the `index` parameter to randomize placeholders. Match placeholder height to measured item height.
