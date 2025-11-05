# use

`use` is a React API that lets you read the value of a resource like a Promise or context.

## Syntax

```tsx
const value = use(resource);
```

## Reference

### Parameters

- **`resource`**: The source of the data you want to read a value from. A resource can be a Promise or a context.

### Returns

The `use` API returns the value that was read from the resource (e.g., the resolved value of a Promise or context value).

## Usage

### Reading Context with use

When a context is passed to `use`, it works similarly to `useContext`. While `useContext` must be called at the top level of your component, `use` can be called inside conditionals and loops.

```tsx
import { use } from "react";

function Button() {
  const theme = use(ThemeContext);
  // ...
}
```

#### Conditional Context Reading

```tsx
function HorizontalRule({ show }) {
  if (show) {
    const theme = use(ThemeContext);
    return <hr className={theme} />;
  }
  return false;
}
```

`use` is called from inside an `if` statement, allowing you to conditionally read values from a Context.

### Example: Theme Context

```tsx
import { createContext, use } from "react";

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button show={true}>Sign up</Button>
      <Button show={false}>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = use(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
```

### Streaming Data from Server to Client

When called with a Promise, the `use` API integrates with Suspense and Error Boundaries:

- The component calling `use` **suspends** while the Promise is pending
- If wrapped in a Suspense boundary, the fallback will be displayed
- Once the Promise resolves, the Suspense fallback is replaced by the rendered components
- If the Promise is rejected, the fallback of the nearest Error Boundary will be displayed

```tsx
import { use } from "react";

function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);

  return <div>{message}</div>;
}
```

## Key Concepts

### Flexibility Over useContext

`use` is preferred over `useContext` because it is more flexible:

- Can be called inside conditionals (`if`)
- Can be called inside loops (`for`, `while`)
- Like React Hooks, must be called from a Component or Hook

### Context Provider Lookup

Like `useContext`, `use(context)` always looks for the closest context provider **above** the component that calls it. It searches upwards and does not consider context providers in the component from which you're calling `use(context)`.

## Caveats

- The `use` API must be called inside a Component or a Hook

- When fetching data in a Server Component, prefer `async` and `await` over `use`. `async` and `await` pick up rendering from the point where `await` was invoked, whereas `use` re-renders the component after the data is resolved.

- Prefer creating Promises in Server Components and passing them to Client Components over creating Promises in Client Components. Promises created in Client Components are recreated on every render. Promises passed from a Server Component to a Client Component are stable across re-renders.

## Dealing with Rejected Promises

When a Promise passed to `use` is rejected, the error will be caught by the nearest Error Boundary.

```tsx
import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <MessageComponent messagePromise={fetchMessage()} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## Troubleshooting

### "Suspense Exception: This is not a real error!"

This message appears in development when a Promise suspends. This is expected behavior. The Suspense boundary will catch this and show the fallback.

## Related

- [useContext](../concepts/context.md) - Traditional context reading
- [Suspense](../concepts/lazy.md#suspense) - Show fallback while loading
- [Error Boundaries](../concepts/error-handling.md) - Handle component errors
- [Server Components](../server/server-components.md) - Server-side rendering
