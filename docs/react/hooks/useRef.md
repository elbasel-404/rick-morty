# useRef

`useRef` is a React Hook that lets you reference a value that's not needed for rendering.

## Syntax

```tsx
const ref = useRef(initialValue);
```

## Reference

### Parameters

- **`initialValue`**: The value you want the ref object's `current` property to be initially. Can be a value of any type. This argument is ignored after the initial render.

### Returns

`useRef` returns an object with a single property:

- **`current`**: Initially set to the `initialValue` you passed. You can later set it to something else. If you pass the ref object to React as a `ref` attribute to a JSX node, React will set its `current` property.

On subsequent renders, `useRef` will return the same object.

## Usage

### Referencing a Value with a Ref

Call `useRef` at the top level of your component to declare one or more refs:

```tsx
import { useRef } from "react";

function Stopwatch() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
  // ...
}
```

**Key differences from state:**

| Feature                         | Ref    | State              |
| ------------------------------- | ------ | ------------------ |
| Persists between re-renders     | ✅ Yes | ✅ Yes             |
| Triggers re-render when changed | ❌ No  | ✅ Yes             |
| Mutable                         | ✅ Yes | ❌ No              |
| Can read/write during rendering | ❌ No  | ✅ Yes (read only) |

### Example: Click Counter

```tsx
import { useRef } from "react";

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert("You clicked " + ref.current + " times!");
  }

  return <button onClick={handleClick}>Click me!</button>;
}
```

### Example: Stopwatch

```tsx
function Stopwatch() {
  const intervalRef = useRef(0);

  function handleStartClick() {
    const intervalId = setInterval(() => {
      // ...
    }, 1000);
    intervalRef.current = intervalId;
  }

  function handleStopClick() {
    const intervalId = intervalRef.current;
    clearInterval(intervalId);
  }
}
```

## Manipulating the DOM with a Ref

It's particularly common to use a ref to manipulate the DOM. React has built-in support for this.

### Focusing a Text Input

```tsx
import { useRef } from "react";

function MyComponent() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

**How it works:**

1. Declare a ref object with initial value of `null`
2. Pass your ref object as the `ref` attribute to the JSX
3. After React creates the DOM node, React will set the `current` property to that DOM node
4. You can now access the DOM node and call methods like `focus()`
5. React will set `current` back to `null` when the node is removed

## When to Use Refs

Use refs for storing:

- Timeout IDs
- Interval IDs
- DOM elements
- Other objects that don't affect the component's visual output

## Caveats

- **Mutability**: You can mutate `ref.current`. Unlike state, it is mutable. However, if it holds an object used for rendering, don't mutate that object.

- **No Re-renders**: Changing `ref.current` does not re-render your component. React isn't aware of changes because a ref is a plain JavaScript object.

- **Don't read/write during rendering**: Except for initialization, this makes your component's behavior unpredictable.

- **Strict Mode**: React will call your component function twice in development to help find impurities. Each ref object will be created twice, but one version will be discarded.

## Common Pitfalls

### ❌ Don't Read/Write Ref During Rendering

```tsx
function MyComponent() {
  // 🚩 Don't write a ref during rendering
  myRef.current = 123;

  // 🚩 Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>;
}
```

### ✅ Read/Write in Event Handlers or Effects

```tsx
function MyComponent() {
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123;
  });

  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current);
  }
}
```

### ❌ Don't Use for Rendering

```tsx
// 🚩 Won't update on click - ref changes don't trigger re-renders
return <div>{ref.current}</div>;
```

### ✅ Use State Instead

```tsx
// ✅ Use state for values that affect rendering
const [count, setCount] = useState(0);
return <div>{count}</div>;
```

## Troubleshooting

### I can't get a ref to a custom component

```tsx
const inputRef = useRef(null);

// 🚩 This won't work by default
return <MyInput ref={inputRef} />;
```

By default, your own components don't expose refs to their DOM nodes. To fix this, use `forwardRef`:

```tsx
import { forwardRef } from "react";

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
```

## Related

- [forwardRef](../concepts/advanced-patterns.md#forwardRef) - Expose a ref to parent component
- [useImperativeHandle](../concepts/advanced-patterns.md#useImperativeHandle) - Customize ref exposure
- [Choosing between useState and useRef](../concepts/hooks-comparison.md)
