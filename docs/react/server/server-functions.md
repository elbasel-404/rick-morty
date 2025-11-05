# Server Functions

Server Functions allow Client Components to call async functions executed on the server.

## Overview

**Important Naming**: Until September 2024, all Server Functions were called "Server Actions". Now:

- A Server Function passed to an `action` prop or called from inside an action **is** a Server Action
- Not all Server Functions are Server Actions - they can be used for multiple purposes

## How They Work

When a Server Function is defined with the `"use server"` directive, your framework will:

1. Automatically create a reference to the Server Function
2. Pass that reference to the Client Component
3. When called on the client, React sends a request to the server to execute the function
4. Return the result to the client

## Creating Server Functions

### From a Server Component

Server Components can define Server Functions with the `"use server"` directive:

```tsx
// Server Component
import Button from "./Button";

function EmptyNote() {
  async function createNoteAction() {
    "use server"; // Server Function

    await db.notes.create();
  }

  return <Button onClick={createNoteAction} />;
}
```

When React renders `EmptyNote`, it creates a reference to `createNoteAction` and passes it to the Client Component:

```tsx
"use client";

export default function Button({ onClick }) {
  console.log(onClick);
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNoteAction'}

  return <button onClick={() => onClick()}>Create Empty Note</button>;
}
```

### Importing in Client Components

Client Components can import Server Functions from files that use the `"use server"` directive:

```ts
// actions.ts
"use server";

export async function createNote() {
  await db.notes.create();
}
```

```tsx
// EmptyNote.tsx
"use client";
import { createNote } from "./actions";

function EmptyNote() {
  console.log(createNote);
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNote'}

  return <button onClick={() => createNote()} />;
}
```

## Usage Patterns

### 1. Server Functions with Actions

Call Server Functions from Actions on the client:

```ts
// actions.ts
"use server";

export async function updateName(name) {
  if (!name) {
    return { error: "Name is required" };
  }
  await db.users.updateName(name);
}
```

```tsx
// UpdateName.tsx
"use client";
import { updateName } from "./actions";

function UpdateName() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const submitAction = async () => {
    startTransition(async () => {
      const { error } = await updateName(name);
      if (error) {
        setError(error);
      } else {
        setName("");
      }
    });
  };

  return (
    <form action={submitAction}>
      <input type="text" name="name" disabled={isPending} />
      {error && <span>Failed: {error}</span>}
    </form>
  );
}
```

This allows you to access the `isPending` state by wrapping the Server Function in an Action.

### 2. Server Functions with Form Actions

Pass a Server Function to a Form to automatically submit to the server:

```tsx
"use client";
import { updateName } from "./actions";

function UpdateName() {
  return (
    <form action={updateName}>
      <input type="text" name="name" />
    </form>
  );
}
```

When the Form submission succeeds, React will automatically reset the form.

### 3. Server Functions with useActionState

Use `useActionState` to access pending state and last response:

```tsx
"use client";
import { updateName } from "./actions";

function UpdateName() {
  const [state, submitAction, isPending] = useActionState(updateName, {
    error: null,
  });

  return (
    <form action={submitAction}>
      <input type="text" name="name" disabled={isPending} />
      {state.error && <span>Failed: {state.error}</span>}
    </form>
  );
}
```

**Bonus**: React will automatically replay form submissions entered before hydration finishes. Users can interact with your app even before it has hydrated.

### 4. Progressive Enhancement

Server Functions support progressive enhancement with the third argument of `useActionState`:

```tsx
"use client";
import { updateName } from "./actions";

function UpdateName() {
  const [state, submitAction, isPending] = useActionState(
    updateName,
    { error: null },
    `/update-name` // Permalink for progressive enhancement
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" disabled={isPending} />
      {state.error && <span>Failed: {state.error}</span>}
    </form>
  );
}
```

If the form is submitted before JavaScript loads, the browser navigates to the specified URL.

## Key Benefits

- **Type Safety** - Full TypeScript support across client-server boundary
- **Automatic Serialization** - React handles data serialization
- **Progressive Enhancement** - Works before JavaScript loads
- **Error Handling** - Integrated with Error Boundaries
- **Pending States** - Easy access to loading states
- **Form Integration** - Native form action support

## Best Practices

### 1. Validation

Always validate inputs on the server:

```ts
"use server";

export async function updateUser(formData: FormData) {
  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return { error: "Invalid name" };
  }

  if (name.length < 2) {
    return { error: "Name too short" };
  }

  await db.users.update({ name });
  return { success: true };
}
```

### 2. Error Handling

Return errors instead of throwing when possible:

```ts
"use server";

export async function createPost(data) {
  try {
    const post = await db.posts.create(data);
    return { success: true, post };
  } catch (error) {
    return { error: "Failed to create post" };
  }
}
```

### 3. Use with Transitions

Wrap calls in `startTransition` for better UX:

```tsx
const submitForm = async (formData) => {
  startTransition(async () => {
    const result = await serverAction(formData);
    if (result.error) {
      setError(result.error);
    }
  });
};
```

## Stability Note

> While Server Functions in React 19 are stable and will not break between minor versions, the underlying APIs used to implement Server Functions in a React Server Components bundler or framework do not follow semver and may break between minors in React 19.x.

**Recommendation**: Pin to a specific React version or use the Canary release.

## Related

- [useActionState](../hooks/useActionState.md) - Manage form action state
- [useFormStatus](../hooks/useFormStatus.md) - Access form submission status
- [useOptimistic](../hooks/useOptimistic.md) - Optimistic updates
- [`"use server"` directive](./directives.md#use-server) - Mark Server Functions
- [Server Components](./server-components.md) - Server-side rendering
