# Next.js Documentation

[🏠 Home](../index.md) | [📚 Docs Hub](../README.md)

Comprehensive guides for Next.js patterns, features, and best practices used in this project.

> **Version**: Next.js 16.0.1+ (App Router)

## Table of Contents

### Getting Started

- **[Server and Client Components](./server-client.md)** - Understanding the difference and when to use each
- **[Fetching Data](./fetching-data.md)** - How to fetch data in Server and Client Components with streaming
- **[Loading States](./loading.md)** - Creating loading UI with `loading.js` and Suspense
- **[Error Handling](./error.md)** - Handling errors with `error.js` boundaries

### Caching & Performance

Core caching concepts and related APIs:

- **[Caching Overview](./cache.md)** ⭐ - Complete guide to Next.js caching mechanisms
- **[Cache Components](./cache-components.md)** - React Server Components with `"use cache"` directive
- **[use cache](./use-cache.md)** - Function-level caching with the `use cache` directive

#### Cache Invalidation & Revalidation

- **[Cache & Revalidate](./cache-and-revalidate.md)** - Overview of cache revalidation strategies
- **[revalidatePath](./revalidate-path.md)** - Purge cached data for a specific path
- **[revalidateTag](./revalidate-tag.md)** - Purge cached data by cache tag
- **[Cache Tags](./cache-tag.md)** - Tag cached data for granular invalidation
- **[refresh](./refresh.md)** - Force a route refresh from the client

#### Updating Data

- **[Update Data](./update-data.md)** - Patterns for updating data with Server Actions
- **[Update Tag](./update-tag.md)** - Update cache tags dynamically

### Routing Patterns

Advanced routing features:

- **[Parallel Routes](./parallel-routes.md)** - Render multiple pages simultaneously in the same layout
- **[Slots](./slots.md)** - Named slots for parallel routes (used with `@folder` convention)
- **[Intercepting Routes](./intercepting-routes.md)** - Intercept route navigation for modals and overlays
- **[Parallel Data Fetching](./parallel-data-fetching.md)** - Fetch data in parallel for better performance

### Authentication & Security

- **[Authentication](./auth.md)** - Auth patterns, session management, and security best practices
- **[Proxy](./proxy.md)** - API proxying for backend integration

### Optimization

- **[Image](./image.md)** - Next.js Image component for optimized images
- **[Font](./font.md)** - Font optimization with `next/font`
- **[Lazy Loading](./lazy.md)** - Code splitting and lazy loading components
- **[Memory Management](./memory.md)** - Memory optimization strategies

### Content & Forms

- **[MDX](./mdx.md)** - Using MDX in Next.js
- **[Forms](./form.md)** - Form handling with Server Actions

### What's New

- **[What's New in Next.js 16](./new.md)** - Latest features and changes

---

[🏠 Home](../index.md) | [📚 Docs Hub](../README.md)
