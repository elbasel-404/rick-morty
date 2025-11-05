# useTransition

`useTransition` is a React Hook that lets you update the state without blocking the UI.

## Syntax

```tsx
const [isPending, startTransition] = useTransition();
```

## Reference

### Parameters

`useTransition` does not take any parameters.

### Returns

An array with two values:

1. **`isPending`**: Boolean flag that tells you whether there is a pending transition.

2. **`startTransition`**: A function that lets you mark a state update as a transition.

## Usage

### Marking a State Update as a Non-Blocking Transition

Call `useTransition` at the top level of your component:

```tsx
import { useState, useTransition } from "react";

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

### Example: Updating the Parent During a Transition

You can wrap the `setTab` state update in a `startTransition` call. This allows you to keep the user interface responsive even if the tab content update is slow:

```tsx
import { useState, useTransition } from "react";
import TabButton from "./TabButton.js";
import AboutTab from "./AboutTab.js";
import PostsTab from "./PostsTab.js";
import ContactTab from "./ContactTab.js";

export default function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <>
      <TabButton isActive={tab === "about"} onClick={() => selectTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => selectTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === "contact"}
        onClick={() => selectTab("contact")}
      >
        Contact
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
}
```

### Displaying a Pending Visual State

You can use the `isPending` boolean to indicate to the user that a transition is in progress:

```tsx
function TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition();

  if (isActive) {
    return <b>{children}</b>;
  }

  return (
    <button
      onClick={() => {
        startTransition(() => {
          onClick();
        });
      }}
    >
      {children}
      {isPending && " (loading...)"}
    </button>
  );
}
```

## Key Concepts

### Transitions

A transition is a new concurrent rendering feature that allows you to mark certain updates as "transitions" to keep the UI responsive.

**Urgent updates** (typing, clicking) reflect immediate physical interaction:

```tsx
setInputValue(input);
```

**Transition updates** transition the UI from one view to another:

```tsx
startTransition(() => {
  setTab("posts");
});
```

### How Transitions Work

1. **Interruptible**: React can throw out stale rendering work
2. **Don't show unwanted loading indicators**: Transitions avoid hiding existing content
3. **Concurrent**: Can be interrupted by more urgent updates

### Transitions vs Regular State Updates

| Regular Update         | Transition Update         |
| ---------------------- | ------------------------- |
| Blocks UI              | Keeps UI responsive       |
| Shows loading fallback | Keeps showing old content |
| Cannot be interrupted  | Can be interrupted        |

## Common Patterns

### Preventing Unwanted Loading Indicators

```tsx
function App() {
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState("home");

  function navigate(nextPage) {
    startTransition(() => {
      setPage(nextPage);
    });
  }

  return (
    <div style={{ opacity: isPending ? 0.7 : 1 }}>{/* Page content */}</div>
  );
}
```

### Building a Suspense-Enabled Router

```tsx
function Router() {
  const [page, setPage] = useState("/");
  const [isPending, startTransition] = useTransition();

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }

  return (
    <Suspense fallback={<Spinner />}>
      {isPending && <ProgressBar />}
      <Page url={page} />
    </Suspense>
  );
}
```

## Caveats

- The function you pass to `startTransition` must be synchronous. React immediately executes this function, marking all state updates that happen while it executes as transitions.

- A state update marked as a transition will be interrupted by other state updates. For example, if you update a chart component inside a transition, but then start typing into an input while the chart is re-rendering, React will restart the rendering work on the chart component after handling the input update.

- Transition updates can't be used to control text inputs.

- If there are multiple ongoing transitions, React currently batches them together. This is a limitation that may be removed in a future release.

## Related

- [useDeferredValue](./useDeferredValue.md) - Defer updating part of the UI
- [Suspense](../concepts/lazy.md#suspense) - Show fallback while loading
- [startTransition](../concepts/transitions.md) - Standalone transition function
