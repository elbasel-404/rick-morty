# Documentation Structure

[🏠 Home](./index.md) | [📚 Docs Hub](./README.md)

This document explains how the documentation is organized and how to navigate it effectively.

## Overview

The documentation has been organized as a hierarchical website with interconnected pages. Every documentation file includes breadcrumb navigation links at the top for easy navigation between sections.

## Navigation System

### Breadcrumb Links

Each documentation page includes breadcrumb navigation at the top:

```markdown
[🏠 Home](../index.md) | [Section Name](./index.md)
```

- **🏠 Home**: Returns to the main documentation index (`docs/index.md`)
- **Section Name**: Links to the section's index page
- **Subsection Name**: (if applicable) Links to the subsection's index page

### Example Navigation Path

For a file at `docs/jotai/guides/typescript.md`:

```
🏠 Home > Jotai > Guides > TypeScript
```

## Documentation Structure

```
docs/
├── index.md                    # Main documentation index (all files listed)
├── README.md                   # Documentation hub (overview and quick start)
├── tour.md                     # Guided documentation tour
│
├── next/                       # Next.js documentation
│   ├── index.md               # Next.js section index
│   ├── cache.md               # Individual topic pages
│   └── ...                    # More Next.js docs
│
├── react/                      # React documentation
│   ├── index.md               # React section index
│   ├── hooks/                 # Subsections with their own indexes
│   │   ├── index.md
│   │   └── ...
│   └── ...
│
├── jotai/                      # Jotai state management
│   ├── index.md               # Jotai main index
│   ├── basics/                # Subsections
│   │   ├── index.md
│   │   ├── concepts.md
│   │   └── ...
│   ├── core/
│   ├── guides/
│   └── ...
│
├── unstorage/                  # Unstorage documentation
│   ├── index.md               # Unstorage main index
│   ├── basic.md               # Root-level docs
│   └── drivers/               # Drivers subsection
│       ├── index.md
│       └── ...
│
├── tailwind/                   # Tailwind CSS docs
│   ├── index.md
│   └── ...
│
├── tailwind-motion/            # Animation utilities
│   ├── index.md
│   └── ...
│
├── zod/                        # Zod validation
│   ├── index.md
│   └── ...
│
├── cva/                        # Class Variance Authority
│   ├── index.md
│   └── ...
│
├── patterns/                   # Component patterns
│   ├── index.md
│   └── ...
│
├── guides/                     # How-to guides
│   ├── index.md
│   └── ...
│
└── project/                    # Project organization
    ├── index.md
    └── ...
```

## Entry Points

### 1. Main Index (`index.md`)

The comprehensive index with links to every documentation file, organized by category.

**Use this when**: You want to see all available documentation at a glance or quickly jump to a specific file.

### 2. Documentation Hub (`README.md`)

The welcome page with overview, quick start guide, and highlights of key documentation sections.

**Use this when**: You're new to the project or want an overview of what's available.

### 3. Documentation Tour (`tour.md`)

A guided tour through the documentation with multiple learning paths based on your background.

**Use this when**: You want a structured learning path through the documentation.

## Finding Documentation

### Method 1: Browse by Category

1. Start at [index.md](./index.md)
2. Find the category you're interested in
3. Click the link to navigate to that section's index
4. Browse available topics and click to read

### Method 2: Follow the Tour

1. Start at [tour.md](./tour.md)
2. Choose a learning path that matches your background
3. Follow the recommended reading order

### Method 3: Use Section Indexes

Each major section has an `index.md` file that lists all available documentation in that section:

- [Next.js Index](./next/index.md)
- [React Index](./react/index.md)
- [Jotai Index](./jotai/index.md)
- [Unstorage Index](./unstorage/index.md)
- [Tailwind CSS Index](./tailwind/index.md)
- [Tailwind Motion Index](./tailwind-motion/index.md)
- [Zod Index](./zod/index.md)
- [CVA Index](./cva/index.md)
- [Patterns Index](./patterns/index.md)
- [Guides Index](./guides/index.md)
- [Project Index](./project/index.md)

## Special Sections

### Jotai Documentation

Jotai has the most nested structure with multiple subsections:

- **Basics**: Core concepts and comparisons
- **Core**: Main API (`atom`, `useAtom`, `Provider`, `store`)
- **Advanced**: Babel plugin and history
- **Extra**: Specialized atoms (cache, effect, Immer, location)
- **Guides**: Best practices and patterns
- **Recipes**: Code examples for specific use cases
- **Tools**: DevTools
- **Utils**: Utility functions (async, family, lazy, reset, SSR, storage)

### Unstorage Documentation

Unstorage includes:

- Root-level guides (basic usage, server, utilities)
- **Drivers** subsection with documentation for each storage driver

## Tips for Navigation

1. **Always start at an index**: Each section's index gives you a complete overview
2. **Use breadcrumbs**: Click the breadcrumb links at the top to navigate back up the hierarchy
3. **Bookmark key pages**: Save frequently referenced pages like the main index or your section of interest
4. **Follow cross-references**: Documents often link to related topics - follow these to build understanding

## Contributing to Documentation

When adding new documentation:

1. Add the file to the appropriate directory
2. Add a breadcrumb navigation link at the top
3. Update the section's `index.md` to include the new file
4. Update the main `docs/index.md` to include the new file in the complete file index

### Breadcrumb Template

For a file at `docs/section/subsection/file.md`:

```markdown
# Page Title

[🏠 Home](../../index.md) | [Section](../index.md) | [Subsection](./index.md)

Your content here...

---

[🏠 Home](../../index.md) | [Section](../index.md) | [Subsection](./index.md)
```

---

[🏠 Home](./index.md) | [📚 Docs Hub](./README.md)
