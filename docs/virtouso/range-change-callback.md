# Range Change Callback

The `rangeChanged` callback property is called with the start/end indexes of the visible range.

> **Note:** The `rangeChanged` reports the rendered items, which are affected by the `increaseViewportBy` and `overscan` properties. If you must track only the visible items, you can refer to [this GitHub issue](https://github.com/petyosi/react-virtuoso/issues) for a workaround.

## Example

```tsx
import { Virtuoso } from "react-virtuoso";
import { useState } from "react";

export default function App() {
  const [visibleRange, setVisibleRange] = useState({
    startIndex: 0,
    endIndex: 0,
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <p>
        Current visible range: {visibleRange.startIndex} -{" "}
        {visibleRange.endIndex}
      </p>
      <Virtuoso
        totalCount={1000}
        rangeChanged={setVisibleRange}
        style={{ flex: 1 }}
        itemContent={(index) => <div>Item {index}</div>}
      />
    </div>
  );
}
```
