# Tailwind CSS Quick Reference

**[← Back to Tailwind Docs](./README.md)** | **[Navigation Guide](./NAVIGATION.md)**

A condensed reference for common Tailwind CSS tasks and patterns.

## 🎨 Theme Customization

### Adding Custom Colors

```css
/* In your CSS file */
@theme {
  --color-brand-500: oklch(0.72 0.11 178);
  --color-brand-600: oklch(0.53 0.12 178);
}
```

```html
<!-- Usage -->
<div class="bg-brand-500 text-brand-600">Custom colors</div>
```

📖 **Learn more:** [Theme Variables](./theme-varibles.md) | [Colors](./colors.md)

---

### Custom Spacing

```css
@theme {
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;
}
```

```html
<div class="p-18 m-22">Custom spacing</div>
```

📖 **Learn more:** [Theme Variables](./theme-varibles.md)

---

### Custom Breakpoints

```css
@theme {
  --breakpoint-3xl: 120rem;
  --breakpoint-4xl: 160rem;
}
```

```html
<div class="hidden 3xl:block 4xl:flex">Large screens only</div>
```

📖 **Learn more:** [Responsive Design](./responsive-design.md)

---

## 🌓 Dark Mode

### Basic Dark Mode

```html
<div class="bg-white dark:bg-gray-800">
  <h1 class="text-gray-900 dark:text-white">Title</h1>
  <p class="text-gray-600 dark:text-gray-400">Content</p>
</div>
```

📖 **Learn more:** [Dark Mode](./dark-mode.md)

---

### Manual Dark Mode Toggle

```css
/* In your CSS */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<!-- Add 'dark' class to enable dark mode -->
<html class="dark">
  <body class="bg-white dark:bg-black">
    ...
  </body>
</html>
```

📖 **Learn more:** [Dark Mode](./dark-mode.md)

---

## 🎯 Custom Utilities

### Simple Custom Utility

```css
@utility tab-4 {
  tab-size: 4;
}
```

```html
<pre class="tab-4">Code with custom tab size</pre>
```

📖 **Learn more:** [Functions and Directives](./functions-and-directives.md)

---

### Custom Utility with Variants

```css
@utility text-balance {
  text-wrap: balance;
}
```

```html
<h1 class="text-balance lg:text-pretty">Balanced heading</h1>
```

📖 **Learn more:** [Custom Styles](./custom-styles.md)

---

## 📐 Arbitrary Values

### One-off Values

```html
<!-- Custom spacing -->
<div class="top-[117px] left-[344px]">Precise positioning</div>

<!-- Custom colors -->
<div class="bg-[#bada55] text-[22px]">Custom values</div>

<!-- CSS variables -->
<div class="bg-[var(--my-color)]">Using CSS vars</div>
```

📖 **Learn more:** [Custom Styles](./custom-styles.md)

---

### Arbitrary Values with Modifiers

```html
<div class="bg-[#1da1f2] hover:bg-[#0d8bd9] lg:bg-[#0a7dc2]">
  Responsive custom colors
</div>
```

📖 **Learn more:** [Custom Styles](./custom-styles.md)

---

## 📱 Responsive Design

### Breakpoint System

```html
<!-- Mobile first approach -->
<div
  class="
  w-full           <!-- Base: 100% width -->
  sm:w-1/2         <!-- ≥640px: 50% width -->
  md:w-1/3         <!-- ≥768px: 33% width -->
  lg:w-1/4         <!-- ≥1024px: 25% width -->
  xl:w-1/5         <!-- ≥1280px: 20% width -->
  2xl:w-1/6        <!-- ≥1536px: 16% width -->
"
>
  Responsive width
</div>
```

📖 **Learn more:** [Responsive Design](./responsive-design.md)

---

## 🎬 Viewport Animations

### Basic Intersection

```html
<div class="opacity-0 intersect:opacity-100 transition-opacity">
  Fades in when visible
</div>
```

📖 **Learn more:** [Tailwind Intersect](./tailwind-intersect.md)

---

### With Modifiers

```html
<!-- Trigger once -->
<div class="scale-0 intersect:scale-100 intersect-once transition-transform">
  Scales in once
</div>

<!-- Trigger at 50% visibility -->
<div
  class="translate-y-10 intersect:translate-y-0 intersect-half transition-transform"
>
  Slides up at half
</div>

<!-- Trigger when fully visible -->
<div class="rotate-0 intersect:rotate-180 intersect-full transition-transform">
  Rotates when fully visible
</div>
```

📖 **Learn more:** [Tailwind Intersect](./tailwind-intersect.md)

---

## 🎨 Custom Variants

### State-based Variant

```css
@variant hocus (&:is(:hover, :focus));
```

```html
<button class="bg-blue-500 hocus:bg-blue-600">Hover or focus</button>
```

📖 **Learn more:** [Functions and Directives](./functions-and-directives.md)

---

### Data Attribute Variant

```css
@variant data-active (&:is([data-active="true"]));
```

```html
<div class="opacity-50 data-active:opacity-100" data-active="true">
  Active state
</div>
```

📖 **Learn more:** [Custom Styles](./custom-styles.md)

---

## ⚠️ Common Pitfalls

### ❌ Don't: Dynamic Class Names

```html
<!-- This won't work -->
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>
```

### ✅ Do: Complete Class Names

```html
<!-- This works -->
<div class="{{ error ? 'text-red-600' : 'text-green-600' }}"></div>
```

📖 **Learn more:** [Classname Detection](./classname-detection.md)

---

### ❌ Don't: Props for Class Composition

```jsx
// This won't work
<Button color={color} /> // Uses `text-${color}-500`
```

### ✅ Do: Complete Classes in Props

```jsx
// This works
<Button className={colorMap[color]} />
// where colorMap = { red: 'text-red-500', blue: 'text-blue-500' }
```

📖 **Learn more:** [Classname Detection](./classname-detection.md)

---

## 🔧 Configuration Patterns

### Basic Setup (v4)

```css
/* app.css */
@import "tailwindcss";

@theme {
  /* Your theme variables */
  --color-brand: oklch(0.5 0.2 200);
}
```

```js
// postcss.config.js
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

📖 **Learn more:** [v4.0 Overview](./v4.md)

---

### Explicit Source Files

```css
@import "tailwindcss";
@source "../components";
@source "../lib";
```

📖 **Learn more:** [Functions and Directives](./functions-and-directives.md)

---

## 📚 Related Documentation

### Within This Project

- [Main README](./README.md) - Complete documentation index
- [Navigation Guide](./NAVIGATION.md) - Visual learning paths
- [Tailwind Motion](../tailwind-motion/) - Animation utilities

### External Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind Play](https://play.tailwindcss.com/) - Online playground
- [Tailwind UI](https://tailwindui.com/) - Component examples

---

## 🔍 Need More Detail?

This is a quick reference. For comprehensive guides, see:

- **Configuration**: [Theme Variables](./theme-varibles.md), [Custom Styles](./custom-styles.md)
- **Features**: [Responsive Design](./responsive-design.md), [Dark Mode](./dark-mode.md)
- **Advanced**: [Functions and Directives](./functions-and-directives.md), [Tailwind Intersect](./tailwind-intersect.md)
- **Technical**: [Classname Detection](./classname-detection.md), [Preflight](./preflight.md)

**[Back to Main README](./README.md)** | **[See All Docs](../)**
