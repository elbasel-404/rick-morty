# lazy

`lazy` lets you defer loading a component's code until it is rendered for the first time.

## Syntax

```tsx
const SomeComponent = lazy(load);
```

## Reference

### Parameters

- **`load`**: A function that returns a Promise or another thenable (a Promise-like object with a `then` method). React will not call `load` until the first time you attempt to render the returned component. After React first calls `load`, it will wait for it to resolve, and then render the resolved value's `.default` as a React component. Both the returned Promise and the Promise's resolved value will be cached, so React will not call `load` more than once. If the Promise rejects, React will throw the rejection reason for the nearest Error Boundary to handle.

### Returns

`lazy` returns a React component you can render in your tree. While the code for the lazy component is still loading, attempting to render it will suspend. Use `<Suspense>` to display a loading indicator while it's loading.

## load Function

### Parameters

`load` receives no parameters.

### Returns

You need to return a Promise or thenable that eventually resolves to an object whose `.default` property is a valid React component type, such as a function, `memo`, or a `forwardRef` component.

## Usage

### Lazy-Loading Components with Suspense

Usually, you import components with the static `import` declaration:

```tsx
import MarkdownPreview from "./MarkdownPreview.js";
```

To defer loading this component's code until it's rendered for the first time, replace this import with:

```tsx
import { lazy } from "react";

const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
```

**Important**: This code relies on dynamic `import()`, which might require support from your bundler or framework.

### Using with Suspense

Now that your component's code loads on demand, you need to specify what should be displayed while it is loading. Wrap the lazy component or any of its parents into a `<Suspense>` boundary:

```tsx
import { Suspense, lazy } from "react";
import Loading from "./Loading.js";

const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));

export default function MarkdownEditor() {
  const [showPreview, setShowPreview] = useState(false);
  const [markdown, setMarkdown] = useState("Hello, **world**!");

  return (
    <>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={showPreview}
          onChange={(e) => setShowPreview(e.target.checked)}
        />
        Show preview
      </label>
      <hr />
      {showPreview && (
        <Suspense fallback={<Loading />}>
          <h2>Preview</h2>
          <MarkdownPreview markdown={markdown} />
        </Suspense>
      )}
    </>
  );
}
```

**How it works:**

1. The code for `MarkdownPreview` won't be loaded until you attempt to render it
2. If `MarkdownPreview` hasn't loaded yet, `Loading` will be shown in its place
3. Once loaded, the component is cached and won't need to load again

## Key Concepts

### Code Splitting

Lazy loading enables code splitting - breaking your app into smaller chunks that are loaded on demand:

- Reduces initial bundle size
- Faster initial page load
- Better performance for users who don't use certain features

### Caching

Both the Promise and its resolved value are cached:

- React will only call `load` once
- Subsequent renders use the cached component
- No loading state shown after first load

### Suspense Integration

- Lazy components automatically integrate with React Suspense
- Suspense boundaries catch the loading state
- Can have multiple lazy components share one Suspense boundary

## Common Patterns

### Route-Based Code Splitting

```tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
const Contact = lazy(() => import("./routes/Contact"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Feature-Based Code Splitting

```tsx
import { lazy, Suspense } from "react";

const ChartComponent = lazy(() => import("./ChartComponent"));
const DataTable = lazy(() => import("./DataTable"));

function Dashboard({ showChart, showTable }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {showChart && <ChartComponent />}
      {showTable && <DataTable />}
    </Suspense>
  );
}
```

### Named Exports

If your component uses named exports instead of default export:

```tsx
// MyComponent.js
export function MyComponent() {
  return <div>My Component</div>;
}
```

Create a re-export module:

```tsx
// MyComponent-lazy.js
export { MyComponent as default } from "./MyComponent.js";
```

Then lazy load it:

```tsx
const MyComponent = lazy(() => import("./MyComponent-lazy.js"));
```

## Troubleshooting

### My lazy component's state gets reset unexpectedly

**❌ Wrong: Declaring lazy components inside other components**

```tsx
import { lazy } from "react";

function Editor() {
  // 🚩 Bad: This will cause all state to be reset on re-renders
  const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
  // ...
}
```

**✅ Correct: Declare at module top level**

```tsx
import { lazy } from "react";

// ✅ Good: Declare lazy components outside of your components
const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));

function Editor() {
  // ...
}
```

**Why**: Declaring inside a component creates a new component on every render, resetting its state.

## Requirements

- **Bundler Support**: Your bundler (Webpack, Vite, etc.) must support dynamic `import()`
- **Default Export**: The lazy-loaded component must be exported as the default export
- **Suspense Boundary**: Must wrap lazy component with `<Suspense>`

## Related

- [Suspense](./suspense.md) - Show fallback while content loads
- [Error Boundaries](./error-handling.md) - Handle loading errors
- [Code Splitting](./code-splitting.md) - Break up your app bundle
- [Dynamic Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) - JavaScript dynamic imports
