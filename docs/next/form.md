# Form Component

@doc-version: 16.0.1

The `<Form>` component extends the HTML `<form>` element to provide [**prefetching**](/docs/app/getting-started/linking-and-navigating.md#prefetching) of [loading UI](/docs/app/api-reference/file-conventions/loading.md), **client-side navigation** on submission, and **progressive enhancement**.

It's useful for forms that update URL search params as it reduces the boilerplate code needed to achieve the above.

Basic usage:

```tsx filename="/app/ui/search.tsx" switcher
import Form from "next/form";

export default function Page() {
  return (
    <Form action="/search">
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

```jsx filename="/app/ui/search.js" switcher
import Form from "next/form";

export default function Search() {
  return (
    <Form action="/search">
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

## Reference

The behavior of the `<Form>` component depends on whether the `action` prop is passed a `string` or `function`.

- When `action` is a **string**, the `<Form>` behaves like a native HTML form that uses a **`GET`** method. The form data is encoded into the URL as search params, and when the form is submitted, it navigates to the specified URL. In addition, Next.js:
  - [Prefetches](/docs/app/getting-started/linking-and-navigating.md#prefetching) the path when the form becomes visible, this preloads shared UI (e.g. `layout.js` and `loading.js`), resulting in faster navigation.
  - Performs a [client-side navigation](/docs/app/getting-started/linking-and-navigating.md#client-side-transitions) instead of a full page reload when the form is submitted. This retains shared UI and client-side state.
- When `action` is a **function** (Server Action), `<Form>` behaves like a [React form](https://react.dev/reference/react-dom/components/form), executing the action when the form is submitted.

### `action` (string) Props

When `action` is a string, the `<Form>` component supports the following props:

| Prop       | Example            | Type                            | Required |
| ---------- | ------------------ | ------------------------------- | -------- |
| `action`   | `action="/search"` | `string` (URL or relative path) | Yes      |
| `replace`  | `replace={false}`  | `boolean`                       | -        |
| `scroll`   | `scroll={true}`    | `boolean`                       | -        |
| `prefetch` | `prefetch={true}`  | `boolean`                       | -        |

- **`action`**: The URL or path to navigate to when the form is submitted.
  - An empty string `""` will navigate to the same route with updated search params.
- **`replace`**: Replaces the current history state instead of pushing a new one to the [browser's history](https://developer.mozilla.org/en-US/docs/Web/API/History_API) stack. Default is `false`.
- **`scroll`**: Controls the scroll behavior during navigation. Defaults to `true`, this means it will scroll to the top of the new route, and maintain the scroll position for backwards and forwards navigation.
- **`prefetch`**: Controls whether the path should be prefetched when the form becomes visible in the user's viewport. Defaults to `true`.

### `action` (function) Props

When `action` is a function, the `<Form>` component supports the following prop:

| Prop     | Example             | Type                       | Required |
| -------- | ------------------- | -------------------------- | -------- |
| `action` | `action={myAction}` | `function` (Server Action) | Yes      |

- **`action`**: The Server Action to be called when the form is submitted. See the [React docs](https://react.dev/reference/react-dom/components/form#props) for more.

> **Good to know**: When `action` is a function, the `replace` and `scroll` props are ignored.

### Caveats

- **`formAction`**: Can be used in a `<button>` or `<input type="submit">` fields to override the `action` prop. Next.js will perform a client-side navigation, however, this approach doesn't support prefetching.
  - When using [`basePath`](/docs/app/api-reference/config/next-config-js/basePath.md), you must also include it in the `formAction` path. e.g. `formAction="/base-path/search"`.
- **`key`**: Passing a `key` prop to a string `action` is not supported. If you'd like to trigger a re-render or perform a mutation, consider using a function `action` instead.

* **`onSubmit`**: Can be used to handle form submission logic. However, calling `event.preventDefault()` will override `<Form>` behavior such as navigating to the specified URL.
* **[`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method), [`encType`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#enctype), [`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#target)**: Are not supported as they override `<Form>` behavior.
  - Similarly, `formMethod`, `formEncType`, and `formTarget` can be used to override the `method`, `encType`, and `target` props respectively, and using them will fallback to native browser behavior.
  - If you need to use these props, use the HTML `<form>` element instead.
* **`<input type="file">`**: Using this input type when the `action` is a string will match browser behavior by submitting the filename instead of the file object.

## Examples

### Search form that leads to a search result page

You can create a search form that navigates to a search results page by passing the path as an `action`:

```tsx filename="/app/page.tsx" switcher
import Form from "next/form";

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

```jsx filename="/app/page.js" switcher
import Form from "next/form";

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

When the user updates the query input field and submits the form, the form data will be encoded into the URL as search params, e.g. `/search?query=abc`.

> **Good to know**: If you pass an empty string `""` to `action`, the form will navigate to the same route with updated search params.

On the results page, you can access the query using the [`searchParams`](/docs/app/api-reference/file-conventions/page.md#searchparams-optional) `page.js` prop and use it to fetch data from an external source.

```tsx filename="/app/search/page.tsx" switcher
import { getSearchResults } from "@/lib/search";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const results = await getSearchResults((await searchParams).query);

  return <div>...</div>;
}
```

```jsx filename="/app/search/page.js" switcher
import { getSearchResults } from "@/lib/search";

export default async function SearchPage({ searchParams }) {
  const results = await getSearchResults((await searchParams).query);

  return <div>...</div>;
}
```

When the `<Form>` becomes visible in the user's viewport, shared UI (such as `layout.js` and `loading.js`) on the `/search` page will be prefetched. On submission, the form will immediately navigate to the new route and show loading UI while the results are being fetched. You can design the fallback UI using [`loading.js`](/docs/app/api-reference/file-conventions/loading.md):

```tsx filename="/app/search/loading.tsx" switcher
export default function Loading() {
  return <div>Loading...</div>;
}
```

```jsx filename="/app/search/loading.js" switcher
export default function Loading() {
  return <div>Loading...</div>;
}
```

To cover cases when shared UI hasn't yet loaded, you can show instant feedback to the user using [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus).

First, create a component that displays a loading state when the form is pending:

```tsx filename="/app/ui/search-button.tsx" switcher
"use client";
import { useFormStatus } from "react-dom";

export default function SearchButton() {
  const status = useFormStatus();
  return (
    <button type="submit">{status.pending ? "Searching..." : "Search"}</button>
  );
}
```

```jsx filename="/app/ui/search-button.js" switcher
"use client";
import { useFormStatus } from "react-dom";

export default function SearchButton() {
  const status = useFormStatus();
  return (
    <button type="submit">{status.pending ? "Searching..." : "Search"}</button>
  );
}
```

Then, update the search form page to use the `SearchButton` component:

```tsx filename="/app/page.tsx" switcher
import Form from "next/form";
import { SearchButton } from "@/ui/search-button";

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <SearchButton />
    </Form>
  );
}
```

```jsx filename="/app/ui/search-button.js" switcher
import Form from "next/form";
import { SearchButton } from "@/ui/search-button";

export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <SearchButton />
    </Form>
  );
}
```

### Mutations with Server Actions

You can perform mutations by passing a function to the `action` prop.

```tsx filename="/app/posts/create/page.tsx" switcher
import Form from "next/form";
import { createPost } from "@/posts/actions";

export default function Page() {
  return (
    <Form action={createPost}>
      <input name="title" />
      {/* ... */}
      <button type="submit">Create Post</button>
    </Form>
  );
}
```

```jsx filename="/app/posts/create/page.js" switcher
import Form from "next/form";
import { createPost } from "@/posts/actions";

export default function Page() {
  return (
    <Form action={createPost}>
      <input name="title" />
      {/* ... */}
      <button type="submit">Create Post</button>
    </Form>
  );
}
```

After a mutation, it's common to redirect to the new resource. You can use the [`redirect`](/docs/app/guides/redirecting.md) function from `next/navigation` to navigate to the new post page.

> **Good to know**: Since the "destination" of the form submission is not known until the action is executed, `<Form>` cannot automatically prefetch shared UI.

```tsx filename="/app/posts/actions.ts" switcher
"use server";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  // Create a new post
  // ...

  // Redirect to the new post
  redirect(`/posts/${data.id}`);
}
```

```jsx filename="/app/posts/actions.js" switcher
"use server";
import { redirect } from "next/navigation";

export async function createPost(formData) {
  // Create a new post
  // ...

  // Redirect to the new post
  redirect(`/posts/${data.id}`);
}
```

Then, in the new page, you can fetch data using the `params` prop:

```tsx filename="/app/posts/[id]/page.tsx" switcher
import { getPost } from "@/posts/data";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPost(id);

  return (
    <div>
      <h1>{data.title}</h1>
      {/* ... */}
    </div>
  );
}
```

```jsx filename="/app/posts/[id]/page.js" switcher
import { getPost } from "@/posts/data";

export default async function PostPage({ params }) {
  const { id } = await params;
  const data = await getPost(id);

  return (
    <div>
      <h1>{data.title}</h1>
      {/* ... */}
    </div>
  );
}
```

See the [Server Actions](/docs/app/getting-started/updating-data.md) docs for more examples.

# How to create forms with Server Actions

@doc-version: 16.0.1

React Server Actions are [Server Functions](https://react.dev/reference/rsc/server-functions) that execute on the server. They can be called in Server and Client Components to handle form submissions. This guide will walk you through how to create forms in Next.js with Server Actions.

## How it works

React extends the HTML [`<form>`](https://developer.mozilla.org/docs/Web/HTML/Element/form) element to allow Server Actions to be invoked with the [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#action) attribute.

When used in a form, the function automatically receives the [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData/FormData) object. You can then extract the data using the native [`FormData` methods](https://developer.mozilla.org/en-US/docs/Web/API/FormData#instance_methods):

```tsx filename="app/invoices/page.tsx" switcher
export default function Page() {
  async function createInvoice(formData: FormData) {
    "use server";

    const rawFormData = {
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };

    // mutate data
    // revalidate the cache
  }

  return <form action={createInvoice}>...</form>;
}
```

```jsx filename="app/invoices/page.js" switcher
export default function Page() {
  async function createInvoice(formData) {
    "use server";

    const rawFormData = {
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };

    // mutate data
    // revalidate the cache
  }

  return <form action={createInvoice}>...</form>;
}
```

> **Good to know:** When working with forms that have multiple fields, use JavaScript's [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries). For example: `const rawFormData = Object.fromEntries(formData)`. Note that this object will contain extra properties prefixed with `$ACTION_`.

## Passing additional arguments

Outside of form fields, you can pass additional arguments to a Server Function using the JavaScript [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) method. For example, to pass the `userId` argument to the `updateUser` Server Function:

```tsx filename="app/client-component.tsx" highlight={6} switcher
"use client";

import { updateUser } from "./actions";

export function UserProfile({ userId }: { userId: string }) {
  const updateUserWithId = updateUser.bind(null, userId);

  return (
    <form action={updateUserWithId}>
      <input type="text" name="name" />
      <button type="submit">Update User Name</button>
    </form>
  );
}
```

```jsx filename="app/client-component.js" highlight={6} switcher
"use client";

import { updateUser } from "./actions";

export function UserProfile({ userId }) {
  const updateUserWithId = updateUser.bind(null, userId);

  return (
    <form action={updateUserWithId}>
      <input type="text" name="name" />
      <button type="submit">Update User Name</button>
    </form>
  );
}
```

The Server Function will receive the `userId` as an additional argument:

```ts filename="app/actions.ts" switcher
"use server";

export async function updateUser(userId: string, formData: FormData) {}
```

```js filename="app/actions.js" switcher
"use server";

export async function updateUser(userId, formData) {}
```

> **Good to know**:
>
> - An alternative is to pass arguments as hidden input fields in the form (e.g. `<input type="hidden" name="userId" value={userId} />`). However, the value will be part of the rendered HTML and will not be encoded.
> - `bind` works in both Server and Client Components and supports progressive enhancement.

## Form validation

Forms can be validated on the client or server.

- For **client-side validation**, you can use the HTML attributes like `required` and `type="email"` for basic validation.
- For **server-side validation**, you can use a library like [zod](https://zod.dev/) to validate the form fields. For example:

```tsx filename="app/actions.ts" switcher
"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export default async function createUser(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Mutate data
}
```

```jsx filename="app/actions.js" switcher
"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

export default async function createsUser(formData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Mutate data
}
```

## Validation errors

To display validation errors or messages, turn the component that defines the `<form>` into a Client Component and use React [`useActionState`](https://react.dev/reference/react/useActionState).

When using `useActionState`, the Server function signature will change to receive a new `prevState` or `initialState` parameter as its first argument.

```tsx filename="app/actions.ts" highlight={4} switcher
"use server";

import { z } from "zod";

export async function createUser(initialState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });
  // ...
}
```

```jsx filename="app/actions.ts" highlight={4} switcher
"use server";

import { z } from "zod";

// ...

export async function createUser(initialState, formData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });
  // ...
}
```

You can then conditionally render the error message based on the `state` object.

```tsx filename="app/ui/signup.tsx" highlight={11,18-20} switcher
"use client";

import { useActionState } from "react";
import { createUser } from "@/app/actions";

const initialState = {
  message: "",
};

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      {/* ... */}
      <p aria-live="polite">{state?.message}</p>
      <button disabled={pending}>Sign up</button>
    </form>
  );
}
```

```jsx filename="app/ui/signup.js" highlight={11,18-20} switcher
"use client";

import { useActionState } from "react";
import { createUser } from "@/app/actions";

const initialState = {
  message: "",
};

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      {/* ... */}
      <p aria-live="polite">{state?.message}</p>
      <button disabled={pending}>Sign up</button>
    </form>
  );
}
```

## Pending states

The [`useActionState`](https://react.dev/reference/react/useActionState) hook exposes a `pending` boolean that can be used to show a loading indicator or disable the submit button while the action is being executed.

```tsx filename="app/ui/signup.tsx" highlight={7,12} switcher
"use client";

import { useActionState } from "react";
import { createUser } from "@/app/actions";

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form action={formAction}>
      {/* Other form elements */}
      <button disabled={pending}>Sign up</button>
    </form>
  );
}
```

```jsx filename="app/ui/signup.js" highlight={7,12} switcher
"use client";

import { useActionState } from "react";
import { createUser } from "@/app/actions";

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form action={formAction}>
      {/* Other form elements */}
      <button disabled={pending}>Sign up</button>
    </form>
  );
}
```

Alternatively, you can use the [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus) hook to show a loading indicator while the action is being executed. When using this hook, you'll need to create a separate component to render the loading indicator. For example, to disable the button when the action is pending:

```tsx filename="app/ui/button.tsx" highlight={6} switcher
"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  );
}
```

```jsx filename="app/ui/button.js" highlight={6} switcher
"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  );
}
```

You can then nest the `SubmitButton` component inside the form:

```tsx filename="app/ui/signup.tsx" switcher
import { SubmitButton } from "./button";
import { createUser } from "@/app/actions";

export function Signup() {
  return (
    <form action={createUser}>
      {/* Other form elements */}
      <SubmitButton />
    </form>
  );
}
```

```jsx filename="app/ui/signup.js" switcher
import { SubmitButton } from "./button";
import { createUser } from "@/app/actions";

export function Signup() {
  return (
    <form action={createUser}>
      {/* Other form elements */}
      <SubmitButton />
    </form>
  );
}
```

> **Good to know:** In React 19, `useFormStatus` includes additional keys on the returned object, like data, method, and action. If you are not using React 19, only the `pending` key is available.

## Optimistic updates

You can use the React [`useOptimistic`](https://react.dev/reference/react/useOptimistic) hook to optimistically update the UI before the Server Function finishes executing, rather than waiting for the response:

```tsx filename="app/page.tsx" switcher
"use client";

import { useOptimistic } from "react";
import { send } from "./actions";

type Message = {
  message: string;
};

export function Thread({ messages }: { messages: Message[] }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(messages, (state, newMessage) => [...state, { message: newMessage }]);

  const formAction = async (formData: FormData) => {
    const message = formData.get("message") as string;
    addOptimisticMessage(message);
    await send(message);
  };

  return (
    <div>
      {optimisticMessages.map((m, i) => (
        <div key={i}>{m.message}</div>
      ))}
      <form action={formAction}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

```jsx filename="app/page.js" switcher
"use client";

import { useOptimistic } from "react";
import { send } from "./actions";

export function Thread({ messages }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { message: newMessage }]
  );

  const formAction = async (formData) => {
    const message = formData.get("message");
    addOptimisticMessage(message);
    await send(message);
  };

  return (
    <div>
      {optimisticMessages.map((m) => (
        <div>{m.message}</div>
      ))}
      <form action={formAction}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

## Nested form elements

You can call Server Actions in elements nested inside `<form>` such as `<button>`, `<input type="submit">`, and `<input type="image">`. These elements accept the `formAction` prop or event handlers.

This is useful in cases where you want to call multiple Server Actions within a form. For example, you can create a specific `<button>` element for saving a post draft in addition to publishing it. See the [React `<form>` docs](https://react.dev/reference/react-dom/components/form#handling-multiple-submission-types) for more information.

## Programmatic form submission

You can trigger a form submission programmatically using the [`requestSubmit()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit) method. For example, when the user submits a form using the `⌘` + `Enter` keyboard shortcut, you can listen for the `onKeyDown` event:

```tsx filename="app/entry.tsx" switcher
"use client";

export function Entry() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div>
      <textarea name="entry" rows={20} required onKeyDown={handleKeyDown} />
    </div>
  );
}
```

```jsx filename="app/entry.js" switcher
"use client";

export function Entry() {
  const handleKeyDown = (e) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div>
      <textarea name="entry" rows={20} required onKeyDown={handleKeyDown} />
    </div>
  );
}
```

This will trigger the submission of the nearest `<form>` ancestor, which will invoke the Server Function.
