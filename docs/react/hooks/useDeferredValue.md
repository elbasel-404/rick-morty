# useDeferredValue

`useDeferredValue` is a React Hook that lets you defer updating a part of the UI.

## Syntax

```tsx
const deferredValue = useDeferredValue(value, initialValue?)
```

## Reference

### Parameters

- **`value`**: The value you want to defer. Can have any type.
- **`initialValue`** (optional): A value to use during the initial render. If omitted, `useDeferredValue` will not defer during the initial render.

### Returns

- **`currentValue`**: During the initial render, the returned deferred value will be the `initialValue`, or the same as the `value` you provided. During updates, React will first attempt a re-render with the old value, then try another re-render in the background with the new value.

## Usage

### Showing Stale Content While Fresh Content Loads

Call `useDeferredValue` at the top level of your component to defer updating some part of your UI:

```tsx
import { useState, useDeferredValue } from "react";

function SearchPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

**How it works:**

- During the initial render, the deferred value equals the provided value
- During updates, the deferred value "lags behind" the latest value
- React first re-renders without updating the deferred value
- Then tries to re-render with the new value in the background

### Example: Search with Suspense

```tsx
import { Suspense, useState, useDeferredValue } from "react";
import SearchResults from "./SearchResults.js";

export default function App() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

The `query` updates immediately (input displays new value), but `deferredQuery` keeps its previous value until data loads, showing stale results briefly instead of the Suspense fallback.

### Indicating Content is Stale

Show a visual indication when displaying stale content:

```tsx
import { Suspense, useState, useDeferredValue } from "react";
import SearchResults from "./SearchResults.js";

export default function App() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div
          style={{
            opacity: isStale ? 0.5 : 1,
            transition: isStale
              ? "opacity 0.2s 0.2s linear"
              : "opacity 0s 0s linear",
          }}
        >
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}
```

### Deferring Re-rendering for Performance

Use `useDeferredValue` as a performance optimization when part of your UI is slow to re-render:

```tsx
import { useState, useDeferredValue } from "react";
import SlowList from "./SlowList.js";

export default function App() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
```

**Important**: This optimization requires `SlowList` to be wrapped in `memo`:

```tsx
const SlowList = memo(function SlowList({ text }) {
  // ...
});
```

This doesn't make re-rendering faster, but it tells React to deprioritize the list's re-render so it doesn't block user input. The list "lags behind" the input then "catches up."

## Key Concepts

### Behavior Under the Hood

1. When `useDeferredValue` receives a different value (compared with `Object.is`):
   - Current render uses the previous value
   - Schedules a background re-render with the new value
2. The background re-render is **interruptible**:
   - If there's another update, React restarts from scratch
   - Example: User typing faster than chart can render → chart only re-renders after typing stops

### Suspense Integration

- `useDeferredValue` is integrated with `<Suspense>`
- If the background update suspends the UI, the user won't see the fallback
- They'll see the old deferred value until data loads

## Caveats

- **With Transitions**: When an update is inside a Transition, `useDeferredValue` always returns the new value and doesn't spawn a deferred render (update is already deferred)

- **Value Types**: Pass primitive values (strings, numbers) or objects created outside of rendering. Creating new objects during rendering causes unnecessary background re-renders

- **Network Requests**: `useDeferredValue` doesn't prevent extra network requests by itself

- **No Fixed Delay**: There's no fixed delay. React starts the background re-render immediately after finishing the original re-render

- **Effect Timing**: The background re-render doesn't fire Effects until committed to the screen. If it suspends, Effects run after data loads and UI updates

- **Requires memo**: For performance optimization use cases, wrap the deferred component in `memo` to skip unnecessary re-renders

## Related

- [useTransition](./useTransition.md) - Non-blocking state updates
- [memo](../concepts/performance.md#memo) - Skip re-renders when props are the same
- [Suspense](../concepts/lazy.md#suspense) - Show fallback while content loads
