# Next.js Documentation

> **Quick Navigation**: [Getting Started](#getting-started) | [Caching](#caching--performance) | [Routing](#routing-patterns) | [By Topic](#-quick-links-by-topic) | [Reading Order](#-reading-order)

Comprehensive guides for Next.js patterns, features, and best practices used in this project.

> **Version**: Next.js 16.0.1+ (App Router)

## 📚 Table of Contents

### Getting Started

- **[Server and Client Components](./server-client.md)** - Understanding the difference and when to use each
- **[Fetching Data](./fetching-data.md)** - How to fetch data in Server and Client Components with streaming
- **[Loading States](./loading.md)** - Creating loading UI with `loading.js` and Suspense
- **[Error Handling](./error.md)** - Handling errors with `error.js` boundaries

### Caching & Performance

Core caching concepts and related APIs:

- **[Caching Overview](./cache.md)** ⭐ - Complete guide to Next.js caching mechanisms (Request Memoization, Data Cache, Full Route Cache, Router Cache)
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

### Authentication & Security

- **[Authentication](./auth.md)** - Auth patterns, session management, and security best practices
- **[Proxy](./proxy.md)** - API proxying for backend integration (note: fetch caching not supported)

### Forms & Interactions

- **[Forms](./form.md)** - Form handling with Server Actions and progressive enhancement

### UI & Assets

- **[Image Optimization](./image.md)** - Using Next.js `<Image>` component for optimized images
- **[Font Optimization](./font.md)** - Self-hosting fonts with `next/font`
- **[MDX](./mdx.md)** - Writing JSX in Markdown files

### Performance Optimization

- **[Lazy Loading](./lazy.md)** - Code splitting with `next/dynamic` and React `lazy()`
- **[Memory Management](./memory.md)** - Memory optimization strategies and best practices

## 🔗 Quick Links by Topic

### I want to...

#### Manage Caching

1. **Understand caching** → Start with [Caching Overview](./cache.md)
2. **Cache component output** → Use [Cache Components](./cache-components.md) or [use cache](./use-cache.md)
3. **Invalidate cache** → Use [revalidatePath](./revalidate-path.md), [revalidateTag](./revalidate-tag.md), or [refresh](./refresh.md)
4. **Tag cache entries** → See [Cache Tags](./cache-tag.md)

#### Fetch & Display Data

1. **Fetch data** → See [Fetching Data](./fetching-data.md) and [Server Components](./server-client.md)
2. **Show loading state** → Use [Loading States](./loading.md)
3. **Handle errors** → Use [Error Handling](./error.md)
4. **Update data** → See [Update Data](./update-data.md) and [Forms](./form.md)

#### Build Advanced UIs

1. **Modal overlays** → Use [Intercepting Routes](./intercepting-routes.md)
2. **Multiple page sections** → Use [Parallel Routes](./parallel-routes.md) and [Slots](./slots.md)
3. **Optimize images** → Use [Image Optimization](./image.md)
4. **Reduce bundle size** → Use [Lazy Loading](./lazy.md)

#### Secure My App

1. **Add authentication** → See [Authentication](./auth.md)
2. **Proxy API calls** → Use [Proxy](./proxy.md)

## 📖 Reading Order

### For Beginners

1. [Server and Client Components](./server-client.md) - Foundation
2. [Fetching Data](./fetching-data.md) - How to get data
3. [Loading States](./loading.md) - User feedback
4. [Error Handling](./error.md) - Resilience
5. [Caching Overview](./cache.md) - Performance basics

### For Intermediate Users

1. [Cache Components](./cache-components.md) - Advanced caching
2. [revalidatePath](./revalidate-path.md) / [revalidateTag](./revalidate-tag.md) - Cache invalidation
3. [Forms](./form.md) - Data mutations
4. [Parallel Routes](./parallel-routes.md) - Complex layouts
5. [Image Optimization](./image.md) / [Lazy Loading](./lazy.md) - Performance

### For Advanced Users

1. [Authentication](./auth.md) - Security patterns
2. [Intercepting Routes](./intercepting-routes.md) - Advanced routing
3. [Proxy](./proxy.md) - Backend integration
4. [Memory Management](./memory.md) - Optimization
5. [use cache](./use-cache.md) - Granular caching control

## 🏷️ Categories

### By Feature Type

**Rendering & Components**

- [Server and Client Components](./server-client.md)
- [Loading States](./loading.md)
- [Error Handling](./error.md)
- [Lazy Loading](./lazy.md)

**Data Management**

- [Fetching Data](./fetching-data.md)
- [Update Data](./update-data.md)
- [Forms](./form.md)

**Caching System**

- [Caching Overview](./cache.md)
- [Cache Components](./cache-components.md)
- [use cache](./use-cache.md)
- [Cache & Revalidate](./cache-and-revalidate.md)
- [Cache Tags](./cache-tag.md)
- [revalidatePath](./revalidate-path.md)
- [revalidateTag](./revalidate-tag.md)
- [Update Tag](./update-tag.md)
- [refresh](./refresh.md)

**Routing**

- [Parallel Routes](./parallel-routes.md)
- [Slots](./slots.md)
- [Intercepting Routes](./intercepting-routes.md)

**Assets & Optimization**

- [Image Optimization](./image.md)
- [Font Optimization](./font.md)
- [MDX](./mdx.md)
- [Memory Management](./memory.md)

**Security & Integration**

- [Authentication](./auth.md)
- [Proxy](./proxy.md)

## 💡 Tips

- **Start with the basics**: Server Components, data fetching, and caching
- **Use cross-links**: Documents reference each other for deeper understanding
- **Check version compatibility**: All docs are for Next.js 16.0.1+
- **Refer to cache docs frequently**: Caching is central to Next.js performance

## � Documentation Map

```
Core Foundation
├── server-client.md ────────┐
├── fetching-data.md ────────┤
├── loading.md               │
└── error.md                 │
                             │
Caching Ecosystem            │
├── cache.md ◄───────────────┘ (start here for caching)
├── cache-components.md
├── use-cache.md
│
├── Cache Invalidation
│   ├── revalidatePath.md
│   ├── revalidateTag.md
│   ├── cache-tag.md
│   ├── update-tag.md
│   └── refresh.md
│
Advanced Routing
├── parallel-routes.md ───┐
├── slots.md              ├── (work together)
└── intercepting-routes.md┘

Integration & Security
├── auth.md
├── proxy.md
├── forms.md
└── update-data.md
```

**Legend**:

- `◄──` Points to prerequisite reading
- `───┐` Related documents that work together
- Indentation shows hierarchical relationships

## �🔍 Related Documentation

- **[/docs/animation/](../animation/README.md)** - Animation patterns and Tailwind Motion
- **[/docs/patterns/](../patterns/)** - Reusable UI patterns (CardContainer, infinite scroll, etc.)
- **[/docs/react/](../react/readme.md)** - React hooks and patterns
- **[/docs/project/](../project/)** - Project structure and utilities

## 📝 Notes

- All documentation is based on **Next.js 16.0.1** (App Router)
- Examples assume TypeScript usage
- Files are organized alphabetically within each category for easy reference
- Cross-references use relative paths for portability
