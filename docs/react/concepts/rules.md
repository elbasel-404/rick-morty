# Rules of React

Just as different programming languages have their own ways of expressing concepts, React has its own idioms—or rules—for how to express patterns in a way that is easy to understand and yields high-quality applications.

## Overview

The Rules of React help you write:

- Well-organized applications
- Safe and predictable code
- Composable components
- Applications that are resilient to changes
- Code that's easier to work with other developers, libraries, and tools

**Important**: These are rules, not guidelines. Breaking them will likely cause bugs and make your code harder to understand.

## Enabling Rule Enforcement

We strongly recommend using:

- **Strict Mode** - Helps identify issues during development
- **ESLint Plugin** (`eslint-plugin-react-hooks`) - Catches rule violations

## The Three Main Rules

### 1. Components and Hooks Must Be Pure

Purity in Components and Hooks is a key rule that makes your app predictable, easy to debug, and allows React to automatically optimize your code.

#### Components Must Be Idempotent

React components are assumed to always return the same output with respect to their inputs (props, state, and context).

```tsx
// ✅ Pure component - same inputs = same output
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// ❌ Impure component - modifies external state during render
let greetingCount = 0;
function Greeting({ name }) {
  greetingCount++; // 🚩 Side effect during render
  return <h1>Hello, {name}!</h1>;
}
```

#### Side Effects Must Run Outside of Render

Side effects should not run during render, as React can render components multiple times to optimize user experience.

```tsx
// ❌ Side effect during render
function Component() {
  fetch("/api/data"); // 🚩 Network request during render
  return <div>Content</div>;
}

// ✅ Side effect in useEffect
function Component() {
  useEffect(() => {
    fetch("/api/data"); // ✅ Runs after render
  }, []);
  return <div>Content</div>;
}
```

#### Props and State are Immutable

A component's props and state are immutable snapshots with respect to a single render. Never mutate them directly.

```tsx
// ❌ Mutating props
function Component({ items }) {
  items.push("new item"); // 🚩 Mutating props
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}

// ✅ Creating new array
function Component({ items }) {
  const newItems = [...items, "new item"]; // ✅ New array
  return (
    <ul>
      {newItems.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}
```

#### Return Values and Arguments to Hooks are Immutable

Once values are passed to a Hook, you should not modify them. Like props in JSX, values become immutable when passed to a Hook.

#### Values are Immutable After Being Passed to JSX

Don't mutate values after they've been used in JSX. Move the mutation before the JSX is created.

```tsx
// ❌ Mutating after JSX creation
function Component() {
  const items = ["a", "b"];
  const list = (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
  items.push("c"); // 🚩 Too late - JSX already created
  return list;
}

// ✅ Mutating before JSX creation
function Component() {
  const items = ["a", "b"];
  items.push("c"); // ✅ Before JSX creation
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}
```

### 2. React Calls Components and Hooks

React is responsible for rendering components and hooks when necessary to optimize the user experience. It is declarative: you tell React what to render, and React figures out how best to display it.

#### Never Call Component Functions Directly

Components should only be used in JSX. Don't call them as regular functions.

```tsx
// ❌ Calling component as function
function Page() {
  const header = Header(); // 🚩 Don't do this
  return <div>{header}</div>;
}

// ✅ Using component in JSX
function Page() {
  return (
    <div>
      <Header />
    </div>
  ); // ✅ Correct
}
```

#### Never Pass Hooks as Regular Values

Hooks should only be called inside of components. Never pass them around as regular values.

```tsx
// ❌ Passing hook as value
function Component({ useCustomHook }) {
  const value = useCustomHook(); // 🚩 Hook as parameter
  return <div>{value}</div>;
}

// ✅ Call hook directly
function Component() {
  const value = useCustomHook(); // ✅ Direct hook call
  return <div>{value}</div>;
}
```

### 3. Rules of Hooks

Hooks are defined using JavaScript functions, but they represent a special type of reusable UI logic with restrictions on where they can be called.

#### Only Call Hooks at the Top Level

Don't call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns.

```tsx
// ❌ Hook inside conditional
function Component({ condition }) {
  if (condition) {
    const value = useState(0); // 🚩 Conditional hook
  }
  return <div>Content</div>;
}

// ✅ Hook at top level
function Component({ condition }) {
  const [value, setValue] = useState(0); // ✅ Top level
  if (condition) {
    // Use the value here
  }
  return <div>Content</div>;
}
```

#### Only Call Hooks from React Functions

Don't call Hooks from regular JavaScript functions.

```tsx
// ❌ Hook in regular function
function calculateTotal() {
  const [total, setTotal] = useState(0); // 🚩 Outside React
  return total;
}

// ✅ Hook in React component
function TotalDisplay() {
  const [total, setTotal] = useState(0); // ✅ Inside React component
  return <div>{total}</div>;
}

// ✅ Hook in custom Hook
function useTotal() {
  const [total, setTotal] = useState(0); // ✅ Inside custom Hook
  return total;
}
```

## Quick Reference

| Rule                | Do                                 | Don't                               |
| ------------------- | ---------------------------------- | ----------------------------------- |
| **Purity**          | Return same output for same inputs | Modify external state during render |
| **Side Effects**    | Use `useEffect`                    | Run during render                   |
| **Props/State**     | Treat as read-only                 | Mutate directly                     |
| **Component Calls** | Use in JSX (`<Component />`)       | Call as function (`Component()`)    |
| **Hook Placement**  | Top level of component             | Inside loops/conditionals           |
| **Hook Usage**      | Components and custom Hooks        | Regular functions                   |

## Benefits of Following the Rules

1. **Predictability** - Same inputs always produce same outputs
2. **Debuggability** - Easier to trace and fix issues
3. **Optimization** - React can automatically optimize your code
4. **Maintainability** - Code is easier to understand and refactor
5. **Compatibility** - Works well with React features and ecosystem

## Related

- [Strict Mode](https://react.dev/reference/react/StrictMode) - Development mode checks
- [ESLint Plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) - Automated rule checking
- [Thinking in React](https://react.dev/learn/thinking-in-react) - React mental model
- [useEffect](../hooks/use.md) - Running side effects
