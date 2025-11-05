# Effect Events Pattern

## What are Effect Events?

Effect Events are a React pattern that allows you to extract non-reactive logic from your Effects into reusable functions. They solve the problem of needing to read the latest values of props or state without causing the Effect to re-run when those values change.

## The Problem They Solve

### Without Effect Events

```javascript
function ChatRoom({ roomId, theme, createConnection }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on("connected", () => {
      showNotification("Connected!", theme);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme, createConnection]); // 😞 Re-runs on theme change
}
```

In this example, the Effect re-runs every time `theme` changes, even though we only want to reconnect when `roomId` changes. The notification just needs to show the current theme when it's displayed.

### With Effect Events

```javascript
function ChatRoom({ roomId, theme, createConnection }) {
  const onConnected = useEffectEvent(() => {
    showNotification("Connected!", theme);
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on("connected", () => {
      onConnected(); // Always uses latest theme
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, createConnection]); // ✅ Only re-runs on roomId change
}
```

Now the Effect only re-runs when `roomId` or `createConnection` changes, but the notification always shows the current `theme`.

## Key Concepts

### Reactive vs Non-Reactive Logic

**Reactive Logic** - Should trigger Effect re-runs:

- Establishing connections based on props
- Subscribing to data sources
- Setting up event listeners with dynamic handlers

**Non-Reactive Logic** - Should just read latest values:

- Logging/analytics with current state
- Showing notifications with current theme
- Sending data to analytics with latest user info

### Effect Events are Not Reactive

When you wrap code in an Effect Event:

- It can read the latest props and state
- It does NOT become part of the Effect's dependencies
- Changes to values it reads do NOT trigger the Effect to re-run

## Mental Model

Think of Effect Events as:

> **"A way to tell React: I need this value right now when the code runs, but I don't care about re-running when it changes."**

Compare this to regular Effect dependencies:

> **"A way to tell React: I need this value, and please re-run my Effect whenever it changes."**

## When to Use Effect Events

✅ **Good use cases:**

- Analytics/logging that needs current values
- Notifications that should show current theme/locale
- Event handlers inside Effects that need fresh props
- Reading context values without Effect re-runs

❌ **Bad use cases:**

- Hiding legitimate dependencies to avoid re-runs
- Complex stateful logic (consider `useReducer` instead)
- Passing to child components as props
- Using outside of Effects

## Best Practices

### 1. Define Near Usage

```javascript
function MyComponent() {
  // ✅ Define Effect Event right before the Effect that uses it
  const onSomething = useEffectEvent(() => {
    // ...
  });

  useEffect(() => {
    onSomething();
  }, []);
}
```

### 2. Keep Reactive Values as Arguments

```javascript
function MyComponent({ url, data }) {
  const onNavigate = useEffectEvent((currentUrl) => {
    // ✅ url passed as argument - stays reactive
    // ✅ data read from closure - non-reactive
    logVisit(currentUrl, data);
  });

  useEffect(() => {
    onNavigate(url); // Effect re-runs on url change
  }, [url]);
}
```

### 3. Be Explicit About Intent

```javascript
// ❌ Unclear why theme isn't in dependencies
useEffect(() => {
  showNotification(theme);
}, []);

// ✅ Clear that theme is intentionally non-reactive
const showCurrentThemeNotification = useEffectEvent(() => {
  showNotification(theme);
});

useEffect(() => {
  showCurrentThemeNotification();
}, []);
```

## Common Patterns

### Pattern 1: Analytics with Latest Values

```javascript
function Page({ url, userId, sessionId }) {
  const logPageView = useEffectEvent((page) => {
    analytics.track("page_view", {
      page,
      userId, // Latest value
      sessionId, // Latest value
    });
  });

  useEffect(() => {
    logPageView(url);
  }, [url]); // Only re-run on URL change
}
```

### Pattern 2: Notifications with Current Theme

```javascript
function DataLoader({ dataId, theme }) {
  const showLoadNotification = useEffectEvent((success) => {
    showNotification(
      success ? "Loaded!" : "Error",
      { theme } // Current theme
    );
  });

  useEffect(() => {
    loadData(dataId)
      .then(() => showLoadNotification(true))
      .catch(() => showLoadNotification(false));
  }, [dataId]);
}
```

### Pattern 3: Event Handlers with Fresh State

```javascript
function Timer({ onTick }) {
  const [count, setCount] = useState(0);

  const handleTick = useEffectEvent(() => {
    setCount((c) => c + 1);
    onTick(count); // Latest count value
  });

  useEffect(() => {
    const id = setInterval(handleTick, 1000);
    return () => clearInterval(id);
  }, []); // Never re-runs
}
```

## Debugging Tips

### ESLint Warnings

If you see warnings about Effect Events:

1. Make sure you're only calling them inside Effects
2. Update eslint-plugin-react-hooks to 6.1.1+
3. Don't pass Effect Events as props

### Stale Values

If you're getting stale values:

1. Check that you're using `useEffectEvent`, not `useCallback`
2. Verify the Effect Event is defined in the component body
3. Make sure you're not capturing the Effect Event in another closure

### Unexpected Re-runs

If your Effect still re-runs too often:

1. Verify reactive values are passed as arguments, not read from closure
2. Check that all reactive dependencies are in the dependency array
3. Consider if the value should actually be reactive

## Related Patterns

- **useCallback** - For memoizing callbacks passed to children
- **useRef** - For storing values that don't trigger re-renders
- **useMemo** - For memoizing computed values

---

**Learn More**: [useEffectEvent API Reference](./useEffectEvent.md)
