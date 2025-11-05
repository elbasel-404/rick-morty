# Rick and Morty Character Cards - Documentation Hub

[🏠 Documentation Index](./index.md)

Welcome to the comprehensive documentation for the Rick and Morty Character Cards project. This documentation covers Next.js, React, Tailwind CSS, animations, state management, and all the technologies used in this project.

> 📖 **Navigation**: Each documentation page includes breadcrumb links at the top for easy navigation. Click [🏠 Home](./index.md) on any page to return to the main index.

📖 **[Start the Documentation Tour](./tour.md)** - Recommended reading path for new contributors

---

## 🚀 Quick Start

### For New Contributors

1. **[Documentation Tour](./tour.md)** - Start here! A guided tour through all documentation
2. **[Documentation Index](./index.md)** - Browse all available documentation by category
3. **[Project Structure](./project/project-structure.md)** - Understand the codebase organization
4. **[Guides](./guides/index.md)** - Practical how-to guides for common tasks

### For Developers

- **[Next.js Documentation](./next/index.md)** ⭐ - Caching, routing, data fetching, and more
- **[React Documentation](./react/index.md)** - Hooks, patterns, and best practices
- **[Component Patterns](./patterns/index.md)** - Reusable patterns used in this project

---

## 📚 Documentation Sections

### Core Technologies

#### Next.js (App Router)

**[→ Next.js Docs](./next/index.md)**

The foundation of this project. Learn about:

- Server and Client Components
- Caching strategies (Request Memoization, Data Cache, Full Route Cache, Router Cache)
- Data fetching and revalidation
- Routing patterns (parallel routes, intercepting routes)
- Error handling and loading states

**Key Files:**

- [Caching Overview](./next/cache.md) - Complete guide to Next.js caching
- [Cache Components](./next/cache-components.md) - Using `"use cache"` directive
- [Fetching Data](./next/fetching-data.md) - Data fetching patterns
- [Server & Client](./next/server-client.md) - Understanding the difference

#### React 19

**[→ React Docs](./react/index.md)**

Modern React patterns and hooks:

- **Hooks**: `useActionState`, `useFormStatus`, `useOptimistic`, `useTransition`, `useDeferredValue`
- **Concepts**: Effect Events, Rules of Hooks, Lazy Loading
- **Server**: Server Components, Server Functions, Caching
- **Performance**: Profiling and optimization

**Key Files:**

- [Hooks Overview](./react/README.md#hooks) - All available hooks
- [Effect Events](./react/concepts/effect-events.md) - Separating reactive and non-reactive logic
- [Server Components](./react/server/server-components.md) - RSC patterns

#### Tailwind CSS

**[→ Tailwind Docs](./tailwind/README.md)**

Utility-first CSS framework:

- Theme customization and design tokens
- Custom styles and utilities
- Responsive design patterns
- Dark mode support
- V4.0 features

**Key Files:**

- [Quick Reference](./tailwind/QUICK-REFERENCE.md) - Common patterns and snippets
- [Navigation Guide](./tailwind/NAVIGATION.md) - Visual learning paths
- [Theme Variables](./tailwind/theme-varibles.md) - Design tokens with `@theme`
- [Custom Styles](./tailwind/custom-styles.md) - Extending Tailwind

#### Tailwind Motion

**[→ Tailwind Motion Docs](./tailwind-motion/)**

Animation utilities for Tailwind:

- Enter, exit, and loop animations
- Scroll-triggered animations
- Animation modifiers and customization
- Performance optimization

**Key Files:**

- [Quick Reference](./tailwind-motion/animation-quick-reference.md) - Animation utilities
- [Configuration](./tailwind-motion/animation-config.md) - Setup and customization
- [Tailwind Motion Guide](./tailwind-motion/tailwind-motion.md) - Complete reference

---

### Libraries & Tools

#### Zod (Validation)

**[→ Zod Docs](./zod/)**

TypeScript-first schema validation:

- [Basic Usage](./zod/basic.md) - Schemas, parsing, and type inference
- [Defining Schemas](./zod/define-schemas.md) - Complete schema API
- [Error Handling](./zod/errors.md) - Advanced error handling
- [JSON Validation](./zod/json.md) - Working with JSON data
- [Meta Information](./zod/meta.md) - Schema metadata
- [Tools & Utilities](./zod/tools.md) - Helper functions

#### CVA (Class Variance Authority)

**[→ CVA Docs](./cva/)**

Type-safe component variants:

- [Variants](./cva/varients.md) - Creating and using variants
- [Compose](./cva/compose.md) - Composing CVA instances
- [Extend](./cva/extend.md) - Extending existing variants
- [TypeScript](./cva/typescript.md) - Type safety and utilities
- [Examples](./cva/example.md) - Real-world examples

#### Jotai (State Management)

**[→ Jotai Docs](./jotai/)**

Atomic state management for React:

- Core concepts and atoms
- Utilities and integrations
- Advanced patterns

---

### Project-Specific Documentation

#### Component Patterns

**[→ Patterns](./patterns/)**

Reusable patterns used throughout the project:

- **[Card Container](./patterns/card-container.md)** - Lazy loading and fade sequences
- **[Skeleton Pattern](./patterns/skeleton-pattern.md)** - Loading state management
- **[Infinite Loading](./patterns/infinite-loading.md)** - Infinite scroll implementation

#### Project Structure

**[→ Project Docs](./project/)**

Understanding the codebase:

- **[Project Structure](./project/project-structure.md)** - Directory organization and file locations
- **[Utilities Reference](./project/utilities-quick-reference.md)** - Available utility functions
- **[Refactoring Summary](./project/refactoring-summary.md)** - Project evolution and changes
- **[Library Integration](./project/library-integration-refactoring.md)** - Third-party library setup

---

## 🎯 Guides

Practical how-to guides for common tasks:

**[→ All Guides](./guides/)**

- **[Creating New Card Variants](./guides/creating-card-variants.md)** - Step-by-step guide for new card designs
- **[Adding Animations](./guides/adding-animations.md)** - Implementing smooth animations
- **[Working with the API](./guides/working-with-api.md)** - Fetching and validating data
- **[State Management](./guides/state-management.md)** - Managing component state
- **[Performance Optimization](./guides/performance-optimization.md)** - Making components faster
- **[TypeScript Patterns](./guides/typescript-patterns.md)** - Type-safe development

---

## 🗺️ Navigation Tips

### Finding Documentation

- **By Technology**: Use the sections above to find docs for specific technologies
- **By Topic**: Check the [Documentation Tour](./tour.md) for topic-based navigation
- **By Task**: Browse [Guides](./guides/) for step-by-step instructions
- **Search**: Use your editor's search (Cmd/Ctrl + Shift + F) to search across all docs

### Reading Order Recommendations

#### For Backend Developers New to Frontend

1. [Next.js Server & Client](./next/server-client.md)
2. [React Server Components](./react/server/server-components.md)
3. [Fetching Data](./next/fetching-data.md)
4. [Caching Overview](./next/cache.md)

#### For Frontend Developers New to Next.js

1. [Next.js README](./next/README.md)
2. [Server & Client Components](./next/server-client.md)
3. [Routing Patterns](./next/parallel-routes.md)
4. [Data Fetching](./next/fetching-data.md)

#### For UI/UX Developers

1. [Tailwind Quick Reference](./tailwind/QUICK-REFERENCE.md)
2. [Tailwind Motion Guide](./tailwind-motion/tailwind-motion.md)
3. [Component Patterns](./patterns/)
4. [Creating Card Variants Guide](./guides/creating-card-variants.md)

#### For New Contributors

1. **[Start with the Tour](./tour.md)** - Guided introduction
2. [Project Structure](./project/project-structure.md)
3. [Component Patterns](./patterns/)
4. [Guides](./guides/)

---

## 📖 Additional Resources

### Project Files

- [Repository Instructions](../.github/copilot-instructions.md) - Code style and architecture
- [Agent Instructions](../AGENTS.md) - AI agent capabilities and guidelines
- [Task List](../task.md) - Current project tasks

### External Documentation

- [Next.js Official Docs](https://nextjs.org/docs)
- [React Official Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)
- [Rick and Morty API](https://rickandmortyapi.com/)

---

## 🤝 Contributing to Documentation

When adding or updating documentation:

1. **Follow Markdown best practices** - Use proper headings, code blocks, and formatting
2. **Add cross-references** - Link to related documentation
3. **Include examples** - Show code snippets and real-world usage
4. **Keep it organized** - Place files in appropriate directories
5. **Update this README** - Add new documentation to the relevant section

---

**Last Updated**: November 6, 2025  
**Documentation Version**: 1.0
