# React Documentation

Comprehensive React reference documentation for the Rick and Morty Character Cards project.

> **React Version**: 19.2

## 📚 Table of Contents

- [Hooks](#hooks)
- [Concepts](#concepts)
- [Server Components](#server-components)
- [Performance](#performance)
- [Quick Links](#quick-links)

---

## Hooks

React Hooks let you use state and other React features in functional components.

### State & Form Hooks

| Hook             | Purpose                                  | Link                                |
| ---------------- | ---------------------------------------- | ----------------------------------- |
| `useActionState` | Update state based on form action result | [→ Docs](./hooks/useActionState.md) |
| `useFormStatus`  | Access form submission status            | [→ Docs](./hooks/useFormStatus.md)  |
| `useOptimistic`  | Optimistic UI updates                    | [→ Docs](./hooks/useOptimistic.md)  |

### Performance Hooks

| Hook               | Purpose                       | Link                                  |
| ------------------ | ----------------------------- | ------------------------------------- |
| `useDeferredValue` | Defer updating part of the UI | [→ Docs](./hooks/useDeferredValue.md) |
| `useTransition`    | Non-blocking state updates    | [→ Docs](./hooks/useTransition.md)    |

### Utility Hooks

| Hook     | Purpose                                | Link                        |
| -------- | -------------------------------------- | --------------------------- |
| `useRef` | Reference a value without re-rendering | [→ Docs](./hooks/useRef.md) |
| `useId`  | Generate unique IDs for accessibility  | [→ Docs](./hooks/useId.md)  |
| `use`    | Read Promise or Context values         | [→ Docs](./hooks/use.md)    |

---

## Concepts

Core React concepts and patterns.

### Patterns & Best Practices

- **[Effect Events](./concepts/effect-events.md)** - Extract non-reactive logic from Effects
- **[Effect Events Examples](./concepts/effect-events-examples.md)** - Practical examples and use cases
- **[Rules of React](./concepts/rules.md)** - Essential rules for writing idiomatic React code
- **[lazy](./concepts/lazy.md)** - Code-split and lazy-load components

### Key Topics Covered

- **Effect Events**: Non-reactive logic in Effects, when to use, best practices
- **Rules of React**: Purity, side effects, component calls, Hook rules
- **Lazy Loading**: Code splitting, dynamic imports, Suspense integration

---

## Server Components

Server-side React features for better performance and DX.

### Server Features

| Feature               | Description                       | Link                                    |
| --------------------- | --------------------------------- | --------------------------------------- |
| **Server Components** | Render components on the server   | [→ Docs](./server/server-components.md) |
| **Server Functions**  | Call server functions from client | [→ Docs](./server/server-functions.md)  |
| **cache**             | Cache function results on server  | [→ Docs](./server/cache.md)             |

### Key Topics Covered

- **Server Components**: Build-time vs runtime, async components, composition patterns
- **Server Functions**: "use server" directive, form actions, progressive enhancement
- **cache**: Memoization, data sharing, preloading patterns

---

## Performance

Tools and techniques for optimizing React applications.

- **[React Performance Profiling](./performance/profiling.md)** - Browser DevTools integration, performance tracks, identifying issues

### Performance Tracks

- **Scheduler Track**: Task priorities, render phases, cascading updates
- **Components Track**: Render durations, effect durations, changed props
- **Server Tracks**: Server requests, Server Components rendering

---

## Quick Links

### By Use Case

#### Form Handling

- [useActionState](./hooks/useActionState.md) - Form action state management
- [useFormStatus](./hooks/useFormStatus.md) - Form submission status
- [useOptimistic](./hooks/useOptimistic.md) - Optimistic form updates
- [Server Functions](./server/server-functions.md) - Server-side form handling

#### Performance Optimization

- [useDeferredValue](./hooks/useDeferredValue.md) - Defer non-urgent updates
- [useTransition](./hooks/useTransition.md) - Mark updates as transitions
- [lazy](./concepts/lazy.md) - Code-split components
- [cache](./server/cache.md) - Memoize server computations
- [React Performance](./performance/profiling.md) - Performance profiling

#### Server-Side Rendering

- [Server Components](./server/server-components.md) - Server-side rendering
- [Server Functions](./server/server-functions.md) - Server actions
- [cache](./server/cache.md) - Server-side caching
- [use](./hooks/use.md) - Read server Promises

#### Best Practices

- [Rules of React](./concepts/rules.md) - Core rules and idioms
- [Effect Events](./concepts/effect-events.md) - Effect patterns
- [Performance Profiling](./performance/profiling.md) - Identify issues

### By Feature

- **Async/Promises**: [use](./hooks/use.md), [Server Components](./server/server-components.md)
- **Caching**: [cache](./server/cache.md), [Performance](./performance/profiling.md)
- **Code Splitting**: [lazy](./concepts/lazy.md)
- **Context**: [use](./hooks/use.md)
- **DOM Manipulation**: [useRef](./hooks/useRef.md)
- **Forms**: [useActionState](./hooks/useActionState.md), [useFormStatus](./hooks/useFormStatus.md), [Server Functions](./server/server-functions.md)
- **IDs**: [useId](./hooks/useId.md)
- **Optimistic Updates**: [useOptimistic](./hooks/useOptimistic.md)
- **Transitions**: [useTransition](./hooks/useTransition.md), [useDeferredValue](./hooks/useDeferredValue.md)

---

## Documentation Structure

```
docs/react/
├── README.md                           # This file - main navigation
│
├── hooks/                              # React Hooks documentation
│   ├── useActionState.md              # Form action state management
│   ├── useDeferredValue.md            # Defer UI updates
│   ├── useFormStatus.md               # Form submission status
│   ├── useId.md                       # Unique ID generation
│   ├── useOptimistic.md               # Optimistic updates
│   ├── useRef.md                      # Value references
│   ├── useTransition.md               # Non-blocking updates
│   └── use.md                         # Promise/Context reading
│
├── concepts/                           # Core concepts and patterns
│   ├── effect-events.md               # Effect Events pattern
│   ├── effect-events-examples.md      # Practical examples
│   ├── rules.md                       # Rules of React
│   └── lazy.md                        # Lazy loading components
│
├── server/                             # Server-side features
│   ├── server-components.md           # Server Components guide
│   ├── server-functions.md            # Server Functions guide
│   └── cache.md                       # Server-side caching
│
└── performance/                        # Performance optimization
    └── profiling.md                   # Performance profiling guide
```

---

## External Resources

- **[Official React Documentation](https://react.dev)** - Main React docs
- **[React Hooks Reference](https://react.dev/reference/react)** - Complete Hook reference
- **[React Server Components](https://react.dev/reference/rsc/server-components)** - RSC reference
- **[React DevTools](https://react.dev/learn/react-developer-tools)** - Browser extension

---

## Project Context

This documentation is tailored for the **Rick and Morty Character Cards** project. For project-specific patterns and conventions, see:

- [Main Project README](../../README.md)
- [Copilot Instructions](../../.github/copilot-instructions.md)
- [Agent Instructions](../../AGENTS.md)
- [Animation Documentation](../animation/)
- [Next.js Documentation](../next/)
- [Patterns Documentation](../patterns/)

---

## Contributing

When adding new React documentation:

1. **Organize by category**: Place in appropriate folder (hooks/, concepts/, server/, performance/)
2. **Remove boilerplate**: Strip navigation menus, headers, and webpage artifacts
3. **Focus on content**: Keep API references, examples, and best practices
4. **Add cross-links**: Link to related docs within the project
5. **Update README**: Add entry to this file's navigation

---

_Last Updated: November 6, 2025 | React Version: 19.2_
