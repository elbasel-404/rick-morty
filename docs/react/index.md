# React Documentation Index

## Overview

The React documentation has been organized into focused, topic-based files within the `/docs/react/` directory.

## Structure

```
docs/react/
├── README.md                      # Index and quick links
├── useEffectEvent.md              # API reference for useEffectEvent hook
├── effect-events.md               # Conceptual overview and patterns
└── effect-events-examples.md      # Practical code examples
```

## Files

### 1. README.md

- Quick navigation to all React docs
- React version info (19.2)
- External resource links

### 2. useEffectEvent.md

**API Reference**

- Function signature and parameters
- Return values
- Important caveats and warnings
- Related hooks

**Topics covered:**

- What is useEffectEvent?
- When to use it
- Parameters and return values
- Critical usage rules (only in Effects, not a dependency shortcut, etc.)

### 3. effect-events.md

**Conceptual Guide**

- Understanding the Effect Events pattern
- Problem/solution explanation
- Mental models
- Best practices

**Topics covered:**

- What problem Effect Events solve
- Reactive vs non-reactive logic
- When to use (and when NOT to use)
- Common patterns
- Debugging tips
- Related patterns (useCallback, useRef, useMemo)

### 4. effect-events-examples.md

**Practical Examples**

- 7 detailed real-world examples
- Common mistakes to avoid
- Testing strategies
- Performance considerations

**Examples included:**

1. Reading latest props without re-running
2. Analytics with latest user data
3. Chat room with theme
4. Debounced search with current filters
5. Form auto-save with latest values
6. WebSocket with dynamic handler
7. Combining multiple Effect Events

## Quick Links

- [Start Here: Effect Events Overview](./react/effect-events.md)
- [API Reference: useEffectEvent](./react/useEffectEvent.md)
- [Code Examples](./react/effect-events-examples.md)

## Usage in This Project

Effect Events are particularly useful for this Rick and Morty character cards project when:

- Logging card interactions with current user preferences
- Handling animations with current theme state
- Managing image lazy loading with latest viewport settings
- Tracking analytics without re-rendering components

## External Resources

- [Official React Docs - useEffectEvent](https://react.dev/reference/react/useEffectEvent)
- [React 19.2 Release Notes](https://react.dev/blog)
