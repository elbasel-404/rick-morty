# cache

`cache` lets you cache the result of a data fetch or computation.

> **Note**: `cache` is only for use with React Server Components.

## Syntax

```tsx
const cachedFn = cache(fn);
```

## Reference

### Parameters

- **`fn`**: The function you want to cache results for. Can take any arguments and return any value.

### Returns

`cache` returns a cached version of `fn` with the same type signature. It does not call `fn` in the process.

**How it works:**

1. When calling `cachedFn` with arguments, it first checks if a cached result exists
2. If a cached result exists, it returns the result
3. If not, it calls `fn` with the arguments, stores the result in cache, and returns it
4. `fn` is only called when there is a cache miss

**Note**: The optimization of caching return values based on inputs is known as **memoization**. The function returned from `cache` is a **memoized function**.

## Usage

### Cache an Expensive Computation

Use `cache` to skip duplicate work:

```tsx
import { cache } from "react";
import calculateUserMetrics from "lib/user";

const getUserMetrics = cache(calculateUserMetrics);

function Profile({ user }) {
  const metrics = getUserMetrics(user);
  // ...
}

function TeamReport({ users }) {
  for (let user in users) {
    const metrics = getUserMetrics(user);
    // ...
  }
  // ...
}
```

If the same `user` object is rendered in both `Profile` and `TeamReport`, the two components can share work and only call `calculateUserMetrics` once for that user.

**How it works:**

1. `Profile` renders first and calls `getUserMetrics` → cache miss → calls `calculateUserMetrics` and caches result
2. `TeamReport` renders and reaches the same user → cache hit → reads result from cache

### Share a Snapshot of Data

Share a snapshot of data between components by caching a data-fetching function:

```tsx
import { cache } from "react";
import { fetchTemperature } from "./api.js";

const getTemperature = cache(async (city) => {
  return await fetchTemperature(city);
});

async function AnimatedWeatherCard({ city }) {
  const temperature = await getTemperature(city);
  // ...
}

async function MinimalWeatherCard({ city }) {
  const temperature = await getTemperature(city);
  // ...
}
```

If `AnimatedWeatherCard` and `MinimalWeatherCard` both render for the same city, they will receive the same snapshot of data from the memoized function. The `city` acts as a cache key.

**Note**: Asynchronous rendering is only supported for Server Components.

### Preload Data

By caching a long-running data fetch, you can kick off asynchronous work prior to rendering:

```tsx
const getUser = cache(async (id) => {
  return await db.user.query(id);
});

async function Profile({ id }) {
  const user = await getUser(id);
  return (
    <section>
      <img src={user.profilePic} />
      <h2>{user.name}</h2>
    </section>
  );
}

function Page({ id }) {
  // ✅ Good: start fetching the user data
  getUser(id);
  // ... some computational work
  return (
    <>
      <Profile id={id} />
    </>
  );
}
```

**How it works:**

1. `Page` calls `getUser(id)` but doesn't use the returned data (kicks off async query)
2. `Page` does other computational work and renders children
3. `Profile` calls `getUser(id)` again
4. If initial call finished, `Profile` reads from cache (no delay)
5. If initial call hasn't finished, `Profile` waits for the same promise (reduced delay)

## Caveats

- **Cache Invalidation**: React will invalidate the cache for all memoized functions for each server request

- **New Function Per Call**: Each call to `cache` creates a new function. Calling `cache` with the same function multiple times will return different memoized functions that do not share the same cache.

- **Error Caching**: `cachedFn` will also cache errors. If `fn` throws an error for certain arguments, it will be cached, and the same error is re-thrown when `cachedFn` is called with those same arguments.

- **Server Components Only**: `cache` is for use in Server Components only

## Common Pitfalls

### ❌ Calling cache Inside Components

```tsx
// Temperature.js
import { cache } from "react";
import { calculateWeekReport } from "./report";

export function Temperature({ cityData }) {
  // 🚩 Wrong: Creates new `getWeekReport` for each render
  const getWeekReport = cache(calculateWeekReport);
  const report = getWeekReport(cityData);
  // ...
}
```

**Problem**: Creates a new memoized function on each render → no cache sharing

### ✅ Define in Module Scope

```tsx
// getWeekReport.js
import { cache } from "react";
import { calculateWeekReport } from "./report";

export default cache(calculateWeekReport);
```

```tsx
// Temperature.js
import getWeekReport from "./getWeekReport";

export default function Temperature({ cityData }) {
  const report = getWeekReport(cityData);
  // ...
}
```

```tsx
// Precipitation.js
import getWeekReport from "./getWeekReport";

export default function Precipitation({ cityData }) {
  const report = getWeekReport(cityData);
  // ...
}
```

Both components call the same memoized function → share the same cache → maximum cache hits.

### ❌ Calling Outside Components

```tsx
import { cache } from "react";

const getUser = cache(async (userId) => {
  return await db.user.query(userId);
});

// 🚩 Wrong: Calling outside component will not use cache
getUser("demo-id");

async function DemoProfile() {
  // ✅ Good: `getUser` will memoize
  const user = await getUser("demo-id");
  return <Profile user={user} />;
}
```

**Why**: React only provides cache access to the memoized function in a component. Cache access is provided through context which is only accessible from a component.

### ❌ Non-Primitive Arguments

```tsx
import { cache } from "react";

const calculateNorm = cache((vector) => {
  // ...
});

function MapMarker(props) {
  // 🚩 Wrong: props is an object that changes every render
  const length = calculateNorm(props);
  // ...
}

function App() {
  return (
    <>
      <MapMarker x={10} y={10} z={10} />
      <MapMarker x={10} y={10} z={10} />
    </>
  );
}
```

**Problem**: Each component creates its own `props` object → different object references → cache misses

React uses `Object.is` (shallow equality) to check for cache hits.

### ✅ Solution 1: Pass Primitives

```tsx
const calculateNorm = cache((x, y, z) => {
  // ...
});

function MapMarker(props) {
  // ✅ Good: Pass primitives to memoized function
  const length = calculateNorm(props.x, props.y, props.z);
  // ...
}
```

### ✅ Solution 2: Pass Same Object Reference

```tsx
const calculateNorm = cache((vector) => {
  // ...
});

function MapMarker(props) {
  // ✅ Good: Pass the same `vector` object
  const length = calculateNorm(props.vector);
  // ...
}

function App() {
  const vector = [10, 10, 10];
  return (
    <>
      <MapMarker vector={vector} />
      <MapMarker vector={vector} />
    </>
  );
}
```

## cache vs memo vs useMemo

| Feature            | `cache`              | `memo`                | `useMemo`               |
| ------------------ | -------------------- | --------------------- | ----------------------- |
| **Use Case**       | Server data fetching | Component memoization | Client-side computation |
| **Where**          | Server Components    | Component wrapper     | Inside components       |
| **Shares Between** | Multiple components  | N/A                   | Single component        |
| **Invalidation**   | Per request          | Props change          | Dependencies change     |
| **Async Support**  | ✅ Yes               | ❌ No                 | ❌ No                   |

## Troubleshooting

### My memoized function still runs even though I've called it with the same arguments

Check for these common issues:

1. **Different memoized functions** - Are you calling `cache` multiple times?
2. **Calling outside component** - Are you calling outside of a component?
3. **Non-primitive arguments** - Are you passing objects/arrays with different references?

## Related

- [Server Components](./server-components.md) - Server-side rendering
- [cacheSignal](https://react.dev/reference/react/experimental_cacheSignal) - Cancel cached computation
- [memo](https://react.dev/reference/react/memo) - Memoize components
- [useMemo](https://react.dev/reference/react/useMemo) - Memoize client-side values
