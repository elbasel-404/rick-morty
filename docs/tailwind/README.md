# Tailwind CSS Documentation

This directory contains comprehensive documentation for Tailwind CSS features, configuration, and best practices used in this project.

📖 **[Interactive Navigation Guide](./NAVIGATION.md)** - Visual maps and learning paths  
⚡ **[Quick Reference](./QUICK-REFERENCE.md)** - Common patterns and code snippets

---

## 📚 Table of Contents

### Getting Started

- **[Tailwind CSS v4.0](./v4.md)** - Overview of v4.0 features, performance improvements, and new capabilities
  - New high-performance engine
  - Modern CSS features (cascade layers, `@property`, `color-mix()`)
  - Simplified installation and configuration
  - First-party Vite plugin

### Core Concepts

#### Configuration & Customization

- **[Theme Variables](./theme-varibles.md)** - Define and use design tokens with `@theme` directive

  - Design tokens and theme variables
  - Relationship to utility classes
  - Color, spacing, typography scales
  - See also: [Custom Styles](./custom-styles.md)

- **[Custom Styles](./custom-styles.md)** - Best practices for extending Tailwind

  - Customizing your theme
  - Using arbitrary values
  - Adding custom CSS
  - Custom utilities and components
  - Related: [Theme Variables](./theme-varibles.md), [Functions and Directives](./functions-and-directives.md)

- **[Functions and Directives](./functions-and-directives.md)** - Reference for Tailwind CSS directives
  - `@import`, `@theme`, `@source`
  - `@utility`, `@variant`
  - Custom functions
  - Related: [Custom Styles](./custom-styles.md), [Theme Variables](./theme-varibles.md)

#### Design System

- **[Colors](./colors.md)** - Complete color palette and customization

  - Default color palette
  - Custom color definitions
  - Color utilities
  - See also: [Theme Variables](./theme-varibles.md), [Dark Mode](./dark-mode.md)

- **[Responsive Design](./responsive-design.md)** - Building adaptive interfaces

  - Breakpoint system (sm, md, lg, xl, 2xl)
  - Mobile-first workflow
  - Responsive utility variants
  - Related: [Theme Variables](./theme-varibles.md)

- **[Dark Mode](./dark-mode.md)** - Implementing dark mode
  - `prefers-color-scheme` support
  - Manual dark mode toggling
  - Dark variant utilities
  - Related: [Colors](./colors.md), [Custom Styles](./custom-styles.md)

#### Styling & Utilities

- **[Preflight](./preflight.md)** - Base styles and normalization

  - Modern-normalize foundation
  - Default style resets
  - Cross-browser consistency
  - Related: [Custom Styles](./custom-styles.md)

- **[Classname Detection](./classname-detection.md)** - How Tailwind scans source files
  - Class detection mechanism
  - Dynamic class names (what to avoid)
  - Best practices for class composition
  - Safelist configuration
  - Related: [Functions and Directives](./functions-and-directives.md)

#### Advanced Features

- **[Tailwind Intersect](./tailwind-intersect.md)** - Intersection Observer plugin
  - `intersect:` variant usage
  - Modifiers: `intersect-once`, `intersect-half`, `intersect-full`
  - Viewport-based animations
  - Custom classes with `@apply`

---

## 🔗 Quick Reference Links

### By Topic

**Configuration**

- [v4.0 Overview](./v4.md) → [Theme Variables](./theme-varibles.md) → [Custom Styles](./custom-styles.md) → [Functions and Directives](./functions-and-directives.md)

**Design Tokens**

- [Theme Variables](./theme-varibles.md) → [Colors](./colors.md) → [Responsive Design](./responsive-design.md)

**Styling Approaches**

- [Custom Styles](./custom-styles.md) → [Preflight](./preflight.md) → [Classname Detection](./classname-detection.md)

**Theming**

- [Colors](./colors.md) → [Dark Mode](./dark-mode.md) → [Theme Variables](./theme-varibles.md)

**Interactive Features**

- [Tailwind Intersect](./tailwind-intersect.md) → [Responsive Design](./responsive-design.md)

---

## 📖 Recommended Reading Paths

### For Beginners

1. Start with [Tailwind CSS v4.0](./v4.md) to understand what's new
2. Learn about [Preflight](./preflight.md) base styles
3. Understand [Classname Detection](./classname-detection.md) to avoid common pitfalls
4. Explore [Responsive Design](./responsive-design.md) for building adaptive layouts

### For Customization

1. Begin with [Theme Variables](./theme-varibles.md) to understand design tokens
2. Read [Custom Styles](./custom-styles.md) for extending Tailwind
3. Reference [Functions and Directives](./functions-and-directives.md) for available tools
4. Dive into [Colors](./colors.md) for palette customization

### For Advanced Features

1. Master [Dark Mode](./dark-mode.md) implementation
2. Learn [Tailwind Intersect](./tailwind-intersect.md) for viewport animations
3. Review [Responsive Design](./responsive-design.md) for complex layouts

---

## 🎯 Common Tasks

### Adding Custom Colors

1. Read: [Theme Variables](./theme-varibles.md)
2. Reference: [Colors](./colors.md)
3. Implementation: [Custom Styles](./custom-styles.md)

### Implementing Dark Mode

1. Read: [Dark Mode](./dark-mode.md)
2. Related: [Colors](./colors.md), [Theme Variables](./theme-varibles.md)

### Creating Responsive Layouts

1. Read: [Responsive Design](./responsive-design.md)
2. Reference: [Theme Variables](./theme-varibles.md) for breakpoints

### Adding Custom Utilities

1. Read: [Custom Styles](./custom-styles.md)
2. Reference: [Functions and Directives](./functions-and-directives.md)

### Viewport-based Animations

1. Read: [Tailwind Intersect](./tailwind-intersect.md)
2. Related: [Custom Styles](./custom-styles.md)

---

## 🔍 Related Documentation

### Within This Project

- [Tailwind Motion](../tailwind-motion/README.md) - Animation utilities and configuration
- [CVA (Class Variance Authority)](../cva/) - Component variant patterns
- [Project Patterns](../patterns/) - Reusable UI patterns

### External Resources

- [Tailwind CSS Official Docs](https://tailwindcss.com/docs)
- [Tailwind CSS v4.0 Release Notes](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind Play](https://play.tailwindcss.com/) - Online playground

---

## 📝 File Organization

```
docs/tailwind/
├── README.md                        # This file - Overview and navigation
├── v4.md                           # Tailwind CSS v4.0 features
├── theme-varibles.md               # Design tokens and theme configuration
├── custom-styles.md                # Extending and customizing Tailwind
├── functions-and-directives.md     # @theme, @utility, @variant, etc.
├── colors.md                       # Color palette and customization
├── responsive-design.md            # Breakpoints and responsive utilities
├── dark-mode.md                    # Dark mode implementation
├── preflight.md                    # Base styles and normalization
├── classname-detection.md          # Class scanning and detection
└── tailwind-intersect.md           # Intersection Observer plugin
```

---

## 💡 Tips

- **Start with v4.0**: If you're new to Tailwind v4, begin with [v4.md](./v4.md) to understand the major changes
- **Theme First**: Understanding [Theme Variables](./theme-varibles.md) is key to mastering Tailwind customization
- **Avoid Dynamic Classes**: Read [Classname Detection](./classname-detection.md) to prevent common mistakes
- **Use Cross-References**: Documents are interconnected - follow the "See also" and "Related" links
- **Check Examples**: Most documents include code examples - use them as templates
