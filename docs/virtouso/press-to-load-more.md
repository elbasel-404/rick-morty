# Load More Button with Virtuoso

The `components.Footer` property places a "load more" button that appends items to the list.

## How It Works

1. Scroll to the bottom of the list
2. Press the button to load 100 more items
3. The `setTimeout` simulates a network request (replace with actual API calls in production)

## Example Implementation

```tsx
import { Virtuoso } from "react-virtuoso";
import { useState, useCallback, useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState(() => []);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    setLoading(true);
    return setTimeout(() => {
      setUsers((users) => [...users, ...generateUsers(100, users.length)]);
      setLoading(() => false);
    }, 500);
  }, [setUsers, setLoading]);

  useEffect(() => {
    const timeout = loadMore();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Virtuoso
      style={{ height: "100%" }}
      data={users}
      context={{ loading, loadMore }}
      increaseViewportBy={200}
      itemContent={(index, user) => <div>{user.name}</div>}
      components={{ Footer }}
    />
  );
}

const Footer = ({ context: { loadMore, loading } }) => (
  <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
    <button disabled={loading} onClick={loadMore}>
      {loading ? "Loading..." : "Press to load more"}
    </button>
  </div>
);

function generateUsers(count: number, start: number) {
  return Array.from({ length: count }, (_, i) => ({
    name: `User ${start + i}`,
  }));
}
```
