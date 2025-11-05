# useFormStatus

`useFormStatus` is a Hook that gives you status information of the last form submission.

## Syntax

```tsx
const { pending, data, method, action } = useFormStatus();
```

## Reference

### Parameters

`useFormStatus` does not take any parameters.

### Returns

A `status` object with the following properties:

- **`pending`**: Boolean. If `true`, the parent `<form>` is pending submission. Otherwise, `false`.

- **`data`**: An object implementing the `FormData` interface containing the data the parent `<form>` is submitting. If there is no active submission or no parent `<form>`, it will be `null`.

- **`method`**: A string value of either `'get'` or `'post'`. Represents whether the parent `<form>` is submitting with a GET or POST HTTP method. By default, a `<form>` uses the GET method.

- **`action`**: A reference to the function passed to the `action` prop on the parent `<form>`. If there is no parent `<form>`, the property is `null`. If there is a URI value provided to the `action` prop, or no `action` prop specified, `status.action` will be `null`.

## Usage

### Display Pending State During Form Submission

```tsx
import { useFormStatus } from "react-dom";
import { submitForm } from "./actions.js";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

function Form({ action }) {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}

export default function App() {
  return <Form action={submitForm} />;
}
```

### Reading Form Data Being Submitted

```tsx
import { useFormStatus } from "react-dom";
import action from "./actions";

function Submit() {
  const status = useFormStatus();

  return <button disabled={status.pending}>Submit</button>;
}

export default function App() {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}
```

## Key Concepts

### Must Be Called Inside Form Component

To get status information, the component calling `useFormStatus` must be rendered **within** a `<form>`. The Hook returns information about that parent form.

**Example:**

```tsx
function Submit() {
  // ✅ `pending` will be derived from the form that wraps the Submit component
  const { pending } = useFormStatus();
  return <button disabled={pending}>...</button>;
}

function Form() {
  return (
    <form action={submit}>
      <Submit />
    </form>
  );
}
```

## Caveats

- `useFormStatus` must be called from a component that is rendered **inside** a `<form>`
- `useFormStatus` will only return status information for a parent `<form>`. It will not return status information for any `<form>` rendered in the same component or children components.

## Common Pitfall

### ❌ Wrong: Calling in Same Component as Form

```tsx
function Form() {
  // 🚩 `pending` will never be true
  // useFormStatus does not track the form rendered in this component
  const { pending } = useFormStatus();
  return <form action={submit}></form>;
}
```

### ✅ Correct: Calling in Child Component

```tsx
function Submit() {
  // ✅ `pending` will be derived from the form that wraps the Submit component
  const { pending } = useFormStatus();
  return <button disabled={pending}>...</button>;
}

function Form() {
  return (
    <form action={submit}>
      <Submit />
    </form>
  );
}
```

## Troubleshooting

### `status.pending` is never `true`

Make sure `useFormStatus` is called from a component rendered **inside** the `<form>`, not from the same component that renders the `<form>`.

## Related

- [useActionState](./useActionState.md) - Update state based on form action result
- [useOptimistic](./useOptimistic.md) - Optimistic updates
- [Server Actions](../server/server-functions.md) - Server-side form handling
