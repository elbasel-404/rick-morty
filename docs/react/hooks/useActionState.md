# useActionState

`useActionState` is a Hook that allows you to update state based on the result of a form action.

## Syntax

```tsx
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

> **Note**: In earlier React Canary versions, this API was part of React DOM and called `useFormState`.

## Reference

### Parameters

- **`fn`**: The function to be called when the form is submitted or button pressed. When called, it receives:
  - The previous state of the form (initially the `initialState`, subsequently its previous return value) as its first argument
  - Followed by the arguments that a form action normally receives (e.g., `formData`)
- **`initialState`**: The initial state value. Can be any serializable value. This argument is ignored after the action is first invoked.

- **`permalink`** (optional): A string containing the unique page URL that this form modifies. Used for progressive enhancement on pages with dynamic content. If `fn` is a server function and the form is submitted before JavaScript loads, the browser will navigate to the specified permalink URL.

### Returns

An array with three values:

1. **`state`**: The current state. During first render, matches `initialState`. After action invocation, matches the value returned by the action.

2. **`formAction`**: A new action that you can pass as the `action` prop to your `<form>` component or `formAction` prop to any button within the form. Can also be called manually within `startTransition`.

3. **`isPending`**: Boolean flag indicating whether there is a pending Transition.

## Usage

### Basic Example

```tsx
import { useActionState } from "react";

async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm() {
  const [state, formAction] = useActionState(increment, 0);

  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  );
}
```

### Using Information Returned by Form Action

```tsx
import { useActionState } from "react";
import { action } from "./actions.js";

function MyComponent() {
  const [state, formAction] = useActionState(action, null);

  return <form action={formAction}>{/* form content */}</form>;
}
```

### Displaying Form Errors

```tsx
import { useActionState } from "react";
import { addToCart } from "./actions.js";

function AddToCartForm({ itemID, itemTitle }) {
  const [message, formAction, isPending] = useActionState(addToCart, null);

  return (
    <form action={formAction}>
      <h2>{itemTitle}</h2>
      <input type="hidden" name="itemID" value={itemID} />
      <button type="submit">Add to Cart</button>
      {isPending ? "Loading..." : message}
    </form>
  );
}
```

## Key Concepts

### Form State Flow

1. The form state is the value returned by the action when the form was last submitted
2. If the form hasn't been submitted yet, it's the initial state you provided
3. The action receives the current state as its first argument
4. The action's return value becomes the new state

### Action Function Signature

```tsx
function action(currentState, formData) {
  // Process form data
  return "next state";
}
```

## Caveats

- When used with React Server Components, `useActionState` makes forms interactive before JavaScript executes on the client
- Without Server Components, it's equivalent to component local state
- The function passed to `useActionState` receives an extra argument (the previous/initial state) as its **first** argument, making its signature different from a regular form action

## Troubleshooting

### My action can no longer read the submitted form data

When you wrap an action with `useActionState`, it gets an extra argument as its first argument. The submitted form data is therefore its **second argument** instead of its first.

```tsx
// Correct signature
function action(currentState, formData) {
  // currentState is the first argument
  // formData is the second argument
}
```

## Related

- [useFormStatus](./useFormStatus.md) - Access form submission status
- [useOptimistic](./useOptimistic.md) - Optimistic updates
- [useTransition](./useTransition.md) - Non-blocking state updates
- [Server Actions](../server/server-functions.md) - Server-side form handling
