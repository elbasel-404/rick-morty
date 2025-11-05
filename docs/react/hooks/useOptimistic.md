# useOptimistic

`useOptimistic` is a React Hook that lets you optimistically update the UI.

## Syntax

```tsx
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

## Reference

### Parameters

- **`state`**: The value to be returned initially and whenever no action is pending.

- **`updateFn(currentState, optimisticValue)`**: A pure function that takes:
  - `currentState`: The current state
  - `optimisticValue`: The value passed to `addOptimistic`
  - Returns: The resulting optimistic state (merged value of currentState and optimisticValue)

### Returns

An array with two values:

1. **`optimisticState`**: The resulting optimistic state. Equal to `state` unless an action is pending, in which case it equals the value returned by `updateFn`.

2. **`addOptimistic`**: Dispatching function to call when you have an optimistic update. Takes one argument (`optimisticValue`) of any type and calls `updateFn` with `state` and `optimisticValue`.

## Usage

### Optimistically Updating Forms

The `useOptimistic` Hook provides a way to optimistically update the UI before a background operation completes. This makes apps feel more responsive.

**Example: Chat Messages**

When a user submits a form, instead of waiting for the server's response, the interface is immediately updated with the expected outcome:

```tsx
import { useOptimistic, useState, useRef, startTransition } from "react";
import { deliverMessage } from "./actions.js";

function Thread({ messages, sendMessageAction }) {
  const formRef = useRef();

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      {
        text: newMessage,
        sending: true,
      },
      ...state,
    ]
  );

  function formAction(formData) {
    addOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    startTransition(async () => {
      await sendMessageAction(formData);
    });
  }

  return (
    <>
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
    </>
  );
}
```

**How it works:**

1. User types a message and hits "Send"
2. The message immediately appears with a "Sending..." label
3. The form attempts to send the message in the background
4. Once the server confirms receipt, the "Sending..." label is removed

## Key Concepts

### Optimistic Updates

- Show expected outcome immediately
- Give impression of speed and responsiveness
- Update UI before server confirms the action
- Revert or update once server responds

### Update Function

The `updateFn` must be a pure function:

```tsx
const [optimisticState, addOptimistic] = useOptimistic(
  state,
  (currentState, optimisticValue) => {
    // Merge and return new state with optimistic value
    return [...currentState, optimisticValue];
  }
);
```

## Common Pattern

```tsx
// 1. Define optimistic state
const [optimisticData, addOptimisticData] = useOptimistic(
  actualData,
  (current, newItem) => [...current, { ...newItem, pending: true }]
);

// 2. Add optimistic update
function handleSubmit(formData) {
  addOptimisticData(formData);

  // 3. Perform actual update in background
  startTransition(async () => {
    await serverAction(formData);
    // State will update when server responds
  });
}

// 4. Render optimistic state
return optimisticData.map((item) => (
  <div>
    {item.text}
    {item.pending && <span>Pending...</span>}
  </div>
));
```

## Related

- [useTransition](./useTransition.md) - Non-blocking state updates
- [useActionState](./useActionState.md) - Form action state management
- [startTransition](../concepts/transitions.md) - Mark updates as non-urgent
