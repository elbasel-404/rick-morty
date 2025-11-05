# State Management

Learn how to manage component state effectively using React hooks and patterns.

---

## Overview

This guide covers:
- When to use local vs global state
- React hooks for state management
- Jotai atoms for global state
- Common state patterns

---

## Local State with useState

For component-specific state:

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}
```

---

## Derived State

Compute values from state instead of storing them:

```tsx
const [items, setItems] = useState([]);

// ✅ Good - derived
const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

// ❌ Bad - redundant state
const [totalPrice, setTotalPrice] = useState(0);
```

---

## Global State with Jotai

For shared state across components:

```tsx
// app/atoms/filterAtom.ts
import { atom } from "jotai";

export const filterAtom = atom<string>("");
export const filteredCharactersAtom = atom((get) => {
  const filter = get(filterAtom);
  // ... filtering logic
});

// In component
"use client";
import { useAtom } from "jotai";
import { filterAtom } from "@/app/atoms/filterAtom";

export function FilterInput() {
  const [filter, setFilter] = useAtom(filterAtom);
  
  return <input value={filter} onChange={(e) => setFilter(e.target.value)} />;
}
```

---

## Form State with useActionState

For server actions:

```tsx
import { useActionState } from "react";
import { submitForm } from "./actions";

export function Form() {
  const [state, action] = useActionState(submitForm, { message: "" });
  
  return (
    <form action={action}>
      <input name="email" />
      <button>Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
```

---

## Related Documentation

- [React Hooks](../react/README.md#hooks)
- [useActionState](../react/hooks/useActionState.md)
- [Jotai Documentation](../jotai/)

