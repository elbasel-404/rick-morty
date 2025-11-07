## Scrolling Performance

Loading and rendering complex content while scrolling can degrade performance. The Virtuoso component provides an `isScrolling` event property that fires when users start or stop scrolling, receiving `true` on scroll start and `false` shortly after the last scroll event.

Use this event to improve performance by hiding or replacing heavy elements during scrolling.

### Example Implementation

```tsx
import { Virtuoso } from "react-virtuoso";
import { useState, FC } from "react";

export default function App() {
  const [isScrolling, setIsScrolling] = useState(false);

  return (
    <Virtuoso
      style={{ height: "100%" }}
      totalCount={1000}
      context={{ isScrolling }}
      isScrolling={setIsScrolling}
      itemContent={(index, user, { isScrolling }) => (
        <div
          style={{
            padding: "1rem 0",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ margin: "1rem" }}>
            {isScrolling ? <AvatarPlaceholder /> : <Avatar />}
          </div>
          <div>Item {index}</div>
        </div>
      )}
    />
  );
}

const Avatar: FC = () => (
  <div
    style={{
      backgroundColor: "blue",
      borderRadius: "50%",
      width: 50,
      height: 50,
      paddingTop: 13,
      paddingLeft: 14,
      color: "white",
      boxSizing: "border-box",
    }}
  >
    AB
  </div>
);

const AvatarPlaceholder: FC = () => (
  <div
    style={{
      backgroundColor: "#eef2f4",
      borderRadius: "50%",
      width: 50,
      height: 50,
    }}
  />
);
```

During scrolling, the component renders `AvatarPlaceholder` instead of the heavier `Avatar`, then switches back when scrolling stops.
