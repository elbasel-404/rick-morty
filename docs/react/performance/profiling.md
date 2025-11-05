# React Performance

React Performance tracks are specialized custom entries that appear on the Performance panel's timeline in your browser developer tools.

These tracks provide comprehensive insights into your React application's performance by visualizing React-specific events and metrics alongside other critical data sources such as network requests, JavaScript execution, and event loop activity.

## Availability

React Performance tracks are only available in **development** and **profiling** builds:

- **Development**: Enabled by default
- **Profiling**: Only Scheduler tracks are enabled by default
- **Production**: Disabled by default (to minimize overhead)

## Using Profiling Builds

### What are Profiling Builds?

In addition to production and development builds, React provides a special **profiling build** with additional instrumentation.

### How to Enable

To use profiling builds, alias `react-dom/client` to `react-dom/profiling` at build time:

```js
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      "react-dom/client": "react-dom/profiling",
    },
  },
};
```

**Note**: Your framework might have built-in support for React's profiling build.

## Performance Tracks

### 1. Scheduler Track

The Scheduler is an internal React concept for managing tasks with different priorities. This track consists of 4 subtracks:

#### Priority Levels

1. **Blocking** - Synchronous updates from user interactions (clicks, typing)
2. **Transition** - Non-blocking background work (initiated via `startTransition`)
3. **Suspense** - Work related to Suspense boundaries (fallbacks, content reveal)
4. **Idle** - Lowest priority work when no higher priority tasks exist

#### Render Phases

Every render pass consists of multiple phases visible on the timeline:

1. **Update** - What caused the new render pass
2. **Render** - React renders the updated subtree by calling component render functions
3. **Commit** - React submits changes to the DOM and runs layout effects (`useLayoutEffect`)
4. **Remaining Effects** - React runs passive effects (`useEffect`)

**Note**: Effects usually run after paint, except for discrete events like clicks where they may run before paint.

#### Cascading Updates

Cascading updates are a common pattern for performance regressions. If an update is scheduled during a render pass, React may discard completed work and start a new pass.

In development builds, React shows you which Component scheduled the update with an enhanced stack trace.

### 2. Components Track

The Components track visualizes the durations of React components as a flamegraph.

#### Render Durations

Each entry represents:

- The duration of the component render
- All its descendant children components
- Displayed as a flamegraph (nested timings)

#### Effect Durations

Also represented as a flamegraph with a different color scheme:

- Aligns with corresponding phase on the Scheduler track
- Only shows effects with duration ≥ 0.05ms (to prevent clutter)
- Effects that triggered updates are always shown

#### Additional Events

During render and effects phases, you may see:

- **Mount** - A subtree was mounted
- **Unmount** - A subtree was unmounted
- **Reconnect** - Limited to `<Activity>` usage
- **Disconnect** - Limited to `<Activity>` usage

#### Changed Props (Development Only)

Click on a component render entry to inspect potential changes in props. Use this to identify unnecessary renders.

### 3. Server Tracks

**Note**: Server Components and Server Requests tracks are **only available in development builds**.

#### Server Requests Track

Visualizes all Promises that eventually end up in a React Server Component:

- Includes async operations like `fetch` or async Node.js file operations
- Combines Promises from third-party code into single spans
- Example: A library method `getUser` that calls `fetch` internally appears as one `getUser` span

**Features**:

- Click on spans to see Promise creation stack trace
- View resolved Promise value (if available)
- Rejected Promises appear in red with their rejected value

#### Server Components Track

Visualizes the durations of React Server Components and Promises they awaited:

- Displayed as a flamegraph (component duration + all descendants)
- Awaited Promise durations are shown
- Different colors indicate render duration (darker = longer)

**Track Groups**:

- Always contains a "Primary" track
- Additional "Parallel" tracks for concurrent Server Components rendering
- Max 8 parallel tracks (more are associated with the last "Parallel" track)

## Performance Tips

### Identifying Performance Issues

1. **Look for long render times** in Components track
2. **Check for cascading updates** in Scheduler track
3. **Identify unnecessary re-renders** using Changed Props
4. **Monitor effect durations** for expensive operations

### Common Patterns

#### Avoiding Cascading Updates

```tsx
// ❌ Causes cascading update
function Component() {
  const [count, setCount] = useState(0);

  // During render - causes new update
  if (count > 5) {
    setCount(0); // 🚩 Cascading update
  }

  return <div>{count}</div>;
}

// ✅ Use useEffect instead
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 5) {
      setCount(0); // ✅ Scheduled properly
    }
  }, [count]);

  return <div>{count}</div>;
}
```

#### Minimizing Re-renders

```tsx
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // ...expensive computation
});

// Use useMemo for expensive calculations
function Component({ items }) {
  const sortedItems = useMemo(
    () => items.sort((a, b) => a.value - b.value),
    [items]
  );
  // ...
}
```

## Browser Developer Tools

Performance tracks appear automatically in browser DevTools that provide extensibility APIs:

- Chrome DevTools
- Edge DevTools
- Firefox DevTools (with support)

### Recording a Profile

1. Open DevTools (F12 or Cmd+Opt+I)
2. Go to Performance panel
3. Click Record
4. Interact with your app
5. Click Stop
6. Examine React Performance tracks in the timeline

## Caveats

- **Overhead**: Profiling instrumentation adds overhead - disabled in production by default
- **Server Tracks**: Only available in development builds
- **Components Track**: In profiling builds, only shows components in `<Profiler>` subtrees unless React DevTools extension is enabled

## Related

- [Profiler API](https://react.dev/reference/react/Profiler) - Programmatic performance measurement
- [React DevTools](https://react.dev/learn/react-developer-tools) - Browser extension for debugging
- [startTransition](../hooks/useTransition.md) - Mark updates as non-urgent
- [useMemo](https://react.dev/reference/react/useMemo) - Memoize expensive calculations
- [memo](https://react.dev/reference/react/memo) - Skip re-renders when props are the same
