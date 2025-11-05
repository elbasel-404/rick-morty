# Variants

Class Variance Authority (CVA) provides a powerful way to manage component variants with type safety.

> **Note**: Although CVA is a tiny library, it's best to use in a SSR/SSG environment – your user probably doesn't need this JavaScript, especially for static components.

## Creating Variants

To kick things off, let's build a "basic" button component, using CVA to handle our variant's classes.

> **Note**: Use of Tailwind CSS is optional

```ts
// components/button.ts
import { cva } from "class-variance-authority";

const button = cva(["font-semibold", "border", "rounded"], {
  variants: {
    intent: {
      primary: ["bg-blue-500", "text-white", "border-transparent"],
      // or
      // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
      secondary: ["bg-white", "text-gray-800", "border-gray-400"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
    // boolean variants are also supported!
    disabled: {
      false: null,
      true: ["opacity-50", "cursor-not-allowed"],
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      disabled: false,
      class: "hover:bg-blue-600",
    },
    {
      intent: "secondary",
      disabled: false,
      class: "hover:bg-gray-100",
    },
    {
      intent: "primary",
      size: "medium",
      // or if you're a React.js user, className may feel more consistent:
      // className: "uppercase"
      class: "uppercase",
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
    disabled: false,
  },
});
```

### Usage Examples

```ts
button();
// => "font-semibold border rounded bg-blue-500 text-white border-transparent text-base py-2 px-4 hover:bg-blue-600 uppercase"

button({ disabled: true });
// => "font-semibold border rounded bg-blue-500 text-white border-transparent text-base py-2 px-4 opacity-50 cursor-not-allowed uppercase"

button({ intent: "secondary", size: "small" });
// => "font-semibold border rounded bg-white text-gray-800 border-gray-400 text-sm py-1 px-2 hover:bg-gray-100"
```

## Compound Variants

Variants that apply when multiple other variant conditions are met.

```ts
// components/button.ts
import { cva } from "class-variance-authority";

const button = cva("…", {
  variants: {
    intent: { primary: "…", secondary: "…" },
    size: { small: "…", medium: "…" },
  },
  compoundVariants: [
    // Applied via:
    // button({ intent: "primary", size: "medium" })
    {
      intent: "primary",
      size: "medium",
      class: "…",
    },
  ],
});
```

## Targeting Multiple Variant Conditions

You can apply compound variants to multiple conditions:

```ts
// components/button.ts
import { cva } from "class-variance-authority";

const button = cva("…", {
  variants: {
    intent: { primary: "…", secondary: "…" },
    size: { small: "…", medium: "…" },
  },
  compoundVariants: [
    // Applied via:
    // button({ intent: "primary", size: "medium" })
    // or
    // button({ intent: "secondary", size: "medium" })
    {
      intent: ["primary", "secondary"],
      size: "medium",
      class: "…",
    },
  ],
});
```

## See Also

- [Compose](./compose.md) - Composing multiple CVA instances
- [Extend](./extend.md) - Extending existing variants
- [TypeScript](./typescript.md) - TypeScript integration and type safety
- [Examples](./example.md) - Real-world examples
