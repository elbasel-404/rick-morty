# Tailwind Documentation Navigation Guide

**[← Back to Main README](./README.md)**

This document provides a visual guide to navigate through the Tailwind documentation based on your current needs.

## 🗺️ Documentation Map

```
┌─────────────────────────────────────────────────────────────┐
│                     START HERE                              │
│                   [README.md]                               │
│            Your entry point to all docs                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌────────┐    ┌─────────┐    ┌──────────┐
   │ Basics │    │  Core   │    │ Advanced │
   └────────┘    └─────────┘    └──────────┘
```

## 📋 By Experience Level

### 🟢 Beginner Path

Start here if you're new to Tailwind CSS v4:

```
1. [v4.md] → What's new in v4
   └─→ Key features & changes

2. [preflight.md] → Base styles
   └─→ Understand default resets

3. [classname-detection.md] → How it works
   └─→ Avoid common pitfalls

4. [responsive-design.md] → Build layouts
   └─→ Master breakpoints
```

### 🟡 Intermediate Path

You know the basics, now customize:

```
1. [theme-varibles.md] → Design tokens
   └─→ Define your theme

2. [custom-styles.md] → Extend Tailwind
   └─→ Add custom utilities

3. [colors.md] → Color system
   └─→ Custom palettes

4. [dark-mode.md] → Theming
   └─→ Implement dark mode
```

### 🔴 Advanced Path

Deep dive into advanced features:

```
1. [functions-and-directives.md] → Directives
   └─→ @theme, @utility, @variant

2. [tailwind-intersect.md] → Animations
   └─→ Viewport-based effects

3. [custom-styles.md] → Advanced patterns
   └─→ Complex customizations
```

## 🎯 By Use Case

### Setting Up a New Project

```
v4.md (Overview)
   │
   ├─→ theme-varibles.md (Configure theme)
   ├─→ colors.md (Set color palette)
   ├─→ responsive-design.md (Set breakpoints)
   └─→ preflight.md (Understand base styles)
```

### Customizing Design Tokens

```
theme-varibles.md (Learn about tokens)
   │
   ├─→ colors.md (Custom colors)
   ├─→ custom-styles.md (Custom utilities)
   └─→ functions-and-directives.md (Directives)
```

### Implementing Dark Mode

```
dark-mode.md (Implementation guide)
   │
   ├─→ colors.md (Dark color variants)
   ├─→ theme-varibles.md (Dark theme tokens)
   └─→ custom-styles.md (Custom dark variants)
```

### Adding Animations

```
tailwind-intersect.md (Viewport animations)
   │
   ├─→ responsive-design.md (Breakpoint variants)
   └─→ custom-styles.md (Custom animations)
```

### Debugging & Optimization

```
classname-detection.md (How classes are detected)
   │
   ├─→ v4.md (Performance features)
   ├─→ preflight.md (Base style conflicts)
   └─→ custom-styles.md (Override strategies)
```

## 🔗 Cross-Reference Matrix

| Starting From                   | Related Topics                                               |
| ------------------------------- | ------------------------------------------------------------ |
| **v4.md**                       | theme-varibles.md, functions-and-directives.md, colors.md    |
| **theme-varibles.md**           | custom-styles.md, colors.md, responsive-design.md            |
| **custom-styles.md**            | theme-varibles.md, functions-and-directives.md, dark-mode.md |
| **functions-and-directives.md** | custom-styles.md, theme-varibles.md, classname-detection.md  |
| **colors.md**                   | theme-varibles.md, dark-mode.md, custom-styles.md            |
| **responsive-design.md**        | theme-varibles.md, tailwind-intersect.md                     |
| **dark-mode.md**                | colors.md, theme-varibles.md, custom-styles.md               |
| **preflight.md**                | custom-styles.md, functions-and-directives.md                |
| **classname-detection.md**      | functions-and-directives.md, custom-styles.md                |
| **tailwind-intersect.md**       | responsive-design.md, custom-styles.md                       |

## 📚 Topic Clusters

### Configuration & Setup

- [v4.md](./v4.md) - Version overview
- [theme-varibles.md](./theme-varibles.md) - Theme configuration
- [functions-and-directives.md](./functions-and-directives.md) - Directives reference

### Styling & Design

- [colors.md](./colors.md) - Color system
- [custom-styles.md](./custom-styles.md) - Customization
- [preflight.md](./preflight.md) - Base styles

### Responsive & Interactive

- [responsive-design.md](./responsive-design.md) - Breakpoints
- [dark-mode.md](./dark-mode.md) - Dark mode
- [tailwind-intersect.md](./tailwind-intersect.md) - Viewport effects

### Technical Details

- [classname-detection.md](./classname-detection.md) - Class scanning
- [functions-and-directives.md](./functions-and-directives.md) - API reference

## 🚀 Quick Actions

### "I want to..."

- **...add a custom color**

  - Start: [theme-varibles.md](./theme-varibles.md#defining-colors)
  - Also see: [colors.md](./colors.md), [custom-styles.md](./custom-styles.md)

- **...implement dark mode**

  - Start: [dark-mode.md](./dark-mode.md)
  - Also see: [colors.md](./colors.md), [theme-varibles.md](./theme-varibles.md)

- **...create custom utilities**

  - Start: [custom-styles.md](./custom-styles.md)
  - Also see: [functions-and-directives.md](./functions-and-directives.md#utility)

- **...understand v4 changes**

  - Start: [v4.md](./v4.md)
  - Also see: [theme-varibles.md](./theme-varibles.md), [functions-and-directives.md](./functions-and-directives.md)

- **...fix class detection issues**

  - Start: [classname-detection.md](./classname-detection.md)
  - Also see: [custom-styles.md](./custom-styles.md)

- **...add viewport animations**

  - Start: [tailwind-intersect.md](./tailwind-intersect.md)
  - Also see: [responsive-design.md](./responsive-design.md)

- **...customize breakpoints**

  - Start: [responsive-design.md](./responsive-design.md)
  - Also see: [theme-varibles.md](./theme-varibles.md)

- **...override base styles**
  - Start: [preflight.md](./preflight.md)
  - Also see: [custom-styles.md](./custom-styles.md)

## 📖 Reading Order Recommendations

### Complete Learning Path (All Docs)

```
1. v4.md                        (30 min) - Overview
2. theme-varibles.md            (45 min) - Foundation
3. custom-styles.md             (40 min) - Customization
4. functions-and-directives.md  (30 min) - API
5. colors.md                    (20 min) - Colors
6. responsive-design.md         (25 min) - Responsive
7. dark-mode.md                 (20 min) - Theming
8. preflight.md                 (15 min) - Base styles
9. classname-detection.md       (20 min) - Technical
10. tailwind-intersect.md       (15 min) - Advanced
```

### Quick Start (Essential Only)

```
1. v4.md                        (Focus on "Key Features")
2. theme-varibles.md            (Focus on "@theme directive")
3. custom-styles.md             (Focus on "Arbitrary values")
4. classname-detection.md       (Focus on "Dynamic class names")
```

### Migration from v3

```
1. v4.md                        (Complete read)
2. theme-varibles.md            (Complete read)
3. functions-and-directives.md  (Complete read)
4. custom-styles.md             (Skim for changes)
```

## 🔍 Search by Keyword

| Keyword               | Primary Doc                 | Secondary Docs                                |
| --------------------- | --------------------------- | --------------------------------------------- |
| `@theme`              | theme-varibles.md           | functions-and-directives.md, custom-styles.md |
| `@utility`            | functions-and-directives.md | custom-styles.md                              |
| `@variant`            | functions-and-directives.md | custom-styles.md, dark-mode.md                |
| breakpoints           | responsive-design.md        | theme-varibles.md                             |
| colors                | colors.md                   | theme-varibles.md, dark-mode.md               |
| dark mode             | dark-mode.md                | colors.md, theme-varibles.md                  |
| arbitrary values      | custom-styles.md            | -                                             |
| intersection observer | tailwind-intersect.md       | responsive-design.md                          |
| preflight             | preflight.md                | custom-styles.md                              |
| class detection       | classname-detection.md      | functions-and-directives.md                   |
| performance           | v4.md                       | -                                             |
| CSS variables         | theme-varibles.md           | custom-styles.md                              |

---

**[Return to Main README](./README.md)** | **[View All Docs](../)**
