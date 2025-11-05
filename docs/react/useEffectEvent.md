# useEffectEvent Hook

**React v19.2**

`useEffectEvent` is a React Hook that lets you extract non-reactive logic from your Effects into a reusable function called an Effect Event.

```javascript
const onSomething = useEffectEvent(callback);
```

## Overview

Effect Events allow you to separate reactive logic (that should trigger re-runs) from non-reactive logic (that should just read the latest values) within your Effects.

## When to Use

Use `useEffectEvent` when you need to:

1. Read the latest props or state without adding them to the dependency array
2. Extract non-reactive logic from Effects
3. Avoid unnecessary Effect re-runs when certain values change

## API Reference

### useEffectEvent(callback)

Call `useEffectEvent` at the top level of your component to declare an Effect Event.

```javascript
import { useEffectEvent, useEffect } from "react";

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification("Connected!", theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on("connected", () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // theme is NOT in dependencies

  // ...
}
```

### Parameters

- **callback**: A function containing the logic for your Effect Event. When you define an Effect Event with `useEffectEvent`, the callback always accesses the latest values from props and state when it is invoked. This helps avoid issues with stale closures.

### Returns

Returns an Effect Event function. You can call this function inside:

- `useEffect`
- `useLayoutEffect`
- `useInsertionEffect`

## Important Caveats

### ⚠️ Only Call Inside Effects

Effect Events should **only** be called within Effects. Define them just before the Effect that uses them.

**Do not** pass them to other components or hooks.

The eslint-plugin-react-hooks linter (version 6.1.1 or higher) will enforce this restriction.

```javascript
// ❌ WRONG - Don't pass Effect Events to other components
<Component onClick={myEffectEvent} />;

// ✅ CORRECT - Call inside Effects only
useEffect(() => {
  myEffectEvent();
}, []);
```

### ⚠️ Not a Dependency Shortcut

Do **not** use `useEffectEvent` to avoid specifying dependencies in your Effect's dependency array just because you don't want to deal with them.

This can hide bugs and make your code harder to understand. Prefer explicit dependencies or use refs to compare previous values if needed.

### ⚠️ Use for Non-Reactive Logic Only

Only use `useEffectEvent` to extract logic that **does not depend on changing values**.

If the logic should re-run when a value changes, keep it directly in the Effect with proper dependencies.

## Related Hooks

- [`useEffect`](https://react.dev/reference/react/useEffect) - Main hook for side effects
- [`useCallback`](https://react.dev/reference/react/useCallback) - Memoize callbacks (different use case)
- [`useRef`](https://react.dev/reference/react/useRef) - Alternative for storing latest values

## See Also

- [Effect Events Examples](./effect-events-examples.md)
- [Effect Events Pattern Overview](./effect-events.md)

---

**Source**: [React Documentation v19.2](https://react.dev/reference/react/useEffectEvent)
