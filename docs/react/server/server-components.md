# React Server Components

Server Components are a new type of Component that renders ahead of time, before bundling, in an environment separate from your client app or SSR server.

## Overview

This separate environment is the "server" in React Server Components. Server Components can:

- Run once at build time on your CI server
- Run for each request using a web server

## Key Benefits

- **Smaller Bundle Sizes** - Server-only dependencies don't ship to the client
- **Direct Data Access** - Access databases and filesystems directly
- **Better Performance** - Reduce client-side JavaScript
- **Improved SEO** - Content rendered on server
- **Automatic Code Splitting** - Only client components are bundled

## Server Components Without a Server

Server components can run at **build time** to read from the filesystem or fetch static content, so a web server is not required.

### Without Server Components

```tsx
// bundle.js
import marked from "marked"; // 35.9K (11.2K gzipped)
import sanitizeHtml from "sanitize-html"; // 206K (63.3K gzipped)

function Page({ page }) {
  const [content, setContent] = useState("");

  // NOTE: loads _after_ first page render
  useEffect(() => {
    fetch(`/api/content/${page}`).then((data) => {
      setContent(data.content);
    });
  }, [page]);

  return <div>{sanitizeHtml(marked(content))}</div>;
}
```

**Problems:**

- Users download 75K+ of libraries
- Wait for second request after page loads
- Renders static content that won't change

### With Server Components

```tsx
import marked from "marked"; // Not included in bundle
import sanitizeHtml from "sanitize-html"; // Not included in bundle

async function Page({ page }) {
  // NOTE: loads _during_ render, when the app is built
  const content = await file.readFile(`${page}.md`);

  return <div>{sanitizeHtml(marked(content))}</div>;
}
```

**Benefits:**

- Rendered output is SSR'd to HTML and uploaded to CDN
- Client only sees: `<div><!-- html for markdown --></div>`
- No expensive libraries in bundle
- Content visible during first page load

## Server Components With a Server

Server Components can run on a web server during a request, letting you access your data layer without building an API.

### Without Server Components

```tsx
// bundle.js
function Note({ id }) {
  const [note, setNote] = useState("");

  // NOTE: loads _after_ first render
  useEffect(() => {
    fetch(`/api/notes/${id}`).then((data) => {
      setNote(data.note);
    });
  }, [id]);

  return (
    <div>
      <Author id={note.authorId} />
      <p>{note}</p>
    </div>
  );
}

function Author({ id }) {
  const [author, setAuthor] = useState("");

  // NOTE: loads _after_ Note renders
  // Causing an expensive client-server waterfall
  useEffect(() => {
    fetch(`/api/authors/${id}`).then((data) => {
      setAuthor(data.author);
    });
  }, [id]);

  return <span>By: {author.name}</span>;
}
```

**Problems:**

- Client-server waterfalls
- Multiple round trips
- Loading states for each component

### With Server Components

```tsx
import db from "./database";

async function Note({ id }) {
  // NOTE: loads _during_ render
  const note = await db.notes.get(id);

  return (
    <div>
      <Author id={note.authorId} />
      <p>{note}</p>
    </div>
  );
}

async function Author({ id }) {
  // NOTE: loads _after_ Note, but is fast if data is co-located
  const author = await db.authors.get(id);

  return <span>By: {author.name}</span>;
}
```

**Benefits:**

- Direct database access
- No API endpoints needed
- Faster data fetching
- Client receives rendered output only

## Adding Interactivity to Server Components

Server Components are not sent to the browser, so they **cannot** use interactive APIs like `useState`. To add interactivity, compose them with Client Components using the `"use client"` directive.

**Important**: There is **no directive** for Server Components. The `"use server"` directive is used for Server Functions, not Server Components.

### Example: Server Component with Client Component

```tsx
// Server Component (no directive needed)
import Expandable from "./Expandable";

async function Notes() {
  const notes = await db.notes.getAll();

  return (
    <div>
      {notes.map((note) => (
        <Expandable key={note.id}>
          <p note={note} />
        </Expandable>
      ))}
    </div>
  );
}
```

```tsx
// Client Component
"use client";

export default function Expandable({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>Toggle</button>
      {expanded && children}
    </div>
  );
}
```

**How it works:**

1. `Notes` renders as a Server Component
2. Bundler creates a bundle for the Client Component `Expandable`
3. Client Components see Server Component output passed as props

## Async Components with Server Components

Server Components introduce a new way to write Components using `async`/`await`. When you `await` in an async component, React will suspend and wait for the promise to resolve before resuming rendering.

### Server-to-Client Promise Streaming

You can create a promise on the server and await it on the client:

```tsx
// Server Component
import db from "./database";

async function Page({ id }) {
  // Will suspend the Server Component
  const note = await db.notes.get(id);

  // NOTE: not awaited, will start here and await on the client
  const commentsPromise = db.comments.get(note.id);

  return (
    <div>
      {note}
      <Suspense fallback={<p>Loading Comments...</p>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
}
```

```tsx
// Client Component
"use client";
import { use } from "react";

function Comments({ commentsPromise }) {
  // NOTE: this will resume the promise from the server
  // It will suspend until the data is available
  const comments = use(commentsPromise);

  return comments.map((comment) => <p>{comment}</p>);
}
```

**Strategy:**

- `note` is important data → await on server
- `comments` are below the fold → start on server, await on client
- This suspends on client without blocking note content

**Note**: Async components are not supported on the client, so we await the promise with `use`.

## Server Component Rules

### ✅ Can Do

- Use `async`/`await`
- Access server-only APIs (filesystem, database)
- Import server-only libraries
- Pass data to Client Components as props
- Render other Server Components
- Render Client Components

### ❌ Cannot Do

- Use hooks (`useState`, `useEffect`, etc.)
- Use browser-only APIs
- Access client-side state
- Add event handlers directly
- Use Context (cannot provide context, but can read it)

## Composing Server and Client Components

### Passing Server Components to Client Components

```tsx
// ✅ Correct: Pass Server Component as children
<ClientComponent>
  <ServerComponent />
</ClientComponent>;

// ❌ Wrong: Cannot import Server Component in Client Component
("use client");
import ServerComponent from "./ServerComponent"; // Error!
```

## Stability Note

> While React Server Components in React 19 are stable and will not break between minor versions, the underlying APIs used to implement a React Server Components bundler or framework do not follow semver and may break between minors in React 19.x.

**Recommendation**: Pin to a specific React version or use the Canary release.

## Related

- [Server Functions](./server-functions.md) - Server-side actions
- [`"use client"` directive](./directives.md#use-client) - Mark Client Components
- [`use` Hook](../hooks/use.md) - Read Promise/Context values
- [Suspense](../concepts/lazy.md#suspense) - Show fallback while loading
- [cache](./cache.md) - Cache function results on server
